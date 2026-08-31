import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Leaf, Sparkles, Truck, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FreshCart — Our Freshness Promise" },
      {
        name: "description",
        content:
          "FreshCart makes grocery shopping easier, faster and more enjoyable — local suppliers, fresh produce and a money-back freshness guarantee.",
      },
      { property: "og:title", content: "About FreshCart — Our Freshness Promise" },
      {
        property: "og:description",
        content: "Why 10,000+ shoppers trust FreshCart with their weekly groceries.",
      },
      { property: "og:image", content: "https://project--e178b9d6-97e4-412b-a71c-56d7d12a4462.lovable.app/og-freshcart.jpg" },
      { name: "twitter:image", content: "https://project--e178b9d6-97e4-412b-a71c-56d7d12a4462.lovable.app/og-freshcart.jpg" },
    ],
  }),
  component: AboutPage,
});

const STATS = [
  { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 500, suffix: "+", label: "Products" },
  { value: 50, suffix: "+", label: "Local Suppliers" },
  { value: 24, suffix: "/7", label: "Support" },
];

function useCountUp(target: number, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, run]);
  return n;
}

function Stat({ value, suffix, label, run }: (typeof STATS)[number] & { run: boolean }) {
  const n = useCountUp(value, run);
  return (
    <div className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
      <span className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
        {n.toLocaleString()}
        {suffix}
      </span>
      <span className="mt-1 block text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

function AboutPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <section className="bg-primary-soft/60 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary shadow-soft">
            <Leaf className="h-4 w-4" /> Our story
          </span>
          <h1 className="mt-5 text-3xl font-extrabold sm:text-5xl">
            Grocery shopping, minus the hassle
          </h1>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            FreshCart is built to make grocery shopping easier, faster, and more enjoyable.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Our mission</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We started FreshCart because weekly shopping shouldn't cost you an evening. We work
              directly with growers, bakers and dairies within a short drive of our depot, pack every
              order by hand the morning it leaves, and keep the cold chain unbroken until it reaches
              your kitchen counter.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              No surprise mark-ups, no wilted lettuce, no ten-minute checkout. Just an honest shop
              that gets your groceries home while they're still at their best.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-105"
            >
              Shop with us
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: Leaf,
                title: "Freshness guarantee",
                text: "Every fresh item carries a freshness score. Not happy? Full refund.",
                tint: "bg-pastel-mint",
              },
              {
                icon: Truck,
                title: "Fast delivery",
                text: "Express slots land in 30–60 minutes across the city.",
                tint: "bg-pastel-sky",
              },
              {
                icon: Sparkles,
                title: "Quality products",
                text: "Every supplier is visited and vetted before we stock them.",
                tint: "bg-pastel-butter",
              },
              {
                icon: Users,
                title: "Real people",
                text: "Support answers in minutes, 24 hours a day, all week.",
                tint: "bg-pastel-peach",
              },
            ].map((c) => (
              <div key={c.title} className={`fc-lift fc-grain rounded-3xl ${c.tint} p-6 shadow-soft`}>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-card text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ref} className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">FreshCart by the numbers</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} run={visible} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="rounded-[2rem] bg-primary p-8 text-center text-primary-foreground shadow-lift sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Why choose FreshCart?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm opacity-90 sm:text-base">
            Because the difference between a good dinner and a great one is often just how fresh the
            ingredients were. We obsess over that gap so you don't have to.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex rounded-full bg-card px-6 py-3.5 text-sm font-bold text-primary transition hover:brightness-105"
          >
            Talk to our team
          </Link>
        </div>
      </section>
    </div>
  );
}
