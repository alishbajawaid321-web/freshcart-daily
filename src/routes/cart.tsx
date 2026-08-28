import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, Minus, Plus, Trash2 } from "lucide-react";
import { getProduct, money, suggestionsFor } from "@/lib/fc-data";
import { FREE_DELIVERY_OVER, useFreshCart } from "@/lib/fc-store";
import { EmptyState, ProductTile } from "@/components/fc/bits";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — FreshCart" },
      {
        name: "description",
        content:
          "Review your FreshCart basket, adjust quantities, reveal a surprise discount and head to checkout.",
      },
      { property: "og:title", content: "Shopping Cart — FreshCart" },
      { property: "og:description", content: "Your basket, totals and delivery fee at a glance." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const {
    cart,
    ready,
    setQty,
    removeFromCart,
    subtotal,
    delivery,
    discount,
    total,
    surprise,
    setSurprise,
    addToCart,
  } = useFreshCart();

  const lines = cart
    .map((l) => ({ line: l, product: getProduct(l.id) }))
    .filter((x) => x.product);
  const picks = suggestionsFor(cart.map((l) => l.id), 3);

  const revealSurprise = () => {
    const pct = Math.floor(Math.random() * 16) + 5;
    setSurprise(pct);
    toast.success(`You unlocked ${pct}% off your basket! 🎁`);
  };

  if (ready && lines.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h1 className="mb-10 text-3xl font-extrabold sm:text-4xl">Shopping Cart</h1>
        <EmptyState
          emoji="🛒"
          title="Your basket is empty"
          message="Fill it with something fresh — the deals shelf is a good place to start."
          cta={{ label: "Browse the shop", to: "/shop" }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Shopping Cart</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {lines.length} {lines.length === 1 ? "product" : "products"} in your basket
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-3">
          {lines.map(({ line, product }) => (
            <article
              key={line.id}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft sm:grid-cols-[auto_minmax(0,1fr)_auto_auto]"
            >
              <Link
                to="/product/$productId"
                params={{ productId: product!.id }}
                aria-label={product!.name}
              >
                <ProductTile product={product!} size="sm" />
              </Link>

              <div className="min-w-0">
                <Link
                  to="/product/$productId"
                  params={{ productId: product!.id }}
                  className="block truncate font-bold hover:text-primary"
                >
                  {product!.name}
                </Link>
                <span className="text-xs text-muted-foreground">{product!.unit}</span>
                <div className="mt-1 text-sm font-semibold text-primary">
                  {money(product!.price)}
                </div>
              </div>

              <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:justify-start">
                <div className="flex items-center gap-1 rounded-full border border-border p-1">
                  <button
                    type="button"
                    onClick={() => setQty(line.id, line.qty - 1)}
                    aria-label={`Decrease ${product!.name}`}
                    className="grid h-8 w-8 place-items-center rounded-full bg-secondary transition hover:bg-primary-soft"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-9 text-center text-sm font-bold tabular-nums">{line.qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(line.id, line.qty + 1)}
                    aria-label={`Increase ${product!.name}`}
                    className="grid h-8 w-8 place-items-center rounded-full bg-secondary transition hover:bg-primary-soft"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <span className="font-display text-lg font-extrabold sm:ml-4 sm:w-20 sm:text-right">
                  {money(product!.price * line.qty)}
                </span>

                <button
                  type="button"
                  onClick={() => removeFromCart(line.id)}
                  aria-label={`Remove ${product!.name}`}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-destructive transition hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}

          {picks.length > 0 ? (
            <section className="mt-4 rounded-3xl border border-dashed border-primary/40 bg-primary-soft/40 p-5">
              <h2 className="text-sm font-bold">🧠 Smart picks for this basket</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Based on what you already added.
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {picks.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center gap-3 rounded-2xl bg-card p-2 shadow-soft"
                  >
                    <ProductTile product={p} size="sm" className="h-11 w-11 rounded-xl" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-bold">{p.name}</span>
                      <span className="text-xs text-muted-foreground">{money(p.price)}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(p.id)}
                      className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">Order summary</h2>

            <dl className="mt-5 grid gap-3 text-sm">
              <Row label="Subtotal" value={money(subtotal)} />
              <Row label="Delivery" value={delivery === 0 ? "Free" : money(delivery)} />
              <Row
                label={`Discount${surprise ? ` (${surprise}%)` : ""}`}
                value={`-${money(discount)}`}
                accent
              />
            </dl>

            {subtotal < FREE_DELIVERY_OVER ? (
              <p className="mt-4 rounded-2xl bg-accent-soft px-3 py-2 text-xs font-semibold text-accent-foreground">
                Add {money(FREE_DELIVERY_OVER - subtotal)} more for free delivery 🚚
              </p>
            ) : null}

            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
              <span className="font-bold">Total</span>
              <span className="font-display text-2xl font-extrabold text-primary">
                {money(total)}
              </span>
            </div>

            {surprise === 0 ? (
              <button
                type="button"
                onClick={revealSurprise}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground shadow-glow transition hover:brightness-105 active:scale-95"
              >
                <Gift className="h-4 w-4" /> Reveal My Surprise 🎁
              </button>
            ) : (
              <p className="mt-5 rounded-full bg-primary-soft px-4 py-3 text-center text-sm font-bold text-primary-deep dark:text-primary">
                🎉 {surprise}% surprise discount applied
              </p>
            )}

            <Link
              to="/checkout"
              className="mt-3 block rounded-full bg-primary px-5 py-3.5 text-center text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-105"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/shop"
              className="mt-2 block rounded-full border border-input px-5 py-3.5 text-center text-sm font-bold transition hover:bg-secondary"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={accent ? "font-semibold text-primary" : "font-semibold"}>{value}</dd>
    </div>
  );
}
