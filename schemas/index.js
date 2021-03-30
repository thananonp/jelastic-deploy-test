const {gql} = require('apollo-server-express')
const stationSchema = require('./stationSchema')
const connectionSchema = require('./connectionSchema.js')

const linkSchema = gql`
   type Query {
     _: Boolean
   }
   type Mutation {
     _: Boolean
   }
`;

module.exports = [linkSchema, stationSchema, connectionSchema]