const {ApolloServer, gql} = require('apollo-server');

const connectionSchema = gql`
    extend type Query {
        connection(id: ID!): Connections
        connections(limit: String): [Connections]
    }

    type Connections{
        id: ID
        Quantity: String
        ConnectionTypeID: ConnectionTypeID
        CurrentTypeID: CurrentTypeID
        LevelID: LevelID
    }

    input ConnectionsInput{
        id: ID
        Quantity: Int
        ConnectionTypeID: ID
        CurrentTypeID: ID
        LevelID: ID
    }
`;

module.exports = connectionSchema
