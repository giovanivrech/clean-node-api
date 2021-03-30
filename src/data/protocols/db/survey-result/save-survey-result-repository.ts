import { SaveSurveyResultModel } from '@/domain/usescases/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
