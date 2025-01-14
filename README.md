# User-Admin-App

## Description
A simple user administration application built with Node.js, Express.js, and MongoDB. It includes user registration, login, profile management, and role-based access control.


## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/sunilrathod098/User-Admin-App.git
    cd User-Admin-App
    ```
2. Install dependencies:
    ```sh
    npm install
    npm run dev - run commend
    ```

3. Start the application:
    ```sh
    npm run dev
    ```

## Usage
- Register a new user: `POST /api/user/register`
- Login a user: `POST /api/user/login`
- Get user profile: `GET /api/user/profile/:id`
- Admin access: `GET /api/user/admin`

## Project Structure
```sh
User-Admin-App/ 
│ ├── src/ 
│ ├── index.js 
│ ├── user.controller.js 
│ ├── user.middleware.js 
│ ├── user.model.js 
│ ├── user.routes.js 
├── .env 
├── package.json 
├── README.md
```


## Environment Variables
- [PORT]: The port on which the server runs.
- [MONGODB_URL]: The MongoDB connection URL.
- [JWT_SECRET_TOKEN]: The secret key for JWT.
- [JWT_SECRET_TOKEN_EXPIRY]: The expiry time for JWT.

## Features
- User registration and login
- Password hashing
- JWT authentication
- Role-based access control
- User profile management

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
