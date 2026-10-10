/* ---------------------------------------------------------------------------
 * BUSINESSES — one entry per business.
 * If you rename a business here, nothing else needs editing: the landing page,
 * navigation, and footers all read their labels from this file.
 * ------------------------------------------------------------------------- */

window.BUSINESSES = {
  a: {
    name: 'Ink & Thread',                          // PLACEHOLDER
    tagline: 'Personalized gifts, made to order \u2014 names, photos and inside jokes included.', // PLACEHOLDER
    blurb: 'Every piece is made after you message us, so it\u2019s yours and nobody else\u2019s. Pick something from the list, or bring us an idea and we\u2019ll make it real.', // PLACEHOLDER
    eyebrow: 'Personalized products, made to order', // PLACEHOLDER
    theme: 'green',            // 'green' | 'brown'
    layout: 'grid',            // 'grid' | 'showcase'
    messenger: '',             // PLACEHOLDER  e.g. 'https://m.me/inkandthread'
    heroImage: 'assets/img/business-a-hero.svg',
    showPrices: true,
    orderSteps: true,
    customOrderCard: true,
    emptyNote: 'Products are being photographed \u2014 message us and we\u2019ll share what\u2019s available.',
  },

  b: {
    name: 'Sunrise Pantry',                        // PLACEHOLDER
    tagline: 'Two things, made properly.',         // PLACEHOLDER
    blurb: 'A small, focused line. When it\u2019s gone it\u2019s gone \u2014 message us to check what\u2019s in stock.', // PLACEHOLDER
    eyebrow: 'Small batch, made with care',        // PLACEHOLDER
    theme: 'brown',            // 'green' | 'brown'
    layout: 'showcase',        // 'grid' | 'showcase'
    messenger: '',             // PLACEHOLDER  e.g. 'https://m.me/sunrisepantry'
    heroImage: 'assets/img/business-b-hero.svg',
    showPrices: true,
    orderSteps: false,
    customOrderCard: false,
    orderNote: 'How to order: message us on Facebook and we\u2019ll confirm what\u2019s available.',
    emptyNote: 'Products are being photographed \u2014 message us and we\u2019ll share what\u2019s available.',
  },
};
