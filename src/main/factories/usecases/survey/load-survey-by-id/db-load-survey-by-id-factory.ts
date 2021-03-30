import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { LoadSurveyById } from '@/domain/usescases/survey/load-survey-by-id'
import { DbLoadSurveyById } from '@/data/usescases/survey/load-survey-by-id/db-load-survey-by-id'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
