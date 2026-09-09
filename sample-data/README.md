# Sample Data Import

These CSV files contain sample data for the Gifts by VF showroom. Import each into its matching tab in the Google Sheet.

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

## How to import (per tab)

1. Open the matching tab in the Google Sheet (e.g. "Site Settings")
2. Click **File → Import → Upload**
3. Select the CSV file
4. Choose **"Replace current sheet"**
5. Confirm — then repeat for the remaining tabs

## Important

- Keep the tab names exactly as listed above (spelling + spaces matter)
- The first row of each CSV is the header — do not delete it
- To hide a row, change its `is_visible` cell to `FALSE`
- To reorder rows, change the `display_order` number
- Column headers must stay on row 1

## After import

- Your site reads the sheet automatically — no re-publishing or code changes needed
- Replace placeholder portfolio photos with your real photos by swapping the `image_url` values

---

## Sales Rep System

The site lets sales reps share product links and earn commission. Setup is simple:

1. **Add reps** — in the `Sales Reps` tab, give each rep a short **`rep_id`** (e.g. `kofi`), their name, WhatsApp, and a **`commission_rate`** (e.g. `10` = 10%). Set `is_active` to `TRUE` to let them log in.
2. **Publish Payouts** (so reps can see their status) — **File → Share → Publish to web** → choose tab **Payouts** → format **CSV** → Publish. Once published, reps can see their commissions on the `reps.html` page.
3. **The flow:**
   - The owner adds products to the catalogue as usual.
   - A rep opens **`reps.html`** (link in the site footer — "Sales Rep Tools"), enters their `rep_id`, picks a product, and copies its share link.
   - The share link looks like: `https://your-site.com/index.html?ref=kofi&p=3`
   - When a buyer clicks it, the site shows *"You were referred by Kofi"*, highlights the product, and the **Order on WhatsApp** button opens a message pre-filled with the product **and** the referral.
   - The owner confirms the order + payment in WhatsApp, then logs the sale in the `Payouts` tab: `rep_id`, `product`, `order_amount`, `commission` (amount × rate), `status` (`PENDING` or `PAID`), `date`, `notes`.
4. **Commission:** `commission = order_amount × commission_rate / 100`. The owner writes the number in the `commission` column. Flip `status` to `PAID` once the rep is paid.

### Rep link format

Each product is identified by its **`display_order`** number. The link is built as:

```
index.html?ref=REP_ID&p=DISPLAY_ORDER
```

Buyers who were referred keep the attribution for 30 days (stored in their browser), so even if they order a different product later, the referral still reaches you in the WhatsApp message.
