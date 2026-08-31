# FreshCart link preview: own branding, title and description

Right now shared FreshCart links fall back to the platform default preview (Lovable logo), because no preview image is set anywhere in the site's head metadata.

## What changes

1. **Custom preview image** — design a 1200x630 FreshCart preview card: the FreshCart name and cart/leaf mark on the brand green background with a fresh-grocery photo treatment, matching the site's existing look. Saved into the site's public files so it has a stable public URL.
2. **Preview title** — "FreshCart — Online Grocery Delivery in Pakistan"
3. **Preview description** — "Shop fresh produce, dairy, bakery, snacks and pantry staples in PKR. Same-day delivery across Pakistan, free over Rs. 2,500."
4. Apply the image + title + description to the home page's social tags, and add the same preview image to the other main pages (Shop, Categories, Product, Wishlist, Cart, About, Contact) so any shared link shows FreshCart branding instead of the platform default. Each page keeps its own existing title/description wording.

Nothing else about the site's SEO, visible pages, or content changes.

## Technical notes

- Generate `public/og-freshcart.jpg` (1200x630) with the imagegen tool.
- Add `og:image` and `twitter:image` in each leaf route's `head()` meta, using the absolute stable project URL `https://project--e178b9d6-97e4-412b-a71c-56d7d12a4462.lovable.app/og-freshcart.jpg` (per convention, absolute URLs only, and never on `__root`).
- Update `og:title`/`og:description`/`title`/`description` on `src/routes/index.tsx` only; other routes keep theirs.
- Mirror the same tags into the standalone `public/freshcart/*.html` pages' heads for consistency.
- Favicon is untouched (still `/favicon.ico`).

## Note on timing

Social platforms cache previews. After this ships, an already-shared link may keep showing the old preview until the platform re-scrapes it; you can force a refresh in Facebook/LinkedIn/X's link preview debugger.
