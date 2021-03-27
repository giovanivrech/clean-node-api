import { DbLoadSurveys } from '../../../../../data/usescases/load-surveys/db-load-surveys'
import { LoadSurveys } from '../../../../../domain/usescases/load-surveys'
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
