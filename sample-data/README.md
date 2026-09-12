# Sheet Schema & Templates

These CSV files are **header-only templates** that document the exact column layout of each Google Sheet tab. They contain no demo data — real content is added in Google Sheets (see below).

## Files → Tabs

| File | Tab |
|------|-----|
| `site-settings.csv` | `Site Settings` |
| `products.csv` | `Products` |
| `portfolio.csv` | `Portfolio` |
| `testimonials.csv` | `Testimonials` |
| `why-us.csv` | `Why Us` |
| `how-to-order.csv` | `How to Order` |
| `sales-reps.csv` | `Sales Reps` |
| `payouts.csv` | `Payouts` |

## How content gets in

- **Products, Portfolio, Testimonials, Why Us, How to Order, Sales Reps, Payouts** — the owner adds entries through the linked **Google Forms** (see `admin.html`). Each submission is copied into the matching tab by `form-sync.gs`.
- **Site Settings** — there is no form for this tab. It is edited **directly in the sheet** (a `key` / `value` pair per row) to set the brand name, WhatsApp number, and page copy.

## Important

- Keep the tab names exactly as listed above (spelling + spaces matter).
- The first row of each tab is the header — do not delete it.
- To hide a row, change its `is_visible` (or `is_active` for reps) cell to `FALSE`.
- To reorder rows, change the `display_order` number.
- The site reads the sheet automatically — no re-publishing or code changes needed when content changes.

## Products tab (catalogue)

Each row becomes a catalogue card. Columns:

| Column | What it does |
|--------|--------------|
| `name` | Product title on the card |
| `description` | Short blurb shown under the title |
| `image_url` | Photo (600×600 works best). If blank, the card shows an icon tile instead. Google Drive links are converted automatically, but the file must be shared "Anyone with the link". |
| `price` | Shown as "From ₦18,000" on the card. Blank hides the price. |
| `category` | The storefront builds its filter pills automatically from these — one pill per category, plus "All" |
| `display_order` | Card position |
| `is_visible` | `FALSE` hides the row |

The storefront search + category filters + "Showing X of Y pieces" counter all work off this tab — no code changes needed when a product is added.

---

## Sales Rep System

The site lets sales reps share product links and earn commission. Setup is simple:

1. **Add reps** — in the `Sales Reps` tab, give each rep a short **`rep_id`** (e.g. `kofi`), their name, and a **`commission_rate`** (e.g. `10` = 10%). Set `is_active` to `TRUE` to let them log in.
2. **Share the sheet** — **File → Share → set to "Anyone with the link" → Viewer** for the whole spreadsheet, or at least every tab the site reads (Products, Portfolio, Testimonials, Why Us, How to Order, Sales Reps, and Payouts so reps can see their status). Readable-by-link is enough — no need to use "Publish to web"; the site reads the tabs directly.
3. **The flow:**
   - The owner adds products to the catalogue as usual.
   - A rep opens **`reps.html`** (link in the site footer — "Sales Rep Tools"), enters their `rep_id`, picks a product, and copies its share link.
   - The share link looks like: `https://your-site.com/index.html?ref=kofi&p=engraved-ring`
   - When a buyer clicks it, the site shows *"You were referred by Kofi"*, highlights the product, and the **Order on WhatsApp** button opens a message pre-filled with the product **and** the referral.
   - The owner confirms the order + payment in WhatsApp, then logs the sale in the `Payouts` tab: `rep_id`, `product`, `order_amount`, `commission` (amount × rate), `status` (`PENDING` or `PAID`), `date`.
4. **Commission:** `commission = order_amount × commission_rate / 100`. The owner writes the number in the `commission` column. Flip `status` to `PAID` once the rep is paid. Status matching is **case-insensitive** (`paid`/`PAID`/`Pending`/`pending` all work).

### Important notes

- **Reps and activation:** rep rows use `is_active` (`TRUE`/`FALSE`). The site accepts both `is_active` and the older `is_visible` column, so either works.
- **Rep codes are not secrets:** the rep list is fetched by the reps page, so codes (e.g. `kofi`) aren't private. They're an ID for tracking, not a password — tell reps never to share sensitive info under their code, and keep the sheet **view-only** (no one can write to it via this setup).
- **Payouts tab is readable by anyone with the link once published.** Only what you want reps to see belongs there. Never store private contact numbers, addresses, or financial notes in the published tabs — keep anything sensitive in a separate, unpublished sheet.

### Rep link format

Each product is identified by a **slug derived from its name** (lowercase, spaces and special characters replaced with `-`). The link is built as:

```
index.html?ref=REP_ID&p=PRODUCT_SLUG
```

For example, a product named "Engraved Bar Necklace" becomes `engraved-bar-necklace`.

Buyers who were referred keep the attribution for 30 days (stored in their browser), so even if they order a different product later, the referral still reaches you in the WhatsApp message.

When a buyer opens a product link, the catalogue filters reset to "All" automatically so the exact product is shown and highlighted.
