import { DbAddSurvey } from '@/data/usescases/survey/add-survey/db-add-survey'
import { AddSurvey } from '@/domain/usescases/survey/add-survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
