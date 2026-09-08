// VF Gift Shop — Showroom Script
// Fetches dynamic content from Google Sheet

const VF = {
    // ══════════════════════════════════════════════════════
    //  CONFIGURATION
    //  Replace YOUR_SHEET_ID with the ID from your Google Sheet URL
    //  e.g. https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
    // ══════════════════════════════════════════════════════
    SHEET_ID: 'YOUR_SHEET_ID',

    // Tab names (must match your Google Sheet tab names exactly)
    TABS: {
        SETTINGS: 'Site Settings',
        PORTFOLIO: 'Portfolio',
        TESTIMONIALS: 'Testimonials'
    },

    // Default settings (used when sheet is not configured)
    DEFAULTS: {
        whatsapp_number: '2348127252004',
        site_title: 'Gift Shop by VF',
        hero_subtitle: 'Handcrafted Jewelry & Acrylic Art — Made Just for You',
        about_text: "We've been doing this for 5+ years. Here's why people keep ordering."
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
                inQuotes = !inQuotes;
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
    //  SITE SETTINGS
    // ══════════════════════════════════════════════════════
    async applySiteSettings() {
        const rows = await this.fetchTab(this.TABS.SETTINGS);
        const settings = { ...this.DEFAULTS };

        if (rows.length > 0) {
            rows.forEach(row => {
                if (row.key && row.value) settings[row.key] = row.value;
            });
        }

        // Update WhatsApp link
        if (settings.whatsapp_number) {
            const clean = settings.whatsapp_number.replace(/[^0-9]/g, '');
            const waLink = document.getElementById('whatsapp-link');
            if (waLink) waLink.href = `https://wa.me/${clean}`;
        }

        // Update site title
        if (settings.site_title) {
            document.title = settings.site_title;
        }

        // Update hero subtitle
        if (settings.hero_subtitle) {
            const heroP = document.querySelector('.hero p');
            if (heroP) heroP.textContent = settings.hero_subtitle;
        }

        // Update about text
        if (settings.about_text) {
            const aboutDesc = document.querySelector('#why .section-desc');
            if (aboutDesc) aboutDesc.textContent = settings.about_text;
        }
    },

    // ══════════════════════════════════════════════════════
    //  PORTFOLIO (Our Work)
    // ══════════════════════════════════════════════════════
    async renderPortfolio() {
        const container = document.getElementById('gallery-grid');
        if (!container) return;

        const rows = await this.fetchTab(this.TABS.PORTFOLIO);
        const visible = rows
            .filter(r => r.is_visible !== 'FALSE' && r.is_visible !== '0')
            .sort((a, b) => (parseInt(a.display_order) || 999) - (parseInt(b.display_order) || 999));

        if (visible.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Portfolio coming soon</p></div>';
            return;
        }

        container.innerHTML = visible.map((item, i) => {
            const isWide = i % 5 === 0;
            return `
                <div class="gallery-item fade-in${isWide ? ' wide' : ''}">
                    <img src="${item.image_url}" alt="${item.caption || ''}" loading="lazy">
                    <div class="gallery-label">${item.caption || ''}</div>
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

        const rows = await this.fetchTab(this.TABS.TESTIMONIALS);
        const visible = rows
            .filter(r => r.is_visible !== 'FALSE' && r.is_visible !== '0')
            .sort((a, b) => (parseInt(a.display_order) || 999) - (parseInt(b.display_order) || 999));

        if (visible.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Reviews coming soon</p></div>';
            return;
        }

        const starSVG = '<svg class="icon" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';

        container.innerHTML = visible.map(item => {
            const rating = parseInt(item.rating) || 5;
            const stars = starSVG.repeat(rating);
            const initials = (item.name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

            return `
                <div class="testimonial-card fade-in">
                    <div class="star-rating">${stars}</div>
                    <p class="testimonial-text">"${item.quote || ''}"</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">${initials}</div>
                        <div>
                            <div class="testimonial-name">${item.name || ''}</div>
                            <div class="testimonial-source">${item.source || ''}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.observeFadeIns();
    },

    // ══════════════════════════════════════════════════════
    //  UTILITIES
    // ══════════════════════════════════════════════════════
    observeFadeIns() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
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

        // Fetch from Google Sheet (in parallel)
        await Promise.all([
            this.applySiteSettings(),
            this.renderPortfolio(),
            this.renderTestimonials()
        ]);
    }
};

document.addEventListener('DOMContentLoaded', () => VF.init());