# Winnie Works

A personal showcase for Winnie, Personalized Balloon Art, and Unicity Products,
built with plain HTML, CSS, and JavaScript. No build step or package installation is required.

**Live preview:** [winnieworks.netlify.app](https://winnieworks.netlify.app/)

The local preview uses English copy, 12 sample balloon designs, and separate
Bios Life S and Unimate Lemon entries. The supplied Unicity image is included;
other photos, prices, and Messenger links are pending. Search indexing remains
disabled with `noindex`. Publish the local changes to update the live preview.

## Run locally

From the project folder:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [the homepage](http://127.0.0.1:8000/index.html). Use the `.html` business links
locally. Stop the server with `Ctrl+C`.

## Edit content

Mom supplies the photos and descriptions; you update the files.

| File | Content |
| --- | --- |
| `data/site.js` | Website name, Winnie's introduction, story, portrait and contact details |
| `data/businesses.js` | Business names, photos, Messenger links, ordering notes |
| `data/products.js` | Products, prices, variants, image paths and alt text |
| `assets/img/` | Photos and placeholder images |
| Root HTML files | Static fallback text, page titles and sharing metadata |

Copy a product object to add one, assign a unique `id`, and set `business` to `a`
or `b`. Products appear in array order. Use a numeric peso price or `null` for
“Ask for price”; `priceFrom: true` adds “From”. A business's `showPrices: false`
also displays “Ask for price”. Replace image paths and alt text together.

The shared design lives in `assets/css/styles.css`. Fonts are hosted locally; keep
their licence files when updating them. Motion follows the visitor’s reduced-motion setting.

## Publish updates

Preview your edits, then review and commit the intended files:

```bash
git status --short
git diff
# Replace these example paths with the files you changed.
git add data/site.js data/businesses.js data/products.js
git commit -m "Update website content"
git push
```

Netlify deploys updates through the connected GitHub repository. The configuration
publishes `.` with no build command. Check the deploy result and live pages after
pushing.

See [PLAN.md](PLAN.md) for the rebuild specification, full content fields,
verification checklist, and remaining launch work.
