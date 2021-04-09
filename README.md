# week-2-chargemap

## About
https://gitlab.metropolia.fi/ilkkamtk/sssf-course/-/blob/master/week2/homework.md  
This project is a homework of week 2. And this repo should testable be on Metropolia Jelastic link.  
`http://thananonp-test.jelastic.metropolia.fi`

## Command

### Authentication (Getting JWT for Bearer Token)  
Login functionality is not baked in. But you can get the JWT token.  
`http://thananonp-test.jelastic.metropolia.fi/auth/login?email=john@metropolia.fi&password=1234`

### Find Charge Station by id
GET method // specify using id  
`http://thananonp-test.jelastic.metropolia.fi/chargemap/station/{id}`

### List all Charge Station
GET method // You can also specify query parameters (limit default=10, topRight:{lat,lng}, bottomLeft:{lat,lng})  
`http://thananonp-test.jelastic.metropolia.fi/chargemap/stations?limit=1&topRight={"lat":60.2821946,"lng":25.036108}&bottomLeft={"lat":60.1552076,"lng":24.7816538}`

### Add Charge Station
POST method // Data for creating the station need to be in the body  
`http://thananonp-test.jelastic.metropolia.fi/chargemap/stations`

### Edit Charge Station
PATCH method // Data for editing the station need to be in the body  
`http://thananonp-test.jelastic.metropolia.fi/chargemap/stations`

### Delete Charge Station
DELETE method // You need to specify the id to delete  
`http://thananonp-test.jelastic.metropolia.fi/chargemap/station/{id}`

## Command
To run `npm start`  
To test `npm run dev`  
