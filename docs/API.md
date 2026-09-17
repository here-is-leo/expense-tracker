# API Contract v1

Base URL: `/api`

> **Status:** Draft — updated as the backend is built.

## Auth

### POST /auth/register

**Request:**
{ "email": "user@example.com", "displayName": "Ali", "password": "Secret123" }

**Response 201:**
{ "id": "uuid", "email": "user@example.com", "displayName": "Ali" }

**Errors:** 400 (validation), 409 (email exists)

### POST /auth/login

**Request:**
{ "email": "user@example.com", "password": "Secret123" }

**Response 200:**
{
  "accessToken": "eyJ...",
  "expiresAt": "2026-09-18T12:00:00Z",
  "user": { "id": "uuid", "email": "user@example.com", "displayName": "Ali" }
}

**Errors:** 400 (invalid credentials)## Transactions

All endpoints require `Authorization: Bearer <token>`.

### GET /transactions

Query params:
- `page` (default 1)
- `pageSize` (default 20, max 100)
- `type` (income | expense)
- `categoryId` (uuid)
- `from` (ISO date)
- `to` (ISO date)
- `search` (string, searches description)
- `sortBy` (date | amount)
- `sortDir` (asc | desc)

Response 200:
{
  "items": [
    {
      "id": "uuid",
      "type": "expense",
      "amount": 45.50,
      "categoryId": "uuid",
      "categoryName": "Food",
      "description": "Lunch",
      "transactionDate": "2026-09-17T10:00:00Z",
      "createdAt": "2026-09-17T10:05:00Z"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalCount": 47,
  "totalPages": 3
}

### GET /transactions/{id}
Response 200 / 404

### POST /transactions

Request:
{
  "type": "expense",
  "amount": 45.50,
  "categoryId": "uuid",
  "description": "Lunch",
  "transactionDate": "2026-09-17T10:00:00Z"
}

Response 201 + Location: /api/transactions/{id}
Errors: 400 (validation), 404 (category not found)

### PUT /transactions/{id}
Same body as POST. Response 200 / 404

### DELETE /transactions/{id}
Response 204 / 404

## Categories

### GET /categories
Requires Authorization: Bearer <token>.

Response 200:
[
  { "id": "uuid", "name": "Food", "type": "expense" },
  { "id": "uuid", "name": "Salary", "type": "income" }
]

## Dashboard

### GET /dashboard/summary
Requires Authorization: Bearer <token>.

Response 200:
{
  "totalIncome": 5000.00,
  "totalExpense": 2300.50,
  "balance": 2699.50,
  "byCategory": [
    { "categoryId": "uuid", "categoryName": "Food", "type": "expense", "total": 450.00, "count": 12 }
  ],
  "monthly": [
    { "year": 2026, "month": 9, "income": 5000.00, "expense": 2300.50 }
  ],
  "recentTransactions": []
}
