# mi-website — agreed redesign plan

Updated 11 October 2026 after two clarification rounds. This is the canonical plan.
The user agreed to the structure and interactions below and requested lorem ipsum
for text placeholders. Real business content is intentionally deferred.

## 1. Purpose and settled decisions

A personal showcase for Mom and her two businesses. Visitors learn about her,
browse products, and use Messenger to inquire. Orders and payments happen outside
the website. Prioritise people opening a shared link on a phone.

- Three content pages: home, Business A, and Business B; a separate 404 page.
- Plain HTML, CSS, and JavaScript. No npm, framework, build step, or CMS.
- Netlify is the intended host. Publishing is separate from this redesign.
- Mom supplies photos and descriptions. The user maintains the files.
- Names, descriptions, personal story, and product text use lorem ipsum for now.
- Navigation, action labels, instructions, errors, and alt text remain readable.
- A: approximately 10–15 products in a grid; use 12 samples for the preview.
- B: 1–2 products in large presentations; use two samples for the preview.
- Fixed price, starting price, or “Ask for price”; do not invent real prices.
- Product options are informational text, not selection controls.
- Tapping a product photo opens a larger image. No carousel or product detail pages.
- Yellow is the main colour, with green and brown and a light natural feel.

The counts describe the agreed preview, not a verified inventory. Both categories,
real names, prices, service areas, preparation times, and delivery terms remain
unknown. Do not infer them from the old fictional catalogue.

## 2. Visual direction

A sunny personal catalogue. A framed portrait carries the homepage composition;
the rest is quiet, with generous image space and short, left-aligned text.
Business entrances appear once, before the personal story.

| Colour | Value | Use |
|---|---|---|
| Sunflower | `#E8B93A` | Main hero and contact surfaces |
| Light yellow | `#FFF8DC` | Main page background |
| Leaf green | `#2F5D3A` | Primary actions and Business A details |
| Wood brown | `#6B4F2A` | Secondary text and Business B details |
| Dark ink | `#2B2118` | Text on yellow and light surfaces |
| White | `#FFFFFF` | Product photo and image-viewer surfaces |

Use locally hosted Source Sans 3: regular body, semibold controls, bold headings.
Short display headings use a large, compact scale. Paragraphs stay below 65ch.
No all-caps labels or accenting a single word. Corners belong mainly to photos and
buttons. Avoid repeated boxed text, decorative underlines, gradients, and reveals.

Self-review: a cream page with generic green cards would underplay Mom's request.
Use broad yellow surfaces instead. Since categories are unresolved, do not invent
product illustrations or claims. Real photos will provide specificity later.

This revises ADR-0002's decorative-only emphasis while retaining dark text on yellow.
Check actual rendered colours, including navigation buttons.

## 3. Page structure

```text
Home
  Header: name, business links, contact
  Yellow hero: short introduction | framed portrait
  Two equally prominent business entrances with images
  Short personal story
  Contact information and business-specific inquiry links

Business A
  Header
  Compact introduction | business photo
  Products: 3 / 2 / 1 columns across desktop / tablet / phone
  Ordering information
  Contact

Business B
  Header
  Introduction | business photo
  Two spacious product presentations
  Ordering information
  Contact
```

On phones, stack content without horizontal scrolling. Keep introductions short.
Headers wrap instead of introducing a hamburger menu. Business layouts remain
explicit choices, independent of accent colour and product count.

Each product has an image, name, short description, optional options, price label,
and inquiry action. Product photos use `object-fit: contain`; portrait and business
photos can crop. Larger views fit portrait and landscape photos inside the viewport.

## 4. Interactions and placeholders

- Native image-viewer dialog: accessible name, close button, Escape, background
  dismissal, keyboard focus containment, and focus restoration.
- Valid Messenger links open the relevant business inbox. Do not promise prefilled
  messages or that product context reaches a human.
- Missing Messenger addresses lead to an honest contact-unavailable notice on the
  same page, without a new tab or an invented account.
- Leave phone, location, hours, and prices empty until supplied; hide absent optional
  contact fields. Missing prices show “Ask for price”.
- A small preview notice identifies placeholder content. This is not launch-ready.
- Local SVG placeholders have accurate alt text; missing photos use a fallback.
- Do not invent testimonials, origin stories, production, or delivery promises.
- Respect reduced motion, visible focus, and touch targets of at least 44px.

## 5. Content maintenance

| File | What to edit |
|---|---|
| `data/site.js` | Mom's name, introduction, story, portrait, contact details |
| `data/businesses.js` | Names, descriptions, photos, Messenger URLs, ordering notes |
| `data/products.js` | Product names, descriptions, prices, options, image paths |
| `assets/img/` | Photos; product folders are separated by business |
| Three HTML pages | Static fallback text and metadata before the real launch |

Use `PLACEHOLDER:` comments. Site data has `preview: true`; turn it off after swapping
samples. Prices are numbers in Philippine pesos or `null`; `priceFrom: true` adds
“From”. `showPrices: false` hides a business's prices. Array order sets product order.
Keep one clear object per product so content edits need no rendering-code changes.

No build step means HTML headers, footers, metadata, and fallback text are duplicated.
Data updates change rendered content but do not rewrite HTML. Products still need
JavaScript; show an honest no-JavaScript note. Do not claim automatic metadata sync
or crawler-visible product copy.

## 6. Implementation and verification

1. Replace fictional copy with lorem ipsum and empty contact values.
2. Rebuild shared styles and three page layouts; align the 404 page and favicon.
3. Add the image viewer and missing-contact behaviour.
4. Check rendering, price modes, inquiry destinations, missing-image fallback,
   active navigation on `.html` and extensionless routes, and viewer controls.
5. Inspect desktop and phone views, keyboard focus, and actual contrast.
6. Record real verification results. The old unavailable 44-assertion harness is
   not evidence of the redesign's correctness.

## 7. Netlify and launch

The current configuration publishes the repository root without a build command
and maps `/business-a` and `/business-b` to their HTML files. Keep that configuration.
A local preview does not prove live Netlify routing.

Before a real launch:

- Replace lorem ipsum, photo placeholders, and preview metadata.
- Confirm categories, prices, ordering, and delivery claims.
- Set and test both real Messenger destinations on a phone.
- Add a phone only if Mom wants it public.
- Update the domain in robots, sitemap, and page share metadata.
- Provide a raster share image and check its live preview.
- Set `preview: false` and remove placeholder-page `noindex` metadata.
- Connect the intended Git repository to Netlify; verify routes, images, fonts,
  contacts, and the nested-path 404 on the actual deployment.

Success: a visitor can identify the businesses, inspect a product, understand its
price mode, and reach the right inbox. No analytics is included.

## 8. Out of scope

Cart, checkout, payments, forms, search, filters, carousel, CMS, analytics,
newsletter, blog, language toggle, and custom domain. Real copy and photography are
deferred by the user's choice, not implementation blockers.

## 9. Verification record

Implemented the agreed redesign on 11 October 2026. Checks completed:

- All four JavaScript files pass `node --check`; SVG files parse as XML.
- Static page checks pass for local asset paths, anchors, unique IDs, and one H1.
- Browser review at 1280px, 820px, 390px, and 320px: no horizontal overflow in
  checked layouts; A renders 12 products, B renders two. Tablet A has two columns.
- Image viewer opens, closes by button/Escape/backdrop, contains Tab focus,
  restores focus to the triggering photo, and releases the page scroll lock.
- Missing Messenger links lead to the contact notice in the same tab.
- Temporary browser fixtures verify fixed, starting, zero, missing, and hidden
  prices; missing-image fallback; empty catalogue; phone-label updates; invalid
  contact URLs; and inquiry routing independent of the business colour.
- Active navigation works for `.html` and locally simulated extensionless routes.
- Main text contrast: ink/yellow 8.57:1; brown/light-yellow 7.10:1;
  green/light-yellow 7.17:1; white/green buttons 7.64:1. Two placeholder image
  labels were darkened after their original colours failed normal-text contrast.
- No console warnings or errors in the final normal-page browser check.

These browser checks used temporary fixtures; no automated regression suite was
added. No live Netlify deployment or real Messenger handoff has been verified.
