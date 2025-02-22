# Trades API Documentation

## Overview

The Trades API provides endpoints to interact with trade data, allowing clients to retrieve orders and their associated takes for specific market accounts.

## Endpoints

### 1. Get Trades by Market Account

- **Endpoint**: `/trades/:marketAcct`
- **Method**: `GET`
- **Description**: Retrieves orders and their associated takes for a specific market account.
- **Headers**:
  - `Authorization`: `Bearer your-token`
- **Query Parameters**:
  - `limit`: The maximum number of records to return (optional, default is 100).
  - `cursor`: A timestamp to paginate results (optional).
- **Response**:
  - **Status**: `200 OK`
  - **Body**: Array of order objects with associated takes.
  - **Example**:
    ```json
    [
      {
        "order": {
          "order_tx_sig": "order123",
          "market_acct": "market123",
          "actor_acct": "actor123",
          "side": "buy",
          "updated_at": "2023-01-01T00:00:00Z",
          "filled_base_amount": 1000,
          "quote_price": 123.45
        },
        "takes": [
          {
            "take_id": "take123",
            "base_amount": 500,
            "quote_price": 123.45,
            "taker_base_fee": 10,
            "maker_quote_fee": 5,
            "maker_order_tx_sig": "order456",
            "maker_base_fee": 2,
            "market_acct": "market123",
            "order_block": 100,
            "order_time": "2023-01-01T00:00:00Z",
            "taker_quote_fee": 3,
            "base_decimals": 8,
            "quote_decimals": 8
          }
        ]
      }
    ]
    ```

## Notes

- Ensure that all requests requiring authentication include the `Authorization` header with a valid token.
- The `cursor` parameter should be a valid ISO 8601 date string if used, which is the timestamp of the last order in the response.
- Validate all input data to prevent errors and ensure data integrity. 