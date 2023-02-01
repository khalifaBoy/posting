# Posting
 A Minimal REST API using Express and Node


###### FOR LOCAL DEVELOPMENT

## Installing

npm install

## Configuration

1.Set a PORT  ./index.js  [PORT]

2.Set a TOKEN  ./controllers/auth.js   ./middleware/is_auth.js  [original_token]

3.Set a DATABASE  ./utils/database.js  [DB_config]

# Start

npm start


## Features

>>> REQUEST_PARCING using BODY-PARSER 

>>>>>>>> VALIDATION using EXPRESS-VALIDATOR 

>>>>>>>>>>>>>>>> HASHING using BCRYPTJS 

>>>>>>>> AUTHORIZATION using JSON-WEB-TOKEN 

>>> DATABASE using MY-SQL 


### End_Points


<HOST_URL>/feed/posts

## Type < GET > 

##      < AUTHORIZATION > < No >

> 1. success case - 200

> 2. failure case - 404 , when the database has no posts

> 3. other cases - 500 others


////////////////////////////////////////////////////////////////////////////////////////


<HOST_URL>/user/post

## Type < POST > 

##      < AUTHORIZATION > < Bearer token >

##      < CONTENT_TYPE > < application/json > 

##      < CONTENT_Format > < title: String, subject: String >

> 1. success case - 201 Resource Created

> 2. failure case - 400 validation failed , when <<title> | <subject>> has a length
> 2. shorter than 5

> 3. other cases - 500

> 4. failure case - 401 Unauthorized , when authorization is not used

> 5. failure case - 402 not-authorized , when authorization is used and is correct
> 5. but still fails

> 6. failure case - 500 not-authorized , when authorization is used and is in-correct
> 6. or expired


////////////////////////////////////////////////////////////////////////////////////////


<HOST_URL>/user/edit/:postID 

## Type < PUT > 

##      < AUTHORIZATION > < Bearer token >

##      < CONTENT_TYPE > < application/json > < title: String, subject: String >

> 1. success case - 200

> 2. failure case - 401 Unauthorization , when authorization is not used

> 3. failure case - 400 validation failed , when <<title> | <subject>> has a length

> 3. shorter than 5

> 4. failure case - 404 Resource Not Found , when the resourse with requested id
> 4. is not present

> 5. other cases - 500 

> 6. failure case - 402 not-authorized , when authorization is used and is correct
> 6. but still fails

> 7. failure case - 500 not-authorized , when authorization is used and is in-correct
> 7. or expired


////////////////////////////////////////////////////////////////////////////////////////


<HOST_URL>/user/delete/:postID 

## Type < DELETE >

##      < AUTHORIZATION > < Bearer token >

> 1. success case - 200

> 2. failure case - 401 Unauthorization , when authorization is not used

> 3. failure case - 404 Resource Not Found , when the resourse with requested id 
> 3. is not present

> 4. other cases - 500 

> 5. failure case - 402 not-authorized , when authorization is used and is correct
> 5. but still fails

> 6. failure case - 500 not-authorized , when authorization is used and is in-correct
> 6. or expired


////////////////////////////////////////////////////////////////////////////////////////


<HOST_URL>/auth/signup 

## Type < PUT >

##      < AUTHORIZATION > < No >

##      < CONTENT_TYPE > < application/json > 

##      < name: String, email: String, password: String >

> 1. success case - 201 Resource Created

> 2. failure case - 400 validation failed , when either <name> is empty, <password>
> 2. has a length shorter than 5 or <email> is not of type email

> 3. failure case - 400 Forbidden , when the specifed email already exits.

> 4. other cases - 500


////////////////////////////////////////////////////////////////////////////////////////


<HOST_URL>/auth/login 

## Type < POST >

##      < AUTHORIZATION > < No >

##      < CONTENT_TYPE > < application/json > < email: String, password: String >


> 1. success case - 200

> 2. failure case - 401 Unauthorization , when <<email> | <password>> is/are not valid

> 3. other cases - 500


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////