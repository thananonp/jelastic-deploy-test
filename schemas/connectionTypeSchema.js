const {ApolloServer, gql} = require('apollo-server');

const connectionTypeSchema = gql`
    extend type Query {
        connectiontypes: [ConnectionTypeID]
    }

    type ConnectionTypeID{
        id: ID
        FormalName: String
        Title: String
    }

    input ConnectionType{
        id: ID
        FormalName: String
        Title: String
    }
   
`;

module.exports = connectionTypeSchema
