# Mom's website

A personal website for Mom to introduce herself and showcase products from two businesses. Visitors can browse products, enlarge photos, and contact each business through Messenger once its link is configured.

The design uses yellow as the main colour, with green and brown accents and a light, natural feel. The site uses plain HTML, CSS, and JavaScript. There is no build step, package installation, checkout, or payment system.

## Current status

This is a preview with lorem ipsum text and placeholder images. Real business names, product details, prices, and contact links still need to be supplied. Search indexing is disabled with `noindex` metadata until the content is ready.

## Preview locally

From the project folder, run:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [the local homepage](http://127.0.0.1:8000/index.html). Stop the server with `Ctrl+C`.

Use `/business-a.html` and `/business-b.html` locally. The shorter routes `/business-a` and `/business-b` are configured for Netlify.

## Edit the content

Mom supplies the photos and descriptions; the site owner updates these files:

| File | What to edit |
| --- | --- |
| `data/site.js` | Mom's name, introduction, story, portrait, and contact details |
| `data/businesses.js` | Business names, descriptions, cover photos, Messenger links, and price visibility |
| `data/products.js` | Product names, descriptions, photos, prices, and variants |
| `assets/img/` | Portrait, business photos, and product photos |
| `assets/css/styles.css` | Colours, typography, spacing, and responsive layout |
| `index.html`, `business-a.html`, `business-b.html`, `404.html` | Static text, page titles, and metadata |

To add a product, copy an existing object in `data/products.js`. Give it a unique `id`, set `business` to `'a'` or `'b'`, and update its content. Products appear in array order.

- Set `price` to a number in Philippine pesos, or `null` for “Ask for price.”
- Set `priceFrom: true` for a starting price.
- Set a business's `showPrices: false` to hide its product prices.
- Update both `image` and `alt` when replacing a photo. Alt text should describe the image.
- Set each business's `messenger` to its real link, such as `https://m.me/your-page-name`. Empty links direct visitors to the contact note.

Keep quotation marks, commas, and brackets intact when editing JavaScript. Save and refresh the local preview to check changes.

## Publish through GitHub and Netlify

Push the project to your GitHub repository. Then, in Netlify, choose **Add new project → Import an existing project**, connect GitHub, and select this repository.

Use these settings:

| Setting | Value |
| --- | --- |
| Production branch | `master` |
| Base directory | Leave blank |
| Build command | Leave blank |
| Publish directory | `.` |
| Environment variables | None required |

The publish directory and business page routes are already configured in `netlify.toml`. Netlify also uses the root `404.html` for missing pages.

See [Netlify's repository deployment guide](https://docs.netlify.com/start/quickstarts/deploy-from-repository/) for the dashboard workflow.

After GitHub authentication and the initial connection are complete, publish future edits with:

```bash
git add README.md
git commit -m "Add project README"
git push
```

For later updates, replace `README.md` with the files you changed and use a commit message that describes the update. Netlify automatically deploys pushes to the connected production branch.

## Before sharing the finished website

- Replace all lorem ipsum text and placeholder images, including static HTML text.
- Add and test the real Messenger links and any other contact details.
- Review product descriptions, prices, and image alt text.
- Update page titles, descriptions, social sharing images, and example domain references in `robots.txt` and `sitemap.xml`.
- Set `preview: false` in `data/site.js` and remove the `noindex` metadata from pages intended for search results.
- Check the deployed site on a phone, including both business pages, photo viewers, contact links, and the missing-page response.

See [PLAN.md](PLAN.md) for the agreed scope, design decisions, and verification notes.
