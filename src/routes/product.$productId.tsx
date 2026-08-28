import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import {
  discountPercent,
  getCategory,
  getProduct,
  money,
  relatedTo,
  type Product,
} from "@/lib/fc-data";
import { useFreshCart } from "@/lib/fc-store";
import { ProductGrid } from "@/components/fc/ProductCard";
import { ProductTile, SectionHeading, Stars } from "@/components/fc/bits";
import { cn } from "@/lib/utils";

const REVIEWS = [
  { name: "Amara O.", stars: 5, text: "Arrived cold and perfectly fresh. This is my weekly order now." },
  { name: "Daniel R.", stars: 5, text: "Great quality for the price and the delivery window was spot on." },
  { name: "Sofia M.", stars: 4, text: "Really good — I just wish the pack was slightly bigger." },
];

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — FreshCart" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    const desc = `${p.name} — ${p.unit} for ${money(p.price)}. ${p.description}`.slice(0, 155);
    return {
      meta: [
        { title: `${p.name} — ${money(p.price)} | FreshCart` },
        { name: "description", content: desc },
        { property: "og:title", content: `${p.name} — FreshCart` },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, inWishlist } = useFreshCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const off = discountPercent(product);
  const saved = inWishlist(product.id);
  const category = getCategory(product.category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary">
          Shop
        </Link>
        <span>/</span>
        <Link to="/shop" search={{ cat: product.category }} className="hover:text-primary">
          {category?.name}
        </Link>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative">
          <div className="rounded-[2rem] border border-border bg-card p-4 shadow-card">
            <ProductTile product={product} size="lg" />
          </div>
          {off > 0 ? (
            <span className="absolute left-6 top-6 rounded-full bg-accent px-3 py-1.5 text-sm font-bold text-accent-foreground shadow-soft">
              Save {off}%
            </span>
          ) : null}
          {product.fresh && product.freshness ? (
            <span className="absolute bottom-6 left-6 rounded-full bg-card/90 px-3 py-1.5 text-sm font-semibold text-primary shadow-soft backdrop-blur">
              🌿 Freshness: {product.freshness}%
            </span>
          ) : null}
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {category?.emoji} {category?.name}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{product.unit}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Stars rating={product.rating} />
            <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviews} reviews • {product.sold.toLocaleString()} sold)
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-4xl font-extrabold text-primary">
              {money(product.price)}
            </span>
            {product.oldPrice ? (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {money(product.oldPrice)}
                </span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent-foreground">
                  You save {money(product.oldPrice - product.price)}
                </span>
              </>
            ) : null}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-10 w-10 place-items-center rounded-full bg-secondary transition hover:bg-primary-soft"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-bold tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                aria-label="Increase quantity"
                className="grid h-10 w-10 place-items-center rounded-full bg-secondary transition hover:bg-primary-soft"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => addToCart(product.id, qty)}
              className="flex-1 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-card transition hover:brightness-105 active:scale-95 sm:flex-none"
            >
              Add to Cart
            </button>

            <button
              type="button"
              onClick={() => {
                addToCart(product.id, qty, true);
                navigate({ to: "/checkout" });
              }}
              className="flex-1 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-glow transition hover:brightness-105 active:scale-95 sm:flex-none"
            >
              Buy Now
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={saved}
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card text-berry transition hover:scale-105"
              aria-label="Add to wishlist"
            >
              <Heart className={cn("h-5 w-5", saved && "fill-berry")} />
            </button>
          </div>

          <ul className="mt-7 grid gap-2 text-sm sm:grid-cols-3">
            {[
              { icon: Truck, text: "Delivery from $3" },
              { icon: ShieldCheck, text: "Freshness promise" },
              { icon: RotateCcw, text: "Easy returns" },
            ].map((f) => (
              <li
                key={f.text}
                className="flex items-center gap-2 rounded-2xl bg-secondary/60 px-3 py-2.5 text-xs font-semibold"
              >
                <f.icon className="h-4 w-4 shrink-0 text-primary" />
                {f.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Customer reviews</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <article key={r.name} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold">{r.name}</span>
                <Stars rating={r.stars} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading title="You May Also Like" subtitle="Shoppers often pair these together." />
        <ProductGrid products={relatedTo(product, 4) as Product[]} />
      </section>
    </div>
  );
}
