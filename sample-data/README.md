# Sample Data Import

These CSV files contain sample data for the Gift Shop by VF showroom. Import each into its matching tab in the Google Sheet.

## Files → Tabs

| File | Tab |
|------|-----|
| `site-settings.csv` | `Site Settings` |
| `products.csv` | `Products` |
| `portfolio.csv` | `Portfolio` |
| `testimonials.csv` | `Testimonials` |
| `why-us.csv` | `Why Us` |
| `how-to-order.csv` | `How to Order` |

## How to import (per tab)

1. Open the matching tab in the Google Sheet (e.g. "Site Settings")
2. Click **File → Import → Upload**
3. Select the CSV file
4. Choose **"Replace current sheet"**
5. Confirm — then repeat for the remaining 5 tabs

## Important

- Keep the tab names exactly as listed above (spelling + spaces matter)
- The first row of each CSV is the header — do not delete it
- To hide a row, change its `is_visible` cell to `FALSE`
- To reorder rows, change the `display_order` number
- Column headers must stay on row 1

## After import

- Your site reads the sheet automatically — no re-publishing or code changes needed
- Replace placeholder portfolio photos with your real photos by swapping the `image_url` values
