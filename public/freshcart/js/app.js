/* FreshCart — shared app logic (vanilla JS, localStorage persistence) */

const KEY = "freshcart-static-v1";
const DELIVERY = { standard: 149, express: 299 };
const FREE_DELIVERY_OVER = 2500;

const defaultState = () => ({
  cart: [],
  wishlist: [],
  orders: [],
  profile: { name: "", email: "", phone: "", city: "Karachi", address: "" },
  theme: "light",
  discount: null,
});

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return Object.assign(defaultState(), JSON.parse(raw));
  } catch {
    return defaultState();
  }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

/* ---------------- cart / wishlist ---------------- */
const cartCount = () => state.cart.reduce((n, l) => n + l.qty, 0);
const subtotal = () =>
  state.cart.reduce((s, l) => s + (getProduct(l.id)?.price ?? 0) * l.qty, 0);
const discountAmount = () =>
  state.discount ? Math.round((subtotal() * state.discount.percent) / 100) : 0;
function deliveryFee(speed) {
  if (!state.cart.length) return 0;
  if (speed === "express") return DELIVERY.express;
  return subtotal() >= FREE_DELIVERY_OVER ? 0 : DELIVERY.standard;
}
const grandTotal = (speed) => subtotal() - discountAmount() + deliveryFee(speed);

function addToCart(id, qty = 1) {
  const line = state.cart.find((l) => l.id === id);
  if (line) line.qty += qty;
  else state.cart.push({ id, qty });
  save();
  syncBadges();
  const p = getProduct(id);
  toast(`${p ? p.name : "Item"} added to cart`);
  renderSuggestions();
}
function setQty(id, qty) {
  if (qty <= 0) return removeFromCart(id);
  const line = state.cart.find((l) => l.id === id);
  if (line) line.qty = qty;
  save();
  syncBadges();
}
function removeFromCart(id) {
  state.cart = state.cart.filter((l) => l.id !== id);
  save();
  syncBadges();
}
function clearCart() {
  state.cart = [];
  state.discount = null;
  save();
  syncBadges();
}
function toggleWishlist(id) {
  const on = state.wishlist.includes(id);
  state.wishlist = on ? state.wishlist.filter((x) => x !== id) : [...state.wishlist, id];
  save();
  syncBadges();
  const p = getProduct(id);
  toast(on ? `Removed ${p.name} from wishlist` : `Saved ${p.name} to wishlist`);
  document.querySelectorAll(`[data-wish="${id}"]`).forEach((b) => {
    b.classList.toggle("on", !on);
    b.textContent = !on ? "♥" : "♡";
  });
}

/* ---------------- theme ---------------- */
function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  document.querySelectorAll("[data-theme-btn]").forEach((b) => {
    b.textContent = state.theme === "dark" ? "☀" : "☾";
  });
}
function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  save();
  applyTheme();
}

/* ---------------- toast ---------------- */
function toast(msg) {
  let host = document.getElementById("toasts");
  if (!host) {
    host = document.createElement("div");
    host.id = "toasts";
    document.body.appendChild(host);
  }
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  host.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

/* ---------------- chrome ---------------- */
const NAV = [
  ["index.html", "Home"],
  ["shop.html", "Shop"],
  ["categories.html", "Categories"],
  ["about.html", "About"],
  ["contact.html", "Contact"],
];

function renderChrome() {
  const page = document.body.dataset.page || "";
  const links = (cls) =>
    NAV.map(
      ([href, label]) =>
        `<a href="${href}" class="${page === href.replace(".html", "") ? "active" : ""}">${label}</a>`,
    ).join("");

  const header = document.createElement("header");
  header.className = "site";
  header.innerHTML = `
    <div class="wrap">
      <div class="headbar">
        <a class="brand" href="index.html"><span class="mark">🌿</span>Fresh<span class="cart-word">Cart</span></a>
        <nav class="main">${links()}</nav>
        <div class="head-actions">
          <form class="searchbox" onsubmit="return goSearch(event)">
            <input type="search" id="headSearch" placeholder="Search groceries…" aria-label="Search groceries" />
          </form>
          <button class="icon-btn" data-theme-btn onclick="toggleTheme()" aria-label="Toggle dark mode">☾</button>
          <a class="icon-btn" href="wishlist.html" aria-label="Wishlist">♡<span class="badge hide" data-badge="wish">0</span></a>
          <a class="icon-btn" href="cart.html" aria-label="Cart">🛒<span class="badge green hide" data-badge="cart">0</span></a>
          <a class="icon-btn" href="account.html" aria-label="My account">👤</a>
          <button class="icon-btn" id="menuBtn" aria-label="Menu" onclick="document.querySelector('nav.mobile').classList.toggle('hide')">☰</button>
        </div>
      </div>
      <nav class="mobile hide">
        ${links()}
        <form onsubmit="return goSearch(event)"><input type="search" id="headSearchMobile" placeholder="Search groceries…" aria-label="Search groceries" /></form>
      </nav>
    </div>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "site";
  footer.innerHTML = `
    <div class="wrap foot-grid">
      <div>
        <a class="brand" href="index.html"><span class="mark">🌿</span>Fresh<span class="cart-word">Cart</span></a>
        <p class="muted small" style="max-width:34ch">Pakistan's friendly online supermarket. Fresh produce, pantry staples and everyday essentials delivered across the city.</p>
      </div>
      <div><h4>Shop</h4><ul>
        <li><a href="shop.html">All products</a></li>
        <li><a href="categories.html">Categories</a></li>
        <li><a href="shop.html?deal=1">Flash deals</a></li>
        <li><a href="wishlist.html">Wishlist</a></li>
      </ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="about.html">About us</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="account.html">My account</a></li>
        <li><a href="cart.html">Cart</a></li>
      </ul></div>
      <div><h4>Reach us</h4><ul class="muted">
        <li>Shop 14, Zamzama Boulevard, Karachi</li>
        <li>0300-1234567</li>
        <li>hello@freshcart.pk</li>
        <li>Daily 8:00 AM – 11:00 PM</li>
      </ul></div>
    </div>
    <div class="wrap foot-bottom between">
      <span>© ${new Date().getFullYear()} FreshCart. All prices in Pakistani Rupees.</span>
      <span>Cash on delivery · Card · Easypaisa · JazzCash</span>
    </div>`;
  document.body.appendChild(footer);

  applyTheme();
  syncBadges();
}

function goSearch(e) {
  e.preventDefault();
  const input = e.target.querySelector("input");
  const q = input.value.trim();
  location.href = `shop.html${q ? `?q=${encodeURIComponent(q)}` : ""}`;
  return false;
}

function syncBadges() {
  const c = cartCount();
  const w = state.wishlist.length;
  document.querySelectorAll('[data-badge="cart"]').forEach((b) => {
    b.textContent = c;
    b.classList.toggle("hide", c === 0);
  });
  document.querySelectorAll('[data-badge="wish"]').forEach((b) => {
    b.textContent = w;
    b.classList.toggle("hide", w === 0);
  });
}

/* ---------------- product card ---------------- */
function starRow(rating) {
  const full = Math.round(rating);
  return `<span class="stars">${"★".repeat(full)}${"☆".repeat(5 - full)}</span> <span class="small muted">${rating.toFixed(1)}</span>`;
}

function productCard(p) {
  const off = discountPercent(p);
  const saved = state.wishlist.includes(p.id);
  return `
  <article class="card pcard">
    <a class="thumb" href="product.html?id=${p.id}" aria-label="${p.name}">
      <img src="${productImage(p.id)}" alt="${p.name}" width="768" height="768" loading="lazy" decoding="async" />
      ${off ? `<span class="tag-off">−${off}%</span>` : ""}
      ${p.fresh && p.freshness ? `<span class="tag-fresh">🌿 ${p.freshness}% fresh</span>` : ""}
    </a>
    <button class="wish ${saved ? "on" : ""}" data-wish="${p.id}" onclick="toggleWishlist('${p.id}')" aria-label="Toggle wishlist">${saved ? "♥" : "♡"}</button>
    <div class="body">
      <span class="cat">${getCategory(p.category)?.name ?? ""}</span>
      <a class="name" href="product.html?id=${p.id}">${p.name}</a>
      <span class="small muted">${p.unit}</span>
      <div>${starRow(p.rating)}</div>
      <div style="margin-top:.25rem"><span class="price">${money(p.price)}</span>${p.oldPrice ? `<span class="old">${money(p.oldPrice)}</span>` : ""}</div>
      <button class="btn block" style="margin-top:.6rem" onclick="addToCart('${p.id}')">+ Add to Cart</button>
    </div>
  </article>`;
}

const productGrid = (list) => list.map(productCard).join("");

/* ---------------- smart suggestions ---------------- */
function renderSuggestions() {
  const host = document.getElementById("suggestions");
  if (!host) return;
  const ids = state.cart.map((l) => l.id);
  if (!ids.length) { host.innerHTML = ""; return; }
  const picks = suggestionsFor(ids, 3);
  host.innerHTML = `
    <div class="card pad">
      <div class="between">
        <div><span class="pill">Smart cart</span><h3 style="margin-top:.5rem">Goes well with your basket</h3></div>
      </div>
      <div class="grid products" style="margin-top:1rem">${productGrid(picks)}</div>
    </div>`;
}

/* ---------------- discount generator ---------------- */
const DISCOUNTS = [5, 7, 10, 12, 15, 20];
function spinDiscount() {
  const percent = DISCOUNTS[Math.floor(Math.random() * DISCOUNTS.length)];
  const code = `FRESH${percent}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  state.discount = { code, percent };
  save();
  toast(`🎉 You unlocked ${percent}% off — code ${code}`);
  if (typeof renderCart === "function") renderCart();
}

/* ---------------- misc ---------------- */
const qs = (k) => new URLSearchParams(location.search).get(k);

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  if (typeof initPage === "function") initPage();
});
