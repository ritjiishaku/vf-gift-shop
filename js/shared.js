// Gifts by VF — Shared utilities
// Used by both app.js (storefront) and reps.js (sales rep tools).

const VFUtils = {
    SHEET_ID: '1N3_A0mPYkbTZ1ZeC3b_-KdrgV84jPRfyfYwEqzIwNB4',

    CACHE_TTL: 10 * 60 * 1000,

    parseCSV(text) {
        const src = String(text || '').replace(/\r\n?/g, '\n');
        const rows = [];
        let row = [];
        let field = '';
        let inQuotes = false;

        for (let i = 0; i < src.length; i++) {
            const char = src[i];
            if (inQuotes) {
                if (char === '"') {
                    if (src[i + 1] === '"') {
                        field += '"';
                        i++;
                    } else {
                        inQuotes = false;
                    }
                } else {
                    field += char;
                }
            } else if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                row.push(field);
                field = '';
            } else if (char === '\n') {
                row.push(field);
                field = '';
                rows.push(row);
                row = [];
            } else {
                field += char;
            }
        }
        if (field !== '' || row.length) {
            row.push(field);
            rows.push(row);
        }

        const nonEmpty = rows.filter(r => r.some(cell => cell.trim() !== ''));
        if (nonEmpty.length < 2) return [];
        const headers = nonEmpty[0].map(h => h.trim().toLowerCase().replace(/[^a-z0-9_]/g, ''));
        const result = [];
        for (let i = 1; i < nonEmpty.length; i++) {
            const values = nonEmpty[i];
            if (values.length < headers.length) continue;
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index]?.trim() || '';
            });
            result.push(obj);
        }
        return result;
    },

    cacheGet(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },

    cacheSet(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
        } catch (e) { /* storage may be unavailable */ }
    },

    async fetchTab(tabName, sheetId, cache) {
        sheetId = sheetId || this.SHEET_ID;
        if (sheetId === 'YOUR_SHEET_ID') return [];
        if (cache[tabName]) return cache[tabName];

        const storageKey = `vf_cache:${sheetId}:${tabName}`;
        const stored = this.cacheGet(storageKey);
        if (stored && stored.data && Date.now() - stored.ts < this.CACHE_TTL) {
            cache[tabName] = stored.data;
            return stored.data;
        }

        try {
            const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch ${tabName}`);
            const result = this.parseCSV(await response.text());
            cache[tabName] = result;
            this.cacheSet(storageKey, result);
            return result;
        } catch (err) {
            if (stored && stored.data) {
                cache[tabName] = stored.data;
                return stored.data;
            }
            return null;
        }
    },

    slugify(str) {
        return String(str || '').trim().toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 60);
    },

    sanitize(str) {
        const div = document.createElement('div');
        div.textContent = String(str == null ? '' : str);
        return div.innerHTML;
    },

    validateUrl(str) {
        const s = String(str || '').trim();
        if (/^https?:\/\//i.test(s)) return s;
        return '';
    },

    isDriveUrl(url) {
        return /drive\.google\.com|googleusercontent\.com/i.test(String(url || ''));
    },

    driveId(url) {
        const u = String(url || '');
        let m = u.match(/\/file\/d\/([A-Za-z0-9_-]{20,})/i);
        if (m) return m[1];
        m = u.match(/[?&]id=([A-Za-z0-9_-]{20,})/i);
        if (m) return m[1];
        m = u.match(/\/d\/([A-Za-z0-9_-]{20,})/i);
        if (m) return m[1];
        return null;
    },

    directImageUrl(url) {
        const u = String(url || '').trim();
        if (!u) return '';
        const id = this.driveId(u);
        if (id) return `https://lh3.googleusercontent.com/d/${id}`;
        if (this.isDriveUrl(u)) return '';
        return u;
    },

    formatNaira(str) {
        const s = String(str == null ? '' : str).trim();
        if (!s) return '';
        if (/^[0-9,.]+$/.test(s)) {
            const n = Math.round(parseFloat(s.replace(/,/g, '')));
            if (!Number.isFinite(n)) return s;
            return '₦' + n.toLocaleString();
        }
        return s;
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
    }
};
