const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        user: User
        login(username: String!, password: String!): User
    }

    extend type Mutation {
        registerUser(username: String!, password: String!, full_name: String): User
    }

    type User {
        id: ID
        username: String
        full_name: String
        token: String
    }
`;
