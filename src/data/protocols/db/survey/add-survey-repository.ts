import { AddSurveyParams } from '@/domain/usescases/survey/add-survey'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyParams) => Promise<void>
}
