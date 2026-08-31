import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, PRODUCTS, discountPercent } from "@/lib/fc-data";
import { ProductGrid } from "@/components/fc/ProductCard";
import { EmptyState, Skeletons } from "@/components/fc/bits";

type ShopSearch = {
  q?: string | undefined;
  cat?: string | undefined;
  min?: number | undefined;
  max?: number | undefined;
  rating?: number | undefined;
  discount?: number | undefined;
  sort?: "popular" | "price-asc" | "price-desc" | "rating" | "discount" | undefined;
};

const SORTS: { value: NonNullable<ShopSearch["sort"]>; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "discount", label: "Biggest Discount" },
];

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const num = (v: unknown) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : undefined;
    };
    const sort = String(search["sort"] ?? "");
    return {
      q: search["q"] ? String(search["q"]) : undefined,
      cat: search["cat"] ? String(search["cat"]) : undefined,
      min: num(search["min"]),
      max: num(search["max"]),
      rating: num(search["rating"]),
      discount: num(search["discount"]),
      sort: SORTS.some((s) => s.value === sort)
        ? (sort as NonNullable<ShopSearch["sort"]>)
        : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Shop All Groceries — FreshCart" },
      {
        name: "description",
        content:
          "Search, filter and sort hundreds of fresh grocery items by category, price, rating and discount on FreshCart.",
      },
      { property: "og:title", content: "Shop All Groceries — FreshCart" },
      {
        property: "og:description",
        content: "Search and filter fresh produce, dairy, bakery, snacks and household staples.",
      },
      { property: "og:image", content: "https://project--e178b9d6-97e4-412b-a71c-56d7d12a4462.lovable.app/og-freshcart.jpg" },
      { name: "twitter:image", content: "https://project--e178b9d6-97e4-412b-a71c-56d7d12a4462.lovable.app/og-freshcart.jpg" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [term, setTerm] = useState(search["q"] ?? "");
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => setTerm(search["q"] ?? ""), [search.q]);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 320);
    return () => window.clearTimeout(t);
  }, [search.q, search.cat, search.min, search.max, search.rating, search.discount, search.sort]);

  const update = (patch: Partial<ShopSearch>) =>
    navigate({ search: (prev: ShopSearch) => ({ ...prev, ...patch }) });

  const results = useMemo(() => {
    const q = (search["q"] ?? "").trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (q && !`${p.name} ${p.category} ${p.unit}`.toLowerCase().includes(q)) return false;
      if (search.cat && p.category !== search.cat) return false;
      if (search.min !== undefined && p.price < search.min) return false;
      if (search.max !== undefined && p.price > search.max) return false;
      if (search.rating !== undefined && p.rating < search.rating) return false;
      if (search.discount !== undefined && discountPercent(p) < search.discount) return false;
      return true;
    });

    switch (search.sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        list = [...list].sort((a, b) => discountPercent(b) - discountPercent(a));
        break;
      default:
        list = [...list].sort((a, b) => b.sold - a.sold);
    }
    return list;
  }, [search]);

  const activeCount = [
    search.cat,
    search.min,
    search.max,
    search.rating,
    search.discount,
  ].filter((v) => v !== undefined && v !== "").length;

  const field =
    "w-full rounded-2xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary";

  const filters = (
    <div className="grid gap-5">
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Category
        </label>
        <select
          className={`${field} mt-2`}
          value={search["cat"] ?? ""}
          onChange={(e) => update({ cat: e.target.value || undefined })}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Price range (Rs.)
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <input
            type="number"
            min={0}
            step="50"
            placeholder="Min"
            aria-label="Minimum price"
            className={field}
            value={search["min"] ?? ""}
            onChange={(e) =>
              update({ min: e.target.value === "" ? undefined : Number(e.target.value) })
            }
          />
          <input
            type="number"
            min={0}
            step="50"
            placeholder="Max"
            aria-label="Maximum price"
            className={field}
            value={search["max"] ?? ""}
            onChange={(e) =>
              update({ max: e.target.value === "" ? undefined : Number(e.target.value) })
            }
          />
        </div>
      </div>


      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Minimum rating
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {[undefined, 4, 4.5, 4.8].map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => update({ rating: r })}
              className={`rounded-full px-3.5 py-2 text-xs font-bold transition ${
                search.rating === r
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary-soft"
              }`}
            >
              {r === undefined ? "Any" : `${r}★ +`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Discount
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {[undefined, 10, 20, 25].map((d, i) => (
            <button
              key={i}
              type="button"
              onClick={() => update({ discount: d })}
              className={`rounded-full px-3.5 py-2 text-xs font-bold transition ${
                search.discount === d
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent-soft"
              }`}
            >
              {d === undefined ? "Any" : `${d}% +`}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          navigate({ search: { sort: search.sort, q: search.q } })
        }
        className="rounded-full border border-input px-4 py-2.5 text-xs font-bold transition hover:bg-secondary"
      >
        Clear filters
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Shop the whole store</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        {PRODUCTS.length} everyday essentials, filtered exactly how you like them.
      </p>

      <form
        className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 shadow-soft"
        onSubmit={(e) => {
          e.preventDefault();
          update({ q: term.trim() || undefined });
        }}
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            update({ q: e.target.value.trim() || undefined });
          }}
          placeholder="Search products — try “milk”"
          aria-label="Search products"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        {term ? (
          <button
            type="button"
            onClick={() => {
              setTerm("");
              update({ q: undefined });
            }}
            aria-label="Clear search"
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </form>

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold shadow-soft lg:hidden"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
              {activeCount ? (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {activeCount}
                </span>
              ) : null}
            </span>
            <span className="text-muted-foreground">{filtersOpen ? "Hide" : "Show"}</span>
          </button>

          <div
            className={`${filtersOpen ? "block" : "hidden"} mt-3 rounded-3xl border border-border bg-card p-5 shadow-soft lg:mt-0 lg:block`}
          >
            {filters}
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <p className="truncate text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "product" : "products"} found
            </p>
            <select
              aria-label="Sort products"
              className="shrink-0 rounded-2xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              value={search.sort ?? "popular"}
              onChange={(e) => update({ sort: e.target.value as ShopSearch["sort"] })}
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <Skeletons count={8} />
          ) : results.length === 0 ? (
            <EmptyState
              emoji="🔍"
              title="Nothing on this shelf"
              message="No products match those filters. Try widening the price range or clearing a filter."
              cta={{ label: "Reset the shop", to: "/shop" }}
            />
          ) : (
            <ProductGrid products={results} />
          )}
        </div>
      </div>
    </div>
  );
}
