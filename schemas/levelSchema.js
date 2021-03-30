const {ApolloServer, gql} = require('apollo-server');

const levelSchema = gql`
type LevelType{
    id:ID
    Title: String
    Comments: String
    IsFastChargeCapable: Boolean
}
`

module.exports = levelSchema