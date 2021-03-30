const {ApolloServer, gql} = require('apollo-server');

const levelSchema = gql`
    extend type Query {
        leveltypes: [LevelType]
    }

    type LevelType{
        id:ID
        Title: String
        Comments: String
        IsFastChargeCapable: Boolean
    }

    input LevelTypeInput{
        id:ID
        Title: String
        Comments: String
        IsFastChargeCapable: Boolean
    }
`

module.exports = levelSchema