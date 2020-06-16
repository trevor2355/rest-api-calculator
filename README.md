# rest-api-calculator-backend
This is a simple web platform that provides simple calculator functionality (addition, subtraction, multiplication, division, square root, and also random string generation) to a user.  Each functionality has a specific cost that is recorded by the platform and can be managed by an admin user.

## API Instructions

This API is for registered users and admin users, you will need a valid account in order to obtain a token that will give you access to the API.

### Getting started
All requests should be made to the following url, the endpoints that are available are specified below in the documentation.
#### Getting your valid json web token

To get a valid json web token you will need to send the following request:

##### Login
Request:
```
POST /login HTTP/1.1
Accept: application/json
Content-Type: application/json
Body:
{
    "username": "foo",
    "password": "1234567",
    "admin": boolean
}
```
Successful Response: 
```
HTTP/1.1 200 OK
Content-Type: application/json
Body:
{
    "success": true,
    "token": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTU5MjI1MTI3NzUxOCwiZXhwIjoxNTkyMjUxMzYzOTE4fQ.JmI9w7nGBgX2_Q9IZfNs--6HHGz-cwF4b2RsFngF9AHjdUYkVphMdONEdkG-cej2F8Ca0ffmRWMIOBCm3zU3CtLwOQ4GMOLvN6ONRyJxCjX2Ay-FP8n9FuKhLJjZxqe5hAbKxUQYINpK9sIx164wJoi-th40gT6tKnzmPoRy4qXUtpGYlZKwdBNJqW6ssx2Gsc6RS9QlopDGXGPwKtqa-OCdfwUI38vzimy4KHaXcrTtSP9xYp7igQ6_YfBXFIStH1chYwm68zGb3DdQ-sX0hSPgjwsbkhczne7YSwYNlkZ7Ainx96D5I4U5eylSeY03X7GazFIlxk6aGjxbnV0tR1cFKZD-CllEuFk9adpWzEybJo0gNKtLdtxXpWEeh8IS1Vu0BUgLnlvlCAKCkVJggggqiypw2X5KmlBuGHCx-Ue9pwlt-M9rerqk6DnvM_6zJrzvOKA_Xzx4xEDr3vACRCWOe7ccCMgwkU3SlAF-bmwapI62l6IIrcfk2bX7K6KlotP3kWaGktU_Mb-zLFoXDPYi4cEgvoAetxpNlc2v8Qm-N3w5EqENlBVgXcXZNOPne8ohT38cP5mOhCNpSUd94POitFIg8wS71bq3Nq2nEIg9sdEvVQt4kyOuXGwneOIpR2FCDaNzxJIkCSc1xIGhvTfHTC_NKRkBwHAzo",
    "expiresIn": "1d"
    "user": {
        "id": 2,
        "uuid": "bab760a0-af3c-11ea-9510-ebe677026827",
        "username": "doug@gmail.com",
        "role": "user",
        "status": "active",
        "balance": 300,
        "createdAt": "2020-06-15T19:16:35.374Z",
        "updatedAt": "2020-06-15T21:28:16.273Z"
    }
}
```

You now can copy this token and include it on all other requests in the 'Authorization' header.  You also have your id, that can be used to get specific details about your account.

### Endpoints available to Users

#### /api/services

##### Get all Services
Endpoint: /api/services
Request:
```
GET /api/services HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
```
Successful Response: 
```
HTTP/1.1 200 OK
Content-Type: application/json
Body:
[
    {
        "id": 1,
        "uuid": "80f6b630-af2e-11ea-be97-69a9b7c684dd",
        "type": "addition",
        "cost": 2,
        "status": "active",
        "createdAt": "2020-06-15T17:34:45.526Z",
        "updatedAt": "2020-06-15T17:36:32.051Z"
    },
    {
        "id": 2,
        "uuid": "866083d0-af2e-11ea-be97-69a9b7c684dd",
        "type": "subtraction",
        "cost": 2,
        "status": "active",
        "createdAt": "2020-06-15T17:34:54.606Z",
        "updatedAt": "2020-06-15T17:36:39.829Z"
    }
]
```

##### Get specific Service
Endpoint: /api/services/:serviceId
Request:
```
GET /api/services/1 HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
```
Successful Response: 
```
HTTP/1.1 200 OK
Content-Type: application/json
Body:
[
    {
        "id": 1,
        "uuid": "80f6b630-af2e-11ea-be97-69a9b7c684dd",
        "type": "addition",
        "cost": 2,
        "status": "active",
        "createdAt": "2020-06-15T17:34:45.526Z",
        "updatedAt": "2020-06-15T17:36:32.051Z"
    }
]
```

#### /api/users

##### Get specific User
Endpoint: /api/users/:userId
Request:
```
GET /api/users/1 HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
```
Successful Response: 
```
HTTP/1.1 200 OK
Content-Type: application/json
Body:
[
    {
        "id": 1,
        "uuid": "4447eb80-af2b-11ea-abe6-a7512f93ef8c",
        "username": "trevor@gmail.com",
        "role": "admin",
        "status": "active",
        "balance": 500,
        "createdAt": "2020-06-15T17:11:35.226Z",
        "updatedAt": "2020-06-15T21:16:27.180Z"
    }
]
```

##### Get all User Records
Endpoint: /api/services/:userId/records
Request:
```
GET /api/users/1/records HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
```
Successful Response: 
```
HTTP/1.1 200 OK
Content-Type: application/json
Body:
[
    {
        "id": 1,
        "uuid": "462d3fc0-af4b-11ea-8e75-c18624ae91c6",
        "service_id": 1,
        "user_id": 2,
        "cost": 2,
        "user_balance": 198,
        "service_response": "8",
        "date": "2020-06-15T21:00:42.217Z",
        "createdAt": "2020-06-15T21:00:42.301Z",
        "updatedAt": "2020-06-15T21:00:42.301Z"
    },
    {
        "id": 2,
        "uuid": "629fcfb0-af4b-11ea-8e75-c18624ae91c6",
        "service_id": 5,
        "user_id": 2,
        "cost": 5,
        "user_balance": 193,
        "service_response": "2",
        "date": "2020-06-15T21:01:29.969Z",
        "createdAt": "2020-06-15T21:01:30.027Z",
        "updatedAt": "2020-06-15T21:01:30.027Z"
    }
]
```

### Endpoints available to Admin Users

#### /api/records
get all
get one
add record
update record
delete record

#### /api/services
Get all
get one
add service
update service
delete service


#### /api/users
get all
get one
get all user records
add user
update user
delete user

### Filtering

### Pagination

## Getting Started (to download and use locally)

### Prerequisites
A couple of things that you will need installed on your machine (check out their documentaion for installation instuctions)

1. [Postgres](https://www.postgresql.org/download/)
2. Sequelize-cli
```
npm install -g sequelize-cli
```

##### Recommended
* [Nodemon](https://nodemon.io/)

### Installing
When you are located in the root of the project folder run the following command in the terminal:
```
npm install
```

### Intial Set-up

1. Create a .env file in the root of the project with the following key value pairs:
```
POSTGRES_DB='rest_api_calculator'
POSTGRES_USER=(Your Postgres Username)
POSTGRES_PW='(Your Secret Password)
POSTGRES_HOST=(local host if setting up database locally)
RANDOM_API_KEY=(see *Note)
```
*Note - This API key is used to generate a random string. Click [here to get your own API key.](https://accounts.random.org/create)

2. Connect to your database and run the migration files.

After installing postgres you will need to create a database called 'rest_api_calculator', you can then run the following command to see if you have successfully connected to the new database.
```
npm start
```
You should see 'Connection has been established successfully.' logged in the console. If you do you can proceed to run the migration files and create the correct tables in the database.  The migrations and models have been included for you so you will only need to run the command
```
npx sequelize-cli db:migrate
```

The back end is no ready to go, click here to view instructions for downloading and setting up the front end of this project. [link to front-end repo](https://github.com/trevor2355/rest-api-calculator-vue)

## Deployment

I deployed this project using Docker and AWS. 

## Built With
* Node.js
* Express
* Passport.js
* jsonwebtoken
* Sequelize
* PostgreSQL
* Docker
* AWS (Deployment)

## License
MIT license [here](https://github.com/trevor2355/j-stats/blob/master/LICENSE)
