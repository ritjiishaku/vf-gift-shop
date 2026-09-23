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

The spreadsheet tabs and matching form content are:

### Products
Form should collect:

- name
- description
- image_url
- video_url
- price
- category
- display_order
- is_visible
- in_stock
- stock_label
- occasion
- featured
- material
- size
- turnaround
- delivery_notes
- payment_terms
- sales_caption

`material`, `size`, `turnaround`, `delivery_notes`, `payment_terms` are optional and show on the product card only when filled. `video_url` takes a YouTube, Google Drive, or direct MP4/WebM link and shows a ▶ play badge on the card (a product can use a photo, a video, or both). `sales_caption` is the ready-made pitch shown to sales reps. See the Google Sheet Configuration Guide for how `occasion`, `featured`, `in_stock`, and `stock_label` behave.

### Portfolio
Form should collect:

- image_url
- caption
- category
- wide
- display_order
- is_visible

### Testimonials
Form should collect:

- quote
- name
- source
- rating
- display_order
- is_visible

### Why Us
Form should collect:

- title
- description
- icon
- display_order
- is_visible

### How to Order
Form should collect:

- title
- description
- display_order
- is_visible

### FAQs
Form should collect:

- question
- answer
- display_order
- is_visible

### Sales Reps
Form should collect:

- rep_id
- name
- commission_rate
- is_active

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
