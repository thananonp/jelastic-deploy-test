const { ApolloServer, gql } = require('apollo-server');

const stationSchema = gql`
   extend type Query {
     connection(id: ID!): Connections
     connections(limit: String): [Connections]
   }
      
   type Connections{
    id: ID
    Quantity: String
    ConnectionType: ConnectionType
    CurrentType: CurrentType
    LevelType: LevelType
   }
   
`;

module.exports = stationSchema
