import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { getProduct, money, suggestionsFor } from "@/lib/fc-data";
import { useFreshCart } from "@/lib/fc-store";
import { ProductTile } from "./bits";

/** Shows category-based "you may also need" picks right after an add-to-cart. */
export function SmartSuggest() {
  const { lastAdded, cart, addToCart } = useFreshCart();
  const [open, setOpen] = useState(false);
  const [forId, setForId] = useState<string | null>(null);

  useEffect(() => {
    if (!lastAdded) return;
    setForId(lastAdded);
    setOpen(true);
    const t = window.setTimeout(() => setOpen(false), 9000);
    return () => window.clearTimeout(t);
  }, [lastAdded]);

  const product = forId ? getProduct(forId) : undefined;
  if (!open || !product) return null;

  const picks = suggestionsFor(cart.map((l) => l.id), 3);
  if (picks.length === 0) return null;

  return (
    <div className="animate-pop fixed bottom-24 right-3 z-40 w-[min(21rem,calc(100vw-1.5rem))] rounded-3xl border border-border bg-card p-4 shadow-lift md:bottom-6 md:right-6">
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss suggestions"
        className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-secondary text-muted-foreground transition hover:bg-primary-soft"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <p className="pr-8 text-sm font-bold">
        You added {product.name} {product.emoji}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">You may also need:</p>

      <ul className="mt-3 grid gap-2">
        {picks.map((p) => (
          <li key={p.id} className="flex items-center gap-3 rounded-2xl bg-secondary/60 p-2">
            <ProductTile product={p} size="sm" className="h-11 w-11 shrink-0 rounded-xl" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{p.name}</span>
              <span className="text-xs text-muted-foreground">{money(p.price)}</span>
            </span>
            <button
              type="button"
              onClick={() => addToCart(p.id)}
              className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition hover:brightness-105"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
