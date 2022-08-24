# task-manager

Task manager application for planning, organize and track your tasks.

## Build With

* Node.js
* Express
* MongoDB
* Jest

## Getting Started 

1. Clone repository	
```bash
	$ git clone https://github.com/AposLaz/task-manager.git
		
	$ cd task-manager

	# Remove current origin repo
	$ git remote remove origin  
```
2. Start Application using Docker :whale2: https://www.docker.com/

	```
	docker-compose up
	```

## API 

Use the instructions for enjoy the application.

There are resources for user and tasks.

### User Rescourses

```python
	
	# Create User
	/users

	# Login
	/users/login

	# Logout
	/users/logout

	# Get user profile
	/users/me

	# Get all Users (Admin Resource)
	/
```

Every User has one or more Tasks.

There are two kind of Users. Simple User & Admin User. Admin have access to all recourses and can make changes in other accounts. Simple User just use his recourses. A User gets a JWT token after Login or Sign Up.  

### User routes

First need to **create an Account**.

HTTP Request is the following.

```http
POST /users HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 128

{
    "name": "testName",
    "age": 10,
    "email":"testEmail@gmail.com",
    "password": "test",
    "role": "ADMIN" 	/or USER
}
```

**Login in**.

```

```


# Future Work :dart:

	1. JWT Refresh Tokens.
	2. React.js GUI.
	3. Swagger API.
	4. Create Docker Image.
