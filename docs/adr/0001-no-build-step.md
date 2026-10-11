# No build step: the repository is the deployed artefact

The site is plain HTML, CSS and JavaScript served exactly as committed. There is no
`package.json`, no bundler, no templating step and no `npm install` — Netlify publishes the
repository root directly.

The cost is real and shows up in the markup: because there is no templating, the header,
navigation and footer are duplicated across the three page shells, and the business names
appear in both `data/businesses.js` and the HTML. That is roughly 26 lines of duplicated
content, and it is the reason "rename a business in one file" is not literally true.

We accepted that cost because the alternative — a generator — adds a toolchain, a build
step and a dependency tree to a five-page brochure site, and because the person maintaining
it should be able to open a file, edit text and push. **This decision should be revisited,
and this ADR superseded, at the point the duplication starts costing more than the
toolchain would:** a fourth page, a second language, or any content that must appear in
more than three places.

**Considered options**: Eleventy or Astro with a layout include (rejected: build step and
dependencies for five pages); a client-side include fetched at runtime (rejected: content
not present in HTML source, worsens exactly the problem it would solve); PHP or server-side
includes (rejected: no server).

**Consequences**: product and business content is rendered client-side, so it is absent
from the raw HTML. Any future requirement for crawler-visible product copy forces either a
generator or pre-rendered markup.
