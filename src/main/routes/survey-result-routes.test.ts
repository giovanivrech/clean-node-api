import { setupApp } from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
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

describe('Survey Routes', () => {
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

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      const res = await surveyCollection.insertOne({
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
      const accessToken = await makeAccessToken()

      await request(app)
        .put(`/api/surveys/${res.insertedId.toHexString()}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1'
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on load survey result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403)
    })

    test('Should return 200 on load survey result with accessToken', async () => {
      const res = await surveyCollection.insertOne({
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
      const accessToken = await makeAccessToken()

      await request(app)
        .get(`/api/surveys/${res.insertedId.toHexString()}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
