// Sales Rep Tools — share-link generator + commission status
// Reads the same Google Sheet the site uses.

const RepTools = {
    SHEET_ID: '1N3_A0mPYkbTZ1ZeC3b_-KdrgV84jPRfyfYwEqzIwNB4',
    TABS: { REPS: 'Sales Reps', PRODUCTS: 'Products', PAYOUTS: 'Payouts' },
    _sessionKey: 'vf_rep_session',
    _cache: {},
    _rep: null,

    parseCSV(text) {
        const lines = text.split('\n').filter(line => line.trim());
        if (lines.length < 2) return [];
        const headers = this.parseCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/[^a-z0-9_]/g, ''));
        const rows = [];
        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length < headers.length) continue;
            const row = {};
            headers.forEach((header, index) => { row[header] = values[index]?.trim() || ''; });
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
                if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
                else inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) { result.push(current); current = ''; }
            else current += char;
        }
        result.push(current);
        return result;
    },

    async fetchTab(tabName) {
        if (this._cache[tabName]) return this._cache[tabName];
        try {
            const url = `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch ${tabName}`);
            const result = this.parseCSV(await response.text());
            this._cache[tabName] = result;
            return result;
        } catch (err) {
            console.warn(`Could not fetch tab "${tabName}":`, err.message);
            return [];
        }
    },

    sanitize(str) {
        const div = document.createElement('div');
        div.textContent = String(str == null ? '' : str);
        return div.innerHTML;
    },

    filterAndSort(rows) {
        return rows
            .filter(r => {
                const v = String(r.is_visible || '').toLowerCase();
                return v !== 'false' && v !== '0';
            })
            .sort((a, b) => (parseInt(a.display_order) || 999) - (parseInt(b.display_order) || 999));
    },

    isActive(row) {
        if (!row) return false;
        const raw = row.is_active != null && row.is_active !== '' ? row.is_active : row.is_visible;
        const v = String(raw || '').toLowerCase();
        return v !== 'false' && v !== '0';
    },

    findRep(repId, reps) {
        const key = String(repId || '').trim().toLowerCase();
        if (!key) return null;
        return reps.find(r => this.isActive(r) && String(r.rep_id || '').trim().toLowerCase() === key) || null;
    },

    shareLink(pid, ref) {
        const path = location.pathname.replace(/reps\.html$/i, '').replace(/\/+$/, '');
        return location.origin + path + '/index.html?ref=' + encodeURIComponent(ref) + '&p=' + encodeURIComponent(pid);
    },

    async login(repId) {
        const errorEl = document.getElementById('rep-error');
        errorEl.classList.add('hidden');
        if (!String(repId || '').trim()) {
            errorEl.textContent = 'Please enter your rep code.';
            errorEl.classList.remove('hidden');
            return;
        }
        const reps = await this.fetchTab(this.TABS.REPS);
        const rep = this.findRep(repId, reps);
        if (!rep) {
            errorEl.textContent = 'That rep code was not found. Check with the owner.';
            errorEl.classList.remove('hidden');
            return;
        }
        this._rep = { rep_id: rep.rep_id, name: rep.name, rate: rep.commission_rate };
        sessionStorage.setItem(this._sessionKey, rep.rep_id);
        this.renderDashboard();
    },

    renderDashboard() {
        document.getElementById('rep-login').classList.add('hidden');
        document.getElementById('rep-dashboard').classList.remove('hidden');
        document.getElementById('rep-name').textContent = this._rep.name;
        const rawRate = String(this._rep.rate || '').trim();
        const parsed = parseInt(rawRate, 10);
        const rateText = Number.isFinite(parsed) ? parsed + '%' : (rawRate.endsWith('%') ? rawRate : rawRate + '%');
        document.getElementById('rep-rate').textContent = rateText;
        this.loadAndRender();
    },

    async loadAndRender() {
        const [products, payouts] = await Promise.all([
            this.fetchTab(this.TABS.PRODUCTS),
            this.fetchTab(this.TABS.PAYOUTS)
        ]);
        this.renderProducts(this.filterAndSort(products));
        this.renderPayouts(payouts);
    },

    renderProducts(items) {
        const container = document.getElementById('rep-products');
        if (items.length === 0) {
            container.innerHTML = '<p class="rep-empty">No products available yet.</p>';
            return;
        }
        container.innerHTML = items.map((p, i) => {
            const pid = p.display_order || (i + 1);
            const link = this.shareLink(pid, this._rep.rep_id);
            const waShare = `https://wa.me/?text=${encodeURIComponent(link)}`;
            const price = p.price_from ? ` · From ${this.sanitize(p.price_from)}` : '';
            return `
                <div class="rep-product">
                    <div class="rep-product-info">
                        <h4>${this.sanitize(p.name)}</h4>
                        <p>${this.sanitize(p.description)}${price}</p>
                    </div>
                    <div class="rep-product-actions">
                        <input type="text" readonly value="${this.sanitize(link)}" aria-label="Share link for ${this.sanitize(p.name)}">
                        <button class="rep-sm-btn" data-copy="${this.sanitize(link)}">Copy</button>
                        <a class="rep-sm-btn" href="${waShare}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        ${navigator.share ? `<button class="rep-sm-btn" data-share="${this.sanitize(link)}">Share</button>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    },

    copyText(text, btn) {
        const done = () => {
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => (btn.textContent = original), 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(() => this.fallbackCopy(text, done));
        } else {
            this.fallbackCopy(text, done);
        }
    },

    fallbackCopy(text, done) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        done();
    },

    renderPayouts(rows) {
        const tbody = document.querySelector('#rep-payouts tbody');
        const summary = document.getElementById('rep-payout-summary');
        const table = document.getElementById('rep-payouts');
        const mine = rows.filter(r => String(r.rep_id || '').trim().toLowerCase() === String(this._rep.rep_id).toLowerCase());
        const naira = n => '₦' + Math.round(n).toLocaleString();

        if (mine.length === 0) {
            tbody.innerHTML = '';
            table.classList.add('hidden');
            summary.textContent = 'No commissions recorded yet. Sales you refer will appear here once the owner confirms them.';
            summary.classList.remove('hidden');
            return;
        }

        let pendingTotal = 0;
        let paidTotal = 0;
        tbody.innerHTML = mine.map(r => {
            const amount = parseFloat(r.order_amount) || 0;
            const commission = parseFloat(r.commission) || 0;
            const paid = String(r.status || '').toLowerCase() === 'paid';
            if (paid) paidTotal += commission; else pendingTotal += commission;
            return `
                <tr>
                    <td>${this.sanitize(r.product)}</td>
                    <td>${this.sanitize(naira(amount))}</td>
                    <td>${this.sanitize(naira(commission))}</td>
                    <td><span class="rep-status ${paid ? 'paid' : 'pending'}">${this.sanitize(paid ? 'Paid' : 'Pending')}</span></td>
                    <td>${this.sanitize(r.date)}</td>
                </tr>
            `;
        }).join('');

        table.classList.remove('hidden');
        summary.classList.remove('hidden');
        summary.textContent = `Pending: ${naira(pendingTotal)} · Paid: ${naira(paidTotal)}`;
    },

    init() {
        document.getElementById('rep-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.login(document.getElementById('rep-input').value);
        });
        document.getElementById('rep-logout').addEventListener('click', () => {
            sessionStorage.removeItem(this._sessionKey);
            location.reload();
        });
        document.getElementById('rep-products').addEventListener('click', (e) => {
            const copyBtn = e.target.closest('[data-copy]');
            if (copyBtn) {
                this.copyText(copyBtn.getAttribute('data-copy'), copyBtn);
                return;
            }
            const shareBtn = e.target.closest('[data-share]');
            if (shareBtn) {
                navigator.share({ title: 'Gifts by VF', url: shareBtn.getAttribute('data-share') }).catch(() => {});
            }
        });
        const saved = sessionStorage.getItem(this._sessionKey);
        if (saved) {
            document.getElementById('rep-input').value = saved;
            this.login(saved);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => RepTools.init());