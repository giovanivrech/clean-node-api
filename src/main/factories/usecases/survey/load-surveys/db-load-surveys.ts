import { LoadSurveys } from '@/domain/usescases/survey/load-surveys'
import { DbLoadSurveys } from '@/data/usescases/survey/load-surveys/db-load-surveys'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
