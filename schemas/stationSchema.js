const {ApolloServer, gql} = require('apollo-server');

const stationSchema = gql`

    extend type Query {
        station(id: ID!): Station
        stations(limit: Int, bounds :Bounds): [Station]
    }

    extend type Mutation {
        addStation(
            Title: String
            Town: String
            AddressLine1: String
            StateOrProvince: String
            Postcode: String
            Location: LocationInput
            Connections:[ConnectionsInput]
        ): Station,
        modifyStation(
            id: ID,
            Connections: [ConnectionsInput]
            Postcode: String
            Title: String
            AddressLine1: String
            StateOrProvince: String
            Town: String
        ): Station,
        deleteStation(
            id:ID
        ): Station
    }

    type Location {
        type: String
        coordinates: [String]
    }
    input LocationInput {
        type: String
        coordinates: [Float]
    }

    input Bounds {
        _southWest: LatLon
        _northEast: LatLon
    }

    input LatLon {
        lat: Float
        lng: Float
    }

    type Station{
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
