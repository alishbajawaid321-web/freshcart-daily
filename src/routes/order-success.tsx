import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, MapPin, Receipt } from "lucide-react";
import { money } from "@/lib/fc-data";
import { useFreshCart } from "@/lib/fc-store";
import { EmptyState } from "@/components/fc/bits";

export const Route = createFileRoute("/order-success")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: search["id"] ? String(search["id"]) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — FreshCart" },
      {
        name: "description",
        content:
          "Your FreshCart order is confirmed. See your order number, total, delivery address and estimated arrival time.",
      },
      { property: "og:title", content: "Order Confirmed — FreshCart" },
      { property: "og:description", content: "Thank you for shopping with FreshCart." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { id } = Route.useSearch();
  const { orders, ready } = useFreshCart();
  const order = id ? orders.find((o) => o.id === id) : orders[0];

  if (!ready) {
    return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">Loading your order...</div>;
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          emoji="🧾"
          title="No order to show"
          message="We couldn't find that order. Place an order and the confirmation will appear here."
          cta={{ label: "Start shopping", to: "/shop" }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="animate-pop rounded-[2rem] border border-border bg-card p-7 text-center shadow-card sm:p-10">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary-soft">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">🎉 Order Placed Successfully!</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Thank you for shopping with FreshCart. A confirmation is on its way to {order.email}.
        </p>

        <p className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 font-display text-lg font-extrabold text-accent-foreground">
          #{order.id}
        </p>

        <dl className="mt-8 grid gap-3 text-left sm:grid-cols-3">
          <div className="rounded-2xl bg-secondary/60 p-4">
            <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <Receipt className="h-3.5 w-3.5" /> Order total
            </dt>
            <dd className="mt-1.5 font-display text-xl font-extrabold text-primary">
              {money(order.total)}
            </dd>
          </div>
          <div className="rounded-2xl bg-secondary/60 p-4">
            <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Arrives
            </dt>
            <dd className="mt-1.5 text-sm font-semibold">{order.eta}</dd>
          </div>
          <div className="rounded-2xl bg-secondary/60 p-4">
            <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> Delivering to
            </dt>
            <dd className="mt-1.5 text-sm font-semibold">{order.address}</dd>
          </div>
        </dl>

        <div className="mt-8 rounded-3xl border border-border p-5 text-left">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Your items
          </h2>
          <ul className="mt-4 grid gap-2 text-sm">
            {order.items.map((it) => (
              <li key={it.id} className="flex items-center justify-between gap-3">
                <span className="min-w-0 truncate">
                  {it.emoji} {it.name} <span className="text-muted-foreground">× {it.qty}</span>
                </span>
                <span className="shrink-0 font-semibold">{money(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-1 border-t border-border pt-4 text-sm">
            <Line label="Subtotal" value={money(order.subtotal)} />
            <Line label="Delivery" value={order.delivery === 0 ? "Free" : money(order.delivery)} />
            <Line label="Discount" value={`-${money(order.discount)}`} />
            <div className="mt-1 flex justify-between font-bold">
              <span>Total paid ({order.payment})</span>
              <span className="text-primary">{money(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/shop"
            className="rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-105"
          >
            Continue Shopping
          </Link>
          <Link
            to="/account"
            className="rounded-full border border-input px-6 py-3.5 text-sm font-bold transition hover:bg-secondary"
          >
            View order history
          </Link>
        </div>
      </div>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
