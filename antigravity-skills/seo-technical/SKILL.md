---
name: seo-technical
description: Use this skill whenever building a public-facing website or page that should be discoverable via search engines — meta tags, structured data, sitemaps, crawlability, canonical URLs, or Core Web Vitals as they relate to ranking. Trigger this whenever building any marketing page, blog, product page, or public content page, even if the user doesn't explicitly mention SEO.
---

# Technical SEO

## Mission
Make every public page fully crawlable, correctly described to search engines, and fast — so content ranks on technical merit and isn't held back by fixable mechanical issues.

## Per-page checklist (every public page)
- [ ] Unique, descriptive `<title>` (50-60 chars) — not a duplicate template across many pages, not truncated.
- [ ] Unique `<meta name="description">` (~150-160 chars) that accurately summarizes the page and encourages the click — not keyword-stuffed.
- [ ] One `<h1>` matching the page's actual topic; logical heading hierarchy below it (no skipped levels).
- [ ] Canonical URL (`<link rel="canonical">`) set — critical for pages reachable via multiple URLs (query params, trailing slash variants, http/https, www/non-www) to avoid duplicate-content dilution.
- [ ] Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter Card meta tags for correct social share previews.
- [ ] `lang` attribute set correctly on `<html>`.

## Structured data (schema.org / JSON-LD)
Add the appropriate schema type for the content — this is what unlocks rich results (star ratings, FAQ dropdowns, breadcrumbs, product pricing) in search results:
- `Article`/`BlogPosting` for content pages (headline, datePublished, author, image).
- `Product` + `Offer` + `AggregateRating` for e-commerce pages.
- `FAQPage` for FAQ content, `HowTo` for step-by-step guides.
- `BreadcrumbList` for site navigation hierarchy.
- `Organization`/`LocalBusiness` on the homepage/about page for brand identity in search.
Validate with Google's Rich Results Test before shipping — invalid structured data is ignored, not partially applied.

## Crawlability & indexing
- [ ] `robots.txt` allows crawling of everything meant to be indexed, and explicitly disallows admin/internal/duplicate paths — verify it isn't accidentally blocking the whole site (a common launch-day mistake: a staging `Disallow: /` left in production).
- [ ] `sitemap.xml` lists all canonical, indexable URLs, is referenced in `robots.txt`, and is regenerated automatically as content changes (not hand-maintained).
- [ ] Pages meant to be indexed don't carry a stray `<meta name="robots" content="noindex">` left over from staging.
- [ ] Internal links use real `<a href>` elements (crawlable) rather than JS-only click handlers with no underlying href, especially for primary navigation.
- [ ] No orphan pages — every indexable page is reachable via a crawlable internal link path from the homepage/sitemap.

## URL structure
- Clean, human-readable, keyword-relevant URLs (`/blog/technical-seo-guide`, not `/blog?id=1234`).
- Consistent trailing-slash and casing convention site-wide, enforced via redirect (301) for the non-canonical variant — inconsistency creates duplicate-content issues.
- 301 (permanent) redirects for moved/renamed content; 302 only for genuinely temporary redirects. Avoid redirect chains (A→B→C) — point directly to the final destination.

## Rendering considerations for SEO
- If using client-side rendering (CSR) for a public/marketing page, confirm the content is actually present in the initial HTML or reliably rendered by the crawler — prefer SSR/SSG for anything that needs to rank, since crawl budget and JS-rendering reliability vary.
- Ensure the LCP/CWV performance checklist (`frontend-performance`) is met — Core Web Vitals are a confirmed ranking factor, and slow pages also get crawled less thoroughly (crawl budget is finite).

## Content & accessibility overlap
- Descriptive, non-generic anchor text for internal links ("read our pricing guide", not "click here").
- `alt` text on images that are meaningful to the content (also an accessibility requirement — see `accessibility-a11y`) — this is a legitimate image-search ranking signal too, but never keyword-stuff it.
- Mobile-friendly, responsive layout (Google indexes mobile-first) — see `frontend-styling-design-systems`.

## Anti-patterns to flag and fix
- Duplicate/near-duplicate title tags and meta descriptions across many pages (templated with no per-page customization).
- Blocking CSS/JS in `robots.txt`, which prevents Google from properly rendering and evaluating the page.
- Soft 404s (a "not found" page that returns HTTP 200 instead of 404).
- Keyword stuffing in titles, descriptions, or hidden text — modern ranking systems penalize this rather than reward it.
- Infinite crawl spaces from unbounded faceted-filter URL combinations with no canonicalization.
- A staging-only `noindex` tag or `robots.txt` disallow accidentally shipped to production.
