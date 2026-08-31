import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS, categoryImage, money } from "@/lib/fc-data";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Grocery Categories — FreshCart" },
      {
        name: "description",
        content:
          "Browse every FreshCart aisle: fresh produce, dairy and eggs, bakery, chocolates, snacks, beverages, rice and grains, tea and coffee, personal care and household.",
      },
      { property: "og:title", content: "Grocery Categories — FreshCart" },
      {
        property: "og:description",
        content: "Fifteen well-stocked aisles of everyday Pakistani grocery essentials.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://project--e178b9d6-97e4-412b-a71c-56d7d12a4462.lovable.app/og-freshcart.jpg" },
      { name: "twitter:image", content: "https://project--e178b9d6-97e4-412b-a71c-56d7d12a4462.lovable.app/og-freshcart.jpg" },
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
          const cover = categoryImage(c.id);
          return (
            <Link
              key={c.id}
              to="/shop"
              search={{ cat: c.id }}
              className="fc-lift group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                {cover ? (
                  <img
                    src={cover}
                    alt={c.name}
                    width={768}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className={`grid h-full w-full place-items-center text-5xl ${c.tint}`}>
                    {c.emoji}
                  </div>
                )}
                <span className="absolute right-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-bold backdrop-blur">
                  {items.length} items
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-xl font-bold">
                  <span className="mr-2">{c.emoji}</span>
                  {c.name}
                </h2>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{c.blurb}</p>
                <div className="mt-4 flex items-center justify-between text-sm font-semibold">
                  <span>From {money(cheapest)}</span>
                  <span className="text-primary">Shop aisle →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

