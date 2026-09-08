// Gifts by VF — Showroom Script
// All content is editable from a Google Sheet (no code changes needed).

const VF = {
    // ══════════════════════════════════════════════════════
    //  CONFIGURATION
    //  Replace YOUR_SHEET_ID with the ID from your Google Sheet URL
    //  e.g. https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
    // ══════════════════════════════════════════════════════
    SHEET_ID: '1N3_A0mPYkbTZ1ZeC3b_-KdrgV84jPRfyfYwEqzIwNB4',

    // Tab names (must match your Google Sheet tab names exactly)
    TABS: {
        SETTINGS: 'Site Settings',
        PRODUCTS: 'Products',
        PORTFOLIO: 'Portfolio',
        TESTIMONIALS: 'Testimonials',
        WHY: 'Why Us',
        STEPS: 'How to Order'
    },

    // ── Fallback text (used when a setting is missing from the sheet) ──
    DEFAULTS: {
        whatsapp_number: '2348127252004',
        site_title: 'Gifts by VF — Customized Jewelry & Acrylic Pieces',
        site_description: 'Gifts by VF handcrafts personalized jewelry, acrylic frames, and custom gifts for birthdays, weddings, and corporate events. Order on WhatsApp — delivered across Nigeria.',
        brand_name: 'Gifts by V',
        brand_accent: 'F',
        hero_subtitle: 'Handcrafted Jewelry & Acrylic Art — Made Just for You',
        hero_button_text: 'See Our Work',
        products_label: 'What We Make',
        products_title: 'What We Offer',
        products_desc: 'Every piece is handmade to your exact taste — names, colors, sizes, your way.',
        portfolio_label: 'Portfolio',
        portfolio_title: "Things We've Made",
        portfolio_desc: 'Real pieces. Real customers. Real love in every stitch and edge.',
        testimonials_label: 'What People Say',
        testimonials_title: "Don't Take Our Word for It",
        testimonials_desc: "Here's what our customers have said about us — unedited, unfiltered.",
        why_label: 'Why Us',
        why_title: 'Why People Come Back',
        why_desc: "We've been doing this for 5+ years. Here's why people keep ordering.",
        order_label: 'How It Works',
        order_title: '5 Simple Steps',
        order_desc: 'No stress. No cart. Just send us a message and we handle the rest.',
        cta_title: "Let's Make Something for You",
        cta_desc: "Tell us your idea. We'll bring it to life.",
        cta_button_text: 'Message Us on WhatsApp',
        footer_text: '© 2026 Gifts by VF. Handcrafted with love.'
    },

    // ── Icon keys the owner can use in the "icon" column ──
    ICONS: {
        jewelry: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
        acrylic: '<svg class="icon" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>',
        gift: '<svg class="icon" viewBox="0 0 24 24"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/></svg>',
        corporate: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>',
        star: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
        target: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-9h4V7h2v4h4v2h-4v4h-2v-4H7z"/></svg>',
        chat: '<svg class="icon" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>',
        truck: '<svg class="icon" viewBox="0 0 24 24"><path d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM19.5 9.5l1.9 5.1H17V9.5h2.5m0-2H17c-1.1 0-2 .9-2 2v8h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-3.5l-2.5-6.5zM6 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM8 9.5v6H4.5L2 17V4.5C2 3.67 2.67 3 3.5 3h9c.83 0 1.5.67 1.5 1.5V9.5H8z"/></svg>',
        heart: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
        camera: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 15.2c1.77 0 3.2-1.43 3.2-3.2S13.77 8.8 12 8.8 8.8 10.23 8.8 12s1.43 3.2 3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>',
        award: '<svg class="icon" viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>',
        sparkle: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2zm8 12l.9 2.9L24 18l-3.1.9L20 22l-.9-3.1L16 18l3.1-1.1L20 14zM4 15l.7 2.2L7 18l-2.3.8L4 21l-.7-2.2L1 18l2.3-.8L4 15z"/></svg>'
    },

    // ══════════════════════════════════════════════════════
    //  CSV PARSER
    // ══════════════════════════════════════════════════════
    parseCSV(text) {
        const lines = text.split('\n').filter(line => line.trim());
        if (lines.length < 2) return [];

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[^a-z0-9_]/g, ''));
        const rows = [];

        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length < headers.length) continue;

            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index]?.trim() || '';
            });
            rows.push(row);
        }

        return rows;
    },

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    },

    // ══════════════════════════════════════════════════════
    //  FETCH FROM GOOGLE SHEET
    // ══════════════════════════════════════════════════════
    async fetchTab(tabName) {
        if (this.SHEET_ID === 'YOUR_SHEET_ID') return [];
        try {
            const url = `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch ${tabName}`);
            const text = await response.text();
            return this.parseCSV(text);
        } catch (err) {
            console.warn(`Could not fetch tab "${tabName}":`, err.message);
            return [];
        }
    },

    // ══════════════════════════════════════════════════════
    //  UTILITIES
    // ══════════════════════════════════════════════════════
    sanitize(str) {
        const div = document.createElement('div');
        div.textContent = String(str == null ? '' : str);
        return div.innerHTML;
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

    filterAndSort(rows) {
        return rows
            .filter(r => {
                const v = String(r.is_visible || '').toLowerCase();
                return v !== 'false' && v !== '0';
            })
            .sort((a, b) => (parseInt(a.display_order) || 999) - (parseInt(b.display_order) || 999));
    },

    observeFadeIns() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
    },

    // ══════════════════════════════════════════════════════
    //  SITE SETTINGS (all headings + text)
    // ══════════════════════════════════════════════════════
    async applySiteSettings() {
        if (this.SHEET_ID === 'YOUR_SHEET_ID') return;

        const rows = await this.fetchTab(this.TABS.SETTINGS);
        const settings = { ...this.DEFAULTS };
        rows.forEach(row => {
            if (row.key && row.value) settings[row.key] = row.value;
        });

        // Brand name (nav logo + hero) with gold accent letter
        const brandName = settings.brand_name || '';
        const brandAccent = settings.brand_accent || '';
        document.querySelectorAll('.brand-text').forEach(el => (el.textContent = brandName));
        document.querySelectorAll('.brand-accent').forEach(el => (el.textContent = brandAccent));

        // Browser tab title + meta description
        if (settings.site_title) {
            document.title = settings.site_title;
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', settings.site_title);
        }
        if (settings.site_description) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', settings.site_description);
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute('content', settings.site_description);
        }

        // WhatsApp link
        if (settings.whatsapp_number) {
            const clean = settings.whatsapp_number.replace(/[^0-9]/g, '');
            const waLink = document.getElementById('whatsapp-link');
            if (waLink) waLink.href = `https://wa.me/${clean}`;
        }

        // Hero
        this.setText('hero-subtitle', settings.hero_subtitle);
        this.setText('hero-button', settings.hero_button_text);

        // Products heading
        this.setText('products-label', settings.products_label);
        this.setText('products-title', settings.products_title);
        this.setText('products-desc', settings.products_desc);

        // Portfolio heading
        this.setText('portfolio-label', settings.portfolio_label);
        this.setText('portfolio-title', settings.portfolio_title);
        this.setText('portfolio-desc', settings.portfolio_desc);

        // Testimonials heading
        this.setText('testimonials-label', settings.testimonials_label);
        this.setText('testimonials-title', settings.testimonials_title);
        this.setText('testimonials-desc', settings.testimonials_desc);

        // Why Us heading
        this.setText('why-label', settings.why_label);
        this.setText('why-title', settings.why_title);
        this.setText('why-desc', settings.why_desc);

        // How to Order heading
        this.setText('order-label', settings.order_label);
        this.setText('order-title', settings.order_title);
        this.setText('order-desc', settings.order_desc);

        // CTA
        this.setText('cta-title', settings.cta_title);
        this.setText('cta-desc', settings.cta_desc);
        this.setText('cta-button', settings.cta_button_text);

        // Footer
        this.setText('footer-text', settings.footer_text);
    },

    // ══════════════════════════════════════════════════════
    //  PRODUCTS
    // ══════════════════════════════════════════════════════
    async renderProducts() {
        const container = document.getElementById('products-grid');
        if (!container) return;
        if (this.SHEET_ID === 'YOUR_SHEET_ID') return;

        const items = this.filterAndSort(await this.fetchTab(this.TABS.PRODUCTS));
        if (items.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Products coming soon</p></div>';
            return;
        }

        container.innerHTML = items.map(p => `
            <div class="product-card fade-in">
                <div class="product-icon">${this.icon(p.icon)}</div>
                <h3>${this.sanitize(p.name)}</h3>
                <p>${this.sanitize(p.description)}</p>
            </div>
        `).join('');

        this.observeFadeIns();
    },

    // ══════════════════════════════════════════════════════
    //  PORTFOLIO
    // ══════════════════════════════════════════════════════
    async renderPortfolio() {
        const container = document.getElementById('gallery-grid');
        if (!container) return;
        if (this.SHEET_ID === 'YOUR_SHEET_ID') return;

        const items = this.filterAndSort(await this.fetchTab(this.TABS.PORTFOLIO));
        if (items.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Portfolio coming soon</p></div>';
            return;
        }

        container.innerHTML = items.map((item, i) => {
            const isWide = i % 5 === 0;
            return `
                <div class="gallery-item fade-in${isWide ? ' wide' : ''}">
                    <img src="${this.sanitize(item.image_url)}" alt="${this.sanitize(item.caption)}" loading="lazy">
                    <div class="gallery-label">${this.sanitize(item.caption)}</div>
                </div>
            `;
        }).join('');

        this.observeFadeIns();
    },

    // ══════════════════════════════════════════════════════
    //  TESTIMONIALS
    // ══════════════════════════════════════════════════════
    async renderTestimonials() {
        const container = document.getElementById('testimonials-grid');
        if (!container) return;
        if (this.SHEET_ID === 'YOUR_SHEET_ID') return;

        const items = this.filterAndSort(await this.fetchTab(this.TABS.TESTIMONIALS));
        if (items.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Reviews coming soon</p></div>';
            return;
        }

        const starSVG = '<svg class="icon" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';

        container.innerHTML = items.map(item => {
            const rating = Math.max(1, Math.min(5, parseInt(item.rating) || 5));
            const stars = starSVG.repeat(rating);
            const initials = (item.name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

            return `
                <div class="testimonial-card fade-in">
                    <div class="star-rating">${stars}</div>
                    <p class="testimonial-text">"${this.sanitize(item.quote)}"</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">${this.sanitize(initials)}</div>
                        <div>
                            <div class="testimonial-name">${this.sanitize(item.name)}</div>
                            <div class="testimonial-source">${this.sanitize(item.source)}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.observeFadeIns();
    },

    // ══════════════════════════════════════════════════════
    //  WHY US
    // ══════════════════════════════════════════════════════
    async renderWhyUs() {
        const container = document.getElementById('why-grid');
        if (!container) return;
        if (this.SHEET_ID === 'YOUR_SHEET_ID') return;

        const items = this.filterAndSort(await this.fetchTab(this.TABS.WHY));
        if (items.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Coming soon</p></div>';
            return;
        }

        container.innerHTML = items.map(w => `
            <div class="why-item fade-in">
                <div class="why-icon">${this.icon(w.icon)}</div>
                <h4>${this.sanitize(w.title)}</h4>
                <p>${this.sanitize(w.description)}</p>
            </div>
        `).join('');

        this.observeFadeIns();
    },

    // ══════════════════════════════════════════════════════
    //  HOW TO ORDER (steps)
    // ══════════════════════════════════════════════════════
    async renderSteps() {
        const container = document.getElementById('steps');
        if (!container) return;
        if (this.SHEET_ID === 'YOUR_SHEET_ID') return;

        const items = this.filterAndSort(await this.fetchTab(this.TABS.STEPS));
        if (items.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Coming soon</p></div>';
            return;
        }

        container.innerHTML = items.map((s, i) => `
            <div class="step fade-in">
                <div class="step-number">${i + 1}</div>
                <h4>${this.sanitize(s.title)}</h4>
                <p>${this.sanitize(s.description)}</p>
            </div>
        `).join('');

        this.observeFadeIns();
    },

    // ══════════════════════════════════════════════════════
    //  INIT
    // ══════════════════════════════════════════════════════
    async init() {
        // Nav
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => navLinks.classList.remove('active'));
            });
        }

        // Nav shadow
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            });
        }

        // Fade-in
        this.observeFadeIns();

        // Fetch everything from Google Sheet (in parallel)
        await Promise.all([
            this.applySiteSettings(),
            this.renderProducts(),
            this.renderPortfolio(),
            this.renderTestimonials(),
            this.renderWhyUs(),
            this.renderSteps()
        ]);
    }
};

document.addEventListener('DOMContentLoaded', () => VF.init());
