# User auth API

The User Authentication API provides functionalities for user registration, login, logout, profile management, password handling, and session management. This API is designed to facilitate secure and reliable authentication for your application. All API calls should be prefixed with `/user/`.

## Endpoint

1. User registraion
- Endpoint: `POST /register`
- Description: Handles registration for new users
- Request Body:
    ```
    {
        "userName": String,
        "email": String,
        "password": String,
    }
    ```