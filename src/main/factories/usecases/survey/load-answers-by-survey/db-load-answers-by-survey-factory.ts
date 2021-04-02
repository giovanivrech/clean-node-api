import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { LoadAnswersBySurvey } from '@/domain/usescases/survey/load-answers-by-survey'
import { DbLoadAnswersBySurvey } from '@/data/usescases/survey/load-answers-by-survey/db-load-answers-by-survey'

export const makeDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
