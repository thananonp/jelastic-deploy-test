# week-4-chargemap

## About

This week implementation

* HTTPS (cert, auto redirect)
* Authentication on GraphQL Mutation
* Helmet to protect header
* Deployment base on environment
* npm audit to check for vulnerabilities

## Deployment

[Jelastic deployment link](http://thananonp-test.jelastic.metropolia.fi/)

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