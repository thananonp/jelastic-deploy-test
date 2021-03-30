const {ApolloServer, gql} = require('apollo-server');

const currentTypeSchema = gql`
    extend type Query {
        currenttypes: [CurrentType]
    }

    type CurrentType{
        id: ID
        Description: String
        Title: String
    }
    input CurrentTypeInput{
        id: ID
        Description: String
        Title: String
    }

`;

module.exports = currentTypeSchema
