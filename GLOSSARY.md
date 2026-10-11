# mi-website

One small business site for two small businesses run by the same person. It exists to
route a visitor to the right business and start a conversation. It is not a store, and it
never completes a transaction.

## Language

**Business**:
One of the two ventures the site routes between. There are exactly two, referred to as
Business A and Business B until real names exist.
_Avoid_: shop, store, brand, page

**Product**:
An item displayed on a business page. It is the unit an inquiry is *about*, not a
purchasable unit: there is no stock, no cart and no checkout.
_Avoid_: item, listing, SKU, article

**Variant**:
An informational line of options printed on a product, such as "Size: 11oz / 15oz". The
customer never selects one on the site; it tells them what to mention in the conversation.
_Avoid_: option, choice, attribute — those imply a selection the customer makes here, and
they do not make one.

**Inquiry**:
The only conversion event. A customer opening a Messenger conversation about a business
or a specific product. Everything on the site exists to cause one.

**Inquiry channel**:
The Messenger conversation an Inquiry happens in — one per Business, never shared. There is
no Order, Cart, Checkout or Payment in this domain; those are things that happen inside the
conversation, off-site, out of scope.

**Grid layout**:
How a business page renders when it has many Products: equal cards in a responsive
3/2/1-column grid.

**Showcase layout**:
How a business page renders when it has very few Products: full-width bands, one Product
each, image alternating sides. Chosen because one Product in a three-column grid looks
broken and empty.
_Avoid_: featured, hero, banner

**Theme**:
The accent colour set a business page resolves its accent tokens to — green-led for
Business A, brown-led for Business B. Its only job is making the current business obvious
at a glance.
_Avoid_: skin, palette (the Palette is the shared set of tokens both Themes draw from)

**Palette**:
The shared set of colour tokens both Themes draw from: cream, ink, muted, green, brown,
yellow, line.

**Placeholder**:
A value that is knowingly fake and must be replaced before launch. Two kinds: Group A
values only Mom can supply, Group B values we decide. There is currently no enforced marker
convention, so Placeholders cannot be found by searching — a known defect, see `PLAN.md`
§11.3.

**Mom**:
The person the site is for. She supplies content and never edits the repository.
