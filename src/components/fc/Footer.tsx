import { Link } from "@tanstack/react-router";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import { CATEGORIES } from "@/lib/fc-data";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-extrabold">
              Fresh<span className="text-primary">Cart</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Fresh groceries picked at sunrise and delivered to your door before dinner. Local
            suppliers, honest prices, zero fuss.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary-deep dark:text-primary">
            🌿 Freshness guaranteed
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Shop</h3>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link
                  to="/shop"
                  search={{ cat: c.id }}
                  className="transition hover:text-primary"
                >
                  {c.emoji} {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Company</h3>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="transition hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/account" className="transition hover:text-primary">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="transition hover:text-primary">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" className="transition hover:text-primary">
                Shopping Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest">Get in touch</h3>
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              24 Orchard Lane, Greenfield, GF3 8QP
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              +1 (555) 014-2277
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              hello@freshcart.example
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} FreshCart. Built as a demo storefront — no real orders are
        placed.
      </div>
    </footer>
  );
}
