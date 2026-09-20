// Gifts by VF — Catalogue Script
// All content is editable from a Google Sheet (no code changes needed).

const VF = {
    TABS: {
        SETTINGS: 'Site Settings',
        PRODUCTS: 'Products',
        REPS: 'Sales Reps'
    },

    DEFAULTS: {
        whatsapp_number: '2348127252004',
        site_title: '',
        brand_name: 'Gifts by V',
        brand_accent: 'F',
        products_label: '',
        products_title: '',
        products_desc: '',
        footer_text: `© ${new Date().getFullYear()} Gifts by VF.`
    },

    WA_ICON: '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-whatsapp"/></svg>',

    PRODUCT_LIMIT: 12,
    PRODUCT_CHUNK: 12,

    ICONS: {
        jewelry: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
        acrylic: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>',
        gift: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/></svg>',
        corporate: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>',
        star: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
        target: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-9h4V7h2v4h4v2h-4v4h-2v-4H7z"/></svg>',
        chat: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>',
        truck: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM19.5 9.5l1.9 5.1H17V9.5h2.5m0-2H17c-1.1 0-2 .9-2 2v8h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-3.5l-2.5-6.5zM6 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM8 9.5v6H4.5L2 17V4.5C2 3.67 2.67 3 3.5 3h9c.83 0 1.5.67 1.5 1.5V9.5H8z"/></svg>',
        heart: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
        camera: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.2c1.77 0 3.2-1.43 3.2-3.2S13.77 8.8 12 8.8 8.8 10.23 8.8 12s1.43 3.2 3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>',
        award: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>',
        sparkle: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2zm8 12l.9 2.9L24 18l-3.1.9L20 22l-.9-3.1L16 18l3.1-1.1L20 14zM4 15l.7 2.2L7 18l-2.3.8L4 21l-.7-2.2L1 18l2.3-.8L4 15z"/></svg>'
    },

    _cache: {},
    _fadeObserver: null,

    async fetchTab(tabName) {
        return VFUtils.fetchTab(tabName, VFUtils.SHEET_ID, this._cache);
    },

    icon(name) {
        const key = String(name || '').trim().toLowerCase();
        return this.ICONS[key] || this.ICONS.star;
    },

    setText(id, value) {
        if (value == null || value === '') return;
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    },

    observeFadeIns() {
        if (!this._fadeObserver) {
            this._fadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, { threshold: 0.1 });
        }
        document.querySelectorAll('.fade-in:not(.visible)').forEach(el => this._fadeObserver.observe(el));
    },

    showError(containerId, message) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (container.querySelector('.empty-state')) return;
        const el = document.createElement('div');
        el.className = 'empty-state';
        el.textContent = message;
        container.appendChild(el);
    },

    showCatalogueError(message) {
        const container = document.getElementById('products-grid');
        if (!container) return;
        if (container.querySelector('.empty-state')) return;
        const el = document.createElement('div');
        el.className = 'empty-state';
        el.innerHTML = `<p>${VFUtils.sanitize(message)}</p>
            <a class="product-order-btn" href="${this.waLink(null, null)}" target="_blank" rel="noopener noreferrer">${this.WA_ICON}<span>Order on WhatsApp</span></a>`;
        container.appendChild(el);
    },

    // ══════════════════════════════════════════════════════
    //  LIGHTBOX
    // ══════════════════════════════════════════════════════
    openLightbox(url, name) {
        const lb = document.getElementById('lightbox');
        if (!lb) return;
        const img = VFUtils.directImageUrl(url);
        if (!img) return;
        const src = this.srcVariant(img, 1200, 1200);
        const caption = VFUtils.sanitize(name || '');
        lb.innerHTML = `<button type="button" class="lightbox-close" aria-label="Close">&times;</button>
            <img src="${VFUtils.sanitize(src)}" alt="${caption}" decoding="async">
            ${caption ? `<p class="lightbox-caption">${caption}</p>` : ''}`;
        lb.hidden = false;
        document.body.classList.add('lightbox-open');
    },

    closeLightbox() {
        const lb = document.getElementById('lightbox');
        if (!lb) return;
        lb.hidden = true;
        lb.innerHTML = '';
        document.body.classList.remove('lightbox-open');
    },

    getReferral() {
        try {
            const raw = localStorage.getItem('vf_referral');
            if (!raw) return null;
            const ref = JSON.parse(raw);
            const maxAge = 30 * 24 * 60 * 60 * 1000;
            if (!ref || !ref.rep_id || Date.now() - ref.arrive_at > maxAge) {
                localStorage.removeItem('vf_referral');
                return null;
            }
            return ref;
        } catch (e) {
            return null;
        }
    },

    async resolveReferral() {
        this._referral = null;
        const stored = this.getReferral();
        if (!stored) return;
        try {
            const reps = await this.fetchTab(this.TABS.REPS);
            if (reps === null) return;
            const rep = (reps || []).find(r => String(r.rep_id || '').trim().toLowerCase() === stored.rep_id.toLowerCase());
            if (!rep || !VFUtils.isActive(rep)) {
                localStorage.removeItem('vf_referral');
                return;
            }
            const name = rep.name || stored.rep_id;
            this._referral = { rep_id: stored.rep_id, name };
            this.showReferralBanner();
        } catch (e) {
            localStorage.removeItem('vf_referral');
        }
    },

    showReferralBanner() {
        const banner = document.getElementById('referral-banner');
        if (!banner || !this._referral) return;
        banner.textContent = `You were referred by ${this._referral.name}`;
        banner.classList.add('visible');
        document.body.classList.add('has-referral');
    },

    orderMessage(productName, price) {
        let msg = productName
            ? `Hello! I'd like to order ${productName}${price ? ` (from ${price})` : ''}.`
            : 'Hello! I would love to place an order with Gifts by VF.';
        if (this._referral) msg += ` I was referred by ${this._referral.name}.`;
        return encodeURIComponent(msg);
    },

    waLink(productName, price) {
        return `https://wa.me/${this._waNumber}?text=${this.orderMessage(productName, price)}`;
    },

    srcVariant(url, width, height) {
        const u = String(url || '').trim();
        if (!u) return '';
        const h = height == null ? width : height;

        if (/googleusercontent\.com\/d\//i.test(u)) {
            const cleanUrl = u.replace(/=[a-z0-9-]*$/i, '');
            return `${cleanUrl}=s${width}`;
        }

        if (/[?&]sz=/i.test(u)) {
            return u.replace(/([?&])sz=[^&]*/i, `$1sz=w${width}-h${h}`);
        }

        if (!/[?&](w|h)=/i.test(u)) return u;

        let out = u;
        if (/[?&]w=\d+/i.test(out)) out = out.replace(/([?&])w=\d+/i, `$1w=${width}`);
        else out += (out.includes('?') ? '&' : '?') + `w=${width}`;
        if (/[?&]h=\d+/i.test(out)) out = out.replace(/([?&])h=\d+/i, `$1h=${h}`);
        else out += `&h=${h}`;
        return out;
    },

    // ══════════════════════════════════════════════════════
    //  SITE SETTINGS
    // ══════════════════════════════════════════════════════
    async applySiteSettings() {
        const rows = await this.fetchTab(this.TABS.SETTINGS);
        const settings = { ...this.DEFAULTS };
        (rows || []).forEach(row => {
            if (row.key && row.value) settings[row.key] = row.value;
        });

        const brandName = settings.brand_name || '';
        const brandAccent = settings.brand_accent || '';
        document.querySelectorAll('.brand-text').forEach(el => (el.textContent = brandName));
        document.querySelectorAll('.brand-accent').forEach(el => (el.textContent = brandAccent));

        if (settings.site_title) {
            document.title = settings.site_title;
        }

        if (settings.whatsapp_number) {
            this._waNumber = settings.whatsapp_number.replace(/[^0-9]/g, '');
        }

        this.setText('products-label', settings.products_label);
        this.setText('products-title', settings.products_title);
        this.setText('products-desc', settings.products_desc);
        this.setText('footer-text', settings.footer_text);
    },

    // ══════════════════════════════════════════════════════
    //  PRODUCTS / CATALOGUE
    // ══════════════════════════════════════════════════════
    async renderProducts() {
        const container = document.getElementById('products-grid');
        if (!container) return;

        const rows = await this.fetchTab(this.TABS.PRODUCTS);
        if (rows === null) {
            this.showCatalogueError("Couldn't load the catalogue right now. Order directly on WhatsApp instead.");
            const count = document.getElementById('catalogue-count');
            if (count) count.textContent = '';
            return;
        }
        const items = VFUtils.filterAndSort(rows);
        if (items.length === 0) {
            this.showError('products-grid', 'No products yet.');
            const count = document.getElementById('catalogue-count');
            if (count) count.textContent = '';
            return;
        }

        this._products = items;
        this.renderFilterPills();
        this.applyProductFilters();
    },

    renderFilterPills() {
        const bar = document.getElementById('catalogue-filters');
        if (!bar) return;
        const cats = [];
        this._products.forEach(p => {
            const c = String(p.category || '').trim();
            if (c && !cats.some(x => x.toLowerCase() === c.toLowerCase())) cats.push(c);
        });
        const pills = ['All', ...cats].map(c => {
            const key = c === 'All' ? 'all' : c.toLowerCase();
            return `<button type="button" class="pill${this._activeCategory === key ? ' active' : ''}" data-category="${VFUtils.sanitize(key)}">${VFUtils.sanitize(c)}</button>`;
        }).join('');
        bar.innerHTML = pills;
        if (typeof this._refreshFilterFades === 'function') this._refreshFilterFades();
    },

    applyProductFilters() {
        const container = document.getElementById('products-grid');
        if (!container) return;

        const q = String(this._searchQuery || '').toLowerCase();
        const filtered = this._products.filter(p => {
            const cat = String(p.category || '').trim().toLowerCase();
            if (this._activeCategory !== 'all' && cat !== this._activeCategory) return false;
            if (!q) return true;
            return `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q);
        });

        if (this._sort === 'price-asc' || this._sort === 'price-desc') {
            const dir = this._sort === 'price-asc' ? 1 : -1;
            filtered.sort((a, b) => {
                const pa = VFUtils.priceNumber(a);
                const pb = VFUtils.priceNumber(b);
                if (pa == null && pb == null) return 0;
                if (pa == null) return 1;
                if (pb == null) return -1;
                return dir * (pa - pb);
            });
        } else if (this._sort === 'name-asc') {
            filtered.sort((a, b) => {
                const na = (a.name || '').trim().toLowerCase();
                const nb = (b.name || '').trim().toLowerCase();
                if (!na && !nb) return 0;
                if (!na) return 1;
                if (!nb) return -1;
                return na < nb ? -1 : na > nb ? 1 : 0;
            });
        }

        this._lastFiltered = filtered;
        this._productShown = this.PRODUCT_LIMIT;
        this.renderProductGrid(filtered);
    },

    renderProductGrid(filtered) {
        const container = document.getElementById('products-grid');
        if (!container) return;

        if (filtered.length === 0) {
            container.innerHTML = `<div class="empty-state">No products match your search.</div>`;
        } else {
            const shown = Math.min(this._productShown, filtered.length);
            const visible = filtered.slice(0, shown);
            let html = visible.map((p, i) =>
                this.productCardHTML(p, p.display_order || i + 1)
            ).join('');
            const more = filtered.length - visible.length;
            if (more > 0) {
                html += VFUtils.loadMoreButton(more, 'load-more-products-btn');
            }
            container.innerHTML = html;
        }

        const count = document.getElementById('catalogue-count');
        if (count) count.textContent = `Showing ${Math.min(this._productShown, filtered.length)} of ${this._products.length} pieces`;
        this.observeFadeIns();
    },

    showMoreProducts() {
        if (!this._lastFiltered || this._lastFiltered.length === 0) return;
        const container = document.getElementById('products-grid');
        if (!container) return;
        const append = Math.min(this.PRODUCT_CHUNK, this._lastFiltered.length - this._productShown);
        if (append <= 0) return;
        const start = this._productShown;
        this._productShown += append;

        const html = this._lastFiltered.slice(start, start + append)
            .map((p, i) => this.productCardHTML(p, p.display_order || start + i + 1))
            .join('');

        let btn = container.querySelector('#load-more-products-btn');
        if (btn) {
            btn.insertAdjacentHTML('beforebegin', html);
            const remaining = this._lastFiltered.length - this._productShown;
            if (remaining > 0) {
                btn.textContent = `Show more (${remaining} more)`;
            } else {
                btn.closest('.load-more-wrap').remove();
            }
        } else {
            container.insertAdjacentHTML('beforeend', html);
        }

        const count = document.getElementById('catalogue-count');
        if (count) count.textContent = `Showing ${this._productShown} of ${this._products.length} pieces`;
        this.observeFadeIns();
    },

    clearProductFilters() {
        this._activeCategory = 'all';
        this._searchQuery = '';
        const input = document.getElementById('catalogue-search');
        if (input) input.value = '';
        if (this._products) {
            this.renderFilterPills();
            this.applyProductFilters();
        }
    },

    productCardHTML(p, pid) {
        const url = VFUtils.validateUrl(VFUtils.directImageUrl(p.image_url));
        const srcset = url
            ? this.srcVariant(url, 300, 300) + ' 300w, ' + this.srcVariant(url, 600, 600) + ' 600w, ' + this.srcVariant(url, 900, 900) + ' 900w'
            : '';
        const price = VFUtils.formatNaira(p.price);
        const category = String(p.category || '').trim() || 'Custom';
        const slug = VFUtils.slugify(p.name) || VFUtils.slugify(pid);
        const soldOut = VFUtils.isSoldOut(p);
        const badgeLabel = soldOut ? (String(p.stock_label || '').trim() || 'Sold Out') : category;
        const img = url
            ? `<button type="button" class="js-lightbox" data-img="${VFUtils.sanitize(url)}" data-name="${VFUtils.sanitize(p.name)}" aria-label="View larger image of ${VFUtils.sanitize(p.name)}">
                    <img src="${VFUtils.sanitize(url)}" srcset="${VFUtils.sanitize(srcset)}" sizes="(max-width: 768px) 100vw, 50vw" alt="${VFUtils.sanitize(p.name)}" loading="lazy" decoding="async" onerror="if(!this.dataset.retried){this.dataset.retried='true';this.removeAttribute('srcset');this.src='${VFUtils.sanitize(url)}';}else{var c=this.closest('.product-img');if(c){c.classList.add('no-image');}}">
                </button>`
            : '';
        const meta = [
            ['Material', p.material],
            ['Size', p.size],
            ['Turnaround', p.turnaround],
            ['Delivery', p.delivery_notes],
            ['Payment', p.payment_terms]
        ].filter(([, v]) => v != null && String(v).trim() !== '')
            .map(([k, v]) => `<li><span>${k}:</span> ${VFUtils.sanitize(v)}</li>`)
            .join('');
        return `
            <div class="product-card fade-in${soldOut ? ' is-soldout' : ''}" id="product-${VFUtils.sanitize(slug)}">
                <div class="product-img${url ? '' : ' no-image'}">
                    ${img}
                    <div class="product-icon-fallback">${this.icon(p.icon || category.toLowerCase())}</div>
                    <span class="product-badge${soldOut ? ' out' : ''}">${VFUtils.sanitize(badgeLabel)}</span>
                    ${price ? `<span class="product-pricetag">From ${VFUtils.sanitize(price)}</span>` : ''}
                </div>
                <div class="product-body">
                    <h3>${VFUtils.sanitize(p.name)}</h3>
                    <p>${VFUtils.sanitize(p.description)}</p>
                    ${meta ? `<ul class="product-meta">${meta}</ul>` : ''}
                    <a href="${this.waLink(p.name, price)}" class="product-order-btn" target="_blank" rel="noopener noreferrer">
                        ${this.WA_ICON}
                        <span>${soldOut ? 'Enquire on WhatsApp' : 'Order on WhatsApp'}</span>
                    </a>
                </div>
            </div>
        `;
    },

    // ══════════════════════════════════════════════════════
    //  INIT
    // ══════════════════════════════════════════════════════
    async init() {
        this._waNumber = this.DEFAULTS.whatsapp_number;
        this._referral = null;
        this._products = null;
        this._activeCategory = 'all';
        this._searchQuery = '';
        this._sort = 'featured';
        this._lastFiltered = null;
        this._productShown = this.PRODUCT_LIMIT;
        this._searchTimer = null;

        const params = new URLSearchParams(window.location.search);
        const refParam = params.get('ref');
        if (refParam) {
            const cleanRef = String(refParam).replace(/[^a-z0-9_-]/gi, '').toLowerCase().slice(0, 30);
            if (cleanRef) {
                localStorage.setItem('vf_referral', JSON.stringify({ rep_id: cleanRef, arrive_at: Date.now() }));
            }
        }
        const productParam = params.get('p');

        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            }, { passive: true });
        }

        this.observeFadeIns();

        const searchInput = document.getElementById('catalogue-search');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                clearTimeout(this._searchTimer);
                this._searchTimer = setTimeout(() => {
                    this._searchQuery = searchInput.value.trim();
                    if (this._products) this.applyProductFilters();
                }, 150);
            });
        }

        const searchClearBtn = document.getElementById('catalogue-search-clear');
        if (searchClearBtn) {
            searchClearBtn.addEventListener('click', () => {
                this._searchQuery = '';
                if (searchInput) searchInput.value = '';
                if (this._products) {
                    this.renderFilterPills();
                    this.applyProductFilters();
                }
                if (searchInput) searchInput.focus();
            });
        }

        const sortSelect = document.getElementById('catalogue-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                this._sort = sortSelect.value || 'featured';
                if (this._products) this.applyProductFilters();
            });
        }

        const filterBar = document.getElementById('catalogue-filters');
        if (filterBar) {
            filterBar.addEventListener('click', (e) => {
                const pill = e.target.closest('.pill[data-category]');
                if (!pill) return;
                this._activeCategory = pill.getAttribute('data-category');
                this.renderFilterPills();
                if (this._products) this.applyProductFilters();
            });
            if (typeof filterBar.classList.toggle === 'function') {
                const refreshFilterFades = () => {
                    const max = filterBar.scrollWidth - filterBar.clientWidth;
                    filterBar.classList.toggle('scroll-l', filterBar.scrollLeft > 4);
                    filterBar.classList.toggle('scroll-r', max - filterBar.scrollLeft > 4);
                };
                filterBar.addEventListener('scroll', refreshFilterFades, { passive: true });
                this._refreshFilterFades = refreshFilterFades;
            }
        }

        const productsGrid = document.getElementById('products-grid');
        if (productsGrid) {
            productsGrid.addEventListener('click', (e) => {
                if (e.target.closest('#load-more-products-btn')) this.showMoreProducts();
                const lightboxBtn = e.target.closest('.js-lightbox[data-img]');
                if (lightboxBtn) {
                    this.openLightbox(lightboxBtn.getAttribute('data-img'), lightboxBtn.getAttribute('data-name'));
                }
            });
        }

        const lightboxEl = document.getElementById('lightbox');
        if (lightboxEl) {
            lightboxEl.addEventListener('click', (e) => {
                if (e.target.closest('.lightbox-close') || e.target === lightboxEl) this.closeLightbox();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !lightboxEl.hidden) this.closeLightbox();
            });
        }

        await this.resolveReferral();

        await Promise.all([
            this.applySiteSettings(),
            this.renderProducts()
        ]);

        if (productParam) {
            if (this._products) this.clearProductFilters();
            if (this._lastFiltered) {
                this._productShown = this._lastFiltered.length;
                this.renderProductGrid(this._lastFiltered);
            }
            const target = document.getElementById('product-' + VFUtils.sanitize(VFUtils.slugify(productParam)));
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    target.classList.add('highlighted');
                    setTimeout(() => target.classList.remove('highlighted'), 2500);
                }, 400);
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => VF.init());