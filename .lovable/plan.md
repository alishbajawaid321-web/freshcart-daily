# FreshCart v2 — Real Supermarket Upgrade

The current build has the FreshCart shell working (11 pages, cart, wishlist, orders, dark mode, toasts, localStorage) but uses emoji tiles instead of product photos and only 35 products. This plan replaces the visual layer with realistic product photography, grows the catalogue to a full supermarket, and adds the new home sections.

## 1. Real product photography

Every product gets its own photo-realistic studio product shot, matching exactly what it is: a milk carton for Milk, a chips packet for Potato Chips, a chocolate bar for Chocolate, a shampoo bottle for Shampoo, loose produce on white for fruit and veg.

- Rendered as high-fidelity photographic product images (white/neutral studio background, e-commerce catalogue style, generic packaging with no real trademarks), stored in `src/assets/products/` and reused by the static copy at `public/freshcart/assets/images/`.
- No emojis, cartoons, illustrations, colored boxes or repeated generic images anywhere a product image belongs.
- Files are local, so nothing can 404 the way hotlinked external URLs do.
- Emoji stays only as small decorative accents (category chips, section labels), never as a product image.
- One photographic supermarket hero image plus 9 category cover photos.

## 2. Catalogue: 60+ products, 9 categories

Categories: Fresh Produce, Dairy & Eggs, Bakery, Chocolates & Sweets, Snacks, Beverages, Pantry (rice/grains/cooking), Personal Care, Household.

Every product carries name, category, realistic price, optional original price + discount, rating, review count, unit size, description, tags (fresh / new / bestseller), and its own image. Coverage follows the requested lists: produce (apples, bananas, oranges, mangoes, grapes, watermelon, strawberries, tomatoes, potatoes, onions, carrots, cucumbers, spinach, lettuce, peppers), dairy (milk, chocolate milk, yogurt, greek yogurt, butter, cheese, cream, eggs), bakery (white/brown bread, croissants, muffins, donuts, burger buns, cake, cookies), a large chocolates and sweets aisle (milk/dark/white chocolate, bars, boxes, wafers, truffles, caramels, gummies, lollipops, toffees, marshmallows), snacks (chips, tortilla chips, nachos, popcorn, cheese puffs, crackers, pretzels, biscuits, nuts), beverages (water, cola, lemon-lime, orange soda, energy drink, apple/orange/mango juice, iced tea, coffee, tea), pantry (basmati and brown rice, flour, oats, pasta, spaghetti, macaroni, lentils, chickpeas, beans, cereal, cooking and olive oil, sugar, salt, spices, ketchup, mayo, hot sauce, soy sauce, peanut butter, jam, honey), personal care (shampoo, conditioner, body wash, soap, toothpaste, toothbrush, face wash, hand wash, lotion, deodorant), household (dish liquid, detergent, floor and glass cleaner, tissues, paper towels, trash bags, sponges, brushes).

## 3. Home page rebuild

- Hero: "Everything Fresh. Everything You Need." with the requested subheading, Shop Now and Explore Categories, real supermarket photography, subtle entrance animation.
- Weekend Grocery Sale banner — up to 30% off, Shop Deals button.
- Shop by Category: 9 large photo cards, each linking to the shop pre-filtered.
- Best Sellers: 16–20 products.
- Snack Attack: dedicated colourful chocolate/snack zone, 12 products, View All Snacks button.
- Fresh Today: premium produce strip with "🌿 Fresh Today" and "Farm Fresh" badges.
- Flash Deals: discounted grid with a real JS countdown (02:14:36 style) and per-card original/sale/percent.
- Smart Grocery Bundles: Breakfast, Movie Night, Healthy Basket, Home Cleaning — one-click add-all.

## 4. Shop, product, cart, checkout refinements

- Shop: live search across 60+ products with the "Oops! We couldn't find that product." empty state, category chips, min/max price, rating filters (4+, 3+), and sorting by Recommended / Price ↑ / Price ↓ / Highest Rated / Biggest Discount / Newest. 2 columns on mobile, 3 on tablet, 4–5 on desktop.
- Product detail: large photo, rating, reviews, price/discount, description, quantity, Add to Cart, Buy Now, Wishlist, and category-aware "You May Also Like".
- Cart: photos in line items, quantity controls, per-line totals, subtotal / delivery / discount / total, "Feeling Lucky? 🎁 Reveal My Discount" with a 5–20% animated reveal saved to localStorage, smart category recommendations after each add.
- Checkout, order success, account, about, contact keep their current working behaviour; account gains an Account Settings block, wishlist empty state becomes "Your wishlist is waiting for something delicious! 🍫".

## 5. Static HTML/CSS/JS copy

The standalone version in `public/freshcart/` is built from the same catalogue and the same image files: `index.html`, `shop.html`, `product.html`, `categories.html`, `wishlist.html`, `cart.html`, `checkout.html`, `order-success.html`, `account.html`, `about.html`, `contact.html`, plus `css/style.css`, `js/products.js`, `app.js`, `cart.js`, `wishlist.js`, `product.js`, `checkout.js`, and `assets/images/`. Hand-written CSS, no framework, opens directly in a browser.

## Technical notes

- Product data stays in one module (`src/lib/fc-data.ts`) with an `image` field per product; images are ES6 imports so they are hashed and bundled. The static copy mirrors the same data in `js/products.js` with relative image paths.
- Image generation runs in batches; product images are square, consistent lighting and background so the grid looks like one catalogue.
- Design tokens, dark mode, toasts, floating mobile cart and localStorage layer already in place are kept and extended, not rewritten.
- Verified at 320 / 375 / 425 / 768 / 1024 / 1440 px with no horizontal scroll, and every image checked to render.
