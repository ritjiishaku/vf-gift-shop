# Google Sheet Configuration Guide

This guide explains how to set up the Google Sheet that powers the Gifts by VF catalogue and admin flow.

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
Use a key/value structure like this:

| key | value |
|---|---|
| site_title | Gifts by VF — Handcrafted & Bespoke Gifts |
| brand_name | Gifts by V |
| brand_accent | F |
| hero_label | Thoughtful Gifts |
| hero_title | Thoughtful gifts for every special moment. |
| hero_desc | Handcrafted jewellery, acrylic keepsakes... |
| hero_cta | Chat on WhatsApp |
| products_label | The Catalogue |
| products_title | Shop our pieces |
| products_desc | Every piece is handmade and made to order. |
| featured_label | Curated For You |
| featured_title | Featured Pieces |
| why_label | Why People Come Back |
| why_title | The VF Difference |
| testimonials_label | Kind Words |
| testimonials_title | What Customers Say |
| portfolio_label | Recent Work |
| portfolio_title | Our Latest Pieces |
| howto_label | Simple & Easy |
| howto_title | How to Order |
| faq_label | Good to Know |
| faq_title | Before You Order |
| footer_text | Gifts by VF — Handmade with love |
| whatsapp_number | 2348127252004 |
| commission_rule | 10% commission on every sale |

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

---

This setup is the heart of the catalogue. Once the tabs are configured correctly, the site can update automatically without code changes.
