# week-2-chargemap

## About
https://gitlab.metropolia.fi/ilkkamtk/sssf-course/-/blob/master/week2/homework.md
This project is a homework of week 2. And this repo should be on Metropolia Jelastic.

## Command
### Authentication (Getting JWT for Bearer Token)

`http://thananonp-test.jelastic.metropolia.fi/auth/login?email=john@metropolia.fi&password=1234`

### Find Charge Station by id

`http://thananonp-test.jelastic.metropolia.fi/chargemap/station/{id}`

### List all Charge Station
You can also specify query parameters (limit default=10, lat, lon) 

`http://thananonp-test.jelastic.metropolia.fi/chargemap/stations?limit=1&lat={"lat": 35, "lon": 36}&lon={"lat": 24, "lon": 23}`

### Add Charge Station

Data for creating the station need to be in the body

`http://thananonp-test.jelastic.metropolia.fi/chargemap/stations`

### Edit Charge Station

Data for editing the station need to be in the body

`http://thananonp-test.jelastic.metropolia.fi/chargemap/stations`

### Delete Charge Station

You need to specify the id to delete

`http://thananonp-test.jelastic.metropolia.fi/chargemap/station/{id}`

## Command
To run `npm start`
To test `npm run dev`

# week-3-chargemap

## About
In this week I implement the GraphQL into the application. You can find the GraphQL playground when you start the project.