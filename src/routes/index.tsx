import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, Leaf, ShieldCheck, Timer, Truck } from "lucide-react";
import heroImg from "@/assets/fc-hero.jpg";
import { BUNDLES, CATEGORIES, PRODUCTS, getProduct, money } from "@/lib/fc-data";
import { useFreshCart } from "@/lib/fc-store";
import { ProductGrid } from "@/components/fc/ProductCard";
import { SectionHeading } from "@/components/fc/bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FreshCart — Fresh Groceries Delivered To Your Door" },
      {
        name: "description",
        content:
          "Shop farm-fresh fruit, dairy, bakery and pantry staples on FreshCart. Daily deals, money-saving bundles and same-day grocery delivery.",
      },
      { property: "og:title", content: "FreshCart — Fresh Groceries Delivered To Your Door" },
      {
        property: "og:description",
        content:
          "Daily deals, grocery bundles and same-day delivery from local suppliers. Fresh products or your money back.",
      },
    ],
  }),
  component: Home,
});

function Countdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = Date.now() + (2 * 3600 + 14 * 60 + 36) * 1000;
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const parts =
    left === null
      ? ["--", "--", "--"]
      : [
          Math.floor(left / 3600000),
          Math.floor((left % 3600000) / 60000),
          Math.floor((left % 60000) / 1000),
        ].map((n) => String(n).padStart(2, "0"));

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-accent-soft px-4 py-3">
      <Timer className="h-5 w-5 shrink-0 text-accent-foreground" />
      <div className="min-w-0">
        <span className="block text-[11px] font-bold uppercase tracking-widest text-accent-foreground">
          Flash sale ends in
        </span>
        <span className="font-display text-xl font-extrabold tabular-nums text-accent-foreground">
          {parts[0]} : {parts[1]} : {parts[2]}
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-soft/60">
      <div className="pointer-events-none absolute -left-10 top-16 hidden text-6xl opacity-70 [animation:var(--animate-float-slow)] sm:block">
        🥦
      </div>
      <div className="pointer-events-none absolute right-6 top-10 hidden text-5xl opacity-70 [animation:var(--animate-float-slow)] [animation-delay:1.5s] lg:block">
        🍋
      </div>
      <div className="pointer-events-none absolute bottom-10 left-1/3 hidden text-5xl opacity-60 [animation:var(--animate-float-slow)] [animation-delay:3s] lg:block">
        🍇
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary shadow-soft">
            <Truck className="h-4 w-4" /> Same-day delivery
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Fresh groceries.
            <br />
            <span className="text-primary">Happy kitchens.</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
            Everything you need, delivered fresh to your doorstep.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-105 active:scale-95"
            >
              Shop Now
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary/30 bg-card px-7 py-3.5 text-sm font-bold text-primary transition hover:border-primary hover:shadow-card"
            >
              Explore Categories
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              ["500+", "Products"],
              ["30 min", "Avg. delivery"],
              ["4.9★", "Shopper rating"],
            ].map(([v, k]) => (
              <div key={k}>
                <dt className="font-display text-xl font-extrabold text-primary">{v}</dt>
                <dd className="text-xs text-muted-foreground">{k}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-rise relative [animation-delay:150ms]">
          <div className="overflow-hidden rounded-[2.5rem] border-4 border-card shadow-lift">
            <img
              src={heroImg}
              alt="Basket and paper bag filled with fresh fruit, vegetables, milk, bread and eggs"
              width={1280}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -right-2 -top-4 grid h-24 w-24 place-items-center rounded-full bg-accent text-center font-display font-extrabold leading-tight text-accent-foreground shadow-glow [animation:var(--animate-float-slow)] sm:h-28 sm:w-28">
            <span>
              <span className="block text-2xl">30%</span>
              <span className="text-[11px] uppercase tracking-wider">off first order</span>
            </span>
          </div>

          <div className="absolute -bottom-6 left-2 max-w-[15rem] rounded-3xl border border-border bg-card p-4 shadow-lift sm:left-6">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary-soft text-lg">
                🌿
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold">Freshness Guaranteed</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Fresh products or your money back.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Perks() {
  const perks = [
    { icon: Truck, title: "Free delivery over $60", text: "Standard delivery is just $3 otherwise." },
    { icon: Leaf, title: "Picked at sunrise", text: "Produce leaves the farm the same morning." },
    { icon: ShieldCheck, title: "Money-back promise", text: "Not fresh? We refund, no questions." },
    { icon: Clock, title: "Pick your slot", text: "Express delivery in as little as 30 minutes." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map((p) => (
          <div
            key={p.title}
            className="fc-lift flex items-start gap-3 rounded-3xl border border-border bg-card p-5 shadow-soft"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
              <p.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold">{p.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionHeading
        eyebrow="Shop by aisle"
        title="Every aisle, one basket"
        subtitle="Ten colourful aisles stocked with the things you actually buy every week."
        action={{ label: "All categories", to: "/categories" }}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            to="/shop"
            search={{ cat: c.id }}
            className={`fc-lift fc-grain group flex flex-col items-center gap-2 rounded-3xl ${c.tint} px-3 py-6 text-center shadow-soft`}
          >
            <span className="text-4xl transition-transform duration-300 group-hover:scale-115">
              {c.emoji}
            </span>
            <span className="text-sm font-bold leading-tight">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Deals() {
  const deals = PRODUCTS.filter((p) => p.deal).slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-[2rem] border border-border bg-card p-5 shadow-card sm:p-8">
        <div className="mb-7 grid gap-4 lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0">
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground">
              🔥 Today's Deals
            </span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Prices dropped this morning</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Limited stock at these prices — the timer decides.
            </p>
          </div>
          <Countdown />
        </div>
        <ProductGrid products={deals} />
      </div>
    </section>
  );
}

function Bundles() {
  const { addBundle } = useFreshCart();
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionHeading
        eyebrow="One-click baskets"
        title="Save More With Bundles"
        subtitle="Hand-picked combos for the meals you make most. Add the whole basket in one tap."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {BUNDLES.map((b) => {
          const items = b.items.map((id) => getProduct(id)!).filter(Boolean);
          const full = items.reduce((s, p) => s + (p.oldPrice ?? p.price), 0);
          const now = items.reduce((s, p) => s + p.price, 0);
          return (
            <div
              key={b.id}
              className={`fc-lift fc-grain flex flex-col rounded-3xl ${b.tint} p-6 shadow-soft`}
            >
              <span className="text-3xl">{b.emoji}</span>
              <h3 className="mt-3 text-xl font-bold">{b.name}</h3>
              <p className="text-sm text-muted-foreground">{b.tagline}</p>
              <ul className="mt-4 grid flex-1 gap-1.5 text-sm">
                {items.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate">
                      {p.emoji} {p.name}
                    </span>
                    <span className="shrink-0 text-muted-foreground">{money(p.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-2xl font-extrabold">{money(now)}</span>
                {full > now ? (
                  <span className="text-sm text-muted-foreground line-through">{money(full)}</span>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => addBundle(b.name, b.items)}
                className="mt-4 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-105 active:scale-95"
              >
                Add bundle to cart
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BestSellers() {
  const best = [...PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionHeading
        eyebrow="Trolley favourites"
        title="Best sellers this week"
        subtitle="What our shoppers keep coming back for."
        action={{ label: "Browse the full shop", to: "/shop" }}
      />
      <ProductGrid products={best} />
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Perks />
      <Categories />
      <Deals />
      <BestSellers />
      <Bundles />
    </>
  );
}
