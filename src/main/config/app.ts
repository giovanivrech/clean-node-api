import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupStaticFiles from './static-files'
import setupSwagger from './swagger'
import express, { Express } from 'express'
import { setupApolloServer } from '@/main/graphql/apollo'

export const setupApp = async (): Promise<Express> => {
  const app = express()

  setupStaticFiles(app)
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)

  const server = setupApolloServer()
  await server.start()
  server.applyMiddleware({ app })

  return app
}
