# Proposals API Documentation

## Overview

The Proposals API provides endpoints to interact with proposal data. It allows clients to retrieve all proposals and active proposals.

## Endpoints

### 1. Get All Proposals

- **Endpoint**: `/proposals`
- **Method**: `GET`
- **Description**: Retrieves a list of all proposals with their details.
- **Headers**:
  - `Authorization`: `Bearer your-token`
- **Response**:
  - **Status**: `200 OK`
  - **Body**: Array of proposal objects.
  - **Example**:
    ```json
    {
      "success": true,
      "data": {
        "proposals": [
          {
            "proposal_acct": "string",
            "proposal_num": 1,
            "title": "Proposal Title",
            "description": "Proposal Description",
            "status": "Pending",
            "created_at": "2023-01-01T00:00:00Z",
            // other fields...
          }
        ]
      }
    }
    ```

### 2. Get Active Proposals

- **Endpoint**: `/proposals/active`
- **Method**: `GET`
- **Description**: Retrieves a list of all active proposals.
- **Headers**:
  - `Authorization`: `Bearer your-token`
- **Response**:
  - **Status**: `200 OK`
  - **Body**: Array of active proposal objects.
  - **Example**:
    ```json
    {
      "success": true,
      "data": {
        "proposals": [
          {
            "proposal_acct": "string",
            "proposal_num": 1,
            "title": "Active Proposal Title",
            "description": "Active Proposal Description",
            "status": "Active",
            "created_at": "2023-01-01T00:00:00Z",
            // other fields...
          }
        ]
      }
    }
    ```

### 3. Get Proposal by ID

- **Endpoint**: `/proposals/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific proposal by its ID.
- **Parameters**:
  - `id`: The ID of the proposal to retrieve.
- **Response**:
  - **Status**: `200 OK`
  - **Body**: Proposal object.
  - **Example**:
    ```json
    {
      "proposal_acct": "string",
      "proposal_num": 1,
      "title": "Specific Proposal Title",
      "description": "Specific Proposal Description",
      "status": "Pending",
      "created_at": "2023-01-01T00:00:00Z",
      // other fields...
    }
    ```

### 4. Create a Proposal

- **Endpoint**: `/api/proposals`
- **Method**: `POST`
- **Description**: Creates a new proposal.
- **Request Body**:
  - **Content-Type**: `application/json`
  - **Body**:
    ```json
    {
      "title": "New Proposal Title",
      "description": "New Proposal Description",
      "proposer_acct": "string",
      // other fields...
    }
    ```
- **Response**:
  - **Status**: `201 Created`
  - **Body**: Created proposal object.

### 5. Update a Proposal

- **Endpoint**: `/api/proposals/:id`
- **Method**: `PUT`
- **Description**: Updates an existing proposal.
- **Parameters**:
  - `id`: The ID of the proposal to update.
- **Request Body**:
  - **Content-Type**: `application/json`
  - **Body**:
    ```json
    {
      "title": "Updated Proposal Title",
      "description": "Updated Proposal Description",
      // other fields...
    }
    ```
- **Response**:
  - **Status**: `200 OK`
  - **Body**: Updated proposal object.

### 6. Delete a Proposal

- **Endpoint**: `/api/proposals/:id`
- **Method**: `DELETE`
- **Description**: Deletes a proposal by its ID.
- **Parameters**:
  - `id`: The ID of the proposal to delete.
- **Response**:
  - **Status**: `204 No Content`

## Notes

- Ensure that all requests requiring authentication include the `Authorization` header with a valid token.
- Validate all input data to prevent errors and ensure data integrity. 