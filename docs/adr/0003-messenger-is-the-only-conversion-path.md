# Product inquiries use Messenger

Updated 11 October 2026: the user confirmed a personal and product showcase with
Messenger inquiries. Navigation and photo-viewer controls have their own actions.
Business categories are still unknown, so the earlier made-to-order rationale is
not a verified claim about Mom's products. Missing Messenger addresses must lead to
a clear contact-unavailable notice, not an invented destination. Do not promise
prefilled messages or automatic product context in the inbox.

## Earlier decision

There is no cart, no checkout, no payment integration and no contact form. Every CTA on the
site — header, hero, product card, custom-order callout, footer — opens a Facebook
Messenger conversation with the relevant Page. Business A and Business B each have their own
Page and their own inbox.

A landing page with no way to buy looks unfinished to a technical reader. It is deliberate:
these are made-to-order and personalized goods, so the real transaction is a conversation
about size, colour, personalization, price and lead time. A checkout would be a worse
experience than the conversation it replaced, and no form we build will ever beat the inbox
she already checks on her phone.

**Consequences**: the site cannot report a conversion, because the conversion happens
entirely inside Messenger. Links carry `?ref=website-<product-id>` so the *origin* is at
least machine-readable, but `ref` reaches inbox tooling — a bot or a CRM — and not a human
reading Messenger. With no analytics either, there is currently no measurement of whether
the site produces enquiries at all.

**Considered options**: a Netlify Form (rejected: forms mail a stranger, Messenger is where
she already replies, and it adds a spam surface); WhatsApp `wa.me` (rejected: it does
support true pre-filled text, unlike Messenger, but this market uses Messenger); a
third-party chat widget (rejected: third-party request on a site that currently makes none).
