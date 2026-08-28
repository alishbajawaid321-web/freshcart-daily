import { Link } from "@tanstack/react-router";
import { Heart, Plus, Check } from "lucide-react";
import { useState } from "react";
import { discountPercent, getCategory, money, type Product } from "@/lib/fc-data";
import { useFreshCart } from "@/lib/fc-store";
import { cn } from "@/lib/utils";
import { ProductTile, Stars } from "./bits";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, inWishlist } = useFreshCart();
  const [added, setAdded] = useState(false);
  const off = discountPercent(product);
  const saved = inWishlist(product.id);

  return (
    <article className="group fc-lift relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-soft">
      <div className="relative">
        <Link
          to="/product/$productId"
          params={{ productId: product.id }}
          aria-label={`View ${product.name}`}
        >
          <ProductTile product={product} />
        </Link>

        {off > 0 ? (
          <span className="absolute left-2 top-2 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground shadow-soft">
            -{off}%
          </span>
        ) : null}

        {product.fresh && product.freshness ? (
          <span className="absolute bottom-2 left-2 rounded-full bg-card/90 px-2 py-1 text-[11px] font-semibold text-primary shadow-soft backdrop-blur">
            🌿 {product.freshness}% fresh
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-berry shadow-soft backdrop-blur transition hover:scale-110"
        >
          <Heart className={cn("h-4 w-4", saved && "fill-berry")} />
        </button>
      </div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col px-1">
        <span className="truncate text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {getCategory(product.category)?.name}
        </span>
        <Link
          to="/product/$productId"
          params={{ productId: product.id }}
          className="mt-1 line-clamp-2 text-sm font-bold leading-snug hover:text-primary sm:text-base"
        >
          {product.name}
        </Link>
        <span className="mt-0.5 text-xs text-muted-foreground">{product.unit}</span>

        <div className="mt-2 flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-xs text-muted-foreground">{product.rating.toFixed(1)}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-bold text-primary">{money(product.price)}</span>
          {product.oldPrice ? (
            <span className="text-sm text-muted-foreground line-through">
              {money(product.oldPrice)}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => {
            addToCart(product.id);
            setAdded(true);
            window.setTimeout(() => setAdded(false), 1400);
          }}
          className={cn(
            "mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition active:scale-95",
            added
              ? "bg-primary-deep text-primary-foreground dark:bg-primary-soft dark:text-foreground"
              : "bg-primary text-primary-foreground hover:brightness-105",
          )}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
