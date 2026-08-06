---
name: database-design
description: Use this skill whenever designing a database schema, writing migrations, choosing indexes, modeling relationships, or writing/optimizing queries (SQL or NoSQL). Trigger this whenever the user asks to "add a table", "design the data model", "write a migration", "add an index", or when building any feature that persists data, even if not phrased as a database task.
---

# Database Design

## Mission
Model data so that the schema enforces correctness the application can't accidentally violate, queries stay fast as the table grows past a few thousand rows, and future changes don't require risky, lock-heavy migrations.

## Schema design principles
1. **Normalize by default, denormalize deliberately.** Start at 3NF (no repeated data, no partial/transitive dependencies) for transactional data. Denormalize only for a measured read-performance reason (e.g. a materialized summary table, a cached count) — and document why.
2. **Every table has a real primary key.** Prefer a surrogate key (UUID or auto-increment bigint) even when a natural key exists — natural keys change more often than teams expect (emails get reused, usernames change).
3. **Foreign keys are enforced by the database**, not just assumed by application code. Use `REFERENCES` constraints with an explicit `ON DELETE` policy (`CASCADE`, `RESTRICT`, or `SET NULL`) chosen deliberately per relationship, not left at the default.
4. **NOT NULL and CHECK constraints do real work.** If a column is logically required, mark it `NOT NULL` at the DB level — don't rely solely on application-layer validation, which every future script/migration/admin tool can bypass.
5. **Use the right type.** Money → integer minor units or `DECIMAL`, never `FLOAT`. Timestamps → `TIMESTAMPTZ`/UTC, never naive local time. Enums → a real enum type or a `CHECK IN (...)` constraint, not a free-text column that silently accepts typos.

## Relationships
- **One-to-many**: foreign key on the "many" side.
- **Many-to-many**: a join table with its own composite key (and often its own surrogate key if the relationship itself has attributes, like `enrolled_at`).
- **Polymorphic associations** (a comment that can belong to a post OR a photo): prefer separate join tables per type over a single nullable `commentable_type`/`commentable_id` pair — the latter can't be foreign-key-enforced and is a common source of orphaned rows.

## Indexing
- Index every foreign key column — most databases don't do this automatically, and unindexed FKs cause slow joins and slow cascading deletes.
- Index columns used in `WHERE`, `JOIN`, and `ORDER BY` clauses on any table expected to grow beyond a few thousand rows.
- Composite indexes: column order matters — put the equality-filtered column(s) first, range-filtered/sorted columns last, matching actual query patterns.
- Don't over-index: every index slows down writes and costs storage — add indexes to match real query patterns, verified with `EXPLAIN ANALYZE`, not speculatively.
- Use a partial/filtered index when queries consistently filter on a condition (e.g. `WHERE deleted_at IS NULL`) instead of indexing the whole table.

## Migrations
- [ ] Every schema change is a versioned, reversible migration file — never a manual `ALTER TABLE` run directly against production.
- [ ] Migrations are backward-compatible with the currently-deployed application code during rollout (expand-then-contract pattern): add a new nullable column → deploy code that writes to both old and new → backfill → deploy code that reads from new only → drop the old column in a later migration. Don't rename/drop a column in the same deploy that removes the code using it.
- [ ] Large table migrations (adding a NOT NULL column, adding an index) on production-scale tables use non-locking strategies (e.g. `CREATE INDEX CONCURRENTLY` in Postgres, adding columns as nullable then backfilling in batches) rather than a single blocking statement.
- [ ] Migrations are idempotent/safe to re-run where the tooling doesn't already guarantee this.

## Query performance
- Read query plans (`EXPLAIN ANALYZE`) before assuming a query is "fine" — don't guess from row counts in dev, which are usually far smaller than production.
- Avoid N+1 queries: fetching a list then querying per-row for related data. Use joins, `IN` batching, or a data-loader/eager-loading pattern (`.includes()`/`.with()`/`JOIN`) instead.
- Paginate any query that can return unbounded rows — never `SELECT *` over a whole table for display purposes.
- Watch for implicit type coercion killing index usage (e.g. comparing a text column to a number literal).

## NoSQL / document store considerations (when relevant)
- Model around access patterns, not entities — design the document shape for how it will be queried, since joins are expensive or unavailable.
- Denormalization is expected and normal here, but be deliberate about which fields get duplicated and have a plan for keeping duplicates in sync (event-driven update, or accept eventual staleness where it's harmless).
- Watch document size growth (unbounded arrays embedded in a parent document) — cap or externalize into a separate collection once an embedded list can grow without bound.

## Anti-patterns to flag and fix
- `SELECT *` in application code (breaks when columns are added/removed, pulls unneeded data).
- Storing structured data as JSON/text in a column when it's queried/filtered on regularly — normalize it into real columns instead.
- Soft-deletes (`deleted_at`) without a partial index and without updating every query to filter it — easy source of "deleted" rows reappearing.
- No `created_at`/`updated_at` timestamps on tables — nearly always needed later for debugging/auditing.
- Storing passwords or secrets in plain text — see `auth-security`.
- Migrations that both add and immediately backfill a NOT NULL constraint on a huge table in one blocking transaction.
