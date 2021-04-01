import { AddSurveyParams } from '@/domain/usescases/survey/add-survey'

export interface AddSurveyRepository {
  add: (data: AddSurveyParams) => Promise<void>
}
