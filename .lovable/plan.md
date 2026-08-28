# FreshCart — Online Grocery Store

Build FreshCart twice from one shared design system: a React app (live preview, publishable) and a standalone HTML/CSS/JS copy you can open directly in a browser.

## Design direction

Fresh premium grocery aesthetic with its own identity:
- Brand green primary, white/light surfaces, orange-yellow accents for offers, soft pastel category tints
- Rounded cards, subtle shadows, generous spacing, modern sans typography with a friendly display face for headings
- Hover lifts, micro-interactions, entrance animations, animated counters
- Full dark mode with saved preference

## Pages (both versions)

Home, Shop, Product Details, Categories, Wishlist, Cart, Checkout, Order Success, About, Contact, Account — all linked through a working navbar (hamburger on mobile) with search, wishlist count, cart count, account, and theme toggle.

**Home:** hero ("Fresh groceries. Happy kitchens.") with produce imagery, floating discount badge, decorative fruit elements, Shop Now / Explore Categories; floating "Freshness Guaranteed" card; 10 colorful category cards; Today's Deals with a live flash-sale countdown; best-sellers grid; "Save More With Bundles" (Breakfast, Movie Night, Healthy Start) with one-click bundle add.

**Shop:** name search, filters (category, min/max price, rating, discount), sorting (price asc/desc, rating, popularity, discount), responsive grid (4 / 2-3 / 1-2 columns), empty state.

**Product Details:** large image, rating and reviews, price/discount, description, freshness score badge, quantity selector, Add to Cart, Buy Now, Add to Wishlist, "You May Also Like".

**Cart:** line items with quantity controls, per-item totals, remove; subtotal, delivery fee, discount, grand total; "Reveal My Surprise 🎁" random 5–20% discount; smart category-based suggestions; Continue Shopping / Proceed to Checkout.

**Checkout:** customer info, address, delivery option (standard/express, affects fee), payment method with card fields revealed for card, validation, live order summary.

**Order Success:** random order number (#FC48291 style), total, address, ETA, ordered items, Continue Shopping; order saved for history.

**Account:** profile info, saved address, wishlist summary, order history with Confirmed / Preparing / Out for Delivery / Delivered statuses.

**About:** mission, why-choose-us, guarantee cards, stats (10K+, 500+, 50+, 24/7) animated on scroll into view.

**Contact:** validated form with success toast, plus location/phone/email/hours cards.

## Interactive features

Floating mobile cart pill ("🛒 3 items • $24.50"), Added ✓ button state, toast notifications for every action, freshness score badges, smart cart suggestions, surprise discount, dark mode, localStorage for cart / wishlist / orders / profile / theme.

## Products

~25 realistic grocery items (apples, bananas, tomatoes, potatoes, milk, eggs, bread, rice, cereal, orange juice, chips, chocolate, coffee, dish liquid, shampoo, and more) with prices, discounts, ratings, categories, freshness scores, and reliable image URLs. Cards are rendered from data, never hand-duplicated.

## Technical notes

- React version: routes under `src/routes/` (`/`, `/shop`, `/product/$id`, `/categories`, `/wishlist`, `/cart`, `/checkout`, `/order-success`, `/about`, `/contact`, `/account`), shared header/footer/toaster in `__root.tsx`, all color/shadow/gradient values as semantic tokens in `src/styles.css`, per-route `head()` metadata. State in small localStorage-backed hooks; no backend.
- Static version: `public/freshcart/` with `index.html`, `shop.html`, `product.html`, `categories.html`, `wishlist.html`, `cart.html`, `checkout.html`, `order-success.html`, `about.html`, `contact.html`, `account.html`, plus `css/style.css` and `js/products.js`, `app.js`, `cart.js`, `wishlist.js`, `checkout.js`. Same design, hand-written CSS (no Tailwind), openable via file:// and at `/freshcart/index.html`.
- Verified at 320 / 375 / 425 / 768 / 1024 / 1440 px with no horizontal scroll.
