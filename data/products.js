/* ---------------------------------------------------------------------------
 * PRODUCTS — one object per item. Rendered by assets/js/main.js.
 *
 *   id         unique string; also the image filename (assets/img/products/<business>/<id>.jpg)
 *   business   'a' | 'b'
 *   name       shown as the card title
 *   desc       one line. Keep it to one line.
 *   price      a number, or null for "Message us for price"
 *   priceFrom  true renders "Starting at ₱N"
 *   image      path to the photo. If the file is missing, the generic
 *              placeholder.svg is shown instead — nothing looks broken.
 *   alt        describe the photo for screen readers (and for when it fails to load)
 *   variants   optional lines rendered as chips, e.g. 'Size: S / M / L'
 *   tags       reserved for future categories; unused in v1
 *
 * Business A's places here are LOREM-style stand-ins. Replace name/desc/price/
 * variants and drop real photos into assets/img/products/a/ using the same ids.
 * ------------------------------------------------------------------------- */

window.PRODUCTS = [
  /* ------------------------------- Business A ---------------------------- */
  {
    id: 'a-01',
    business: 'a',
    name: 'Custom Name Mug',                      // PLACEHOLDER
    desc: 'Glossy ceramic mug with any name, date or short line on it.',
    price: 250, priceFrom: false,
    image: 'assets/img/products/a/a-01.jpg',
    alt: 'Custom printed ceramic mug on a wooden table',
    variants: ['Size: 11oz / 15oz', 'Colour: white, black'],
    tags: [],
  },
  {
    id: 'a-02',
    business: 'a',
    name: 'Personalized T-Shirt',                 // PLACEHOLDER
    desc: 'Your text, photo or drawing printed on a soft cotton tee.',
    price: 450, priceFrom: true,
    image: 'assets/img/products/a/a-02.jpg',
    alt: 'Folded cotton t-shirt with a printed design',
    variants: ['Size: S \u2013 2XL', 'Print: name, photo, text'],
    tags: [],
  },
  {
    id: 'a-03',
    business: 'a',
    name: 'Embroidered Tote Bag',                 // PLACEHOLDER
    desc: 'Heavy canvas tote with a stitched name or little motif.',
    price: 380, priceFrom: false,
    image: 'assets/img/products/a/a-03.jpg',
    alt: 'Canvas tote bag with embroidered lettering',
    variants: ['Colour: natural, black', 'Font: script, block'],
    tags: [],
  },
  {
    id: 'a-04',
    business: 'a',
    name: 'Engraved Wooden Keychain',             // PLACEHOLDER
    desc: 'Laser-engraved name or coordinates on solid wood.',
    price: 120, priceFrom: false,
    image: 'assets/img/products/a/a-04.jpg',
    alt: 'Small wooden keychain with engraved text',
    variants: [],
    tags: [],
  },
  {
    id: 'a-05',
    business: 'a',
    name: 'Custom Photo Frame',                   // PLACEHOLDER
    desc: 'Printed with your photo and a line of your choosing.',
    price: 350, priceFrom: false,
    image: 'assets/img/products/a/a-05.jpg',
    alt: 'Photo frame holding a printed picture',
    variants: ['Size: 4R / 5R / A4'],
    tags: [],
  },
  {
    id: 'a-06',
    business: 'a',
    name: 'Name Necklace',                        // PLACEHOLDER
    desc: 'Cut-to-order pendant with a name in your chosen script.',
    price: 550, priceFrom: true,
    image: 'assets/img/products/a/a-06.jpg',
    alt: 'Necklace with a cut-out name pendant',
    variants: ['Finish: gold, silver', 'Chain: 16\" / 18\"'],
    tags: [],
  },
  {
    id: 'a-07',
    business: 'a',
    name: 'Personalized Tumbler',                 // PLACEHOLDER
    desc: 'Insulated tumbler engraved with a name or short design.',
    price: 480, priceFrom: true,
    image: 'assets/img/products/a/a-07.jpg',
    alt: 'Insulated steel tumbler with engraved lettering',
    variants: ['Size: 500ml / 750ml', 'Colour: matte black, cream, green'],
    tags: [],
  },
  {
    id: 'a-08',
    business: 'a',
    name: 'Custom Journal',                       // PLACEHOLDER
    desc: 'Fabric or leatherette cover with a name and title.',
    price: 320, priceFrom: false,
    image: 'assets/img/products/a/a-08.jpg',
    alt: 'Notebook with a custom printed cover',
    variants: ['Pages: lined, dotted, blank'],
    tags: [],
  },
  {
    id: 'a-09',
    business: 'a',
    name: 'Family Name Wall Sign',                // PLACEHOLDER
    desc: 'Painted wooden sign with your family name and a date.',
    price: 890, priceFrom: true,
    image: 'assets/img/products/a/a-09.jpg',
    alt: 'Painted wooden wall sign with a family name',
    variants: ['Size: 30cm / 45cm / 60cm'],
    tags: [],
  },
  {
    id: 'a-10',
    business: 'a',
    name: 'Personalized Baby Blanket',            // PLACEHOLDER
    desc: 'Soft blanket printed with a name, birth date and weight.',
    price: 650, priceFrom: false,
    image: 'assets/img/products/a/a-10.jpg',
    alt: 'Soft folded baby blanket with a printed name',
    variants: ['Size: 70x90cm / 90x120cm'],
    tags: [],
  },
  {
    id: 'a-11',
    business: 'a',
    name: 'Custom Desk Mat',                      // PLACEHOLDER
    desc: 'Large mouse pad printed with your art, logo or photo.',
    price: 290, priceFrom: false,
    image: 'assets/img/products/a/a-11.jpg',
    alt: 'Desk mat with a printed design on a desk',
    variants: ['Size: 60x30cm / 80x40cm'],
    tags: [],
  },
  {
    id: 'a-12',
    business: 'a',
    name: 'Engraved Wine Glasses',                // PLACEHOLDER
    desc: 'A pair of glasses etched with names and a date.',
    price: 700, priceFrom: false,
    image: 'assets/img/products/a/a-12.jpg',
    alt: 'Two wine glasses with etched lettering',
    variants: ['Set of 2', 'Engraving: names + date'],
    tags: [],
  },

  /* ------------------------------- Business B ---------------------------- */
  {
    id: 'b-01',
    business: 'b',
    name: 'Signature Bottle',                     // PLACEHOLDER
    desc: 'The one we\u2019re known for, made in small batches.',
    price: 320, priceFrom: false,
    image: 'assets/img/products/b/b-01.jpg',
    alt: 'Product bottle on a plain background',
    variants: ['Size: 250ml / 500ml'],
    tags: [],
  },
  {
    id: 'b-02',
    business: 'b',
    name: 'Seasonal Limited Batch',               // PLACEHOLDER
    desc: 'Only made when the season allows. Ask what\u2019s in.',
    price: null, priceFrom: false,
    image: 'assets/img/products/b/b-02.jpg',
    alt: 'Seasonal product in its packaging',
    variants: ['Limited run'],
    tags: [],
  },
];
