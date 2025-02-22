# TWAP API Documentation

## Overview

The TWAP (Time-Weighted Average Price) API provides endpoints to retrieve TWAP data for different market accounts.

## Endpoints

### 1. Get TWAP by Market Account

- **Endpoint**: `/twap/:marketAcct`
- **Method**: `GET`
- **Description**: Retrieves TWAP data for a specific market account.
- **Headers**:
  - `Authorization`: `Bearer your-token`
- **Query Parameters**:
  - `limit`: The maximum number of records to return (optional, default is 100, max is 5000).
  - `cursor`: A timestamp to paginate results (optional).
- **Response**:
  - **Status**: `200 OK`
  - **Body**: Array of TWAP objects.
  - **Example**:
    ```json
    {
      "success": true,
      "data": {
        "twap": [
          {
            "interv": "2023-01-01T00:00:00Z",
            "token_amount": 1000,
            "market_acct": "market123",
            "bar_size": "1h"
          }
        ]
      }
    }
    ```

### 2. Get Latest TWAP by Market Account

- **Endpoint**: `/twap/:marketAcct/latest`
- **Method**: `GET`
- **Description**: Retrieves the latest TWAP data for a specific market account.
- **Headers**:
  - `Authorization`: `Bearer your-token`
- **Query Parameters**:
  - `limit`: The maximum number of records to return (optional, default is 100, max is 5000).
- **Response**:
  - **Status**: `200 OK`
  - **Body**: Array of latest TWAP objects.
  - **Example**:
    ```json
    {
      "success": true,
      "data": {
        "twap": [
          {
            "interv": "2023-01-01T00:00:00Z",
            "token_amount": 1000,
            "market_acct": "market123",
            "bar_size": "1h"
          }
        ]
      }
    }
    ```

## Notes

- Ensure that all requests requiring authentication include the `Authorization` header with a valid token.
- Validate all input data to prevent errors and ensure data integrity.
- The `cursor` parameter should be a valid ISO 8601 date string if used. 