const {gql} = require('apollo-server-express')
const stationSchema = require('./stationSchema')

const linkSchema = gql`
   type Query {
     _: Boolean
   }
   type Mutation {
     _: Boolean
   }
`;

module.exports = [linkSchema,stationSchema]