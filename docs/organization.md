# Organization API Documentation

## Overview

The Organization API provides endpoints to interact with organization data. It allows clients to retrieve all organizations and specific organizations by ID.

## Endpoints

### 1. Get All Organizations

- **Endpoint**: `/organizations`
- **Method**: `GET`
- **Description**: Retrieves a list of all organizations.
- **Headers**:
  - `Authorization`: `Bearer your-token`
- **Response**:
  - **Status**: `200 OK`
  - **Body**: Array of organization objects.
  - **Example**:
    ```json
    {
      "success": true,
      "data": [
        {
          "organization_id": 1,
          "name": "Organization Name",
          "slug": "organization-slug",
          "url": "https://organization.com",
          // other fields...
        }
      ]
    }
    ```

### 2. Get Organization by ID

- **Endpoint**: `/organizations/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific organization by its ID.
- **Headers**:
  - `Authorization`: `Bearer your-token`
- **Parameters**:
  - `id`: The ID of the organization to retrieve.
- **Response**:
  - **Status**: `200 OK`
  - **Body**: Organization object.
  - **Example**:
    ```json
    {
      "success": true,
      "data": {
        "organization_id": 1,
        "name": "Organization Name",
        "slug": "organization-slug",
        "url": "https://organization.com",
        // other fields...
      }
    }
    ```

## Notes

- Ensure that all requests requiring authentication include the `Authorization` header with a valid token.
- Validate all input data to prevent errors and ensure data integrity. 