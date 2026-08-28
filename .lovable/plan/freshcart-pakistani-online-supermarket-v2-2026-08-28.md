# FreshCart — Pakistani Online Supermarket (v2)

The FreshCart shell already works (11 pages, cart, wishlist, orders, dark mode, toasts, countdown, localStorage). This plan turns it into a realistic Pakistani supermarket: PKR everywhere, 15 categories, 60+ products, and real product photography instead of emoji tiles.

## 1. Currency: PKR only

Every money value becomes `Rs. 1,250` style, thousand-separated, no decimals — product cards, product detail, bundles, cart, delivery fee, discount, total, checkout, order confirmation, order history, deals, surprise discount. No `$`, `€`, `£` anywhere in the codebase.

Pakistani-realistic pricing and fees: delivery Rs. 150 standard / Rs. 300 express, free over Rs. 3,000. Phone format `03XX-XXXXXXX`, cities Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta.

## 2. Real product photography

Every product gets its own photographic product shot that matches the actual item — milk carton for Milk, chips packet for Potato Chips, chocolate bar for Chocolate, biscuit pack for Biscuits, supermarket-style loose apples for Apples, shampoo bottle for Shampoo.

- Images are produced as photo-realistic studio/supermarket photography (neutral background, consistent lighting, generic packaging with no real trademarks) and stored locally in `src/assets/products/`, mirrored to `public/freshcart/assets/images/` for the static copy.
- Local files mean nothing 404s the way hotlinked stock URLs do, and each product has a unique image — no duplicates, no placeholders, no emoji, no cartoons or illustrations anywhere a product image belongs.
- Plus one supermarket hero photo, one sale-banner photo, and 10 category cover photos.
- Emoji survive only as tiny decorative labels in section headings and category chips.

## 3. Catalogue: 60+ products, 15 categories

Fresh Produce, Dairy & Eggs, Bakery, Chocolates & Sweets, Snacks, Biscuits & Cookies, Beverages, Tea & Coffee, Rice & Grains, Pantry & Cooking, Pasta & Instant Food, Nuts & Dry Fruits, Frozen Food, Personal Care, Household.

Each product: unique name, category, unit size, PKR price, optional original price + discount %, rating, review count, description, tags (fresh / new / bestseller), unique image. Coverage follows the requested item lists per category (produce through household, including the full chocolates/sweets, snacks, biscuits, beverages, frozen, personal care and household aisles).

## 4. Home page

- Hero: "Fresh groceries. Delivered to your door." with the requested subheading, Shop Now / Explore Categories, real supermarket photograph, 🌿 Freshness Guaranteed badge.
- Weekend Grocery Sale banner — UP TO 30% OFF, Shop Deals.
- Shop by Category: 10 photo cards that deep-link into a pre-filtered shop.
- Best Sellers: 16–20 cards with photo, name, category, Rs. price, original price, discount, rating, review count, wishlist, add to cart.
- Snack Attack 🍫: 10–12 chocolates/chips/biscuits/drinks, View All Snacks.
- Fresh Today 🌿: produce strip with Farm Fresh / Fresh Today / Best Quality badges.
- Flash Deals with a live JS countdown (02:14:36 style) and original/sale/percent per card.
- Smart Grocery Bundles: Breakfast, Movie Night, Healthy Basket, Cleaning — bundle price in PKR, one-click Add Bundle to Cart.
- Nav gains Deals and Bundles links alongside Home, Shop, Categories, About, Contact, with search, wishlist count, cart count, account, theme toggle, hamburger on mobile.

## 5. Shop, product, cart, checkout

- Shop: real-time search ("Search groceries, snacks, chocolates..."), category chips, min/max PKR, rating 4+/3+, sorting Recommended / Price ↑ / Price ↓ / Highest Rated / Biggest Discount, empty state, 2 / 3 / 4–5 columns.
- Product detail: large photo, category, rating, reviews, PKR price and discount, description, quantity selector, Add to Cart, Buy Now, Add to Wishlist, category-based You May Also Like.
- Cart: photo line items, quantity controls, per-line totals, Subtotal / Delivery / Discount / Total in Rs., "Feeling Lucky? 🎁 Reveal My Discount" random 5–20% applied and persisted, smart "You might also need..." recommendations with quick Add.
- Checkout: customer info, Pakistani address fields with city select, standard/express delivery, Cash on Delivery / Card (JS-revealed card fields) / Digital Wallet, validation, live PKR summary.
- Order confirmation: `#FC82941` order number, items, PKR total, address, delivery method, ETA, saved to localStorage.
- Account: profile, saved address, wishlist summary, settings, order history with Confirmed / Preparing / Out for Delivery / Delivered.
- Wishlist empty state: "Your wishlist is waiting for something delicious! 🍫".
- About: mission, five value pillars, scroll-animated stats (10,000+ / 500+ / 50+ / 24/7). Contact: validated form with toast success.

## 6. Static HTML/CSS/JS copy

`public/freshcart/` gets the exact requested structure — `index.html`, `shop.html`, `product.html`, `categories.html`, `wishlist.html`, `cart.html`, `checkout.html`, `order-success.html`, `account.html`, `about.html`, `contact.html`, `css/style.css`, `js/products.js`, `app.js`, `cart.js`, `wishlist.js`, `product.js`, `checkout.js`, `assets/images/` — hand-written CSS, vanilla JS, same catalogue, same images, same PKR formatting. Opens directly in a browser and at `/freshcart/index.html`.

## Technical notes

- One catalogue module (`src/lib/fc-data.ts`) with an `image` field per product and a single `money()` helper emitting `Rs. 1,250`; the static copy mirrors both in `js/products.js`.
- Product images generated in batches, square and visually consistent so the grid reads as one catalogue.
- Existing design tokens, dark mode, toasts, floating mobile cart and localStorage layer are extended, not rewritten; storage keys cover cart, wishlist, orders, theme, surpriseDiscount, userInformation.
- Verified at 320 / 375 / 425 / 768 / 1024 / 1440 px with no horizontal scroll, and every image checked to render.
