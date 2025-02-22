# Authentication API Documentation

## Overview

The Authentication API provides endpoints for managing user authentication, including token generation and validation.

## Endpoints

### 1. Generate New Token

- **Endpoint**: `/auth`
- **Method**: `GET`
- **Description**: Generates a new authentication token for an admin user.
- **Headers**:
  - `Authorization`: `Bearer existing-admin-token`
- **Response**:
  - **Status**: `200 OK`
  - **Body**:
    ```json
    {
      "token": "new-jwt-token-string"
    }
    ```

## Using Authentication on Other Endpoints

To access protected endpoints, you must include the authentication token in the `Authorization` header of your HTTP requests. Here's how you can do it:

### Example Request with Authentication

When making a request to a protected endpoint, include the token as follows:

- **Headers**:
  - `Authorization`: `Bearer your-jwt-token`

### Example

```http
GET /proposals HTTP/1.1
Host: api.example.com
Authorization: Bearer your-jwt-token
```

### Notes

- Replace `your-jwt-token` with the actual token you received from the `/auth` endpoint.
- Ensure that the token is valid and has not expired.
- Always use HTTPS to protect the token from being intercepted during transmission.

## Notes

- Ensure that all requests requiring authentication include the `Authorization` header with a valid token.
- Tokens should be securely stored and transmitted over HTTPS to prevent interception.
- The `adminToken` is required for generating new tokens and should be kept confidential. 