const {ApolloServer, gql} = require('apollo-server');

const connectionTypeSchema = gql`
    extend type Query {
        connectiontypes: [ConnectionType]
    }

    type ConnectionType{
        id: ID
        FormalName: String
        Title: String
    }

    input ConnectionTypeInput{
        id: ID
        FormalName: String
        Title: String
    }
   
`;

module.exports = connectionTypeSchema
