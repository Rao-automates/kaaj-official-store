---
name: backend-api-design
description: Use this skill whenever designing, building, or reviewing a backend API — REST endpoints, GraphQL schemas, RPC services, request/response shapes, versioning, pagination, or error handling. Trigger this whenever the user asks to "build an API", "add an endpoint", "design a schema", or connect a frontend to a backend, even if they don't say "API design" explicitly.
---

# Backend API Design

## Mission
Design APIs that are predictable enough that a consumer can guess the next endpoint's shape correctly before reading the docs, and stable enough that clients don't break every time the backend evolves.

## REST design principles
1. **Resources are nouns, not verbs.** `/orders/{id}` not `/getOrder`. HTTP methods carry the verb: `GET` (read), `POST` (create), `PUT` (full replace), `PATCH` (partial update), `DELETE` (remove).
2. **Consistent pluralization and nesting.** `/users/{userId}/orders` for orders scoped to a user; `/orders/{id}` for direct access by ID. Don't mix singular/plural across the same API.
3. **Status codes mean something — use them correctly:**
   - `200` OK, `201` Created (with `Location` header), `204` No Content (successful, nothing to return)
   - `400` Bad Request (malformed/invalid input), `401` Unauthenticated, `403` Unauthorized/forbidden, `404` Not Found, `409` Conflict (e.g. duplicate, version conflict), `422` Unprocessable Entity (semantically invalid), `429` Too Many Requests
   - `500` Internal Server Error (never leak stack traces to the client), `503` Service Unavailable
4. **Errors follow a consistent shape** across the whole API, e.g.:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is not a valid address.",
    "field": "email",
    "requestId": "a1b2c3"
  }
}
```
A machine-readable `code` (for programmatic handling) plus a human-readable `message` (safe to show a user) plus a `requestId` (for support/debugging) — never just a raw string or stack trace.

## Pagination, filtering, sorting
- Default to cursor-based pagination for large/growing datasets (`?cursor=abc&limit=20`) — offset pagination (`?page=2&limit=20`) is fine for small, bounded lists but breaks under concurrent inserts/deletes.
- Return pagination metadata consistently: `{ data: [...], nextCursor: "...", hasMore: true }`.
- Support filtering/sorting via clear query params (`?status=active&sort=-createdAt`) rather than requiring a separate endpoint per filter combination.
- Cap `limit` server-side (e.g. max 100) regardless of what the client requests — never allow an unbounded query to take down the DB.

## Versioning
- Version from day one, even if v1 is the only version: URL versioning (`/v1/orders`) is the simplest and most cache/tool-friendly; header-based versioning is more "correct" but adds friction — pick URL versioning unless the team already has strong header-versioning tooling.
- Never make a breaking change to a live version. Adding new optional fields is non-breaking; removing/renaming a field or changing a type is breaking — ship as `/v2`.
- Deprecate with a timeline, a `Deprecation`/`Sunset` header, and advance notice — don't silently kill an old version.

## GraphQL (when it's the right fit — many-shaped queries, mobile clients avoiding overfetch)
- Design the schema around the domain model, not the frontend's current screen layout.
- Use pagination via the Relay cursor connection pattern (`edges`, `node`, `pageInfo { hasNextPage, endCursor }`) for consistency across clients/tools.
- Guard against overly deep/expensive queries (depth limiting, query cost analysis) — GraphQL's flexibility is also a DoS vector if unguarded.
- Use `DataLoader` (or equivalent batching) to avoid N+1 database queries when resolving nested fields.

## Request/response contract discipline
- [ ] Validate all input server-side regardless of client-side validation (never trust the client).
- [ ] Use a schema/contract tool (OpenAPI/Swagger for REST, SDL for GraphQL, or a shared TypeScript/protobuf schema) so the contract is documented and, ideally, generatable into client types.
- [ ] Idempotency: `PUT`/`DELETE` should be safely repeatable; for `POST` operations that create resources (payments, orders), support an `Idempotency-Key` header to prevent duplicate creation on retry.
- [ ] Timestamps in ISO 8601 UTC (`2026-08-07T12:00:00Z`) — never ambiguous local time or Unix seconds without documentation.
- [ ] Money as integer minor units (cents) or a decimal string — never as a floating-point number.

## Rate limiting & abuse protection
- Rate-limit by API key/user/IP with clear `429` responses and `Retry-After` header.
- Distinguish authenticated vs. unauthenticated limits; sensitive endpoints (login, password reset) get tighter limits than general reads.

## Documentation
- Every endpoint documents: purpose, auth requirement, request shape, response shape (success and error), and at least one example.
- Keep docs generated from the schema/contract where possible (OpenAPI → Swagger UI/Redoc) so they can't drift from the real implementation.

## Anti-patterns to flag and fix
- `GET` endpoints that mutate data (breaks caching, breaks browser prefetch/retry safety).
- Returning `200` with an error payload inside the body (breaks HTTP semantics and client error handling).
- Leaking internal implementation details (DB column names, stack traces, internal service names) in error responses.
- Unbounded list endpoints with no pagination that "work fine" until the table grows.
- Inconsistent naming (`user_id` in one endpoint, `userId` in another) within the same API.
- Auth checks done only in the frontend, absent from the backend.

Pair with `auth-security` for authentication/authorization on these endpoints, and `database-design` for how the data underneath is modeled.
