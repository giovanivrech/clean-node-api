import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        surveyResult (surveyId: String!): surveyResult! @auth
    }

    extend type Mutation {
        saveSurveyResult (surveyId: String!, answer: String!): surveyResult! @auth
    }

    type surveyResult {
        surveyId: String!
        question: String!
        answers: [Answer!]!
        date: DateTime!
      }
      
    type Answer {
        image: String
        answer: String!
        count: Int!
        percent: Int!
        isCurrentAccountAnswer: Boolean!
    }
`
