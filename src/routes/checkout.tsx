import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getProduct, money } from "@/lib/fc-data";
import { DELIVERY, FREE_DELIVERY_OVER, useFreshCart } from "@/lib/fc-store";
import { EmptyState } from "@/components/fc/bits";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — FreshCart" },
      {
        name: "description",
        content:
          "Enter your delivery details, pick a delivery speed and payment method, then place your FreshCart order.",
      },
      { property: "og:title", content: "Checkout — FreshCart" },
      { property: "og:description", content: "Fast, simple checkout with a live order summary." },
    ],
  }),
  component: CheckoutPage,
});

type Errors = Record<string, string>;

function CheckoutPage() {
  const { cart, ready, subtotal, discount, surprise, placeOrder, profile, saveProfile } =
    useFreshCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    postal: "",
  });
  const [option, setOption] = useState<"standard" | "express">("standard");
  const [payment, setPayment] = useState("Cash on Delivery");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile.name || profile.email) setForm((f) => ({ ...f, ...profile }));
  }, [profile]);

  const lines = cart.map((l) => ({ line: l, product: getProduct(l.id) })).filter((x) => x.product);
  const deliveryFee =
    option === "express"
      ? DELIVERY.express
      : subtotal >= FREE_DELIVERY_OVER
        ? 0
        : DELIVERY.standard;
  const total = Math.max(0, +(subtotal + deliveryFee - discount).toFixed(2));

  const set = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const e: Errors = {};
    if (form.name.trim().length < 3) e["name"] = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      e["email"] = "Enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 7) e["phone"] = "Enter a valid phone number.";
    if (!form.house.trim()) e["house"] = "House or apartment is required.";
    if (!form.street.trim()) e["street"] = "Street is required.";
    if (!form.city.trim()) e["city"] = "City is required.";
    if (form.postal.trim().length < 3) e["postal"] = "Enter a valid postal code.";
    if (payment === "Credit/Debit Card") {
      if (card.number.replace(/\D/g, "").length < 15) e["cardNumber"] = "Enter a 16-digit card number.";
      if (card.name.trim().length < 3) e["cardName"] = "Name on card is required.";
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e["cardExpiry"] = "Use MM/YY format.";
      if (!/^\d{3,4}$/.test(card.cvc)) e["cardCvc"] = "3 or 4 digits.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSaving(true);
    saveProfile(form);
    const order = placeOrder({
      items: lines.map(({ line, product }) => ({
        id: product!.id,
        name: product!.name,
        emoji: product!.emoji,
        qty: line.qty,
        price: product!.price,
      })),
      subtotal: +subtotal.toFixed(2),
      delivery: deliveryFee,
      discount,
      total,
      address: `${form.house}, ${form.street}, ${form.city} ${form.postal}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      deliveryOption: option,
      payment,
      eta: option === "express" ? "Within 30–60 minutes" : "Tomorrow, 9am – 1pm",
    });
    toast.success("Order placed — thank you! 🎉");
    navigate({ to: "/order-success", search: { id: order.id } });
  };

  if (ready && lines.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h1 className="mb-10 text-3xl font-extrabold sm:text-4xl">Checkout</h1>
        <EmptyState
          emoji="🧺"
          title="Nothing to check out"
          message="Add a few groceries to your basket and come back here."
          cta={{ label: "Go shopping", to: "/shop" }}
        />
      </div>
    );
  }

  const field =
    "mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary";

  const Field = ({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
  }: {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (v: string) => void;
    error?: string | undefined;
  }) => (
    <div>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`${field} ${error ? "border-destructive" : ""}`}
      />
      {error ? <p className="mt-1 text-xs font-semibold text-destructive">{error}</p> : null}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Almost there — tell us where the groceries should go.
      </p>

      <form onSubmit={submit} className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-6">
          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">Customer information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Full name"
                placeholder="Alishbah Jawaid"
                value={form.name}
                onChange={(v) => set("name", v)}
                error={errors["name"]}
              />
              <Field
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(v) => set("email", v)}
                error={errors["email"]}
              />
              <Field
                id="phone"
                label="Phone number"
                placeholder="+1 555 010 2233"
                value={form.phone}
                onChange={(v) => set("phone", v)}
                error={errors["phone"]}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">Delivery address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                id="house"
                label="House / apartment"
                placeholder="Apt 4B"
                value={form.house}
                onChange={(v) => set("house", v)}
                error={errors["house"]}
              />
              <Field
                id="street"
                label="Street"
                placeholder="12 Orchard Lane"
                value={form.street}
                onChange={(v) => set("street", v)}
                error={errors["street"]}
              />
              <Field
                id="city"
                label="City"
                placeholder="Greenfield"
                value={form.city}
                onChange={(v) => set("city", v)}
                error={errors["city"]}
              />
              <Field
                id="postal"
                label="Postal code"
                placeholder="GF3 8QP"
                value={form.postal}
                onChange={(v) => set("postal", v)}
                error={errors["postal"]}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">Delivery option</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(
                [
                  {
                    id: "standard" as const,
                    title: "Standard delivery",
                    text: "Tomorrow, 9am – 1pm",
                    fee: subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY.standard,
                  },
                  {
                    id: "express" as const,
                    title: "Express delivery",
                    text: "Within 30–60 minutes",
                    fee: DELIVERY.express,
                  },
                ]
              ).map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setOption(o.id)}
                  className={`rounded-2xl border-2 p-4 text-left transition ${
                    option === o.id
                      ? "border-primary bg-primary-soft/50"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="block text-sm font-bold">{o.title}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{o.text}</span>
                  <span className="mt-2 block text-sm font-bold text-primary">
                    {o.fee === 0 ? "Free" : money(o.fee)}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">Payment method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Cash on Delivery", "Credit/Debit Card", "Digital Wallet"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPayment(m)}
                  className={`rounded-2xl border-2 px-4 py-3 text-sm font-bold transition ${
                    payment === m
                      ? "border-primary bg-primary-soft/50"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {payment === "Credit/Debit Card" ? (
              <div className="animate-pop mt-5 grid gap-4 sm:grid-cols-2">
                <Field
                  id="cardNumber"
                  label="Card number"
                  placeholder="4242 4242 4242 4242"
                  value={card.number}
                  onChange={(v) => setCard((c) => ({ ...c, number: v }))}
                  error={errors["cardNumber"]}
                />
                <Field
                  id="cardName"
                  label="Name on card"
                  placeholder="A. Jawaid"
                  value={card.name}
                  onChange={(v) => setCard((c) => ({ ...c, name: v }))}
                  error={errors["cardName"]}
                />
                <Field
                  id="cardExpiry"
                  label="Expiry (MM/YY)"
                  placeholder="09/28"
                  value={card.expiry}
                  onChange={(v) => setCard((c) => ({ ...c, expiry: v }))}
                  error={errors["cardExpiry"]}
                />
                <Field
                  id="cardCvc"
                  label="CVC"
                  placeholder="123"
                  value={card.cvc}
                  onChange={(v) => setCard((c) => ({ ...c, cvc: v }))}
                  error={errors["cardCvc"]}
                />
              </div>
            ) : null}
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">Your order</h2>
            <ul className="mt-4 grid gap-2 text-sm">
              {lines.map(({ line, product }) => (
                <li key={line.id} className="flex items-center justify-between gap-2">
                  <span className="min-w-0 truncate">
                    {product!.emoji} {product!.name}{" "}
                    <span className="text-muted-foreground">× {line.qty}</span>
                  </span>
                  <span className="shrink-0 font-semibold">
                    {money(product!.price * line.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 grid gap-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-semibold">{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="font-semibold">
                  {deliveryFee === 0 ? "Free" : money(deliveryFee)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  Discount{surprise ? ` (${surprise}%)` : ""}
                </dt>
                <dd className="font-semibold text-primary">-{money(discount)}</dd>
              </div>
            </dl>

            <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
              <span className="font-bold">Total</span>
              <span className="font-display text-2xl font-extrabold text-primary">
                {money(total)}
              </span>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-5 w-full rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-105 active:scale-95 disabled:opacity-70"
            >
              {saving ? "Placing order..." : "Place Order"}
            </button>
            <Link
              to="/cart"
              className="mt-2 block rounded-full border border-input px-5 py-3 text-center text-sm font-bold transition hover:bg-secondary"
            >
              Back to cart
            </Link>
          </div>
        </aside>
      </form>
    </div>
  );
}
