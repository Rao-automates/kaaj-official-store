---
name: devops-cicd
description: Use this skill whenever setting up CI/CD pipelines, containerizing an app, configuring deployments, managing environments (dev/staging/prod), or setting up infrastructure-as-code. Trigger this whenever the user asks to "deploy this", "set up CI", "dockerize", "add a pipeline", or "set up staging/production", even without using DevOps terminology explicitly.
---

# DevOps, CI/CD & Deployment

## Mission
Make shipping boring: every change goes through the same automated path (build → test → deploy), environments are reproducible from code, and a bad deploy can be rolled back in minutes, not hours.

## CI pipeline (every PR, non-negotiable)
1. **Lint & type-check** — fail fast on style/type errors before running anything expensive.
2. **Unit + integration tests** — see `testing-strategy`; block merge on failure.
3. **Build** — confirm the production build actually succeeds (catches "works in dev, breaks in build" issues like missing env vars or import errors).
4. **Security scan** — dependency vulnerability scan (`npm audit`/`pip-audit`/Snyk/Dependabot) and, ideally, a static analysis security scan (SAST) on changed code.
5. **Preview deploy (when applicable)** — a per-PR preview environment (Vercel/Netlify previews, or an ephemeral namespace) lets reviewers see the actual change running, not just read the diff.

## CD pipeline
- **Environments**: dev → staging → production, each as close to identical in configuration as possible ("environment parity" — the 12-factor app principle). Config differs only via environment variables/secrets, never via different code paths (`if (env === 'prod')` branching in application logic is a smell).
- **Deployment strategy**: prefer zero-downtime strategies — rolling deploy, blue-green, or canary — over a hard cutover that drops requests.
- **Automatic rollback** on health-check failure post-deploy; keep the previous build/image readily redeployable (don't rely on `git revert` + rebuild as the only rollback path — that's slow under pressure).
- **Migrations run as a distinct, ordered step** before/alongside the new code deploys, following the expand-then-contract pattern from `database-design` so old and new code can coexist during rollout.

## Containerization (when using Docker)
- Multi-stage builds: a heavier build stage compiles/bundles, a minimal runtime stage (slim/distroless base image) actually ships — keeps images small and reduces attack surface.
- Don't run the container process as root; use a non-root user in the final image.
- Pin base image versions (not `latest`) for reproducible builds; rebuild deliberately to pick up patches, not accidentally.
- One process per container; use an orchestrator (Kubernetes, ECS, Docker Compose for local dev) to manage multi-service composition rather than cramming multiple processes into one container.
- `.dockerignore` mirrors `.gitignore` at minimum — don't bake `node_modules`, `.env`, or `.git` into the image.

## Infrastructure as Code
- Define infrastructure (servers, databases, networking, DNS) in code (Terraform, Pulumi, CloudFormation/CDK) — not manual console clicks that can't be reproduced or diffed.
- Store IaC in version control with PR review, same as application code; plan/diff output reviewed before apply on production infrastructure.
- Separate state per environment; never let a `terraform apply` (or equivalent) targeting staging accidentally touch production state.

## Configuration & secrets
- 12-factor config: all environment-specific values (DB URLs, API keys, feature flags) come from environment variables/secret managers, never hardcoded or committed.
- Secrets injected at deploy time via a secrets manager (Vault, AWS/GCP Secrets Manager, GitHub/GitLab CI secrets) — never checked into the repo, never baked into a Docker image layer.

## Observability hooks in the pipeline
- Deploys are tagged/versioned (git SHA or semantic version) and that identifier is visible in logs/error tracking so an incident can be traced back to the exact deploy that caused it.
- Post-deploy automated smoke test / health check before marking a rollout as successful in the orchestrator.

## Checklist for a new project's pipeline
- [ ] Every PR triggers lint, type-check, tests, and build automatically.
- [ ] Merge to main auto-deploys to staging; production deploy is either automatic-with-approval-gate or a deliberate one-click promotion of a known-good staging build (not a separate rebuild from source, which risks staging/prod drift).
- [ ] Rollback is a single command/click, not a manual multi-step recovery process.
- [ ] Secrets are never in the repo; `.env.example` documents required variables without values.
- [ ] Health check endpoint exists and is wired into the deployment/orchestrator's readiness checks.

## Anti-patterns to flag and fix
- Deploying by SSH-ing into a server and manually pulling/restarting — no audit trail, no repeatability.
- Different config logic per environment baked into application code instead of externalized config.
- Secrets committed to git history (even if later removed — history persists; rotate the secret, don't just delete the commit).
- No staging environment — testing changes directly in production.
- Migrations run manually and separately from the deploy that depends on them, risking a code/schema mismatch window.
