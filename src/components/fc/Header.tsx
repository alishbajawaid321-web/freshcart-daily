import { Link, useNavigate } from "@tanstack/react-router";
import {
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  User,
  X,
  Leaf,
} from "lucide-react";
import { useState } from "react";
import { useFreshCart } from "@/lib/fc-store";
import { money } from "@/lib/fc-data";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "Deals", to: "/shop", search: { sort: "discount" as const } },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const { cartCount, wishlist, theme, toggleTheme } = useFreshCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/shop", search: { q: term.trim() || undefined } });
  };

  const iconBtn =
    "relative grid h-10 w-10 place-items-center rounded-full bg-secondary text-secondary-foreground transition hover:bg-primary-soft";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6">
        <div className="flex min-w-0 items-center gap-3 lg:gap-8">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-card">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="truncate font-display text-xl font-extrabold tracking-tight">
              Fresh<span className="text-primary">Cart</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={item.search as never}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-primary-soft text-primary-deep dark:text-primary" }}
                className="rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <form onSubmit={submitSearch} className="hidden items-center md:flex">
            <div className="flex items-center rounded-full bg-secondary px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search groceries..."
                aria-label="Search groceries"
                className="w-28 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground lg:w-44"
              />
            </div>
          </form>

          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className={cn(iconBtn, "md:hidden")}
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          <button type="button" onClick={toggleTheme} className={iconBtn} aria-label="Toggle dark mode">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link to="/wishlist" className={iconBtn} aria-label="Wishlist">
            <Heart className="h-4 w-4" />
            {wishlist.length > 0 ? <Badge>{wishlist.length}</Badge> : null}
          </Link>

          <Link to="/cart" className={iconBtn} aria-label="Shopping cart">
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 ? <Badge>{cartCount}</Badge> : null}
          </Link>

          <Link to="/account" className={cn(iconBtn, "hidden sm:grid")} aria-label="My account">
            <User className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(iconBtn, "lg:hidden")}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <form onSubmit={submitSearch} className="border-t border-border px-4 py-3 md:hidden">
          <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search for milk, bread, apples..."
              aria-label="Search groceries"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <button type="submit" className="shrink-0 text-sm font-semibold text-primary">
              Go
            </button>
          </div>
        </form>
      ) : null}

      {menuOpen ? (
        <nav className="animate-pop border-t border-border bg-background px-4 pb-5 pt-3 lg:hidden">
          <div className="grid gap-1">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={item.search as never}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold transition hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/account"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-semibold transition hover:bg-secondary"
            >
              My Account
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-semibold transition hover:bg-secondary"
            >
              Wishlist ({wishlist.length})
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground shadow-soft">
      {children}
    </span>
  );
}

export function FloatingCart() {
  const { cartCount, subtotal } = useFreshCart();
  if (cartCount === 0) return null;
  return (
    <Link
      to="/cart"
      className="animate-pop fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full bg-primary px-5 py-3.5 text-primary-foreground shadow-lift md:hidden"
    >
      <span className="flex items-center gap-2 text-sm font-semibold">
        <ShoppingCart className="h-4 w-4" />
        {cartCount} {cartCount === 1 ? "item" : "items"} • {money(subtotal)}
      </span>
      <span className="text-sm font-bold">View cart →</span>
    </Link>
  );
}
