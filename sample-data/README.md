# Sheet Schema & Templates

These CSV files are **templates** that document the exact column layout of each Google Sheet tab. They contain no product data — real content is added in Google Sheets (see below). The exception is `site-settings.csv`, which ships with every documented key pre-filled as a ready-to-edit template.

## Files → Tabs

| File | Tab |
|------|-----|
| `site-settings.csv` | `Site Settings` |
| `products.csv` | `Products` |
| `portfolio.csv` | `Portfolio` |
| `testimonials.csv` | `Testimonials` |
| `why-us.csv` | `Why Us` |
| `how-to-order.csv` | `How to Order` |
| `faqs.csv` | `FAQs` |
| `sales-reps.csv` | `Sales Reps` |
| `payouts.csv` | `Payouts` |

## How content gets in

- **Products, Portfolio, Testimonials, Why Us, How to Order, FAQs, Sales Reps, Payouts** — the owner adds entries through the linked **Google Forms** (see `admin.html`). Each submission is copied into the matching tab by `form-sync.gs`.
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
| `category` | The storefront builds its category filter automatically from these — desktop shows glanceable filter pills, while mobile displays a clean native category select dropdown |
| `display_order` | Card position |
| `is_visible` | `FALSE` hides the row |
| `in_stock` | Blank = available. `FALSE` / `0` / `no` marks the card **Sold Out** and switches the button to *Enquire on WhatsApp* |
| `stock_label` | Custom badge text for out-of-stock cards, e.g. `Pre-Order Only` |
| `occasion` | Comma-separated occasion tags, e.g. `Birthday, Wedding`. Drives the "occasion" filter (desktop pills + mobile select). Blank hides the control |
| `featured` | `TRUE` puts the product in the "Featured Pieces" strip at the top of the page. The strip shows only when all filters are cleared and disappears whenever a filter/search is active |

The storefront search + category + occasion + price-range filters + sort (Featured / Price low-high / Price high-low / Name A–Z) + "Showing X of Y pieces" counter all work off this tab — no code changes needed when a product is added. Products with a blank/non-numeric `price` always sort last. Tap any product photo to open it full-screen.

---

## Homepage sections (Why Us / Testimonials / Portfolio / How to Order / FAQs)

The homepage renders the trust and buy-path sections directly from the matching tabs. Each section **only appears when its tab has at least one visible row**, so you can leave a section empty until you're ready to fill it:

- **`Why Us` tab** → *"Why People Choose Us"* cards (`title`, `description`, `icon` — icon keys: `jewelry`, `gift`, `heart`, `star`, `truck`, `sparkle`, `award`, `camera`, `chat`, `target`, `corporate`, `acrylic`, `link`).
- **`Testimonials` tab** → review cards with star ratings (`quote`, `name`, `source`, `rating` — rating is 1–5).
- **`Portfolio` tab** → a visual "Recent Work" gallery (`image_url`, `caption`, `category`, `wide`, `display_order`, `is_visible`). Set `wide` to `TRUE` to make a piece span two columns. Tap a photo to open it full-screen. Rows without a photo show a caption tile instead.
- **`How to Order` tab** → numbered step cards (`title`, `description`) plus a "Start your order" WhatsApp button.
- **`FAQs` tab** → expandable question cards (`question`, `answer`, `display_order`, `is_visible`).

Section headings come from **Site Settings** (`why_label`, `why_title`, `testimonials_label`, `testimonials_title`, `portfolio_label`, `portfolio_title`, `howto_label`, `howto_title`, `faq_label`, `faq_title`) and fall back to sensible defaults if blank.

## Homepage hero

The opening headline block above the catalogue reads from **Site Settings** — `hero_label` (eyebrow text), `hero_title` (headline), `hero_desc` (subline), `hero_cta` (WhatsApp button label) — and falls back to defaults if blank.

Google also reads structured data: the page ships an `Organization` block (name, URL, contact) plus a live `ItemList` of products with prices in NGN and stock status, generated from the catalogue automatically.

---

## Sales Rep System

The site lets sales reps share product links and earn commission. Setup is simple:

1. **Add reps** — in the `Sales Reps` tab, give each rep a short **`rep_id`** (e.g. `kofi`), their name, and a **`commission_rate`** (e.g. `10` = 10%). Set `is_active` to `TRUE` to let them log in.
2. **Share the sheet** — **File → Share → set to "Anyone with the link" → Viewer** for the whole spreadsheet, or at least every tab the site reads (Products, Portfolio, Testimonials, Why Us, How to Order, Sales Reps, and Payouts so reps can see their status). Readable-by-link is enough — no need to use "Publish to web"; the site reads the tabs directly.
3. **The flow:**
   - The owner adds products to the catalogue as usual.
   - A rep opens **`reps.html`** (the owner sends them the direct link — `https://vf-gift-shop.vercel.app/reps.html` — along with their rep code), enters their `rep_id`, picks a product, and copies its share link.
   - The share link looks like: `https://your-site.com/product/engraved-ring?ref=kofi`
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
product/PRODUCT_SLUG?ref=REP_ID
```

For example, a product named "Engraved Bar Necklace" becomes `engraved-bar-necklace`. The share URL for rep code `kofi` is:

```
https://your-site.com/product/engraved-bar-necklace?ref=kofi
```

If you paste a product link into a chat (WhatsApp, Telegram, Facebook, Instagram), it shows a **preview card with that product's own photo, name, and price** — each product gets its own image. Clicking the link takes the buyer straight to the catalogue with the product highlighted and your referral attached.

Buyers who were referred keep the attribution for 30 days (stored in their browser), so even if they order a different product later, the referral still reaches you in the WhatsApp message.

When a buyer opens a product link, the catalogue filters reset to "All" automatically so the exact product is shown and highlighted.
