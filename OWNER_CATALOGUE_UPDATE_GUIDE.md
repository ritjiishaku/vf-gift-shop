# Owner Guide: How to Update the Catalogue

This step-by-step guide explains how the owner can update the whole Gifts by VF storefront without changing code.

## 1) Open the Google Sheet

1. Open the spreadsheet used for the catalogue.
2. Confirm the tab names are correct.
3. Make sure the sheet was shared with the website so it can read the data.

If you are unsure, check the Google Sheet Configuration Guide in this project.

## 2) Update the hero and site settings

Go to the `Site Settings` tab.

You can change values like:

- `site_title`
- `hero_label`
- `hero_title`
- `hero_desc`
- `hero_cta`
- `whatsapp_number`
- `howto_label`
- `howto_title`
- `faq_label`
- `faq_title`

These values update the homepage copy and the WhatsApp contact links.

### Example

| key | value |
|---|---|
| hero_title | Thoughtful gifts for every birthday, wedding and milestone. |
| hero_desc | Handcrafted gifts made to celebrate the people who matter most. |

## 3) Add or edit products

Go to the `Products` tab.

### Fill in these fields for each product

- `name`
- `description`
- `image_url`
- `price`
- `category`
- `occasion`
- `display_order`
- `is_visible`
- `in_stock`
- `stock_label`
- `featured`

### Good product example

| name | description | price | category | is_visible | in_stock |
|---|---|---|---|---|---|
| Customised Bracelet | Personalised bracelet for birthdays and anniversaries | 20000 | Jewelry | TRUE | TRUE |

### Tips

- Keep products in a single category for easier filtering.
- Use `display_order` to decide the order on the catalogue page.
- Set `is_visible` to `FALSE` when you are not ready to publish a product.
- Use `featured` = `TRUE` for highlight items in the campaign area.

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

This helps keep reps and commissions organised.

## 12) Publish and check the site

After making changes:

1. save the Google Sheet
2. refresh the site in the browser
3. confirm each section appears correctly
4. check that product cards, descriptions, and images are updated

## 13) Troubleshooting

If something does not appear:

- check `is_visible` is `TRUE`
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
