const { ApolloServer, gql } = require('apollo-server');

const stationSchema = gql`
   extend type Query {
     station(id: ID!): Station
     stations(limit: String): [Station]
   }
    
   type Location {
    type: String
    coordinates: [String]
   }
   
   type ConnectionType{
    id: ID
    FormalName: String
    Title: String  
   }
   
   type CurrentType{
    id: ID
    Description: String
    Title: String
   }
   
   type LevelType{
    id:ID
    Title: String
    Comments: String
    IsFastChargeCapable: Boolean
    }
   
   type Station {
      id: ID
      Title: String
      Town: String
      AddressLine1: String
      StateOrProvince: String
      Postcode: String
      Location: Location
      Connections: [Connections]
   }
`;

module.exports = stationSchema
