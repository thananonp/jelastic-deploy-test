const { ApolloServer, gql } = require('apollo-server');

const connectionTypeSchema = gql`
    type ConnectionType{
    id: ID
    FormalName: String
    Title: String  
   }
   
`;

module.exports = connectionTypeSchema
