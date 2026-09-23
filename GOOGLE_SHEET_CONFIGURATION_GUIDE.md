# Google Sheet Configuration Guide

This guide explains how to set up the Google Sheet that powers the Gifts by VF catalogue and admin flow.

## Quick reference — tabs and their columns

| Tab | Columns |
|---|---|
| `Site Settings` | `key`, `value` |
| `Products` | `name`, `description`, `image_url`, `video_url`, `price`, `category`, `display_order`, `is_visible`, `in_stock`, `stock_label`, `occasion`, `featured`, `material`, `size`, `turnaround`, `delivery_notes`, `payment_terms`, `sales_caption` |
| `Portfolio` | `image_url`, `caption`, `category`, `wide`, `display_order`, `is_visible` |
| `Testimonials` | `quote`, `name`, `source`, `rating`, `display_order`, `is_visible` |
| `Why Us` | `title`, `description`, `icon`, `display_order`, `is_visible` |
| `How to Order` | `title`, `description`, `display_order`, `is_visible` |
| `FAQs` | `question`, `answer`, `display_order`, `is_visible` |
| `Sales Reps` | `rep_id`, `name`, `commission_rate`, `is_active` |
| `Payouts` | `rep_id`, `product`, `order_amount`, `commission`, `status`, `date` |

## 1) Create the Google Sheet

1. Open Google Sheets.
2. Create a new spreadsheet.
3. Rename it to something clear, for example: `Gifts by VF Catalogue`.
4. Keep the spreadsheet shared with anyone who needs to edit it.

## 2) Create the required tabs

Create tabs with these exact names:

- `Site Settings`
- `Products`
- `Portfolio`
- `Testimonials`
- `Why Us`
- `How to Order`
- `FAQs`
- `Sales Reps`
- `Payouts`

Important:
- Names must match exactly, including spaces and capitalization.
- The website reads these tabs by name.
- If a tab name is wrong, the section will not load correctly.

## 3) Add headers to each tab

Each tab needs a header row in the first row. The rows below that are your content.

### Site Settings tab
Use a key/value structure — one row per setting, exactly as below.

| key | What it controls | Example value |
|---|---|---|
| `site_title` | Browser tab title | `Gifts by VF — Handcrafted & Bespoke Gifts` |
| `brand_name` | Brand name shown in the nav/footer | `Gifts by V` |
| `brand_accent` | Letter highlighted in the brand logo | `F` |
| `hero_label` | Small label above the hero headline | `Thoughtful Gifts` |
| `hero_title` | Hero headline | `Thoughtful gifts for every special moment.` |
| `hero_desc` | Hero sub-text | `Handcrafted jewellery, acrylic keepsakes, and personalised gifts for birthdays, weddings, and meaningful occasions — made with care and delivered across Nigeria.` |
| `hero_cta` | Hero button text | `Chat on WhatsApp` |
| `products_label` | Catalogue section label | `The Catalogue` |
| `products_title` | Catalogue section heading | `Shop our pieces` |
| `products_desc` | Catalogue section description | `Every piece is handmade and made to order.` |
| `featured_label` | Featured pieces strip label | `Curated For You` |
| `featured_title` | Featured pieces strip heading | `Featured Pieces` |
| `why_label` | Why-Us section label | `Why People Come Back` |
| `why_title` | Why-Us section heading | `The VF Difference` |
| `why_desc` | Why-Us section sub-text (defined in code, not yet rendered on the page) | `Handcrafted with care, delivered with love.` |
| `testimonials_label` | Testimonials section label | `Kind Words` |
| `testimonials_title` | Testimonials heading | `What Customers Say` |
| `portfolio_label` | Portfolio section label | `Recent Work` |
| `portfolio_title` | Portfolio heading | `Our Latest Pieces` |
| `howto_label` | How-to-Order section label | `Simple & Easy` |
| `howto_title` | How-to-Order heading | `How to Order` |
| `faq_label` | FAQs section label | `Good to Know` |
| `faq_title` | FAQs heading | `Before You Order` |
| `footer_text` | Footer copyright text | `© 2026 Gifts by VF. All rights reserved.` |
| `whatsapp_number` | Number used to build every WhatsApp order link (digits only) | `2348127252004` |
| `commission_rule` | Commission note shown on the sales rep page only | `10% commission on every sale` |

Each row is an optional override: leave a key out (or give it an empty value) and the site falls back to its built-in default for that part of the page. `whatsapp_number` is digits only — the site uses it to build every WhatsApp order link.

### Products tab
Use headers like:

- `name`
- `description`
- `image_url`
- `video_url`
- `price`
- `category`
- `display_order`
- `is_visible`
- `in_stock`
- `stock_label`
- `occasion`
- `featured`
- `material`
- `size`
- `turnaround`
- `delivery_notes`
- `payment_terms`
- `sales_caption`

Notes:

- `name` must be **unique** — the site, preview pages, and sales rep share links all identify products by name.
- `occasion` takes comma-separated tags (e.g. `Birthday, Wedding`) and powers the occasion filter.
- `featured` = `TRUE` shows the product in the "Featured Pieces" strip at the top of the page (it hides from the main grid while a filter is active).
- `in_stock` = `FALSE` / `0` / `no` marks the product **Sold Out** with an *Enquire on WhatsApp* button; `stock_label` replaces the badge text.
- `material`, `size`, `turnaround`, `delivery_notes`, `payment_terms` appear on the product card only when filled.
- `video_url` accepts a YouTube, Google Drive, or direct MP4/WebM link; the card shows a ▶ badge that plays the video fullscreen. Use a photo, a video, or both (with both, the photo is the thumbnail). Share Drive videos as `Anyone with the link`.
- `sales_caption` is the ready-made pitch shown to sales reps next to their share button.

Example:

| name | description | image_url | price | category | display_order | is_visible | in_stock |
|---|---|---|---|---|---|---|---|
| Customised Necklace | A beautiful personalised ... | https://... | 26000 | Jewelry | 1 | TRUE | TRUE |

### Portfolio tab
Use headers:

- `image_url`
- `caption`
- `category`
- `wide`
- `display_order`
- `is_visible`

### Testimonials tab
Use headers:

- `quote`
- `name`
- `source`
- `rating`
- `display_order`
- `is_visible`

### Why Us tab
Use headers:

- `title`
- `description`
- `icon`
- `display_order`
- `is_visible`

Possible icon values:

- `jewelry`
- `gift`
- `heart`
- `star`
- `truck`
- `sparkle`
- `award`
- `camera`
- `chat`
- `target`
- `corporate`
- `acrylic`
- `link`

### How to Order tab
Use headers:

- `title`
- `description`
- `display_order`
- `is_visible`

### FAQs tab
Use headers:

- `question`
- `answer`
- `display_order`
- `is_visible`

### Sales Reps tab
Use headers:

- `rep_id`
- `name`
- `commission_rate`
- `is_active`

### Payouts tab
Use headers:

- `rep_id`
- `product`
- `order_amount`
- `commission`
- `status`
- `date`

## 4) Set sharing and publishing access

To let the website read the sheet, the spreadsheet must be shared with a link that allows reading.

1. In Google Sheets, click Share.
2. Set access to `Anyone with the link`.
3. Set role to `Viewer`.
4. Save the link.

For the script to read the data, the sheet URL must be copied into the JavaScript config or into the code project.

## 5) Connect the sheet to the site

The project reads data through the published CSV export links, using the sheet ID in **two** places:

1. `js/shared.js` — `VFUtils.SHEET_ID`
2. `api/product/[slug].js` — the serverless product-preview route (top of the file)

If the spreadsheet is changed or replaced:

1. Get the new spreadsheet URL.
2. Copy the spreadsheet ID.
3. Update the sheet ID in `js/shared.js` **and** `api/product/[slug].js`.
4. Refresh the site.

## 6) Keep rows hidden or visible

Use the `is_visible` column to hide or show content.

- `TRUE` or `1` = visible
- `FALSE` or `0` = hidden
- leaving the cell **blank** = visible

This is very useful when you are preparing updates and do not want them live yet.

> The same "blank counts as visible" rule applies to `is_active` on the Sales Reps tab and `in_stock` on Products (blank `in_stock` keeps a product available).

## 7) Reorder content

Use `display_order` to control the order of rows in a section.

- Lower numbers appear first.
- Higher numbers appear later.

## 8) Quick checklist

Before publishing, confirm:

- tab names are exact
- headers are correct
- rows have `is_visible` values
- product names are unique
- images use shareable links
- the sheet is shared publicly for viewing
- the spreadsheet ID is correct in `js/shared.js` and `api/product/[slug].js`

## 9) Troubleshooting

If a section does not appear:

- check the tab name
- confirm there is at least one visible row
- confirm the sheet is shared correctly
- confirm the script is calling the correct sheet ID

If prices or content do not show correctly:

- check for blank values or malformed CSV rows
- confirm the header names are correct
- check for unsupported characters or broken image links

### Site Settings changes not showing

The site caches each tab for 60 seconds and Google's own export cache can add a short delay. To see edits immediately, open:

```
https://vf-gift-shop.vercel.app/?refresh=1
```

(`?refresh=1` bypasses the site cache for that load. For the rep page use `reps.html?refresh=1`.)

If settings still never appear:

- confirm the `Site Settings` tab layout is exactly row 1 = `key`,`value` with one key pair per row below
- make sure there are **no merged cells** and nothing in columns C and beyond
- delete any stray/empty rows below the last key, then re-type any cell to force Google to refresh its export
- the site reads `Site Settings` from the classic `export?format=csv&gid=0` endpoint, so as long as that tab is the first tab the layout above applies

---

This setup is the heart of the catalogue. Once the tabs are configured correctly, the site can update automatically without code changes.
