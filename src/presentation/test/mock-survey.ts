import { AddSurvey, AddSurveyParams } from '@/domain/usescases/survey/add-survey'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveys } from '@/domain/usescases/survey/load-surveys'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { LoadSurveyById } from '@/domain/usescases/survey/load-survey-by-id'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }

  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveyModels()))
    }
  }

  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(mockSurveyModel()))
    }
  }

  return new LoadSurveyByIdStub()
}
