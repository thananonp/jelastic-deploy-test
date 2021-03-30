const {ApolloServer, gql} = require('apollo-server');

const connectionSchema = gql`
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

    input ConnectionsInput{
        id: ID
        Quantity: Int
        ConnectionTypeID: ID
        CurrentTypeID: ID
        LevelID: ID
    }
`;

module.exports = connectionSchema
