import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { setupApp } from '@/main/config/app'
import env from '@/main/config/env'

import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import request from 'supertest'
import { Express } from 'express'

let surveyCollection: Collection
let accountCollection: Collection
let app: Express

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Giovani',
    email: 'giovanivrech@gmail.com',
    password: '123'
  })

  const id = res.insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne({
    _id: res.insertedId
  }, {
    $set: {
      accessToken
    }
  })

  return accessToken
}

describe('SurveyResult GraphQL', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('SurveyResult Query', () => {
    test('Should return surveyResult', async () => {
      const accessToken = await makeAccessToken()
      const now = new Date()
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        },
        {
          answer: 'Answer 2'
        }],
        date: now
      })

      const query = `
        query {
          surveyResult (surveyId: "${surveyRes.insertedId.toHexString()}") {
            question
            answers {
              image
              answer
              count
              percent
              isCurrentAccountAnswer
            }
            date
          }
        }`

      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })

      expect(res.status).toBe(200)
      expect(res.body.data.surveyResult.question).toBe('Question')
      expect(res.body.data.surveyResult.date).toBe(now.toISOString())
      expect(res.body.data.surveyResult.answers).toEqual([{
        answer: 'Answer 1',
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false,
        image: 'http://image-name.com'
      },
      {
        answer: 'Answer 2',
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false,
        image: null
      }])
    })

    test('Should return AccessDeniedError if no token is provided', async () => {
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        },
        {
          answer: 'Answer 2'
        }],
        date: new Date()
      })

      const query = `
        query {
          surveyResult (surveyId: "${surveyRes.insertedId.toHexString()}") {
            question
            answers {
              image
              answer
              count
              percent
              isCurrentAccountAnswer
            }
            date
          }
        }`

      const res = await request(app)
        .post('/graphql')
        .send({ query })

      expect(res.status).toBe(403)

      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Access denied')
    })
  })

  describe('SaveSurveyResult Mutation', () => {
    test('Should return SurveyResult', async () => {
      const accessToken = await makeAccessToken()
      const now = new Date()
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        },
        {
          answer: 'Answer 2'
        }],
        date: now
      })

      const query = ` mutation {
        saveSurveyResult (surveyId: "${surveyRes.insertedId.toHexString()}", answer: "Answer 1") {
            question
            answers {
              image
              answer
              count
              percent
              isCurrentAccountAnswer
            }
            date
          }
      }`

      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })

      expect(res.status).toBe(200)

      expect(res.body.data.saveSurveyResult.question).toBe('Question')
      expect(res.body.data.saveSurveyResult.date).toBe(now.toISOString())
      expect(res.body.data.saveSurveyResult.answers).toEqual([{
        answer: 'Answer 1',
        count: 1,
        percent: 100,
        isCurrentAccountAnswer: true,
        image: 'http://image-name.com'
      },
      {
        answer: 'Answer 2',
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false,
        image: null
      }])
    })

    test('Should return AccessDeniedError if no token is provided', async () => {
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        },
        {
          answer: 'Answer 2'
        }],
        date: new Date()
      })

      const query = ` mutation {
        saveSurveyResult (surveyId: "${surveyRes.insertedId.toHexString()}", answer: "Answer 1") {
            question
            answers {
              image
              answer
              count
              percent
              isCurrentAccountAnswer
            }
            date
          }
      }`

      const res = await request(app)
        .post('/graphql')
        .send({ query })

      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Access denied')
    })
  })
})
