import { AddSurveyModel } from '@/domain/usescases/add-survey'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
