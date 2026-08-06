# World-Class Website Development — Antigravity Skill Pack

11 skills covering the full stack, written in Antigravity's open `SKILL.md` format (the same format Claude Code, Cursor, and other agentic tools use, so this pack is portable if you ever switch tools).

## What's included

| Skill | Covers |
|---|---|
| `frontend-architecture` | Component design, state management, project structure, data fetching |
| `frontend-styling-design-systems` | CSS architecture, design tokens, responsive/fluid layout |
| `frontend-performance` | Core Web Vitals (LCP/INP/CLS), bundle size, image optimization |
| `accessibility-a11y` | WCAG, semantic HTML, keyboard nav, ARIA patterns |
| `backend-api-design` | REST/GraphQL design, versioning, pagination, error contracts |
| `database-design` | Schema design, indexing, migrations, query performance |
| `auth-security` | Authentication, authorization, OWASP Top 10, secure headers |
| `testing-strategy` | Test pyramid, unit/integration/e2e, TDD |
| `devops-cicd` | CI/CD pipelines, containers, IaC, deployment strategy |
| `seo-technical` | Meta tags, structured data, crawlability, sitemaps |
| `observability-monitoring` | Structured logging, error tracking, metrics, alerting |
| `git-workflow-code-review` | Branching, commit conventions, PR/review standards |

## Installing in Antigravity

**Project scope** (this repo only — recommended so skills version with the codebase):
```bash
mkdir -p .agents/skills
cp -r antigravity-skills/* .agents/skills/
# remove this README from the skills folder itself, it's not a skill
rm .agents/skills/README.md
```

**Global scope** (available across every project on your machine):
```bash
mkdir -p ~/.gemini/config/skills
cp -r antigravity-skills/* ~/.gemini/config/skills/
rm ~/.gemini/config/skills/README.md
```

Restart Antigravity (or reload the workspace) so it picks up the new skills. Each skill's `description` field is what the agent uses to decide when to load it — no manual invocation needed, it triggers automatically based on your prompts.

## Recommended pairings by task
- **New feature end-to-end**: `frontend-architecture` + `backend-api-design` + `database-design` + `testing-strategy`
- **Polishing a UI**: `frontend-styling-design-systems` + `accessibility-a11y` + `frontend-performance`
- **Anything touching user data/login**: `auth-security` is non-negotiable — pair with `backend-api-design`
- **Before first production deploy**: `devops-cicd` + `observability-monitoring` + `seo-technical` (if public-facing)
- **Every PR**: `git-workflow-code-review`

## Customizing
These are strong, opinionated defaults — not a fixed spec. If your team has different conventions (e.g. a different commit style, a different state management library), edit the relevant `SKILL.md` directly; they're plain markdown. Keep each file under ~500 lines per Antigravity's guidance — if one grows past that, split framework-specific detail into a `references/` subfolder next to it.
