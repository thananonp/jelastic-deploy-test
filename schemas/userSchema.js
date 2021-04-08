const  {gql} = require( 'apollo-server-express');

const userSchema =  gql`
    extend type Query {
        login(username: String!, password: String!): User
    }
    type User {
        id: ID
        username: String
        token: String
    }
`;

module.exports = userSchema