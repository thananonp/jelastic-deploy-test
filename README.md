# week-4-chargemap

## About

This week implementation

* HTTPS (cert, auto redirect)
* Authentication on GraphQL Mutation
* Helmet to protect header
* Deployment base on environment
* npm audit to check for vulnerabilities

## Deployment

[Jelastic deployment link](https://thananonp-test.jelastic.metropolia.fi/)  
Direct url to test graphQL = `https://thananonp-test.jelastic.metropolia.fi/graphql`

## Command to test on local

To run `npm start`
To test `npm run dev`

## GraphQL command to test

* Register user

```graphql
mutation {
    registerUser(username: "John", password: "PASSWORD123SECURE!", full_name: "John Cena"){
        id
        username
        full_name
    }
}
```

* Login user

```graphql
query{
    login(username: "John", password: "PASSWORD123SECURE!") {
        id
        username
        full_name
        token
    }
}
```

* Check which user is logged in based on Bearer token (Don't forget to put Bearer token in HTTP Header)

```json
{
  "Authorization": "Bearer yourBearerTokenHere"
}
```

```graphql
query{
    user {
        id
        username
        full_name
    }
}
```

* Query test (without Token check)

```graphql
query{
    stations(limit: 3) {
        Title
        Town
        AddressLine1
        Location {
            type
            coordinates
        }
        Connections {
            Quantity
            ConnectionTypeID {
                Title
            }
            CurrentTypeID {
                Title
            }
            LevelID {
                Title
                Comments
                IsFastChargeCapable
            }
        }
    }
}
```

* Mutation test (with Token check)

```graphql
mutation {
    addStation(
        Connections: [
            {
                ConnectionTypeID: "xxxxx",
                CurrentTypeID: "xxxxx",
                LevelID: "xxxxx",
                Quantity: 2
            }
        ],
        Postcode: "00000",
        Title: "Some title",
        AddressLine1: "Some address",
        StateOrProvince: "Some state",
        Town: "Some town",
        Location: {
            coordinates: [12.34, 56.78]
        }
    )
    {
        AddressLine1
        Town
    }
}
```

## Rest of the graphQL command

* get stations by boundaries:

```graphql
{
    stations(bounds: {_southWest: {lat: 60.0918986743294, lng: 24.60319519042969}, _northEast: {lat: 60.38196898834704, lng: 24.94033813476563}}) {
        Title
        Town
        AddressLine1
        Location {
            type
            coordinates
        }
        Connections {
            Quantity
            ConnectionTypeID {
                Title
            }
            CurrentTypeID {
                Title
            }
            LevelID {
                Title
                Comments
                IsFastChargeCapable
            }
        }
    }
}
```

* limit the number of stations

```graphql
{
    stations(start: 15, limit: 3) {
        Title
        Town
        AddressLine1
        Location {
            type
            coordinates
        }
        Connections {
            Quantity
            ConnectionTypeID {
                Title
            }
            CurrentTypeID {
                Title
            }
            LevelID {
                Title
                Comments
                IsFastChargeCapable
            }
        }
    }
}
```

* station by id

```graphql
{
    station(id: "someId") {
        Title
        Town
        AddressLine1
        Location {
            type
            coordinates
        }
        Connections {
            Quantity
            ConnectionTypeID {
                Title
            }
            CurrentTypeID {
                Title
            }
            LevelID {
                Title
                Comments
                IsFastChargeCapable
            }
        }
    }
}
```

* get connection types

```graphql
{
    connectiontypes {
        id
        FormalName
        Title
    }
}
```

* get current types

```graphql
{ currenttypes { id Description Title } }
```

* get level types

```graphql
{ leveltypes { id Comments IsFastChargeCapable Title } }
```

* add station (require bearer token)

```graphql
mutation { addStation(
    Connections: [
        { ConnectionTypeID: "someConnectionTypeID", CurrentTypeID: "someCurrentTypeID", LevelID: "someLevelID", Quantity: 2 }], Postcode: "00000", Title: "Some title", AddressLine1: "Some address", StateOrProvince: "Some state", Town: "Some town", Location: { coordinates: [some_lng, some_lat]
    }
)
{ AddressLine1 Town } }
```

* modify station (if you want to use separate variables)  (require bearer token)

```graphql
mutation ExampleWithVariables($id: ID!, $Connections: [ConnectionInput]
    , $Postcode: String,
    $Title: String,
    $AddressLine1: String,
    $StateOrProvince: String, $Town: String)
{ modifyStation(
    id: $id, Connections: $Connections, Postcode: $Postcode, Title: $Title, AddressLine1: $AddressLine1, StateOrProvince:
    $StateOrProvince, Town: $Town,
)
{
    Title
    AddressLine1
    Town } }
```

variables for modify station, note that format is JSON

```json
{
  "id": "someStationID",
  "  Connections  ": [
    {
      "id": "someConnectionID",
      "Quantity": 3,
      "ConnectionTypeID": "someConnectionTypeID",
      "LevelID": "someLevelID",
      "CurrentTypeID": "someCurrentTypeID"
    }
  ],
  "Postcode": "02720",
  "Title": "Lähisd",
  "AddressLine1": "Sanansaattajanpolku",
  "StateOrProvince": "Uusimaa",
  "Town": "Espoo"
}

```

* delete station (require bearer token)

```graphql
mutation { deleteStation(id: "someStationID"){ id } }
```
