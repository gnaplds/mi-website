/* ---------------------------------------------------------------------------
 * main.js — the whole of the site's behaviour.
 *
 *   1. Fill in names, phone, year and credits from data/site.js + businesses.js
 *   2. Resolve every [data-messenger] link (header, footer, product cards) into a
 *      Messenger deep link, pre-filled with the product name where relevant
 *   3. Render the product list in the layout the business asks for
 *   4. Swap any missing photo for the generic placeholder instead of a broken icon
 *
 * No dependencies. No build step. Everything degrades to plain content when
 * JavaScript is off, except the product list (see the <noscript> note).
 * ------------------------------------------------------------------------- */

(function () {
  'use strict';

  var PLACEHOLDER_IMG = 'assets/img/placeholder.svg';
  var pageBusiness = document.body.getAttribute('data-business');
  var BUSINESSES = window.BUSINESSES || {};
  var PRODUCTS = window.PRODUCTS || [];
  var SITE = window.SITE || {};

  /* -- tiny DOM helpers ---------------------------------------------------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function peso(value) {
    var n = Number(value);
    if (isNaN(n)) return '\u20B1' + value;
    return '\u20B1' + n.toLocaleString('en-PH');
  }

  function priceLabel(item, biz) {
    if (biz && biz.showPrices === false) return 'Message us for price';
    if (item.price === null || item.price === undefined) return 'Message us for price';
    return item.priceFrom ? 'Starting at ' + peso(item.price) : peso(item.price);
  }

  /* -- 1. fill in static values from data --------------------------------- */

  document.querySelectorAll('[data-site]').forEach(function (node) {
    var value = SITE[node.getAttribute('data-site')];
    if (value) node.textContent = value;
  });

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll('[data-biz-name]').forEach(function (node) {
    var biz = BUSINESSES[node.getAttribute('data-biz-name')];
    if (biz && biz.name) node.textContent = biz.name;
  });

  document.querySelectorAll('[data-biz-tagline]').forEach(function (node) {
    var biz = BUSINESSES[node.getAttribute('data-biz-tagline')];
    if (biz && biz.tagline) node.textContent = biz.tagline;
  });

  document.querySelectorAll('[data-biz-blurb]').forEach(function (node) {
    var biz = BUSINESSES[node.getAttribute('data-biz-blurb')];
    if (biz && biz.blurb) node.textContent = biz.blurb;
  });

  document.querySelectorAll('[data-biz-eyebrow]').forEach(function (node) {
    var biz = BUSINESSES[node.getAttribute('data-biz-eyebrow')];
    if (biz && biz.eyebrow) node.textContent = biz.eyebrow;
  });

  document.querySelectorAll('[data-biz-note]').forEach(function (node) {
    var biz = BUSINESSES[node.getAttribute('data-biz-note')];
    if (biz && biz.orderNote) node.textContent = biz.orderNote;
  });

  document.querySelectorAll('[data-site-phone]').forEach(function (node) {
    if (!SITE.phone) return;
    node.setAttribute('href', 'tel:' + SITE.phone);
    if (!node.textContent.trim()) node.textContent = SITE.phoneLabel || SITE.phone;
  });

  /* -- 2. Messenger deep links -------------------------------------------- */

  function messengerUrl(bizKey, item) {
    var biz = BUSINESSES[bizKey];
    if (!biz || !biz.messenger) return null;

    var message = item
      ? 'Hi! I\u2019m interested in ' + item.name + '. Is this available?'
      : 'Hi! I\u2019d like to ask about your products.';

    // Meta documents `text` for m.me links but its platform policy forbids
    // pre-filling user messages, so treat the prefill as best-effort. `ref` is
    // the parameter Meta definitely supports: it's invisible to the customer
    // but reaches the Page's inbox tooling, so the product is still traceable
    // if the message box opens empty. Allowed charset: letters, numbers, - _ =
    var ref = 'website-' + (item ? item.id : 'general');

    var separator = biz.messenger.indexOf('?') === -1 ? '?' : '&';
    return biz.messenger + separator +
      'text=' + encodeURIComponent(message) +
      '&ref=' + encodeURIComponent(ref);
  }

  function wireMessengerLinks(scope) {
    (scope || document).querySelectorAll('[data-messenger]').forEach(function (node) {
      var key = node.getAttribute('data-messenger') || pageBusiness;
      var item = null;
      var productId = node.getAttribute('data-product');
      if (productId) {
        item = PRODUCTS.filter(function (p) { return p.id === productId; })[0] || null;
      }
      var href = messengerUrl(key, item);
      if (href) node.setAttribute('href', href);
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener');
    });
  }

  /* -- 3. product rendering ------------------------------------------------ */

  function photo(item) {
    var img = document.createElement('img');
    img.className = 'media-img';
    img.setAttribute('src', item.image || PLACEHOLDER_IMG);
    img.setAttribute('alt', item.alt || item.name || 'Product photo');
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
    img.setAttribute('width', '800');
    img.setAttribute('height', '600');
    img.addEventListener('error', function () {
      if (img.getAttribute('data-fallback')) return;
      img.setAttribute('data-fallback', '1');
      img.setAttribute('src', PLACEHOLDER_IMG);
    });
    return img;
  }

  function variantChips(item) {
    if (!item.variants || !item.variants.length) return null;
    var list = el('ul', 'chips');
    list.setAttribute('aria-label', 'Options');
    item.variants.forEach(function (variant) {
      list.appendChild(el('li', 'chip', variant));
    });
    return list;
  }

  function inquireButton(item, biz) {
    var link = el('a', 'btn btn-primary btn-block', 'Inquire on Messenger');
    link.setAttribute('href', '#contact');
    link.setAttribute('data-messenger', biz.theme === 'brown' ? 'b' : (pageBusiness || 'a'));
    link.setAttribute('data-product', item.id);
    return link;
  }

  function productCard(item, biz) {
    var card = el('article', 'card');
    var media = el('div', 'card-media');
    media.appendChild(photo(item));

    var body = el('div', 'card-body');
    body.appendChild(el('h3', 'card-title', item.name));
    body.appendChild(el('p', 'card-desc', item.desc));

    var chips = variantChips(item);
    if (chips) body.appendChild(chips);

    body.appendChild(el('p', 'price', priceLabel(item, biz)));
    body.appendChild(inquireButton(item, biz));

    card.appendChild(media);
    card.appendChild(body);
    return card;
  }

  function showcaseItem(item, biz, index) {
    var band = el('article', 'showcase-item' + (index % 2 ? ' showcase-item--reverse' : ''));

    var media = el('div', 'showcase-media');
    media.appendChild(photo(item));

    var body = el('div', 'showcase-body');
    body.appendChild(el('h3', 'showcase-title', item.name));
    body.appendChild(el('p', 'showcase-desc', item.desc));

    var chips = variantChips(item);
    if (chips) body.appendChild(chips);

    body.appendChild(el('p', 'price price-lg', priceLabel(item, biz)));
    body.appendChild(inquireButton(item, biz));

    band.appendChild(media);
    band.appendChild(body);
    return band;
  }

  function renderProducts() {
    var mount = document.getElementById('product-list');
    if (!mount) return;

    var biz = BUSINESSES[pageBusiness];
    if (!biz) return;

    var items = PRODUCTS.filter(function (p) { return p.business === pageBusiness; });

    if (!items.length) {
      mount.appendChild(el('p', 'empty-note', biz.emptyNote || 'Message us to see what\u2019s available.'));
      return;
    }

    var wrap = el('div', biz.layout === 'showcase' ? 'showcase' : 'product-grid');
    items.forEach(function (item, index) {
      wrap.appendChild(
        biz.layout === 'showcase' ? showcaseItem(item, biz, index) : productCard(item, biz)
      );
    });

    mount.appendChild(wrap);
    mount.setAttribute('data-count', String(items.length));
    wireMessengerLinks(mount);
  }

  /* -- go ----------------------------------------------------------------- */

  wireMessengerLinks(document);
  renderProducts();

  // Set the "current page" marker in the nav.
  document.querySelectorAll('.nav a[href]').forEach(function (link) {
    var href = link.getAttribute('href').split('#')[0];
    var here = window.location.pathname.split('/').pop() || 'index.html';
    if (href && href === here) link.setAttribute('aria-current', 'page');
  });
})();
