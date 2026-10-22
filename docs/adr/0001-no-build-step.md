# No build step: publish the repository directly

The site uses plain HTML, CSS, and JavaScript, with three content pages and a
separate 404 page. Netlify publishes the repository root without a build command.
This keeps maintenance limited to editing files and pushing changes.

The trade-off is duplicated headers, footers, and fallback copy. Editable data
updates rendered content but does not update HTML metadata. Products are rendered
by JavaScript; personal and business fallback text also exists in HTML.

A generator such as Eleventy or Astro was considered and rejected because it adds
a toolchain for this small site. Revisit that choice if duplicated content becomes
costly, another language is required, or product copy must exist in raw HTML.

Documentation corrected 13 October 2026: earlier references to five pages and a
fixed number of duplicated lines were stale. The no-build decision is unchanged.
