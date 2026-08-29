# FreshCart Daily

Create a complete, modern, colorful, professional online grocery shopping website called “FreshCart” using only HTML, CSS, and vanilla JavaScript.

The website must be fully responsive and work smoothly on desktop, tablet, and mobile screens. Build the entire website as a functional front-end project. Do not leave any buttons, links, forms, filters, cart functions, or pages as placeholders. Everything should work properly.

🎨 Overall Design

Create a fresh, premium, colorful grocery-store aesthetic.

Use:

Green as the main brand color

White/light backgrounds

Orange/yellow accents for offers

Soft pastel colors for category sections

Rounded cards

Modern typography

Subtle shadows

Smooth hover effects

Clean spacing

Attractive animations

Professional ecommerce layout

The design should feel like a real modern grocery delivery website, but should have its own unique identity.

Make the interface simple enough for beginners to understand while still looking polished and professional.

📄 PAGES TO CREATE

Create these fully functional pages:

Home

Shop / Products

Product Details

Categories

Wishlist

Shopping Cart

Checkout

Order Confirmation

About Us

Contact Us

My Account / Profile

All pages must be connected through working navigation.

🏠 HOME PAGE

Create an attractive homepage with:

Navigation Bar

FreshCart logo

Home

Shop

Categories

Deals

About

Contact

Search icon/bar

Wishlist icon with item count

Cart icon with item count

Account icon

On mobile, convert the navigation into a hamburger menu.

Hero Section

Create a beautiful grocery-themed hero section with a headline such as:

“Fresh groceries. Happy kitchens.”

Subheading:

“Everything you need, delivered fresh to your doorstep.”

Include:

Shop Now button

Explore Categories button

Attractive grocery imagery

Decorative fruit/vegetable elements

Small floating discount badge

Add a subtle entrance animation.

Unique Element: Freshness Guarantee

Create a floating card saying:

🌿 Freshness Guaranteed
“Fresh products or your money back.”

Make it visually attractive.

🥕 CATEGORY SECTION

Create colorful category cards:

🍎 Fruits & Vegetables
🥛 Dairy & Eggs
🍞 Bakery
🥩 Meat & Seafood
🍚 Rice & Grains
🍪 Snacks
🥤 Beverages
🧴 Personal Care
🧹 Household
🍫 Chocolates & Sweets

Each category must be clickable and should take the user to the appropriate filtered products.

🔥 TODAY'S DEALS

Create a visually attractive deals section.

Each product card should contain:

Product image

Product name

Category

Original price

Discounted price

Discount percentage

Star rating

Wishlist ❤️ button

Add to Cart button

Add a countdown timer:

Flash Sale Ends In
02 : 14 : 36

The timer must actually count down using JavaScript.

🛍️ PRODUCT SECTION

Display popular/best-selling products.

Include products such as:

Fresh Apples

Bananas

Tomatoes

Potatoes

Milk

Eggs

Bread

Rice

Cereal

Orange Juice

Potato Chips

Chocolate

Coffee

Dishwashing Liquid

Shampoo

Use realistic prices and attractive product images.

Create reusable product cards using JavaScript rather than manually duplicating huge amounts of HTML.

⭐ UNIQUE FEATURE: SMART CART SUGGESTIONS

When the user adds a product to the cart, show a small recommendation such as:

“You added Milk 🥛”

You may also need:
Bread + Eggs

Allow the user to quickly add the suggested products.

Make these recommendations based on product categories.

🔎 SHOP PAGE

Create a complete ecommerce product page.

Include:

Search

Users should be able to search products by name.

For example:

Searching:
“milk”

should instantly display matching milk products.

Filters

Add working filters for:

Category

Minimum price

Maximum price

Rating

Discount

Sorting

Allow:

Price: Low to High

Price: High to Low

Highest Rated

Most Popular

Biggest Discount

Product Grid

Make the grid responsive:

Desktop:
4 products per row

Tablet:
2–3 products per row

Mobile:
1–2 products per row

🥦 PRODUCT DETAILS PAGE

When the user clicks a product, open a product details page.

Show:

Large product image

Product name

Rating

Reviews

Price

Discount

Description

Quantity selector

Add to Cart

Buy Now

Add to Wishlist

Also show:

“You May Also Like”

Display related products.

❤️ WISHLIST

Create a fully working wishlist.

Users can:

Add products

Remove products

Move products to cart

Show an empty state when there are no wishlist items:

“Your wishlist is waiting for some fresh picks! 🥕”

Wishlist data should persist using localStorage.

🛒 SHOPPING CART

Create a professional cart page.

Each item should display:

Image

Product name

Price

Quantity controls

Remove button

Total for that product

Users must be able to increase/decrease quantities.

Automatically calculate:

Subtotal
Delivery Fee
Discount
Grand Total

Example:

Subtotal: $42.50
Delivery: $3.00
Discount: -$5.00
Total: $40.50

Add:

Continue Shopping

and

Proceed to Checkout

buttons.

Cart information must persist using localStorage.

🎁 UNIQUE FEATURE: GROCERY BUNDLES

Create a section called:

“Save More With Bundles”

Examples:

Breakfast Bundle

🥛 Milk
🍞 Bread
🥚 Eggs
🥣 Cereal

Movie Night Bundle

🍿 Popcorn
🥤 Soft Drink
🍫 Chocolate
🍟 Chips

Healthy Start Bundle

🍎 Apples
🍌 Bananas
🥜 Nuts
🥛 Milk

Allow users to add the entire bundle to their cart with one click.

💳 CHECKOUT PAGE

Create a clean checkout page.

Include:

Customer Information

Full Name

Email

Phone Number

Delivery Address

House/Apartment

Street

City

Postal Code

Delivery Option

Standard Delivery

Express Delivery

Payment Method

Cash on Delivery

Credit/Debit Card

Digital Wallet

If Card is selected, show card fields using JavaScript.

Add proper basic form validation.

Show a live order summary on the right side.

🎉 ORDER CONFIRMATION PAGE

After clicking Place Order, do not simply show an alert.

Create a beautiful order-success page.

Display:

🎉 Order Placed Successfully!

“Thank you for shopping with FreshCart.”

Generate a random order number such as:

#FC48291

Show:

Order total

Delivery address

Estimated delivery time

Ordered products

Add:

Continue Shopping

button.

Save the order in localStorage so it can appear in the user's account/order history.

👤 MY ACCOUNT PAGE

Create a simple dashboard.

Sections:

Profile Information

My Orders

Wishlist

Saved Address

Order History

Display previous orders saved in localStorage.

Each order should show:

Order ID
Date
Items
Total
Status

Use statuses such as:

🟢 Confirmed
🟡 Preparing
🔵 Out for Delivery
🟣 Delivered

🌿 ABOUT PAGE

Create a visually appealing About Us page explaining:

“FreshCart is built to make grocery shopping easier, faster, and more enjoyable.”

Include:

Mission

Why choose us

Freshness guarantee

Fast delivery

Quality products

Add statistics such as:

10K+ Happy Customers
500+ Products
50+ Local Suppliers
24/7 Support

Animate the numbers when the section becomes visible.

📞 CONTACT PAGE

Create a professional contact page.

Include:

Name

Email

Subject

Message

Send Message button

Add contact information cards:

📍 Location
📞 Phone
✉️ Email
🕐 Opening Hours

Validate the form with JavaScript and show a friendly success message after submission.

✨ UNIQUE INTERACTIVE FEATURES

Add several small features to make FreshCart different from a basic grocery website.

1. 🛒 Floating Cart

On mobile, show a floating cart button at the bottom of the screen displaying:

🛒 3 items • $24.50

Clicking it opens the cart.

2. 🎉 Add-to-Cart Animation

When an item is added:

Button changes to “Added ✓”

Cart count increases

Small notification appears:
“Fresh Apples added to your cart!”

3. 💚 Freshness Score

Every fresh product can have a small badge:

Freshness: 98% 🌿

4. 🧠 Smart Recommendations

Based on the user's cart, recommend complementary products.

5. 🎁 Surprise Discount

Add a small button:

“Reveal My Surprise 🎁”

When clicked, generate a random discount between 5% and 20%.

Allow the discount to apply to the cart.

6. 🌙 Dark Mode

Add a dark/light mode toggle.

Save the user's preference using localStorage.

7. 🔔 Toast Notifications

Use attractive toast notifications for actions such as:

Product added

Product removed

Wishlist updated

Order placed

Message sent

Do not use ugly browser alerts.

📱 RESPONSIVE DESIGN

This is extremely important.

The entire website must be responsive.

Make sure:

Desktop

Full navigation

Multi-column product grid

Large hero section

Side-by-side checkout

Tablet

Adjust grid sizes

Compact navigation

Proper spacing

Mobile

Hamburger menu

1–2 column product layout

Floating cart

Stacked checkout sections

Touch-friendly buttons

No horizontal scrolling

Images must resize correctly

Text must remain readable

Test the design at approximately:

320px
375px
425px
768px
1024px
1440px

💾 JAVASCRIPT FUNCTIONALITY

Use vanilla JavaScript for all interactive features.

Implement:

Product rendering

Search

Category filtering

Price filtering

Rating filtering

Sorting

Product details

Add to cart

Remove from cart

Quantity updates

Wishlist

Checkout

Order creation

Order history

Countdown timer

Surprise discount

Dark mode

Toast notifications

Form validation

LocalStorage

Use localStorage for:

cart

wishlist

orders

user preferences

theme

📁 PROJECT STRUCTURE

Organize the project cleanly:

FreshCart/
│
├── index.html
├── shop.html
├── product.html
├── categories.html
├── wishlist.html
├── cart.html
├── checkout.html
├── order-success.html
├── about.html
├── contact.html
├── account.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── products.js
│   ├── app.js
│   ├── cart.js
│   ├── wishlist.js
│   └── checkout.js
│
└── assets/
    └── images/


Keep the code organized and readable.

🎨 FINAL QUALITY REQUIREMENTS

Make the website feel like a real professional grocery ecommerce website, not a basic student project.

Use:

Modern UI

Smooth animations

Hover effects

Micro-interactions

Beautiful product cards

Consistent spacing

Good typography

Attractive icons

Responsive design

Accessible buttons

Proper empty states

Loading states where appropriate

Do not overcrowd the interface.

Keep the experience simple, colorful, friendly, and easy to understand.

Use royalty-free/publicly accessible product images or suitable image URLs. If external images are used, make sure they load correctly.

IMPORTANT

Do not leave any unfinished functionality.

Every navigation link should work.

Every button should have a purpose.

Every product should be interactive.

Cart, wishlist, filters, search, checkout, order confirmation, dark mode, and localStorage must actually work.

Do not create fake buttons that do nothing.

Do not require a backend or database.

Use only:

HTML + CSS + Vanilla JavaScript

At the end, provide all required files and make sure the website can be opened directly in a browser and functions correctly.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e178b9d6-97e4-412b-a71c-56d7d12a4462).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
