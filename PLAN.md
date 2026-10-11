# mi-website — Plan

A static marketing site for mom's two small businesses. Plain HTML/CSS/JS, no build
step, no npm, deployed on Netlify. One landing page routes visitors to two business
pages; every product leads to a Facebook Messenger conversation.

**This file is the canonical plan.** It replaced `.scratch/mom-website/spec.md` as the
source of truth, because a plan that other agents and humans are expected to find should
live where they look first. See §11 for proposed revisions that are *not yet accepted*.

---

## 0. Start here

Three lists, in order of how much they should worry you.

### Verified (tested, not asserted)

- Rendering: 12 cards on Business A, 2 alternating showcase bands on Business B, all
  three price modes, variant chips, `aria-current` on nav, zero JS errors on any page.
  44 assertions via jsdom; assets all return 200. **The harness is throwaway and is not in
  this repository** — see §11.9.
- Colour contrast: measured with the WCAG formula, not estimated. Every text/background
  pair in use passes AA. Table in §2.
- Missing photos fall back to `placeholder.svg` rather than a broken icon.
- Renaming a business in `data/businesses.js` does change every label a *visitor* sees.
- All JS parses (`node --check`); all SVG/XML parses (`xmllint`).

### Assumed (believed, not tested — these are the risk)

1. **Messenger `?text=` prefill works.** Meta documents the parameter, but Meta's
   platform policy forbids pre-filling user messages and multiple sources say Messenger
   ignores it. If it's ignored, the chat opens empty. `?ref=` was added as a fallback
   that carries the product id to inbox tooling. **Cannot be tested without a live Page.**
2. **Facebook is the discovery channel.** This is the stated reason the site is a router
   to Messenger rather than a catalogue with SEO. Nobody has verified how her customers
   actually find her.
3. **~10–15 products for Business A and 1–2 for Business B** is the real shape. Business
   B's *category* is still unknown.
4. **The placeholder palette is close to final.** Mom approved "yellow, green, brown,
   light nature vibes" as a direction.
5. **She will actually send content.** The whole Group A inventory below is unfulfilled.
   A flawless site with stock placeholder photos converts nobody.

### Outstanding

- Business B's category (blocks realistic copy for a whole page).
- Every Group A placeholder (§6).
- Nothing is deployed — no GitHub remote, no Netlify site.

---

## 1. Design tree (decisions, with rationale)

The first six columns are as originally agreed. The **Verified** column records what
happened when it was built; two decisions turned out to be overstated.

| # | Decision | Chosen | Verified on build |
|---|---|---|---|
| 1 | Real names vs placeholders | Placeholders, values isolated in `data/*.js` | **Overstated.** Renaming updates everything visitors *see*, but the names are also hardcoded in the three HTML files: 26 lines total. It is not a one-file edit. |
| 2 | Page architecture | `index.html` + `business-a.html` + `business-b.html`, thin shells over shared CSS/JS/data | As planned |
| 3 | Product content location | `data/products.js` rendered by `main.js` | As planned — **but products are invisible without JavaScript**, and §8 originally promised a static first batch. That promise was not kept. |
| 4 | Inquiry channel | Messenger deep link primary, `tel:` secondary, no forms | As planned, **plus** `?ref=`; the prefill claim was unverified and is probably wrong (§0) |
| 5 | Look and feel | One shared system, per-business accent, local SVG placeholders, CSS wordmark | As planned |
| 6 | Language & pricing | English w/ light Filipino phrasing; `showPrices` switch | As planned |
| 7 | Landing sections | Hero + About + two business cards + footer, with commented-out testimonial/FAQ stubs | As planned |
| 8 | Deploy flow | `git init` → GitHub → Netlify; `*.netlify.app` first | Git done; GitHub and Netlify still outstanding |
| 9 | Plan artifact | `.scratch/mom-website/spec.md` | **Revised** — moved to this root `PLAN.md` |
| 10 | Palette & contrast guardrail | 60/25/10/5; yellow never carries text | As planned; measured values in §2 |
| 11 | Per-business colour | A = green-led, B = brown-led, yellow shared | As planned |
| 12 | Catalog scale | A: grid. B: showcase | As planned, **but the layout is a hardcoded flag per business** rather than derived — see §11.1 |
| 13 | File tree | See §3 | As planned |
| 14 | Card interaction | No modal, no zoom, no carousel | As planned |
| 15 | Images | `assets/img/products/<biz>/<id>.jpg`, lazy, sized, `alt`, `onerror` → placeholder | As planned |
| 16 | Header/footer | Wordmark + 2 links + CTA; no hamburger | As planned |
| 17 | SEO/a11y/analytics | Semantic + meta + OG baseline; no analytics | Partially verified. Meta/OG present; a11y not checked with a real tool; no analytics (and therefore no measurement at all) |
| 18 | Placeholder inventory | Two groups, mom supplies vs we decide | **Defective as built** — see §11.3. Only 8 of ~23 placeholder values carry a greppable marker. |
| 19 | Business page anatomy | hero → blurb → [A: 3 steps] → products → [A: custom-order card] → footer | As planned |
| 20 | Business B layout | `layout: 'showcase'`, alternating full-width bands | As planned |
| 21 | Variants & pricing | `price` + `priceFrom` + `variants[]` chips; no dropdowns, no cart | As planned. **Plan §5 originally said the Messenger message includes the variant; the code does not, and shouldn't** — variants are informational, not selections (§3 of GLOSSARY.md) |
| 22 | Grid density | 3/2/1, no filters, no search | As planned |
| 23 | Data schema | `window.*` globals, not ES modules | As planned |
| 24 | Business B category | Unknown → generic placeholders | **Still unknown.** Top content blocker. |

---

## 2. Design tokens

Yellow is **decorative only**: never text, never behind text unless that text is `--ink`.

| Token | Value | Role | Measured on |
|---|---|---|---|
| `--cream` | `#FAF7EE` | Page background | — |
| `--surface` | `#FFFFFF` | Cards | — |
| `--surface-alt` | `#FFFDF7` | Footer | — |
| `--ink` | `#2B2118` | Body text | 14.70:1 on cream |
| `--muted` | `#6B6152` | Secondary text | 5.67:1 on cream · 6.07:1 on white |
| `--green` | `#2F5D3A` | Primary actions, links (A accent) | 7.13:1 on cream · 7.64:1 on white |
| `--green-dark` | `#24462C` | Green hover/active, links | 9.86:1 on cream |
| `--brown` | `#6B4F2A` | Secondary actions, headings (B accent) | 7.06:1 on cream · 7.56:1 on white |
| `--brown-dark` | `#543D20` | Brown hover/active, links | 9.49:1 on cream |
| `--yellow` | `#E8B93A` | Decorative accent only | **1.84:1 on white — fails text, as designed** |
| `--yellow-soft` | `#FBF2DC` | Chips, callouts, `noscript` note | ink on it: 14.13:1 |
| `--line` | `#E3DCC8` | Borders, dividers | 1.28:1 — decorative, exempt |

Contrast figures were computed with the WCAG relative-luminance formula, not estimated.
The original plan asserted "~6.5:1" for green and "~1.9:1" for yellow; the real numbers
are 7.13 and 1.84. The conclusion held, the rigour didn't.

Two useful surprises: white on green is 7.64:1 and white on brown is 7.56:1, so the
primary buttons clear AA comfortably. If a yellow hero band is ever wanted, ink on
yellow is 8.57:1 — so the guardrail is about *surfaces behind text*, not about yellow
being unusable.

Per-business theming: `body[data-business="a"]` resolves `--accent` to green, `"b"` to
brown. Components reference `--accent` only. Proportion target 60/25/10/5.

---

## 3. File tree

```
mi-website/
├── PLAN.md                    ← this file (canonical plan)
├── GLOSSARY.md                ← domain language: Product, Variant, Inquiry, ...
├── docs/adr/                  ← decisions that would otherwise be "fixed" by mistake
├── index.html                 # landing: hero, about, 2 business cards, footer
├── business-a.html            # <body data-business="a">
├── business-b.html            # <body data-business="b">
├── 404.html                   # styled not-found page
├── netlify.toml               # pretty URLs
├── robots.txt                 # PLACEHOLDER domain
├── sitemap.xml                # PLACEHOLDER domain
├── favicon.svg
├── assets/
│   ├── css/styles.css         # tokens, theming, components, mobile-first
│   ├── js/main.js             # fill values, resolve Messenger links, render, fallbacks
│   └── img/
│       ├── placeholder.svg    portrait.svg    og-share.svg
│       ├── business-a-hero.svg  business-b-hero.svg
│       └── products/a/  products/b/            # drop real photos here
└── data/
    ├── site.js                # mom's name, phone, hours, credit
    ├── businesses.js          # names, taglines, URLs, theme, layout
    └── products.js            # one object per product
```

No `package.json`. No dependencies. Netlify serves the repo root as the publish directory.

**Path convention:** `index.html`, `business-*.html` use relative paths; `404.html` uses
absolute (`/assets/…`) deliberately, so it works when served for a path at any depth. If
the site ever moves to a subpath instead of a domain root, the absolute paths in
`404.html` are the things that break.

---

## 4. Page specs

### Landing (`index.html`)
1. **Header** — wordmark → home; both business links; "Message us" → `#contact`.
2. **Hero** — mom's name, tagline, portrait, and **the two business buttons side by side
   with equal visual weight** (identical padding/size; only the hue differs).
3. **About** — short personal block.
4. **Two business cards** — hero image, name, one-line blurb, "View products".
5. **Commented-out** testimonial and FAQ sections.
6. **Footer (`id="contact"`)** — name, both business links, both Messenger links, phone,
   hours, location, credit.

### Business A (`business-a.html`, green, `layout: 'grid'`)
hero → blurb → 3-step "How to order" → product grid (3/2/1) → custom-order callout → footer.
Each card: 4:3 image, title, one-line description, variant chips, price, full-width
Messenger CTA.

### Business B (`business-b.html`, brown, `layout: 'showcase'`)
narrative hero (the business carries the page — with one or two products there is nothing
to browse) → alternating full-width bands with large imagery → footer.

### 404 (`404.html`)
Friendly message + links home and to both businesses. Uses absolute paths.

---

## 5. Data schema

```js
// data/site.js — global, non-business values
window.SITE = { momName, footerNote, phone, phoneLabel, hours, location, credit, siteUrl };

// data/businesses.js
window.BUSINESSES = {
  a: {
    name, tagline, blurb, eyebrow,        // copy
    theme: 'green',                        // 'green' | 'brown' -> --accent token set
    layout: 'grid',                        // 'grid' | 'showcase'   (§11.2: should be derived)
    messenger: '',                         // e.g. 'https://m.me/inkandthread'
    heroImage, showPrices, orderSteps, customOrderCard, emptyNote,
  },
  b: { /* same shape, theme: 'brown', layout: 'showcase' */ },
};

// data/products.js
window.PRODUCTS = [
  { id: 'a-01', business: 'a', name, desc,
    price: 250, priceFrom: false,
    image, alt, variants: [], tags: [] },
];
```

Rendering: `main.js` reads `document.body.dataset.business`, filters `PRODUCTS`, and
renders grid cards or showcase bands per `BUSINESSES[x].layout`. A business with zero
products renders an empty-state line, not a broken page. `tags` is reserved for future
categories; unrelated to `tags` in the CSS sense.

### Messenger link construction (corrected)

```
{messenger}?text=Hi! I'm interested in {product name}. Is this available?&ref=website-{product id}
```

- `text` is **best-effort**. Meta documents it; Meta's platform policy forbids
  pre-filling user messages; reports differ on whether it is honoured. An empty composer
  is the expected failure mode and is harmless.
- `ref` is the parameter Meta definitely supports. Invisible to the customer, delivered
  to the Page's inbox tooling. Allowed characters: letters, numbers, `-`, `_`, `=`.
- Because prefill may fail, the **Page's greeting text and Get Started button** are what
  actually orient a customer arriving from the site. That is Page configuration, not code.
- The message deliberately does **not** include the variant. Variants are informational
  (see `GLOSSARY.md`); the customer has not chosen one.

---

## 6. Placeholder inventory

Group A = mom supplies. Group B = we decide. **Known defect:** there is no enforced
marker convention, so this list cannot be generated by grepping. §11.3 proposes a fix.

### Group A — mom supplies

- [ ] Her display name, tagline, and optionally a 2–3 sentence story
- [ ] Portrait photo → `assets/img/portrait.jpg`
- [ ] **Business A**: name, tagline, blurb, hero photo, `m.me` URL
- [ ] **Business A**: ~10–15 products — name, one-line description, price or range,
      variant lines (size / colour / personalization), photo each
- [ ] **Business B**: name, tagline, blurb, hero photo, `m.me` URL, **and its category**
- [ ] **Business B**: its 1–2 products — name, description, price, photos
- [ ] Phone number (for the `tel:` link)
- [ ] Facebook / Instagram / other social links
- [ ] Business hours and location
- [ ] Real product photos, ideally 4:3

### Group B — we decide

- [ ] Site `<title>` and meta description wording
- [ ] Which business is green-led vs brown-led (default: A green, B brown)
- [ ] Whether prices show at all (`showPrices`)
- [ ] Whether Business A keeps the 3-step strip and the custom-order card
- [ ] Footer credit line
- [ ] Domain: `robots.txt` and `sitemap.xml` both hardcode `https://example.netlify.app`
      in three places, and nothing checks them. They must change with the domain.

---

## 7. Non-functional baseline

Built in:

- `lang="en"`, unique `<title>` + `<meta name="description">` per page
- Open Graph + Twitter card tags; `favicon.svg`; `robots.txt`; `sitemap.xml`
- Semantic landmarks (`header`/`main`/`nav`/`footer`); no skipped heading levels (checked)
- Visible two-tone focus ring (dark ring + yellow halo) — yellow used decoratively, not as
  the contrast carrier
- `prefers-reduced-motion` respected; no gratuitous animation
- Mobile-first; touch targets ≥ 44px
- Images: explicit `width`/`height`, `loading="lazy"`, real `alt`, `onerror` fallback
- No third-party requests: placeholders and fonts are local (system font stack)
- No analytics — which also means **no measurement**; see the open question in §11.6

Not verified: keyboard traversal end-to-end, and no automated accessibility audit has been
run. The list above is what was written, not what was proven.

---

## 8. Build status

| # | Step | Status |
|---|---|---|
| 1 | Scaffold config, folders, data files, favicon | done |
| 2 | `styles.css` — tokens, theming, components | done |
| 3 | `index.html` | done |
| 4 | `business-a.html` + grid rendering + Messenger links + fallbacks | done |
| 5 | `business-b.html` + showcase rendering | done |
| 6 | `404.html`, OG image, meta/SEO pass | done |
| 7 | Local review pass (mobile, no-JS, keyboard) | **partial** — mobile and no-JS paths exercised in tests; keyboard traversal and a real a11y audit not done |
| 8 | `git init`, GitHub remote, Netlify connect, deploy | **not done** — git initialised and committed locally only |
| 9 | Placeholder swap-in | blocked on §6 Group A |

---

## 9. Explicitly out of scope for v1

Cart / checkout / payments · product search & filters · quick-view modal or zoom ·
carousels · CMS or admin UI · analytics · newsletter · blog · multi-language toggle ·
custom domain · multi-image products · product categories (`tags` reserves the space).

---

## 10. Verify on deploy

1. **Messenger prefill.** Open a product link on a real phone against the real Page.
   Does the composer arrive pre-filled? If not, nothing is broken — `ref` still carries
   the product id, and item 2 is the real fix. See ADR-0003.
2. **Page greeting / Get Started.** Configure a greeting text and Get Started button on
   each Page, so a customer arriving from the site sees a prompt, not an empty box.
3. **Page usernames.** `m.me/<username>` needs a real Page username (5+ chars,
   letters/numbers/periods). Numeric Page IDs often work but are undocumented.
4. **Pretty URLs.** Confirm `/business-a` and `/business-b` serve correctly once Netlify is
   connected. Redirects live in `netlify.toml`.
5. **Share preview.** Paste the live URL into Messenger or WhatsApp. The current OG image
   is an SVG; several platforms don't render SVG OG images, so a 1200×630 PNG export is
   the safe swap if the preview is blank.
6. **404 routing.** Visit `/does-not-exist` and confirm the styled 404 appears.
7. **Domain coupling.** After the domain is known, update `robots.txt` and all three
   `<loc>` entries in `sitemap.xml`.

---

## 11. Proposed revisions — NOT yet accepted

These came out of a post-build review. Each is a change to the design or the process, not a
bug fix, so none of them has been applied — except 11.1, which is documentation that was
written as part of this review.

### 11.1 Promote "assumptions" to a first-class section
The Messenger prefill problem was a load-bearing assumption written in the middle of a
decisions table where it read as settled design, and it survived three grilling rounds
untested. §0 now separates *verified* from *assumed*. That should stay at the top of every
future revision of this plan.

### 11.2 Derive layout from product count, not a per-business flag
`layout: 'grid' | 'showcase'` is really a cardinality rule: many products → grid, one or
two → showcase. Encoded as a literal per business, if Business B grows to four products
someone has to *remember* to flip a flag, and nothing fails loudly if they don't. Proposed:
derive from `items.length` with an optional explicit override, so the layout follows the
data.

### 11.3 One enforced placeholder marker
Today, 8 placeholder values are greppable (`<!-- PLACEHOLDER -->` comments) and roughly 15
are not — the phone number, hours, location and domain are repeated across HTML, `data/`
and config with no marker at all. So "what is left to fill in?" cannot be answered by
searching. Proposed: one canonical marker (e.g. `data-placeholder="phone"` on the element,
`// PLACEHOLDER:` in data files) plus a documented one-liner in this plan to list what is
still outstanding. Deliberately *not* a build step — just consistency plus a command.

### 11.4 State the trade-off we accepted instead of implying none
"No build step" is presented as a virtue in this plan. It has a price: no HTML templating,
which is exactly why the header/footer and the business names are duplicated across three
shells (26 lines), and why §1's "one file, no HTML edits" claim was false. Proposed: name
the coupling, name its cost, and state the threshold where it stops being worth it — e.g.
a fourth page, or a second language, means moving to a generator and superseding ADR-0001.

### 11.5 Define success, and name what we did not decide
The plan has no acceptance criteria. Proposed additions:
- **Success**: she stops answering "how much / what do you have?" by hand, and measurable
  enquiries arrive through the site rather than requiring explanation.
- **What we did not decide**: how customers actually discover her; whether Business B is a
  revenue line or a passion project (which is why both landing cards carry equal weight);
  whether prices should be visible at all; who edits content after launch.
- **Risk register**: Business B is a whole page built for an unnamed category; the
  placeholder photos are the reason the site currently looks unfinished; content, not code,
  is the critical path.

### 11.6 Revisit measurement
Analytics was deferred on the grounds that there'd be nothing to act on. That's still
defensible for visits — but we now have zero ability to tell whether the site produces
enquiries, which is the only thing it exists to do. `?ref=` only reaches inbox tooling, not
a human reading Messenger. Proposed: keep no analytics, but make "enquiries per week" an
explicit acceptance measure so the gap is a decision rather than an omission.

### 11.7 Who edits what, and the undo
Proposed: the user edits `data/*.js` and drops files into `assets/img/`; mom sends content
and never touches the repo. Safety net: Netlify's instant rollback plus git history. Without
this written down, the first content update is where it gets discovered by accident.

### 11.8 The verification harness should live in the repository
Verification was done with a 44-assertion jsdom script kept in `/tmp`, deliberately outside
the repository so it wouldn't add a dependency. That directory was wiped between sessions,
so **nobody can now reproduce the "verified" claims in §0** without rewriting the harness
from scratch — the exact failure mode those claims exist to prevent. Proposed: a
`tools/smoke-test.js` in the repo, run through a single `npx --yes jsdom`-style invocation,
so it adds nothing to a `package.json` that still shouldn't exist. Then "verified" means
"reproducible".

### 11.9 Minor
- `PRODUCTS` order is array position; there is no `order` field. Fine, but worth stating
  so "move this product up" isn't a mystery.
- `sitemap.xml` / `robots.txt` carry the domain in four places with nothing checking them
  (already in §10.7).
- The three HTML shells duplicate the header and footer wholesale; any nav change is three
  edits. Documented in ADR-0001 as the accepted price of no build step.
