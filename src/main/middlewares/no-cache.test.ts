import { setupApp } from '@/main/config/app'
import { noCache } from './no-cache'

import request from 'supertest'
import { Express } from 'express'

let app: Express

describe('NoCache Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should disable cache', async () => {
    app.get('/test_no_cache', noCache, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
