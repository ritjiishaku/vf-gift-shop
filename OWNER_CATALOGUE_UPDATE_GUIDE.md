# Owner Guide: How to Update the Catalogue

This step-by-step guide explains how the owner can update the whole Gifts by VF storefront without changing code.

## 1) Open the Google Sheet

1. Open the spreadsheet used for the catalogue.
2. Confirm the tab names are correct.
3. Make sure the sheet was shared with the website so it can read the data.

If you are unsure, check the Google Sheet Configuration Guide in this project.

## 2) Update the hero and site settings

Go to the `Site Settings` tab.

The full list of keys the site reads is:

- `site_title` — browser tab title
- `brand_name` / `brand_accent` — logo text (name + highlighted letter)
- `hero_label` / `hero_title` / `hero_desc` / `hero_cta` — homepage hero copy
- `products_label` / `products_title` / `products_desc` — catalogue heading
- `featured_label` / `featured_title` — "Featured Pieces" strip heading
- `why_label` / `why_title` — "Why People Come Back" heading
- `testimonials_label` / `testimonials_title` — reviews heading
- `portfolio_label` / `portfolio_title` — recent work heading
- `howto_label` / `howto_title` — "How to Order" heading
- `faq_label` / `faq_title` — "Before You Order" heading
- `footer_text` — footer line
- `whatsapp_number` — number used for every order button (digits only)
- `commission_rule` — short line shown on the sales rep page, e.g. `10% commission on every sale`

These values update the homepage copy and the WhatsApp contact links.

### Example

| key | value |
|---|---|
| hero_title | Thoughtful gifts for every birthday, wedding and milestone. |
| hero_desc | Handcrafted gifts made to celebrate the people who matter most. |
| footer_text | Gifts by VF &middot; Handmade with love |
| commission_rule | 10% commission on every sale |

## 3) Add or edit products

Go to the `Products` tab.

### Fill in these fields for each product

Core fields:

- `name`
- `description`
- `image_url`
- `price`
- `category`
- `display_order`
- `is_visible`

Optional fields (shown on the product card only when filled):

- `material`
- `size`
- `turnaround`
- `delivery_notes`
- `payment_terms`
- `video_url` — a YouTube, Google Drive, or direct MP4/WebM link; a ▶ badge appears on the card and clicking it plays the video fullscreen. Give a product a photo, a video, or both (with both, the photo becomes the thumbnail). Share Drive videos as `Anyone with the link`, same as images
- `occasion` — comma-separated tags (e.g. `Birthday, Wedding`) that power the occasion filter
- `featured` — set to `TRUE` to show the product in the "Featured Pieces" strip at the top of the page (it hides from the main grid while a filter is active)
- `in_stock` — set to `FALSE` / `0` / `no` to mark the product **Sold Out** (the card switches to an *Enquire on WhatsApp* button)
- `stock_label` — replaces the badge text, e.g. `Pre-Order Only`
- `sales_caption` — the ready-made pitch shown to sales reps next to their share button

### Good product example

| name | description | price | category | is_visible | in_stock |
|---|---|---|---|---|---|
| Customised Bracelet | Personalised bracelet for birthdays and anniversaries | 20000 | Jewelry | TRUE | TRUE |

### Tips

- Each product `name` must be **unique** — the site, the share links, and the preview pages all identify products by name.
- Keep products in a single category for easier filtering.
- Use `display_order` to decide the order on the catalogue page.
- Leave `is_visible` blank to keep the product visible; set it to `FALSE`, `0`, or `no` when you are not ready to publish.
- Use `featured` = `TRUE` for the "Featured Pieces" strip at the top of the catalogue.

## 4) Add product images

For each product image:

1. Upload the image to Google Drive or another image host.
2. Make sure sharing is set to `Anyone with the link`.
3. Copy the direct image link.
4. Paste it into `image_url`.

Best practice:

- use clean product photos
- keep a consistent background
- use square or near-square images for the best catalogue layout

## 5) Update the Why Us section

Go to the `Why Us` tab.

Each row becomes a feature card.

Required columns:

- `title`
- `description`
- `icon`
- `display_order`
- `is_visible`

Example:

| title | description | icon | is_visible |
|---|---|---|---|
| Personalised gifting | Thoughtful custom pieces for birthdays, weddings and meaningful moments. | gift | TRUE |

## 6) Add testimonials

Go to the `Testimonials` tab.

Each row becomes a customer review card.

Required fields:

- `quote`
- `name`
- `source`
- `rating`
- `display_order`
- `is_visible`

Example:

| quote | name | source | rating | is_visible |
|---|---|---|---|---|
| Beautiful and meaningful gift. | Ada | Instagram | 5 | TRUE |

## 7) Add portfolio pieces

Go to the `Portfolio` tab.

Each row becomes a gallery card.

Required fields:

- `image_url`
- `caption`
- `category`
- `wide`
- `display_order`
- `is_visible`

Use `wide = TRUE` for larger feature images.

## 8) Add FAQ entries

Go to the `FAQs` tab.

Each row becomes a collapsible FAQ item.

Required fields:

- `question`
- `answer`
- `display_order`
- `is_visible`

Example:

| question | answer | is_visible |
|---|---|---|
| How long does delivery take? | Delivery usually takes 3–7 working days depending on location. | TRUE |

## 9) Add How to Order steps

Go to the `How to Order` tab.

Use:

- `title`
- `description`
- `display_order`
- `is_visible`

This controls the numbered steps shown on the homepage.

Example:

| title | description | is_visible |
|---|---|---|
| Pick your gift | Browse the catalogue and choose the product you love. | TRUE |

## 10) Add sales reps

Go to the `Sales Reps` tab.

Use fields:

- `rep_id`
- `name`
- `commission_rate`
- `is_active`

Example:

| rep_id | name | commission_rate | is_active |
|---|---|---|---|
| kofi | Kofi S. | 10 | TRUE |

This lets reps log in to the rep page and share product referral links.

## 11) Add payout records

Go to the `Payouts` tab.

Use fields:

- `rep_id`
- `product`
- `order_amount`
- `commission`
- `status`
- `date`

Set the `status` to:

- `PENDING`
- `PAID`

Matching is case-insensitive, so `paid`, `PAID`, `Pending`, and `pending` all work.

This helps keep reps and commissions organised.

## 12) Publish and check the site

After making changes:

1. save the Google Sheet
2. refresh the site in the browser
3. confirm each section appears correctly
4. check that product cards, descriptions, and images are updated

## 13) Troubleshooting

If something does not appear:

- check `is_visible` is not `FALSE`, `0`, or `no` (blank counts as visible)
- check the tab name matches exactly
- check the sheet is still shared with anyone who can view it
- check the header names match the expected format

If a product is missing a photo:

- confirm the image link is valid
- confirm the link is shareable
- confirm the URL is not blocked or empty

## 14) Best practice

- keep one source of truth in the Google Sheet
- update content in bulk when possible
- use `display_order` to keep sections organised
- hide content with `is_visible = FALSE` before publishing
- always test after a batch update

---

The owner can update the catalogue by editing the Google Sheet only. The website reads the data automatically, so no code changes are needed for normal content updates.
