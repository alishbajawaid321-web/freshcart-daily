import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, MapPin, Package, User } from "lucide-react";
import { toast } from "sonner";
import { getProduct, money } from "@/lib/fc-data";
import { useFreshCart, type Order } from "@/lib/fc-store";
import { ProductTile } from "@/components/fc/bits";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — FreshCart" },
      {
        name: "description",
        content:
          "Manage your FreshCart profile, saved delivery address, wishlist and full order history in one dashboard.",
      },
      { property: "og:title", content: "My Account — FreshCart" },
      { property: "og:description", content: "Your FreshCart profile, orders and saved address." },
    ],
  }),
  component: AccountPage,
});

const STATUS_STYLE: Record<Order["status"], string> = {
  Confirmed: "bg-pastel-mint text-foreground",
  Preparing: "bg-pastel-butter text-foreground",
  "Out for Delivery": "bg-pastel-sky text-foreground",
  Delivered: "bg-pastel-lilac text-foreground",
};

const STATUS_DOT: Record<Order["status"], string> = {
  Confirmed: "🟢",
  Preparing: "🟡",
  "Out for Delivery": "🔵",
  Delivered: "🟣",
};

function AccountPage() {
  const { profile, saveProfile, orders, wishlist, ready, moveToCart } = useFreshCart();
  const [form, setForm] = useState(profile);

  useEffect(() => setForm(profile), [profile]);

  const savedItems = wishlist.map((id) => getProduct(id)).filter(Boolean);
  const field =
    "mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary";
  const labelCls = "text-xs font-bold uppercase tracking-widest text-muted-foreground";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <User className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-extrabold sm:text-3xl">
              {profile.name || "Welcome to FreshCart"}
            </h1>
            <p className="truncate text-sm text-muted-foreground">
              {profile.email || "Add your details below to speed up checkout."}
            </p>
          </div>
        </div>
        <Link
          to="/shop"
          className="shrink-0 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-105"
        >
          Shop now
        </Link>
      </header>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { icon: Package, label: "Orders", value: orders.length },
          { icon: Heart, label: "Wishlist items", value: wishlist.length },
          {
            icon: MapPin,
            label: "Saved address",
            value: profile.city ? profile.city : "—",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-3xl border border-border bg-card p-5 shadow-soft"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
              <s.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <span className="block font-display text-xl font-extrabold">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <div className="grid gap-6">
          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">Profile information</h2>
            <form
              className="mt-4 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                saveProfile(form);
                toast.success("Profile saved ✅");
              }}
            >
              <div>
                <label htmlFor="a-name" className={labelCls}>
                  Full name
                </label>
                <input
                  id="a-name"
                  className={field}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="a-email" className={labelCls}>
                  Email
                </label>
                <input
                  id="a-email"
                  type="email"
                  className={field}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="a-phone" className={labelCls}>
                  Phone
                </label>
                <input
                  id="a-phone"
                  className={field}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 555 010 2233"
                />
              </div>

              <h3 className="mt-2 text-sm font-bold">Saved address</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  aria-label="House or apartment"
                  className={field}
                  value={form.house}
                  onChange={(e) => setForm({ ...form, house: e.target.value })}
                  placeholder="Apt 4B"
                />
                <input
                  aria-label="Street"
                  className={field}
                  value={form.street}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                  placeholder="Street"
                />
                <input
                  aria-label="City"
                  className={field}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="City"
                />
                <input
                  aria-label="Postal code"
                  className={field}
                  value={form.postal}
                  onChange={(e) => setForm({ ...form, postal: e.target.value })}
                  placeholder="Postal code"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-105"
              >
                Save changes
              </button>
            </form>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold">Wishlist</h2>
              <Link to="/wishlist" className="text-sm font-semibold text-primary hover:underline">
                View all
              </Link>
            </div>
            {savedItems.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Your wishlist is waiting for some fresh picks! 🥕
              </p>
            ) : (
              <ul className="mt-4 grid gap-2">
                {savedItems.slice(0, 4).map((p) => (
                  <li key={p!.id} className="flex items-center gap-3">
                    <ProductTile product={p!} size="sm" className="h-10 w-10 rounded-xl" />
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold">{p!.name}</span>
                    <button
                      type="button"
                      onClick={() => moveToCart(p!.id)}
                      className="shrink-0 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold transition hover:bg-primary-soft"
                    >
                      To cart
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-bold">My orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {ready ? `${orders.length} order${orders.length === 1 ? "" : "s"} so far` : "Loading..."}
          </p>

          {ready && orders.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-border p-8 text-center">
              <span className="text-4xl">🧾</span>
              <p className="mt-3 text-sm font-semibold">No orders yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your order history will appear here once you place your first order.
              </p>
              <Link
                to="/shop"
                className="mt-5 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <ul className="mt-5 grid gap-3">
              {orders.map((o) => (
                <li key={o.id} className="rounded-3xl border border-border p-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <div className="min-w-0">
                      <span className="font-display text-lg font-extrabold">#{o.id}</span>
                      <p className="text-xs text-muted-foreground">
                        {new Date(o.date).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        • {o.items.reduce((n, i) => n + i.qty, 0)} items •{" "}
                        {o.deliveryOption === "express" ? "Express" : "Standard"}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${STATUS_STYLE[o.status]}`}
                    >
                      {STATUS_DOT[o.status]} {o.status}
                    </span>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-1.5 text-xs">
                    {o.items.map((i) => (
                      <li key={i.id} className="rounded-full bg-secondary px-2.5 py-1">
                        {i.emoji} {i.name} × {i.qty}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
                    <span className="truncate text-muted-foreground">{o.address}</span>
                    <span className="shrink-0 font-display text-lg font-extrabold text-primary">
                      {money(o.total)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
