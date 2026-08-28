import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS, money } from "@/lib/fc-data";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Grocery Categories — FreshCart" },
      {
        name: "description",
        content:
          "Browse every FreshCart aisle: fruit and vegetables, dairy, bakery, meat, grains, snacks, drinks, personal care and household.",
      },
      { property: "og:title", content: "Grocery Categories — FreshCart" },
      {
        property: "og:description",
        content: "Ten colourful aisles of everyday essentials, all one tap away.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Browse every aisle</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Pick an aisle to jump straight into a filtered shelf of products.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => {
          const items = PRODUCTS.filter((p) => p.category === c.id);
          const cheapest = items.reduce(
            (min, p) => (p.price < min ? p.price : min),
            items[0]?.price ?? 0,
          );
          return (
            <Link
              key={c.id}
              to="/shop"
              search={{ cat: c.id }}
              className={`fc-lift fc-grain group flex flex-col rounded-3xl ${c.tint} p-6 shadow-soft`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
                  {c.emoji}
                </span>
                <span className="rounded-full bg-card/80 px-3 py-1 text-xs font-bold backdrop-blur">
                  {items.length} items
                </span>
              </div>
              <h2 className="mt-4 text-xl font-bold">{c.name}</h2>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{c.blurb}</p>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold">
                <span>From {money(cheapest)}</span>
                <span className="text-primary">Shop aisle →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
