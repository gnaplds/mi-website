# Website rebuild specification

Updated 23 October 2026. This document describes how to rebuild the current
website from scratch. The current HTML, CSS, JavaScript, data, and Netlify
configuration are the source of truth. It does not propose a new design.

The website is deployed at [winnieworks.netlify.app](https://winnieworks.netlify.app/).
The local copy uses English text based on the confirmed businesses and the approved
23 October visual refinement. Publishing these local changes is a separate step. Placeholder photos, empty Messenger
addresses, and `noindex` metadata remain; the site is still a preview.

## 1. Purpose and scope

Introduce Mom and showcase products from her two businesses. Visitors can learn
about her, browse products, enlarge photos, and inquire through each business's
Messenger link once configured. Mom supplies content; the site owner edits files.
Prioritise visitors opening a shared link on a phone.

Preserve three content pages and a separate missing-page screen. Use plain HTML,
CSS, and JavaScript with local images and fonts. There is no framework, package
installation, build step, CMS, backend, or database.

The approved identity is **Winnie Works**, with **Winnie** as the person featured.
Business A is **Personalized Balloon Art**: personalized balloon art carefully made
by Winnie by hand. It has 12 clearly labelled sample ideas organised by occasion,
not a confirmed catalogue. Each has a placeholder photo, name, short description,
price-on-request label, and contact button. There are no invented sizes or materials.

Business B is **Unicity Products**: Winnie resells products made by Unicity. Show
**Bios Life S** and **Unimate Lemon** separately, not as a bundled product. Descriptions
state the form and flavour shown on the supplied packaging; avoid health-result
promises or claims that this is Unicity’s official site. The combined image supplied
by the owner appears in the business introduction and homepage entrance. Individual
product photos, balloon photos, and Winnie’s portrait remain placeholders.

Use warm, simple, first-person English for Winnie’s introduction and story. Sample
copy replaces the earlier requirement for filler text. Prices, availability,
preparation times, service areas, and delivery terms remain unconfirmed. Leave
variants empty until real options are supplied; do not invent business claims.

Product naming was checked against the official Philippine listings for
[Bios Life S / Balance](https://shop.unicity.com/phl/en/product/balance) and
[Unimate](https://shop.unicity.com/phl/en/product/unimate). Keep the pictured name
Bios Life S and the Lemon flavour; do not import other flavours, prices, or claims.

Excluded: cart, checkout, payments, forms, search, filters, carousel, individual
product pages, analytics, newsletter, blog, language toggle, and custom domain setup.

## 2. Pages and navigation

| Page | Structure, in display order |
| --- | --- |
| `index.html` | Header; yellow introduction and framed portrait; preview notice; two business entrances; personal story; contact footer |
| `business-a.html` | Header; back link and business introduction/photo; preview notice; product grid; ordering information; contact footer |
| `business-b.html` | Same sections as A, with large alternating product presentations |
| `404.html` | Simplified name header; missing-page explanation; links home and to both businesses |

The main header links home through Winnie Works and the botanical mark, to both
business pages, and to the page's contact footer. The homepage hero links to businesses. Business introductions link to products and the business's inquiry action.
The footer includes both businesses, optional personal contact details, the current
year, a back-to-top link, and optional site credit.

Use `.html` navigation links so ordinary local hosting works. Netlify also serves
`/business-a` and `/business-b` through configured rewrites. Mark the current business
navigation link with `aria-current="page"` for either URL form. Use root-relative
asset and navigation paths on the 404 page so nested missing paths work.

## 3. Visual specification

The approved direction is a warm handmade boutique: minimal, personal, and calm.
Yellow remains the main colour, with green and brown accents and a light, natural
feel. Keep broad yellow headers, introductions, and contact footers, pale-yellow
content backgrounds, and short, left-aligned text. Winnie introduces both businesses
with equal emphasis on the homepage.

| Token | Value | Role |
| --- | --- | --- |
| Yellow | `#F1CD63` | Main yellow surfaces |
| Paper | `#FFF9E8` | Page and dialog backgrounds |
| Green | `#315B3B` | Primary buttons, links, Business A product headings |
| Brown | `#6B5033` | Supporting text, Business B product headings |
| Ink | `#30271E` | Main text and focus outlines |
| White | `#FFFFFF` | Photo surfaces and primary button text |
| Line | `#DED3B6` | Subtle borders and dividers |

Use locally hosted Bricolage Grotesque at weight 500 for display headings, the
wordmark, portrait caption, homepage business names, and Business B product names.
Use Source Sans 3 at weights 400, 600, and 700 for body text, controls, and the
remaining headings. Preserve both font licences and source notes in `assets/fonts/`.
The website makes no external font requests.

Body text is 18px with 1.6 line height, reducing to 17px on phones. Paragraphs have
a maximum width of 65ch. Display headings use responsive sizes and medium weight;
the homepage heading is capped at 4.75rem and business headings at 3.55rem. Keep
product descriptions readable and controls at least 44px tall. Buttons are rounded;
photo corners are restrained. Product cards have no enclosing panels or shadows.

The main container is capped at 1160px. Desktop horizontal margins are at least
48px, tablet margins 32px, and phone margins 20px. The portrait has a paper frame,
a faint shadow, and a 1.5-degree rotation. One still balloon-and-string outline
sits beside the balloon business introduction photo; it is decorative, hidden
from assistive technology, and does not receive pointer events. Do not repeat it
throughout the catalogue or put it on Unicity's page.

Business introductions are compact so visitors reach the products sooner. Their
images are capped at 380px wide, with a 16:10 crop on larger screens and a 12:5 crop
on phones. Check each replacement photograph's crop. Homepage business images
remain 16:10; product photos remain 4:3 with `object-fit: contain`. The photo viewer
contains the full image.

```text
Home, wide:      [Winnie's introduction] [framed portrait]
                [Balloon Art entrance] [Unicity entrance]
                [about Winnie]         [story]
Business, wide: [title, copy, actions]  [compact photo]
                [product grid or alternating showcase rows]
Phone:          the same content stacked, in reading order
```

| Viewport | Layout |
| --- | --- |
| Above 1050px | Three-column product grid; paired introduction, business entrance, story, and footer sections |
| 761–1050px | Two-column product grid; paired sections remain |
| 760px and below | One-column product grid; main sections stack; navigation wraps without a hamburger menu |

Business B alternates image sides in its wide presentation rows, then places every
image before its text on phones. Keep layout and theme as independent settings;
neither product count nor colour selects the business or inquiry destination.

Motion is a small enhancement: one 520ms introduction entrance, 160ms colour
transitions on buttons and photo controls, and a 180ms photo-dialog entrance.
Closing the dialog remains immediate. There are no repeating animations or
individual product scroll reveals. Put all animation, transitions, and smooth
scrolling inside `prefers-reduced-motion: no-preference`; content is visible and
usable without motion or JavaScript-driven animation.

## 4. Content and file responsibilities

| File | Responsibility |
| --- | --- |
| Root HTML files | Semantic page shells, static fallback copy, metadata, navigation, contact markup, business-page dialogs |
| `assets/css/styles.css` | Shared typography, palette, layouts, responsive rules, focus styles, photo viewer |
| `assets/js/main.js` | Bind content, render products, format prices, wire contacts, manage photo viewer and active navigation |
| `data/site.js` | Personal content in `window.SITE` |
| `data/businesses.js` | Business records in `window.BUSINESSES`, keyed by `a` and `b` |
| `data/products.js` | Ordered product records in `window.PRODUCTS` |
| `assets/img/` | Portrait, business photos, product placeholder and sharing image; currently a flat directory |
| `assets/fonts/` | Local fonts, licence and source notes |
| `netlify.toml` | Root publication and business route rewrites |
| `robots.txt`, `sitemap.xml`, `favicon.svg` | Crawler references and site icon |

Load deferred scripts in this order: site, businesses, products, shared behaviour.
The 404 page omits product data. Business page bodies identify the business with
`data-business`; data attributes on page elements identify content bindings.
Use text content when inserting editable copy, rather than interpreting it as HTML.

### Personal content

`SITE` contains `preview`, `siteName`, `momName`, `headline`, `introduction`, `story`,
`storyClosing`, `portrait`, `portraitAlt`, and `footerNote`. Optional fields are
`phone`, `phoneLabel`, `hours`, `location`, and `credit`.

`siteName` labels the wordmark; `momName` labels the portrait and copyright.
Empty optional fields remain hidden. A supplied phone becomes a `tel:` link, using
`phoneLabel` when present. Only `preview: false` hides the preview notice; this
setting does not change search metadata.

### Business content

Each business contains `name`, `tagline`, `theme`, `layout`, `messenger`,
`heroImage`, `heroAlt`, `showPrices`, and `orderNote`. A uses `green` and `grid`;
B uses `brown` and `showcase`. The ordering note is editable information, not an
ordering workflow. Current Messenger values are empty.

### Product content

Each product has a unique `id`, a `business` key (`a` or `b`), `name`, `desc`,
`price`, `priceFrom`, `image`, `alt`, and a `variants` array of plain strings.
Filter by business and preserve array order. Render variants as informational text,
without selectors. Omit empty descriptions and variant lists.

| Price data | Display |
| --- | --- |
| Non-negative numeric price | Peso amount, with Philippine number formatting and up to two decimal places |
| Valid price and `priceFrom: true` | “From” before the amount |
| Zero | `₱0` |
| Missing, empty, invalid, or negative price | “Ask for price” |
| Business `showPrices: false` | “Ask for price”; the price label remains visible |

Use numbers or `null` in maintained data, although the renderer also converts numeric
strings. Current sample prices are all `null`. Display a product count with singular
or plural wording. For an empty catalogue, show “There are no products to show yet.”
and hide the count.

Data changes update the rendered page, not the HTML source or metadata. Shared
headers and footers are duplicated. Maintain static fallback copy and page metadata
alongside data changes. Products require JavaScript; business pages provide a
`noscript` explanation. Do not promise crawler-visible product copy or automatic
metadata synchronisation.

## 5. Interactions and accessibility

Product photos are buttons with accessible names. They open a native modal dialog
with the larger photo, product name, description, and a focused Close button.
Close by button, Escape, or clicking outside the dialog bounds. Keep the background
inert, contain keyboard focus, prevent background scrolling, and return focus to
the triggering photo after closing. There is no carousel or separate detail page.

For configured inquiries, accept HTTPS URLs on `m.me`, `messenger.com`, or
`www.messenger.com`. Open them in a new tab with `noopener noreferrer` and an
accessible new-tab notice. Product links add `ref=website-<product-id>`; this does
not promise a prefilled message or product context visible to a human recipient.

Product inquiry links are styled as outline buttons.
Missing or invalid destinations display “Contact details” and link to the same-page
`#contact-note`. The shared notice names the unavailable business when exactly one
is missing, uses a general notice when both are missing, and hides when both are
configured. Navigation and photo controls keep their own actions.

Preserve skip links, semantic headings, visible focus outlines, descriptive image
alt text, and at least 44px targets for the main controls. Smooth scrolling, entrance animation, and control transitions apply
only when reduced motion is not requested. Product images load lazily. Missing
photos use `/assets/img/placeholder.svg` and an honest unavailable-image alt text.

## 6. Rebuild sequence and acceptance checks

1. Create the four HTML shells, local assets, and three editable data files.
2. Reproduce the shared palette, typography, page composition, and responsive rules.
3. Bind personal/business content and render both product layouts and price modes.
4. Add contact routing, photo dialogs, image fallback, and empty states.
5. Restore metadata, crawler files, favicon, and the Netlify configuration.
6. Verify the following before treating a rebuild as equivalent.

- Check local assets and anchors, one H1 per page, and no duplicate IDs.
- Check JavaScript syntax and normal-page browser console errors.
- Inspect all pages at 1280px, 820px, 390px, and 320px. Confirm grid columns,
  stacked layouts, readable text, and no horizontal overflow.
- Confirm A shows 12 sample products and B shows two in the configured order.
- Exercise fixed, starting, zero, missing, invalid, and suppressed numeric prices;
  empty catalogues; optional contact fields; and missing photos.
- Verify inquiry destinations remain tied to business identity when themes change.
  Check valid and invalid URL cases and same-tab fallback notices.
- Open and close photos using pointer and keyboard; check focus containment,
  focus return, scroll lock release, and portrait/landscape image fitting.
- Check text contrast, visible focus, reduced motion, and no-JavaScript notices.
- On Netlify, check `.html` and extensionless business routes, assets, and a nested
  missing path such as `/missing/page` returning the styled 404 with HTTP 404 status.

These are acceptance criteria, not claims of a new test run. The original redesign
received manual browser and temporary-fixture checks on 11 October 2026; there is no
retained automated regression suite. On 23 October, the live homepage and both business
pages loaded, and a product photo opened and closed during review. Full live routing
and real Messenger handoff still need separate verification after publishing.

### English copy update checks — 23 October 2026

The local update passed JavaScript syntax checks, HTML/data copy consistency,
asset and anchor checks, unique IDs, one H1 per page, and SVG parsing. No filler
text remains in the page HTML, data files, or sharing SVG. The supplied Unicity
image is copied unchanged.

All four pages were checked at 320px, 390px, 820px, and 1280px without horizontal
overflow. The balloon grid retains its 1/2/3-column behaviour. The browser renders
12 sample balloon designs and two Unicity products; the combined image loads.
The balloon photo viewer opens with the correct copy, closes with Escape, returns
focus, and releases scroll lock. Product contact buttons reach the unavailable
notice in the same tab. No browser warnings or errors appeared in this check.
These local checks do not constitute publication or a real Messenger test.

### Visual refinement checks — 23 October 2026

All four pages were checked at 320px, 820px, and 1280px without horizontal
overflow. The homepage and both business introductions were also inspected at
390px. The product counts and 1/2/3-column balloon grid remain correct. The new
local font loads, the packaging remains visible in the compact image frame, and
no page image failures were found in the browser checks.

The balloon photo viewer was opened with the keyboard. Its title, initial Close
focus, Tab containment, Escape close, returned focus, and released scroll lock
passed. The product contact button still reaches the unavailable-contact notice.
The dialog entrance animation is active. Motion declarations were reviewed to
apply only when reduced motion is not requested; the operating-system preference
was not emulated during these checks.

Main text pairs meet 4.5:1 contrast or better, including the darkened brown on
yellow. JavaScript syntax, local asset links, same-page anchors, unique IDs, one
H1 per page, SVG parsing, and whitespace checks passed. The font's medium weight
and optical-size axis were verified. These checks apply to the local version;
the design has not been committed or deployed.

## 7. Deployment and remaining content launch work

Keep `publish = "."` and no build command. Preserve the two status-200 business
rewrites in `netlify.toml` and the root `404.html`. Local Python hosting serves
`.html` pages but does not reproduce Netlify routing. See [README.md](README.md)
for local preview and routine publishing commands.

Before presenting the site as the finished business website:

- Review the English sample copy with Winnie and replace sample balloon ideas with
  her actual catalogue when available. Keep static HTML copy in sync.
- Replace remaining placeholder photos.
- Confirm product details, prices, availability, and ordering/delivery terms.
- Configure both real Messenger destinations and test them on a phone.
- Add personal phone, hours, or location only if Mom wants them public.
- Review the English page titles, descriptions, and sharing metadata. Supply a
  suitable raster share image and check its live preview.
- Replace `example.netlify.app` in `robots.txt` and `sitemap.xml` with the actual
  deployment domain. A custom domain is not required.
- Set `preview: false` and remove `noindex` from the three content pages once ready
  for search indexing; retain `noindex` on the 404 page.
- Check the deployed pages, fonts, photos, contacts, routes, and 404 response.

These are pending launch tasks. The current design and approved English preview
content form the rebuild baseline; contact details and catalogue approval remain open.
