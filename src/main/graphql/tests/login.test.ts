import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { setupApp } from '@/main/config/app'

import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import request from 'supertest'
import { Express } from 'express'

let accountCollection: Collection
let app: Express

describe('Login GraphQL', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Login Query', () => {
    const query = `query {
      login (email: "giovanivrech@gmail.com", password: "123") {
        accessToken
        name
      }
    }`

    test('Should return an Account on valid credentials', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Giovani',
        email: 'giovanivrech@gmail.com',
        password
      })
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.login.accessToken).toBeTruthy()
      expect(res.body.data.login.name).toBe('Giovani')
    })

    test('Should return UnauthorizedError on invalid credentials', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(401)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Unauthorized')
    })
  })

  describe('SignUp Mutation', () => {
    const query = `mutation {
      signUp (name: "Giovani", email: "giovanivrech@gmail.com", password: "123", passwordConfirmation: "123") {
        accessToken
        name
      }
    }`

    test('Should return an Account on valid data', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.signUp.accessToken).toBeTruthy()
      expect(res.body.data.signUp.name).toBe('Giovani')
    })

    test('Should return EmailInUseError on invalid data', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Giovani',
        email: 'giovanivrech@gmail.com',
        password
      })
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('The received email is already in use')
    })
  })
})
