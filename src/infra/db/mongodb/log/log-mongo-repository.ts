import { MongoHelper } from '../helpers/mongo-helper'
import { LogErrorRepository } from '@/data/protocols/db/log/logErrorRepository'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
