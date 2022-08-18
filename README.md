# task-manager

Simple application for organize Tasks. Every task is declared as completed or non-completed. 
Help Users to see pending tasks. User and Tasks stored in a MongoDB. JWT Authentication.

# To run the application 
	
	docker-compose up

# Folder Structure

	├── task-manager/
	 ├── controllers/
	     ├── tasks.js
	     ├── users.js
	 ├── models/
	     ├── v1/
	         ├── users.js
		 ├── tasks.js
	 ├── routes/
	     ├── article.routes.js
	 ├── services/
	     ├── user_services.js
	     ├── task_services.js
	├── middleware/
	     ├── auth.js
	├── index.js

# Future Work

	1. Complete Role Usage (Admin, User).
	2. JWT Refresh Tokens.
	3. React.js GUI.
