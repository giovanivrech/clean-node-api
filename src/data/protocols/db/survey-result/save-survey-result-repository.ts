import { SaveSurveyResultParams } from '@/domain/usescases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
