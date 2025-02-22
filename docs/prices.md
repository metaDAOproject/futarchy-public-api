# Prices API Documentation

## Overview

The Prices API provides endpoints to interact with price data. It allows clients to retrieve historical and latest price information for different market accounts.

## Endpoints

### 1. Get Prices by Market Account

- **Endpoint**: `/prices`
- **Method**: `GET`
- **Description**: Retrieves a list of prices for a specific market account.
- **Headers**:
  - `Authorization`: `Bearer your-token`
- **Query Parameters**:
  - `marketAcct`: The market account identifier (required).
  - `limit`: The maximum number of records to return (optional, default is 100 maximum is 5000).
  - `cursor`: A timestamp to paginate results (optional).
- **Response**:
  - **Status**: `200 OK`
  - **Body**: Array of price objects.
  - **Example**:
    ```json
    [
      {
        "interv": "2023-01-01T00:00:00Z",
        "price": 123.45,
        "base_amount": 1000,
        "quote_amount": 123450,
        "prices_type": "spot",
        "market_acct": "market123",
        "bar_size": "1h"
      }
    ]
    ```

### 2. Get Latest Prices

- **Endpoint**: `/prices/latest`
- **Method**: `GET`
- **Description**: Retrieves the latest prices for a specific market account.
- **Headers**:
  - `Authorization`: `Bearer your-token`
- **Query Parameters**:
  - `marketAcct`: The market account identifier (required).
  - `limit`: The maximum number of records to return (optional, default is 100 maximum is 5000).
- **Response**:
  - **Status**: `200 OK`
  - **Body**: Array of latest price objects.
  - **Example**:
    ```json
    [
      {
        "interv": "2023-01-01T00:00:00Z",
        "price": 123.45,
        "base_amount": 1000,
        "quote_amount": 123450,
        "prices_type": "spot",
        "market_acct": "market123",
        "bar_size": "1h"
      }
    ]
    ```

## Notes

- The `cursor` parameter should be a valid ISO 8601 date string if used, which is the timestamp of the last price in the response. 