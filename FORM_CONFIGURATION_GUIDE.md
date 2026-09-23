# Form Configuration Guide

This guide explains how the Google Form workflow is set up and how to keep it connected to the catalogue.

## 1) What the forms do

The project uses Google Forms as the content entry points for the storefront.

Each form submission is copied into the matching Google Sheet tab by `form-sync.gs`.

This allows the owner to add:

- products
- portfolio images
- FAQs
- testimonials
- why-us cards
- how-to-order steps
- sales rep entries
- payout records

without editing the sheet manually.

## 2) Where the form sync is defined

The sync logic lives in:

- `form-sync.gs`

It maps each form response to the correct sheet tab.

## 3) Required form setup

For each content form, make sure the field names in the form match the sheet column names as closely as possible.

Example:

- `name` → product name
- `description` → product description
- `price` → product price
- `category` → category label
- `image_url` → product image URL
- `question` → FAQ question
- `answer` → FAQ answer
- `quote` → testimonial quote
- `rating` → star rating (1–5)

## 4) Matching form fields to tabs

The spreadsheet tabs and matching form content are below. Each form lists its **inputs** (the questions to create) with their **settings** (field type, required or not, and the accepted values). Field names should match the sheet columns as closely as possible.

### Products form

| Input (question) | Type | Required | Notes / accepted values |
|---|---|---|---|
| `name` | Short answer | Yes | Must be **unique** — the site identifies products by name |
| `description` | Paragraph | No | Body copy shown on the card |
| `image_url` | Short answer (URL) | No | A photo, a video link, or both |
| `video_url` | Short answer (URL) | No | YouTube, Google Drive, or direct MP4/WebM link; shows a ▶ play badge |
| `price` | Short answer | No | Digits only, e.g. `26000` |
| `category` | Short answer | No | e.g. `Jewelry`, `Acrylic` |
| `display_order` | Short answer | No | Number; lower appears first |
| `is_visible` | Multiple choice | No | `TRUE` / `FALSE` / `1` / `0`; blank = visible |
| `in_stock` | Multiple choice | No | `FALSE` / `0` / `no` marks Sold Out; blank = available |
| `stock_label` | Short answer | No | Replaces the "Sold Out" badge text |
| `occasion` | Short answer | No | Comma-separated tags, e.g. `Birthday, Wedding` |
| `featured` | Multiple choice | No | `TRUE` / `1` shows it in the Featured Pieces strip |
| `material` | Short answer | No | Shows on card only when filled |
| `size` | Short answer | No | Shows on card only when filled |
| `turnaround` | Short answer | No | Shows on card only when filled |
| `delivery_notes` | Paragraph | No | Shows on card only when filled |
| `payment_terms` | Short answer | No | Shows on card only when filled |
| `sales_caption` | Paragraph | No | Ready-made pitch shown to sales reps |

### Portfolio form

| Input (question) | Type | Required | Notes / accepted values |
|---|---|---|---|
| `image_url` | Short answer (URL) | Yes | Must open in a browser directly |
| `caption` | Short answer | No | Label shown under the image |
| `category` | Short answer | No | e.g. `Jewelry`, `Acrylic` |
| `wide` | Multiple choice | No | `TRUE` / `1` renders the tile wide |
| `display_order` | Short answer | No | Number; lower appears first |
| `is_visible` | Multiple choice | No | `TRUE` / `FALSE` / `1` / `0`; blank = visible |

### Testimonials form

| Input (question) | Type | Required | Notes / accepted values |
|---|---|---|---|
| `quote` | Paragraph | Yes | The customer's words |
| `name` | Short answer | No | Customer name shown with the quote |
| `source` | Short answer | No | e.g. `WhatsApp`, `Instagram` |
| `rating` | Multiple choice (1–5) | No | Star rating |
| `display_order` | Short answer | No | Number; lower appears first |
| `is_visible` | Multiple choice | No | `TRUE` / `FALSE` / `1` / `0`; blank = visible |

### Why Us form

| Input (question) | Type | Required | Notes / accepted values |
|---|---|---|---|
| `title` | Short answer | Yes | Card heading |
| `description` | Paragraph | No | Card body text |
| `icon` | Multiple choice | No | `jewelry`, `gift`, `heart`, `star`, `truck`, `sparkle`, `award`, `camera`, `chat`, `target`, `corporate`, `acrylic`, `link` |
| `display_order` | Short answer | No | Number; lower appears first |
| `is_visible` | Multiple choice | No | `TRUE` / `FALSE` / `1` / `0`; blank = visible |

### How to Order form

| Input (question) | Type | Required | Notes / accepted values |
|---|---|---|---|
| `title` | Short answer | Yes | Step heading |
| `description` | Paragraph | No | Step body text |
| `display_order` | Short answer | No | Number; lower appears first |
| `is_visible` | Multiple choice | No | `TRUE` / `FALSE` / `1` / `0`; blank = visible |

### FAQs form

| Input (question) | Type | Required | Notes / accepted values |
|---|---|---|---|
| `question` | Paragraph | Yes | FAQ question |
| `answer` | Paragraph | Yes | FAQ answer |
| `display_order` | Short answer | No | Number; lower appears first |
| `is_visible` | Multiple choice | No | `TRUE` / `FALSE` / `1` / `0`; blank = visible |

### Sales Reps form

| Input (question) | Type | Required | Notes / accepted values |
|---|---|---|---|
| `rep_id` | Short answer | Yes | Must be **unique** — used in share links |
| `name` | Short answer | Yes | Rep display name |
| `commission_rate` | Short answer | No | Percentage, e.g. `10` |
| `is_active` | Multiple choice | No | `TRUE` / `FALSE` / `1` / `0`; blank = visible |

### Payouts form

| Input (question) | Type | Required | Notes / accepted values |
|---|---|---|---|
| `rep_id` | Short answer | Yes | Must match a rep on the Sales Reps tab |
| `product` | Short answer | No | Product name sold |
| `order_amount` | Short answer | No | Total order amount |
| `commission` | Short answer | No | The rep's commission for that sale |
| `status` | Multiple choice | No | e.g. `Pending`, `Paid` |
| `date` | Date | No | When the payout was recorded |

## 5) Important field rules

### Boolean fields
Use values like:

- `TRUE`
- `FALSE`
- `1`
- `0`

The script expects boolean-style values to be easy to interpret.

On the site side, only `FALSE`, `0`, and `no` count as "hidden"; **blank counts as visible**. This applies to `is_visible`, `is_active`, and `in_stock` (blank `in_stock` keeps a product available).

Set `featured` to `TRUE` / `1` to show a product in the "Featured Pieces" strip at the top of the page — it hides from the main grid while a filter is active.

### Display ordering
Use `display_order` to control position. Smaller numbers appear first.

### Visibility
Use `is_visible` or `is_active` to hide or show rows.

## 6) Sync logic and mapping

The form sync script uses a mapping structure to send each submitted form response to the right tab.

It does the following:

1. reads the incoming form response
2. identifies the matching form type
3. maps the answer values to the sheet columns
4. appends the data to the correct tab

If a form is missing a mapped target, the submission may not appear where expected.

## 7) How to connect a form in Google Apps Script

1. Open the Google Sheet.
2. Go to Extensions → Apps Script.
3. Paste or update the logic in `form-sync.gs`.
4. Set the matching tab names and response fields.
5. Save the script.
6. Use the trigger editor to set the script to run on form submit.

Example trigger setup:

- Trigger type: `From form` (`From spreadsheet` also works — both fire the same handler)
- Event type: `On form submit`
- Function: `onFormSubmit`

`onFormSubmit` is the exact function name in `form-sync.gs`. After saving, approve the requested permissions the first time. If a submission does not land in a tab, open **View → Logs** in Apps Script — the script logs `No matching tab.` when a form's fields don't match any configured target.

## 8) Validation steps

After setup, test with a real sample submission.

Check that:

- the form response appears in the correct tab
- headers are mapped correctly
- the row shows immediately on the site
- `is_visible` is set to `TRUE` if it should appear live

## 9) Troubleshooting

### Form response not appearing
Check:

- the correct tab name
- the correct target mapping in `form-sync.gs`
- whether the script has permission to edit the spreadsheet

### Data appears in the wrong place
Check:

- the form-to-tab mapping in the script
- whether the header names differ from the expected values

### Section not showing on website
Check:

- the tab has at least one visible row
- `display_order` is valid
- the website is reading the correct sheet and URL

## 10) Best practice

Use one form per content type where possible. This keeps the data cleaner and easier to maintain.

Keep field names simple and consistent. The simpler the form, the less likely the sync process is to break.

---

Once the forms are mapped correctly, the owner can update catalogue content without touching the website code or the design.
