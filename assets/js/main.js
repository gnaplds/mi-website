/* Shared behaviour: editable content, products, contact links and photo viewer.
   Product content requires JavaScript; static pages provide a noscript notice.
   No message prefill is promised. See PLAN.md for the launch checklist. */
(function () {
  'use strict';

  const SITE = window.SITE || {};
  const BUSINESSES = window.BUSINESSES || {};
  const PRODUCTS = window.PRODUCTS || [];
  const pageBusiness = document.body.dataset.business;
  const placeholder = '/assets/img/placeholder.svg';

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function bindPhoto(img) {
    img.addEventListener('error', function () {
      img.src = placeholder;
      img.alt = 'Photo placeholder; image unavailable';
    }, { once: true });
    // Also handle a static image that failed before this deferred script ran.
    if (img.hasAttribute('src') && img.complete && img.naturalWidth === 0) {
      img.dispatchEvent(new Event('error'));
    }
  }

  document.querySelectorAll('[data-site]').forEach(function (node) {
    const value = SITE[node.dataset.site];
    if (value !== undefined) node.textContent = value;
  });
  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });
  document.querySelectorAll('[data-preview]').forEach(function (node) {
    node.hidden = SITE.preview === false;
  });
  document.querySelectorAll('[data-optional]').forEach(function (node) {
    node.hidden = !SITE[node.dataset.optional];
  });
  document.querySelectorAll('[data-site-phone]').forEach(function (node) {
    if (!SITE.phone) return;
    node.href = 'tel:' + SITE.phone;
    node.textContent = SITE.phoneLabel || SITE.phone;
  });
  document.querySelectorAll('[data-portrait]').forEach(function (img) {
    img.src = SITE.portrait || img.getAttribute('src');
    img.alt = SITE.portraitAlt || 'Portrait';
  });
  ['name', 'tagline', 'order-note'].forEach(function (field) {
    document.querySelectorAll('[data-biz-' + field + ']').forEach(function (node) {
      const biz = BUSINESSES[node.getAttribute('data-biz-' + field)];
      const property = field === 'order-note' ? 'orderNote' : field;
      if (biz && biz[property] !== undefined) node.textContent = biz[property];
    });
  });
  document.querySelectorAll('[data-biz-image]').forEach(function (img) {
    const biz = BUSINESSES[img.dataset.bizImage];
    if (!biz) return;
    img.src = biz.heroImage || placeholder;
    img.alt = biz.heroAlt || 'Business photo';
    if (img.parentElement.matches('a')) {
      img.parentElement.setAttribute('aria-label', 'View ' + biz.name + ' products');
    }
  });
  document.querySelectorAll('img[src]').forEach(bindPhoto);
  if (BUSINESSES[pageBusiness]) document.body.dataset.theme = BUSINESSES[pageBusiness].theme;

  function messengerUrl(key, productId) {
    const biz = BUSINESSES[key];
    if (!biz || !biz.messenger) return null;
    try {
      const url = new URL(biz.messenger);
      if (url.protocol !== 'https:' || !['m.me', 'messenger.com', 'www.messenger.com'].includes(url.hostname)) return null;
      if (productId) url.searchParams.set('ref', 'website-' + productId);
      return url.href;
    } catch (_) {
      return null;
    }
  }

  function wireMessengerLinks(scope) {
    scope.querySelectorAll('[data-messenger]').forEach(function (link) {
      const key = link.dataset.messenger;
      const url = messengerUrl(key, link.dataset.product);
      if (url) {
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Inquire on Messenger';
        link.setAttribute('aria-label', 'Inquire about ' + (link.dataset.productName || BUSINESSES[key].name) + ' on Messenger (opens in a new tab)');
      } else {
        link.href = '#contact-note';
        link.removeAttribute('target');
        link.removeAttribute('rel');
        link.textContent = 'Contact details';
        link.setAttribute('aria-label', 'Contact details for ' + (link.dataset.productName || BUSINESSES[key]?.name || 'this business'));
      }
    });
  }

  const contactNote = document.getElementById('contact-note');
  if (contactNote) {
    const missing = Object.keys(BUSINESSES).filter(function (key) { return !messengerUrl(key); });
    contactNote.hidden = missing.length === 0;
    if (missing.length === 1) contactNote.textContent = 'Contact details for ' + BUSINESSES[missing[0]].name + ' are not available yet.';
  }

  function priceLabel(item, biz) {
    if (biz.showPrices === false || item.price === null || item.price === undefined || item.price === '') return 'Ask for price';
    const value = Number(item.price);
    if (!Number.isFinite(value) || value < 0) return 'Ask for price';
    return (item.priceFrom ? 'From ' : '') + '₱' + value.toLocaleString('en-PH', { maximumFractionDigits: 2 });
  }

  const viewer = document.getElementById('photo-viewer');
  let lastPhotoButton = null;
  if (viewer) {
    const closeButton = viewer.querySelector('.viewer-close');
    closeButton.addEventListener('click', function () { viewer.close(); });
    viewer.addEventListener('click', function (event) {
      const bounds = viewer.getBoundingClientRect();
      if (event.target === viewer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) viewer.close();
    });
    viewer.addEventListener('keydown', function (event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButton.focus();
      }
    });
    viewer.addEventListener('close', function () {
      document.body.classList.remove('viewer-open');
      if (lastPhotoButton && lastPhotoButton.isConnected) lastPhotoButton.focus({ preventScroll: true });
    });
    // Native dialog handles Escape and makes the background inert.
  }

  function productPhoto(item) {
    const button = element('button', 'photo-button');
    button.type = 'button';
    button.setAttribute('aria-label', 'View larger photo of ' + item.name);
    button.setAttribute('aria-haspopup', 'dialog');
    const img = element('img');
    img.src = item.image || placeholder;
    img.alt = item.alt || item.name;
    img.width = 800;
    img.height = 600;
    img.loading = 'lazy';
    img.decoding = 'async';
    bindPhoto(img);
    button.appendChild(img);
    button.addEventListener('click', function () {
      if (!viewer) return;
      const large = viewer.querySelector('.viewer-image');
      large.onerror = function () {
        large.onerror = null;
        large.src = placeholder;
        large.alt = 'Photo placeholder; image unavailable';
      };
      large.src = img.currentSrc || img.src;
      large.alt = img.alt;
      document.getElementById('viewer-title').textContent = item.name;
      document.getElementById('viewer-caption').textContent = item.desc || '';
      lastPhotoButton = button;
      viewer.showModal();
      document.body.classList.add('viewer-open');
    });
    return button;
  }

  function productCard(item, biz) {
    const card = element('article', biz.layout === 'showcase' ? 'showcase-item' : 'product-card');
    card.appendChild(productPhoto(item));
    const body = element('div', 'product-body');
    body.appendChild(element('h3', 'product-title', item.name));
    if (item.desc) body.appendChild(element('p', 'product-description', item.desc));
    if (item.variants && item.variants.length) {
      const list = element('ul', 'variants');
      list.setAttribute('aria-label', 'Available options');
      item.variants.forEach(function (variant) { list.appendChild(element('li', '', variant)); });
      body.appendChild(list);
    }
    const bottom = element('div', 'product-bottom');
    bottom.appendChild(element('p', 'price', priceLabel(item, biz)));
    const inquiry = element('a', 'text-link inquiry-link', 'Contact details');
    inquiry.href = '#contact-note';
    inquiry.dataset.messenger = item.business;
    inquiry.dataset.product = item.id;
    inquiry.dataset.productName = item.name;
    bottom.appendChild(inquiry);
    body.appendChild(bottom);
    card.appendChild(body);
    return card;
  }

  const mount = document.getElementById('product-list');
  if (mount && BUSINESSES[pageBusiness]) {
    const biz = BUSINESSES[pageBusiness];
    const items = PRODUCTS.filter(function (item) { return item.business === pageBusiness; });
    const count = document.querySelector('[data-product-count]');
    mount.dataset.count = String(items.length);
    if (items.length) {
      const list = element('div', biz.layout === 'showcase' ? 'showcase' : 'product-grid');
      items.forEach(function (item) { list.appendChild(productCard(item, biz)); });
      mount.appendChild(list);
      if (count) count.textContent = items.length + (items.length === 1 ? ' product. ' : ' products. ') + 'Tap a photo for a closer look.';
    } else {
      mount.appendChild(element('p', 'empty-note', 'There are no products to show yet.'));
      if (count) count.hidden = true;
    }
  }
  wireMessengerLinks(document);

  function pageName(path) {
    return path.replace(/\/$/, '').split('/').pop().replace(/\.html$/, '') || 'index';
  }
  const current = pageName(window.location.pathname);
  document.querySelectorAll('.nav-link[href]').forEach(function (link) {
    if (pageName(new URL(link.href).pathname) === current) link.setAttribute('aria-current', 'page');
  });
})();
