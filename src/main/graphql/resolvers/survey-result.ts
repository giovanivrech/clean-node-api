import { adaptResolver } from '@/main/adapters/apollo-server-resolver-adapter'
import { makeLoadSurveyResultController } from '@/main/factories/controllers/survey-result/load-survey-result/load-survey-result-controller-factory'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'

export default {
  Query: {
    surveyResult: async (parent: any, args: any, context: any) => adaptResolver(makeLoadSurveyResultController(), args, context)
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any, context: any) => adaptResolver(makeSaveSurveyResultController(), args, context)
  }
}
