---
name: auth-security
description: Use this skill whenever implementing authentication, authorization, session handling, password storage, or reviewing any code path that touches user credentials, permissions, or sensitive data. Trigger this proactively on every login/signup/permissions feature, any endpoint handling user input, and whenever the user mentions "auth", "login", "security", "roles", "permissions", or "secure this", even without an explicit security ask.
---

# Authentication, Authorization & Web Security

## Mission
Build auth and security into the design from the start — most breaches come from missing basics (unhashed passwords, missing authz checks, unvalidated input), not exotic zero-days. Treat this checklist as required, not optional hardening.

## Authentication
- **Never store plaintext passwords.** Hash with `bcrypt`, `argon2id`, or `scrypt` — never MD5/SHA-1/SHA-256 alone (too fast, brute-forceable). Argon2id is the current best default when available.
- **Sessions vs. tokens:**
  - Server-rendered/traditional apps: signed, `HttpOnly`, `Secure`, `SameSite=Lax` (or `Strict`) session cookies, session data stored server-side (or in a signed/encrypted cookie if stateless).
  - SPA/API/mobile clients: short-lived JWT access tokens (5-15 min) + a long-lived, rotating refresh token stored in an `HttpOnly` cookie (not `localStorage` — JS-readable storage is vulnerable to XSS token theft).
- **Never put sensitive data in a JWT payload** — it's signed, not encrypted; anyone can base64-decode and read it.
- Support MFA (TOTP at minimum) for accounts with elevated privileges or sensitive data access.
- Rate-limit and lock out after repeated failed login attempts; use generic error messages ("Invalid email or password") that don't reveal whether the email exists.
- Password reset tokens: single-use, short expiry (15-60 min), invalidate all sessions on password change.

## Authorization
- **Check authorization on every request, server-side — never trust a hidden frontend button or a client-side role check as the actual control.** The frontend hides the button; the backend enforces the rule.
- Prefer explicit permission checks over relying on obscurity (unguessable IDs alone are not access control — this is "insecure direct object reference," OWASP A01).
- Model roles/permissions explicitly (RBAC: role → permissions, or ABAC for finer-grained rules) rather than scattering `if (user.email === 'admin@...')` checks through the codebase.
- Multi-tenant apps: every query touching tenant-scoped data must filter by tenant ID at the query level — don't rely on the application "remembering" to filter; enforce it at the data-access layer (a scoped repository, row-level security in Postgres, etc.).

## OWASP Top 10 — apply this checklist to every feature
1. **Broken Access Control** — verify every endpoint checks both authentication AND authorization for the specific resource requested (not just "is logged in").
2. **Cryptographic Failures** — TLS everywhere, hash passwords properly (above), encrypt sensitive data at rest, never roll your own crypto.
3. **Injection** — use parameterized queries/prepared statements or an ORM's query builder, never string-concatenated SQL. Same principle for NoSQL, LDAP, OS command injection: never interpolate untrusted input into a query/command string.
4. **Insecure Design** — threat-model sensitive flows (payments, account recovery, admin actions) before writing code, not after.
5. **Security Misconfiguration** — no default credentials, no verbose stack traces/debug mode in production, disable directory listing, keep dependencies patched.
6. **Vulnerable Components** — run dependency vulnerability scans (`npm audit`, `pip-audit`, Dependabot/Snyk) regularly, not just at project start.
7. **Auth & Session Failures** — covered above.
8. **Data Integrity Failures** — verify signatures/checksums on auto-updates and CI/CD artifacts; don't deserialize untrusted data without validation.
9. **Logging & Monitoring Failures** — log auth events (login, failed login, password change, permission change) without logging secrets/passwords/tokens themselves.
10. **SSRF** — validate and allowlist any server-side outbound request built from user-supplied URLs (webhooks, image-fetch-by-URL features are common SSRF vectors).

## Input handling & output encoding
- Validate all input server-side (type, length, format, range) regardless of client-side validation.
- Encode output for its destination context: HTML-escape for HTML body, attribute-escape for HTML attributes, JS-string-escape for inline scripts (better: avoid inline scripts — use CSP). This is what prevents XSS.
- Use a template engine/framework that auto-escapes by default (React, Vue, Django templates, Rails ERB) — and never bypass it (`dangerouslySetInnerHTML`, `v-html`, `|safe`) with unsanitized user content.
- File uploads: validate actual file type (not just extension/MIME header, which can be spoofed), scan for malware where relevant, store outside the webroot or in object storage with restricted execution permissions, and enforce size limits.

## Secure headers & transport
- `Content-Security-Policy` restricting script/style sources.
- `Strict-Transport-Security` (HSTS) to force HTTPS.
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (or CSP `frame-ancestors`), `Referrer-Policy: strict-origin-when-cross-origin`.
- CORS: allowlist specific origins explicitly — never `Access-Control-Allow-Origin: *` on any endpoint that handles authenticated requests/cookies.
- CSRF protection (anti-CSRF tokens or `SameSite` cookies) on any state-changing request from a browser session.

## Secrets management
- No secrets (API keys, DB credentials, private keys) in source control, ever — use environment variables or a secrets manager (Vault, AWS/GCP Secrets Manager, Doppler).
- Rotate secrets on suspected exposure; different secrets per environment (dev/staging/prod).
- `.env` files in `.gitignore` from the start of the project, with a checked-in `.env.example` documenting required keys without values.

## Anti-patterns to flag and fix
- Any raw SQL built via string concatenation/interpolation with user input.
- Authorization checks that only exist in the frontend.
- JWTs stored in `localStorage`/`sessionStorage` for anything security-sensitive.
- Passwords, tokens, or PII appearing in logs or error messages.
- `SELECT *`-style over-fetching of user data returned directly to the client, leaking fields like password hashes or internal flags.
- Wildcard CORS combined with credentialed requests.
