import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { setupApp } from '@/main/config/app'

import request from 'supertest'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import { Express } from 'express'

let accountCollection: Collection
let app: Express

describe('Login Routes', () => {
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

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Giovani',
          email: 'giovanivrech@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)

      await accountCollection.insertOne({
        name: 'Giovani',
        email: 'giovanivrech@gmail.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'giovanivrech@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'giovanivrech@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
