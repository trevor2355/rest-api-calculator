# rest-api-calculator-backend
This is a simple web platform that provides simple calculator functionality (addition, subtraction, multiplication, division, square root, and also random string generation) to a user.  Each functionality has a specific cost that is recorded by the platform and can be managed by an admin user.

# API Instructions

This API is for registered users and admin users, you will need a valid account in order to obtain a token that will give you access to the API.

## Getting started
All requests should be made to the following url http://ec2-54-183-247-150.us-west-1.compute.amazonaws.com/, the endpoints that are available are specified below in the documentation.
## Getting your valid json web token

To get a valid json web token you will need to send the following request:

### Endpoint: /login

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

## Endpoints available to Users


### Get all Services
#### Endpoint: /api/services

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

### Get specific Service
#### Endpoint: /api/services/:serviceId

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

### Get specific User
#### Endpoint: /api/users/:userId

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

### Get all User Records
#### Endpoint: /api/users/:userId/records

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

## Endpoints available to Admin Users

### Get all Records
#### Endpoint: /api/records

Request:
```
GET /api/records HTTP/1.1
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

### Get specific Record
#### Endpoint: /api/records/:recordId

Request:
```
GET /api/records/4 HTTP/1.1
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
        "id": 4,
        "uuid": "30fe3f20-af4e-11ea-8e75-c18624ae91c6",
        "service_id": 1,
        "user_id": 4,
        "cost": 2,
        "user_balance": 398,
        "service_response": "644",
        "date": "2020-06-15T21:21:35.174Z",
        "createdAt": "2020-06-15T21:21:35.250Z",
        "updatedAt": "2020-06-15T21:21:35.250Z"
    }
]
```

### Add a Record
#### Endpoint: /api/records

Request:
```
POST /api/records HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
{
	"service_id": 4,
	"user_id": 3,
	"cost": 5,
	"user_balance": 450,
	"service_response": "22",
	"date": "2020-06-15T21:21:35.174Z"
}
```
Successful Response: 
```
HTTP/1.1 201 CREATED
Content-Type: application/json
Body:
{
    "uuid": "7c53b1d0-af6c-11ea-bc6d-5b00c75b9df0",
    "id": 32,
    "service_id": 4,
    "user_id": 3,
    "cost": 5,
    "user_balance": 450,
    "service_response": "22",
    "date": "2020-06-15T21:21:35.174Z",
    "updatedAt": "2020-06-16T00:58:26.544Z",
    "createdAt": "2020-06-16T00:58:26.544Z"
}
```

### Update Record
#### Endpoint: /api/records/:recordId

Request:
```
PUT /api/records/4 HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
{
	"service_id": 6,
	"cost": 7
}*
```
*Note that you can include 1 or all of the following key value pairs in the body of the request (service_id, user_id, cost, user_balance, service_response, date).

Successful Response: 
```
HTTP/1.1 200 OK
Content-Type: application/json
Body:
[
    1
]
```

### Delete Record
#### Endpoint: /api/records/:recordId

Request:
```
DELETE /api/records/32 HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
```
*Note all resources are soft deleted

Successful Response: 
```
HTTP/1.1 200 OK
Content-Type: application/json
Body: 1
```


## Services

### Get all Services
#### Endpoint: /api/services

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

### Get specific Service
#### Endpoint: /api/services/:serviceId

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

### Add a Service
#### Endpoint: /api/services

Request:
```
POST /api/services HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
{
	"type": "square",
	"cost": 8,
	"status": "active"
}
```
Successful Response: 
```
HTTP/1.1 201 CREATED
Content-Type: application/json
Body:
{
    "uuid": "606d54f0-af6f-11ea-bc6d-5b00c75b9df0",
    "id": 11,
    "type": "square",
    "cost": 8,
    "status": "active",
    "updatedAt": "2020-06-16T01:19:08.223Z",
    "createdAt": "2020-06-16T01:19:08.223Z"
}
```

### Update Service
#### Endpoint: /api/services/:serviceId

Request:
```
PUT /api/records/11 HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
{
	"cost": 9,
	"status": "beta"
}*
```
*Note that you can include 1 or all of the following key value pairs in the body of the request (type, cost, status... active, beta, or inactive... )

Successful Response: 
```
HTTP/1.1 200 OK
Content-Type: application/json
Body:
[
    1
]
```

### Delete Record
#### Endpoint: /api/services/:serviceId

Request:
```
DELETE /api/services/11 HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
```
*Note all resources are soft deleted

Successful Response: 
```
HTTP/1.1 200 OK
Content-Type: application/json
Body: 1
```

## Users

### Get all Users
#### Endpoint: /api/users

Request:
```
GET /api/users HTTP/1.1
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
        "id": 4,
        "uuid": "25700670-af4e-11ea-8e75-c18624ae91c6",
        "username": "user@gmail.com",
        "role": "user",
        "status": "active",
        "balance": 222,
        "createdAt": "2020-06-15T21:21:15.863Z",
        "updatedAt": "2020-06-15T21:23:17.089Z"
    },
    {
        "id": 2,
        "uuid": "bab760a0-af3c-11ea-9510-ebe677026827",
        "username": "doug@gmail.com",
        "role": "user",
        "status": "active",
        "balance": 300,
        "createdAt": "2020-06-15T19:16:35.374Z",
        "updatedAt": "2020-06-15T21:28:16.273Z"
    }
]
```

### Get specific User
#### Endpoint: /api/users/:userId

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

### Get all User Records
#### Endpoint: /api/users/:userId/records

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
	
### Add a User
#### Endpoint: /api/users

Request:
```
POST /api/users HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
{
	"username": "user2@gmail.com",
	"password": "secret",
	"role": "user",
	"status": "active",
	"balance": "200"
}
```
Successful Response: 
```
HTTP/1.1 201 CREATED
Content-Type: application/json
Body:
{
    "uuid": "874a9a40-af71-11ea-bc6d-5b00c75b9df0",
    "id": 6,
    "username": "user2@gmail.com",
    "role": "user",
    "status": "active",
    "balance": 200,
    "updatedAt": "2020-06-16T01:34:32.420Z",
    "createdAt": "2020-06-16T01:34:32.420Z"
}
```

### Update Service
#### Endpoint: /api/users/:userId

Request:
```
PUT /api/users/6 HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
{
	"role": "admin",
	"balance": "500"
}*
```
*Note that you can include 1 or all of the following key value pairs in the body of the request (username, balance, role... admin or user... ,  status... active, trail, or inactive... )

Successful Response: 
```
HTTP/1.1 200 OK
Content-Type: application/json
Body:
[
    1
]
```

### Delete Record
#### Endpoint: /api/users/:userId

Request:
```
DELETE /api/users/6 HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: (JSON Web Token)
Body:
```
*Note all resources are soft deleted

Successful Response: 
```
HTTP/1.1 200 OK
Content-Type: application/json
Body: 1
```

### Filtering

Filtering is available for use on the following endpoints using the GET method
* /api/records
* /api/services
* /api/users
* /api/users/:userId/records

To use a filter you must use the searchTerm query Parameter. 
By default the filter will search the following fields for each respective entity.

#### Records
1. id
2. uuid
3. service_id
4. user_id
5. cost
6. user_balance
7. service_response
8. date

#### Services
1. id
2. uuid
3. type
4. cost
5. status


#### Users
1. id
2. uuid
3. username
4. role
5. status
6. balance


#### Endpoint: /api/users?searchTerm=10

Request:
```
GET /api/users?searchTerm=10 HTTP/1.1
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
        "id": 2,
        "uuid": "bab760a0-af3c-11ea-9510-ebe677026827",
        "username": "doug@gmail.com",
        "role": "user",
        "status": "active",
        "balance": 300,
        "createdAt": "2020-06-15T19:16:35.374Z",
        "updatedAt": "2020-06-15T21:28:16.273Z"
    },
    {
        "id": 7,
        "uuid": "bb0a9830-afd5-11ea-96ff-0710a0b5d05c",
        "username": "hungryhippo@yahoo.com",
        "role": "user",
        "status": "active",
        "balance": 400,
        "createdAt": "2020-06-16T13:31:48.918Z",
        "updatedAt": "2020-06-16T13:31:48.918Z"
    }
]
```

You can also search one or more fields with each filter by using the 'filterField' query parameters, if you would like to filter by only one field enter the name of the field into the 'filterField1' query parameter.


#### Endpoint: /api/users?searchTerm=10&filterField1=balance

Request:
```
GET /api/users?searchTerm=300&filterField1=balance HTTP/1.1
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
        "id": 2,
        "uuid": "bab760a0-af3c-11ea-9510-ebe677026827",
        "username": "doug@gmail.com",
        "role": "user",
        "status": "active",
        "balance": 300,
        "createdAt": "2020-06-15T19:16:35.374Z",
        "updatedAt": "2020-06-15T21:28:16.273Z"
    }
]
```

If you would like to filter by 2 or more fields enter the second field into 'filterField2', etc... 

#### Endpoint: /api/records?searchTerm=50&filterField1=uuid&filterField2=user_balance&filterField3=service_response

Request:
```
GET /api/records?searchTerm=50&filterField1=uuid&filterField2=user_balance&filterField3=service_response HTTP/1.1
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
        "id": 3,
        "uuid": "65607650-af4b-11ea-8e75-c18624ae91c6",
        "service_id": 6,
        "user_id": 2,
        "cost": 10,
        "user_balance": 183,
        "service_response": "ixqqqymcfon",
        "date": "2020-06-15T21:01:34.597Z",
        "createdAt": "2020-06-15T21:01:34.645Z",
        "updatedAt": "2020-06-15T21:16:49.009Z"
    },
    {
        "id": 8,
        "uuid": "3af1b390-af4e-11ea-8e75-c18624ae91c6",
        "service_id": 5,
        "user_id": 4,
        "cost": 7,
        "user_balance": 381,
        "service_response": "9.486832980505138",
        "date": "2020-06-15T21:21:51.894Z",
        "createdAt": "2020-06-15T21:21:51.945Z",
        "updatedAt": "2020-06-15T21:21:51.945Z"
    },
    {
        "id": 4,
        "uuid": "30fe3f20-af4e-11ea-8e75-c18624ae91c6",
        "service_id": 4,
        "user_id": 4,
        "cost": 5,
        "user_balance": 450,
        "service_response": "644",
        "date": "2020-06-15T21:21:35.174Z",
        "createdAt": "2020-06-15T21:21:35.250Z",
        "updatedAt": "2020-06-16T01:04:43.797Z"
    }
]
```

Any filterField parameter that is not in subsequent order will be ignored, it will not however result in a failed request, additionally any filterField query parameter that does not exist as a field of the given entity will also be ignored.

#### Endpoint: /api/records?searchTerm=50&filterField1=uuid&filterField2=user_balance&filterField3=service_response

Request:
```
GET /api/records?searchTerm=50&filterField1=uuid&filterField3=service_response&filterField4=hippo HTTP/1.1
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
        "id": 4,
        "uuid": "30fe3f20-af4e-11ea-8e75-c18624ae91c6",
        "service_id": 4,
        "user_id": 4,
        "cost": 5,
        "user_balance": 450,
        "service_response": "644",
        "date": "2020-06-15T21:21:35.174Z",
        "createdAt": "2020-06-15T21:21:35.250Z",
        "updatedAt": "2020-06-16T01:04:43.797Z"
    }
]
```

### Pagination

Pagination is available by using the query parameters page and pageSize.  The page query parameter will allow you to choose which page of data you would like to request from the API. (*Note that pages are 0 indexed, in order to get the first page of data you will need to pass in 0).*  The pageSize query parameter will allow you to specify how many records appear on each request that is sent.  All records are sorted in the datatables by updatedOn dates, from most recent to least recent.  
*The default value of page = 0 and pageSize = 200*

#### Endpoint: /api/records?&page=2&pageSize=3

Request:
```
GET /api/records?&page=2&pageSize=3 HTTP/1.1
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
        "id": 8,
        "uuid": "3af1b390-af4e-11ea-8e75-c18624ae91c6",
        "service_id": 5,
        "user_id": 4,
        "cost": 7,
        "user_balance": 381,
        "service_response": "9.486832980505138",
        "date": "2020-06-15T21:21:51.894Z",
        "createdAt": "2020-06-15T21:21:51.945Z",
        "updatedAt": "2020-06-15T21:21:51.945Z"
    },
    {
        "id": 9,
        "uuid": "3e62e580-af4e-11ea-8e75-c18624ae91c6",
        "service_id": 5,
        "user_id": 4,
        "cost": 7,
        "user_balance": 374,
        "service_response": "9.38083151964686",
        "date": "2020-06-15T21:21:57.667Z",
        "createdAt": "2020-06-15T21:21:57.720Z",
        "updatedAt": "2020-06-15T21:21:57.720Z"
    },
    {
        "id": 10,
        "uuid": "41e4b940-af4e-11ea-8e75-c18624ae91c6",
        "service_id": 5,
        "user_id": 4,
        "cost": 7,
        "user_balance": 367,
        "service_response": "9",
        "date": "2020-06-15T21:22:03.541Z",
        "createdAt": "2020-06-15T21:22:03.604Z",
        "updatedAt": "2020-06-15T21:22:03.604Z"
    }
]
```

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

3. Run the following command
```
npm run newKey
```
This command will create a public and private key file in the root of your project, you will need these files to validate JSON Web Tokens.

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
