const {gql} = require('apollo-server-express')
const stationSchema = require('./stationSchema')
const connectionSchema = require('./connectionSchema.js')
const levelSchema = require('./levelSchema')
const connectionTypeSchema = require('./connectionTypeSchema')
const currentTypeSchema = require('./currentTypeSchema')

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
`;

module.exports = [linkSchema, stationSchema, connectionSchema, levelSchema
    , connectionTypeSchema, currentTypeSchema]