// Sales Rep Tools — share-link generator + commission status
// Reads the same Google Sheet the site uses.

const RepTools = {
    TABS: { REPS: 'Sales Reps', PRODUCTS: 'Products', PAYOUTS: 'Payouts' },
    _sessionKey: 'vf_rep_session',
    _cache: {},
    _rep: null,

    async fetchTab(tabName) {
        return VFUtils.fetchTab(tabName, VFUtils.SHEET_ID, this._cache);
    },

    findRep(repId, reps) {
        const key = String(repId || '').trim().toLowerCase();
        if (!key) return null;
        return reps.find(r => VFUtils.isActive(r) && String(r.rep_id || '').trim().toLowerCase() === key) || null;
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
        this.renderProducts(VFUtils.filterAndSort(products));
        this.renderPayouts(payouts);
    },

    renderProducts(items) {
        const container = document.getElementById('rep-products');
        if (items.length === 0) {
            container.innerHTML = '<p class="rep-empty">No products available yet.</p>';
            return;
        }
        container.innerHTML = items.map((p, i) => {
            const pid = VFUtils.slugify(p.name) || String(p.display_order || (i + 1));
            const link = this.shareLink(pid, this._rep.rep_id);
            const waShare = `https://wa.me/?text=${encodeURIComponent(link)}`;
            const price = p.price || p.price_from || '';
            const img = VFUtils.validateUrl(VFUtils.directImageUrl(p.image_url));
            const initial = String(p.name || '?').trim().charAt(0).toUpperCase();
            return `
                <div class="rep-product">
                    <div class="rep-product-thumb${img ? '' : ' no-image'}">
                        ${img ? `<img src="${VFUtils.sanitize(img)}" alt="" loading="lazy" onerror="this.parentNode.classList.add('no-image')">` : ''}
                        <span class="rep-thumb-initial">${VFUtils.sanitize(initial)}</span>
                    </div>
                    <div class="rep-product-info">
                        <h4>${VFUtils.sanitize(p.name)}</h4>
                        <p>${VFUtils.sanitize(p.description)}${price ? ` &middot; From ${VFUtils.sanitize(price)}` : ''}</p>
                    </div>
                    <div class="rep-product-actions">
                        <input type="text" readonly value="${VFUtils.sanitize(link)}" aria-label="Share link for ${VFUtils.sanitize(p.name)}">
                        <button class="rep-sm-btn" data-copy="${VFUtils.sanitize(link)}">Copy</button>
                        <a class="rep-sm-btn" href="${waShare}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        ${navigator.share ? `<button class="rep-sm-btn" data-share="${VFUtils.sanitize(link)}">Share</button>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    },

    copyText(text, btn) {
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = original), 1500);
        navigator.clipboard.writeText(text).catch(() => {});
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
                    <td>${VFUtils.sanitize(r.product)}</td>
                    <td>${VFUtils.sanitize(naira(amount))}</td>
                    <td>${VFUtils.sanitize(naira(commission))}</td>
                    <td><span class="rep-status ${paid ? 'paid' : 'pending'}">${VFUtils.sanitize(paid ? 'Paid' : 'Pending')}</span></td>
                    <td>${VFUtils.sanitize(r.date)}</td>
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
