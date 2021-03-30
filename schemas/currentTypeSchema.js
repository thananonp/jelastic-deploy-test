const {ApolloServer, gql} = require('apollo-server');

const currentTypeSchema = gql`
     
   type CurrentType{
    id: ID
    Description: String
    Title: String
   }
 
`;

module.exports = currentTypeSchema
