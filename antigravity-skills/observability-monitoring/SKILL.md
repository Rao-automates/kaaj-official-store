---
name: observability-monitoring
description: Use this skill whenever adding logging, error tracking, metrics, alerting, or debugging production issues in any web application. Trigger this whenever the user asks to "add logging", "set up monitoring", "track errors", "add alerts", or when shipping any production feature — observability should be built in, not bolted on after the first outage.
---

# Observability & Monitoring

## Mission
Make it possible to answer "what broke, for whom, and why" within minutes of an incident starting — not by SSH-ing into a server and grepping logs, but from a dashboard with the right signal already surfaced.

## The three pillars
1. **Logs** — discrete events with context, for debugging specific occurrences.
2. **Metrics** — aggregated numeric signals over time (request rate, error rate, latency percentiles), for spotting trends and triggering alerts.
3. **Traces** — the path of a single request across services, for understanding where time/errors occur in a distributed system.

## Logging
- **Structured logging (JSON), not free-text.** `{"level":"error","msg":"payment failed","userId":"...","orderId":"...","err":"..."}` — not `console.log("Payment failed for user " + userId)`. Structured logs are queryable/filterable at scale; free-text logs are not.
- Log levels used consistently: `debug` (dev-only detail), `info` (normal operational events — request handled, job completed), `warn` (unexpected but recovered), `error` (failed operation needing attention), `fatal`/`critical` (service-impacting).
- **Never log secrets**: passwords, tokens, full credit card numbers, or other PII beyond what's needed for debugging — redact/mask before logging (see `auth-security`).
- Include a correlation/request ID on every log line for a given request, propagated across services, so a single user-reported issue can be traced through the whole call chain.
- Log the *why*, not just the *what*: "Rate limit exceeded (5 req/min, user tier: free)" is more actionable than "Rate limit exceeded."

## Error tracking
- Use a dedicated error tracking tool (Sentry or equivalent) that captures stack traces, breadcrumbs, user/session context, and groups recurring errors — not just server logs.
- Capture both frontend (unhandled JS exceptions, unhandled promise rejections) and backend errors in the same or linked systems, so a single user-facing bug can be traced end-to-end.
- Every caught exception that's swallowed (`catch {}` with no rethrow/log) is a blind spot — flag empty catch blocks as a code smell, always at least log what was caught.
- Set up alerting on new/spiking error types, not just total error count — a brand-new error type appearing is often more urgent than a 5% bump in a known, already-triaged error.

## Metrics & dashboards
- **RED method for services**: Rate (requests/sec), Errors (error rate), Duration (latency, tracked as percentiles — p50/p95/p99, never just average, which hides tail latency that real users feel).
- **USE method for resources**: Utilization, Saturation, Errors (CPU, memory, disk, connection pool usage) — catches resource exhaustion before it causes an outage.
- Business metrics alongside technical ones where relevant (signups/min, checkout completion rate) — a technically "healthy" service with a broken checkout button is still an incident.
- Dashboards should answer "is the system healthy right now" at a glance — a wall of 40 ungrouped graphs is not a dashboard, it's a haystack.

## Alerting
- Alert on symptoms that matter to users (error rate spike, latency degradation, service down) — not on every possible internal metric fluctuation, which trains people to ignore alerts ("alert fatigue").
- Every alert should be actionable: if firing it doesn't lead to a clear next step, it shouldn't page anyone — downgrade it to a dashboard-only metric.
- Include a link to the relevant dashboard/runbook in the alert itself — don't make the on-call person hunt for context at 3am.
- Set alert thresholds based on actual historical baselines, not arbitrary round numbers.

## Distributed tracing (for multi-service/microservice systems)
- Instrument with OpenTelemetry (vendor-neutral) where possible, exporting to whatever backend (Jaeger, Datadog, Honeycomb, etc.) the team uses.
- Propagate trace context across service boundaries (HTTP headers, message queue metadata) so a single request's full path is reconstructable.

## Checklist for shipping a new feature
- [ ] Key user actions/business events are logged with structured context.
- [ ] Errors are captured by the error tracker with enough context to reproduce (user ID, input, request ID) without needing to log secrets.
- [ ] New failure modes introduced by this feature have a corresponding metric or alert, not just a hope that logs will be checked manually.
- [ ] A dashboard or existing dashboard section reflects this feature's health.

## Anti-patterns to flag and fix
- `console.log`/print-statement debugging left in production code paths instead of structured logging.
- Swallowed exceptions (`catch (e) {}`) with no logging.
- Alerting on raw counts without context (e.g. "500 errors > 10" with no relation to traffic volume, so it never fires at low traffic and always fires at high traffic).
- Logging full request/response bodies indiscriminately, including sensitive fields.
- No correlation ID, making it impossible to trace one user's request across services/logs.
- Dashboards nobody looks at because they don't map to an actual on-call decision.
