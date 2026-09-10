// Gifts by VF — Shared utilities
// Used by both app.js (storefront) and reps.js (sales rep tools).

const VFUtils = {
    SHEET_ID: '1N3_A0mPYkbTZ1ZeC3b_-KdrgV84jPRfyfYwEqzIwNB4',

    parseCSV(text) {
        const lines = text.split('\n').filter(line => line.trim());
        if (lines.length < 2) return [];
        const headers = this.parseCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/[^a-z0-9_]/g, ''));
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

    async fetchTab(tabName, sheetId, cache) {
        sheetId = sheetId || this.SHEET_ID;
        if (sheetId === 'YOUR_SHEET_ID') return [];
        if (cache[tabName]) return cache[tabName];
        try {
            const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch ${tabName}`);
            const result = this.parseCSV(await response.text());
            cache[tabName] = result;
            return result;
        } catch (err) {
            return [];
        }
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
