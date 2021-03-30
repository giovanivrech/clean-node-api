import { AddSurveyModel } from '@/domain/usescases/survey/add-survey'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
