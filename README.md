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

Every User has one or more Tasks.

There are two kind of Users. Simple User & Admin User. Admin have access to all recourses and can make changes in other accounts. Simple User just use his recourses. A User gets a JWT token after Login or Sign Up.  

### User Rescourses

```bash
	# Create User
	POST /users

	# Login
	POST /users/login

	# Logout
	POST /users/logout

	# Get my Profile
	GET /users/me

	# Get all Users (Admin Resource)
	GET /users

	# Get User By Id (Admin Function)
	GET /users/:id

	# Update my Profile
	PATCH /users/me

	# Update a User (Admin Function)
	PATCH /users/:id

	# Delete my Account
	DELETE /users/me

	# Delete Users Account (Admin Function)
	DELETE /users/:id
```

### Task Resources

```bash
	# Create a Task
	POST /tasks

	# GET my Tasks
	GET /tasks/me

	# GET All Tasks from All Users (Admin Function)
	GET /tasks

	# GET Task By ID (Admin Function)
	GET /tasks

	# UPDATE my Tasks
	PATCH /tasks/me/:id

	# UPDATE any Task (Admin function)
	PATCH /tasks/:id

	# DELETE my Tasks
	DELETE /tasks/me:id

	# DELETE any task (Admin Function)
	DELETE /tasks/:id
```


### Models

---

**User Model** is the following.

```javascript
{	
	name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date, 
        default: Date.now
    },
    role: {
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    }
}
```

For **create an Account** the HTTP Request is the following.

_Example_:

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

**Task Model** is the following.

```javascript
{	
	description :{
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    date : {
        type: Date, 
        default: Date.now
    }
}
```

For **create a Task** the HTTP Request is the following.

_Example_:

```http
POST /tasks HTTP/1.1
Host: localhost:3000
Authorization: Bearer **PUT your token here**
Content-Type: application/json
Content-Length: 37

{
    "description": "Another test",
	"completed": false
}
```

# Future Work :dart:

	1. JWT Refresh Tokens.
	2. React.js GUI.
	3. Swagger API.
	4. Create Docker Image.
