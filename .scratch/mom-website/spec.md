# mi-website — Plan

A static marketing site for my mom's two small businesses. Plain HTML/CSS/JS, no build
step, no npm, deployed on Netlify. One landing page that routes visitors to two
business pages; every product leads to a pre-filled Facebook Messenger inquiry.

Status: **settled** (design tree fully walked, all decisions confirmed).
Next step: switch out of Plan mode, mirror this to `.scratch/mom-website/spec.md`,
and open tickets.

---

## 1. Design tree (decisions, with rationale)

| # | Decision | Chosen | Why |
|---|---|---|---|
| 1 | Real names vs placeholders | Placeholders, all real values isolated in `data/businesses.js` | Mom's details aren't final; swapping becomes a one-file edit |
| 2 | Page architecture | `index.html` + `business-a.html` + `business-b.html`, two thin shells over shared CSS/JS/data | Clean shareable URLs, no build step, ~15 duplicated lines each |
| 3 | Product content location | `data/products.js` array, rendered by `main.js` | One file to maintain; no editing 40 divs |
| 4 | Inquiry channel | Facebook Messenger deep link (`m.me/...`) as primary, `tel:` secondary; no Netlify Forms in v1 | Matches how she already sells; highest conversion in PH context |
| 5 | Look and feel | One shared system, per-business accent color, local SVG placeholders, CSS wordmark logo | Consistent, offline-safe, trivially swappable |
| 6 | Language & pricing | English with light natural Filipino phrasing; prices shown behind a global `showPrices` switch | Reads natural locally; allows "message for price" without a code change |
| 7 | Landing sections | Hero + About + two business cards + footer (placeholder testimonial/FAQ stubs) | Personal trust is the whole value proposition |
| 8 | Deploy flow | `git init` → GitHub → Netlify continuous deploy; ship on `*.netlify.app` first | Version history, preview deploys, rollback |
| 9 | Plan artifact | This file, then mirrored into `.scratch/mom-website/spec.md` | Matches `docs/agents/issue-tracker.md` convention |
| 10 | Palette & contrast guardrail | 60% cream / 25% green / 10% brown / 5% yellow; yellow never carries text | Yellow `#E8B93A` is ~1.9:1 on white — fails WCAG |
| 11 | Per-business color | Business A = green-led, Business B = brown-led, yellow shared decoration | Visitors feel instantly which business they're in |
| 12 | Catalog scale | A: ~10–15 items → plain grid, no filters. B: 1–2 items → showcase layout | Unequal catalogs need different layouts, not a filter system |
| 13 | File tree | See §3 | No build, no bundler, no npm |
| 14 | Card interaction | No modal / no zoom / no carousel. JS renders cards and wires links only | Every extra interaction is a bug surface |
| 15 | Images | `assets/img/products/<business>/<id>.jpg`, 4:3, lazy, sized, `alt` from data, `onerror` → placeholder | Graceful degradation, no layout shift |
| 16 | Header/footer | Wordmark + 2 business links + "Message us"; no hamburger. Footer: name, links, socials, hours, credit | Only two links — they fit on one phone row |
| 17 | SEO/a11y/analytics | Full semantic + meta + OG baseline; no analytics in v1 | Cheap to add later, nothing to act on yet |
| 18 | Placeholder inventory | Two groups: (A) mom supplies, (B) we decide — see §6 | Turns "build the site" into a concrete question list |
| 19 | Business page anatomy | hero → blurb → [A: 3-step "How to order"] → products → [A: custom-order card] → footer | Personalized goods are a conversation, not a checkout |
| 20 | Business B layout | `layout: 'showcase'` — one product per full-width alternating band; one-line order note | 1–2 products in a 3-col grid looks broken |
| 21 | Variants & pricing | `price` (number \| null) + `priceFrom` bool + `variants[]` chips; no dropdowns, no cart | Custom goods have no single price; it's an inquiry funnel |
| 22 | Grid density | 3 desktop / 2 tablet / 1 mobile; no filters, no search, no pagination | 10–15 solid products beat 30 padded ones |
| 23 | Data schema | See §5 (`window.*` globals, not ES modules) | Lets files be opened by double-click with no CORS/module issues |
| 24 | Business B category | Unknown → generic placeholders, flagged as first thing to fill | Not a blocker |

---

## 2. Design tokens

Yellow is **decorative only**: never text, never behind text unless that text is `--ink`.
Green carries every action (≈6.5:1 on cream). Brown carries headings (≈7:1).

| Token | Value | Role |
|---|---|---|
| `--cream` | `#FAF7EE` | Page background |
| `--surface` | `#FFFFFF` | Cards |
| `--ink` | `#2B2118` | Body text |
| `--muted` | `#6B6152` | Secondary text |
| `--green` | `#2F5D3A` | Primary actions, links (A accent) |
| `--green-dark` | `#24462C` | Green hover/active |
| `--brown` | `#6B4F2A` | Secondary actions, headings (B accent) |
| `--brown-dark` | `#543D20` | Brown hover/active |
| `--yellow` | `#E8B93A` | Decorative accent only |
| `--line` | `#E3DCC8` | Borders, dividers |

Per-business theming: `body[data-business="a"]` resolves `--accent` to green,
`[data-business="b"]` to brown. Components reference `--accent` only.

Proportion target: 60% cream/white surfaces, 25% green, 10% brown, 5% yellow.

Palette direction from mom: yellow, green, brown — light, natural, earthy.

---

## 3. File tree

```
mi-website/
├── index.html                 # landing: hero, about, 2 business cards, footer
├── business-a.html            # thin shell, <body data-business="a">
├── business-b.html            # thin shell, <body data-business="b">
├── 404.html                   # styled not-found page
├── netlify.toml               # pretty URLs, custom 404
├── robots.txt                 # allow all, point at sitemap
├── sitemap.xml                # 3 URLs (v1)
├── favicon.svg                # placeholder mark, swappable
├── assets/
│   ├── css/styles.css         # tokens + layout + components, mobile-first
│   ├── js/main.js             # render cards, wire Messenger links, image fallback
│   └── img/
│       ├── placeholder.svg    # generic photo placeholder
│       ├── portrait.svg       # mom's portrait placeholder
│       ├── og-share.svg       # Open Graph share image placeholder
│       ├── business-a-hero.jpg
│       ├── business-b-hero.jpg
│       └── products/
│           ├── a/             # a-01.jpg … (4:3)
│           └── b/
├── data/
│   ├── businesses.js          # BUSINESSES — names, taglines, URLs, theme, layout
│   └── products.js            # PRODUCTS — one object per item
└── docs/  AGENTS.md  .scratch/  (existing repo scaffolding / specs)
```

No `package.json`. No dependencies. Netlify serves the repo root as the publish directory.

---

## 4. Page specs

### Landing (`index.html`)
1. **Header** — wordmark → home; links to each business; "Message us" button.
2. **Hero** — `{{MOM_NAME}}`, tagline, portrait placeholder, and the **two business
   buttons side by side with equal visual weight** (never imply one business is primary).
3. **About** — short personal block; trust is the product.
4. **Two business cards** — hero image, name, one-line blurb, "View products".
5. **Placeholder stubs** — commented-out testimonial / FAQ sections, easy to delete.
6. **Footer** — name, both business links, socials, hours/location, credit line.

### Business A (`business-a.html`, green, `layout: 'grid'`)
1. Hero — name, tagline, hero image.
2. Blurb / "about this business".
3. **3-step "How to order"**: Message us → We design it with you → We make & ship.
4. Product grid (3/2/1). Each card: 4:3 image, name, one-line desc, variant chips,
   price (`₱250` / `Starting at ₱250` / `Message us for price`), full-width
   "Inquire on Messenger" button.
5. **Custom-order card**: "Don't see what you want? Ask for a custom order."
6. Footer.

### Business B (`business-b.html`, brown, `layout: 'showcase'`)
1. Hero — folded into a narrative intro (with 1–2 products, the business carries the page).
2. **Showcase bands** — one product per row, alternating image left/right, large image
   (min ~40vh), name, description, variants, price, prominent Messenger CTA.
3. One-line "How to order: Message us on Facebook" note.
4. Footer.

### 404 (`404.html`)
Short friendly message + links back to home and both businesses.

---

## 5. Data schema

```js
// data/businesses.js
window.BUSINESSES = {
  a: {
    name: '{{BUSINESS_A_NAME}}',
    tagline: '{{BUSINESS_A_TAGLINE}}',
    blurb: '{{BUSINESS_A_BLURB}}',
    theme: 'green',              // 'green' | 'brown'
    heroImage: 'assets/img/business-a-hero.jpg',
    messenger: '{{BUSINESS_A_MESSENGER_URL}}',   // https://m.me/<page>
    layout: 'grid',              // 'grid' | 'showcase'
    showPrices: true,
    customOrderCard: true,
    orderSteps: true,            // 3-step strip
  },
  b: {
    /* ...same shape, theme: 'brown', layout: 'showcase',
       showPrices: true, customOrderCard: false, orderSteps: false... */
  },
};

// data/products.js
window.PRODUCTS = [
  {
    id: 'a-01',
    business: 'a',               // 'a' | 'b'
    name: '{{PRODUCT_NAME}}',
    desc: '{{ONE_LINE_DESC}}',
    price: 250,                  // number | null
    priceFrom: false,            // true -> "Starting at"
    image: 'assets/img/products/a/a-01.jpg',
    alt: '{{ALT_TEXT}}',
    variants: [],                // ['Size: S / M / L', 'Color: black, white']
    tags: [],                    // reserved, unused in v1 (future categories)
  },
];
```

Rendering: `main.js` reads `document.body.dataset.business`, filters `PRODUCTS`,
and renders either grid cards or showcase bands per `BUSINESSES[x].layout`.
A business with 0 products renders an empty-state line, not a broken page.

Messenger link construction (best-effort prefill, plus a traceable ref):

```
{messenger}?text=Hi! I'm interested in {product name}. Is this available?&ref=website-{product id}
```

Meta documents `?text=` on `m.me` links, but its platform policy forbids
pre-filling user messages, and there are credible reports of Messenger ignoring
the parameter. So `text` is treated as best-effort — if it's ignored, the chat
simply opens empty, which is harmless. `ref` is the parameter Meta definitely
supports and reaches the Page's inbox tooling, so the product is still traceable
when the message box opens empty. See §10.

---

## 6. Placeholder inventory

### Group A — mom supplies

- [ ] Her display name (as she wants to be credited)
- [ ] Her tagline / one-line intro
- [ ] Her story (2–3 sentences for the About block) — optional
- [ ] Portrait photo
- [ ] **Business A**: name, tagline, blurb, hero photo
- [ ] **Business A**: Messenger / Facebook page URL
- [ ] **Business A**: ~10–15 products — name, one-line description, price (or range),
      variants (size / color / personalization options), photo each
- [ ] **Business B**: name, tagline, blurb, hero photo
- [ ] **Business B**: Messenger / Facebook page URL + **what kind of business it is** (today: unknown)
- [ ] **Business B**: its 1–2 products — name, description, price, photos
- [ ] Phone number (optional, for the `tel:` link)
- [ ] Facebook / Instagram / other social links
- [ ] Business hours and location (optional, footer)
- [ ] Real product photos (4:3 crop ideally)

### Group B — we decide

- [ ] Site `<title>` and meta description wording
- [ ] Which business is green-led vs brown-led (default: A green, B brown)
- [ ] Whether prices are shown at all (`showPrices`)
- [ ] Whether Business A keeps the 3-step "How to order" strip
- [ ] Whether the custom-order card stays on Business A
- [ ] Footer credit line ("Website by {{YOUR_NAME}}")
- [ ] Custom domain, when she's ready

---

## 7. Non-functional baseline (built in, not options)

- `lang="en"`, unique `<title>` + `<meta name="description">` per page
- Open Graph + Twitter card tags, share image, favicon, `robots.txt`, `sitemap.xml`
- Semantic landmarks: `header` / `main` / `nav` / `footer`; heading order for structure
- Visible focus rings; everything keyboard-operable
- `prefers-reduced-motion` respected; no gratuitous animation
- Mobile-first CSS; touch targets ≥ 44px
- Product images: explicit `width`/`height`, `loading="lazy"`, real `alt`, `onerror` fallback
- No analytics in v1 (Netlify built-in is a one-checkbox add later)
- No third-party requests: placeholders and fonts are local (system font stack)

---

## 8. Build order (tickets for `.scratch/mom-website/`)

1. Scaffold: `netlify.toml`, `robots.txt`, `sitemap.xml`, folders, `data/*.js` with
   placeholder entries, `favicon.svg`.
2. `assets/css/styles.css` — tokens, theming, layout primitives, components.
3. `index.html` — header, hero, two equal-weight business buttons, about, cards, footer.
4. `business-a.html` + `main.js` grid rendering + Messenger links + image fallback.
5. `business-b.html` showcase rendering (shared `main.js` code path).
6. `404.html`, OG share image, meta/SEO pass.
7. Local review pass (mobile widths, no-JS behaviour, keyboard nav).
8. `git init`, GitHub remote, Netlify connect, deploy to `*.netlify.app`.
9. Placeholder swap-in when mom's details/photos arrive.

---

## 9. Explicitly out of scope for v1

Cart / checkout / payments · product search & filters · quick-view modal or zoom ·
carousels · CMS or admin UI · analytics · newsletter · blog · multi-language toggle ·
custom domain · multi-image products · categories (schema reserves `tags` for it).

---

## 10. Verify on deploy

Things that can only be checked against the live site or against Meta, not in a
local render.

1. **Messenger `?text=` prefill.** Meta's docs list the parameter; Meta's platform
   policy forbids pre-filling, and reports differ on whether Messenger honours it.
   Open a product link on a real phone against the real Page and see whether the
   composer arrives pre-filled. If it doesn't, nothing is broken — the `ref`
   parameter still carries the product id, and item 2 is what does the real work.
2. **Page greeting / Get Started.** Because prefill may not work, set a short
   greeting text and a Get Started button on each Facebook Page so a customer
   arriving from the site sees a prompt instead of an empty box. This is Page
   configuration, not code.
3. **Page usernames.** `m.me/<username>` requires a real Page username (5+ chars,
   letters/numbers/periods). Numeric Page IDs often work but aren't documented.
   Fill in `messenger` in `data/businesses.js` with the `https://m.me/…` form.
4. **Pretty URLs.** Confirm `/business-a` and `/business-b` both serve correctly
   once Netlify is connected. The redirects live in `netlify.toml`.
5. **Share preview.** Paste the live URL into a Messenger or WhatsApp chat and
   check the Open Graph title, description and image render. The current share
   image is `assets/img/og-share.svg`; some platforms don't render SVG OG images,
   so a 1200×630 PNG export is the safe swap if the preview comes up blank.
6. **404 routing.** Visit a nonsense path like `/does-not-exist` and confirm the
   styled 404 appears. It uses absolute paths on purpose, so it works from any
   depth.

