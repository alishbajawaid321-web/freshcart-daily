import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { getProduct, money } from "@/lib/fc-data";
import { useFreshCart } from "@/lib/fc-store";
import { EmptyState, ProductTile, Stars } from "@/components/fc/bits";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist — FreshCart" },
      {
        name: "description",
        content:
          "Everything you saved for later on FreshCart. Move your favourite groceries straight into the cart.",
      },
      { property: "og:title", content: "My Wishlist — FreshCart" },
      { property: "og:description", content: "Your saved FreshCart groceries, ready when you are." },
      { property: "og:image", content: "https://project--e178b9d6-97e4-412b-a71c-56d7d12a4462.lovable.app/og-freshcart.jpg" },
      { name: "twitter:image", content: "https://project--e178b9d6-97e4-412b-a71c-56d7d12a4462.lovable.app/og-freshcart.jpg" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, ready, removeWishlist, moveToCart } = useFreshCart();
  const items = wishlist.map((id) => getProduct(id)).filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="flex items-center gap-3 text-3xl font-extrabold sm:text-4xl">
        <Heart className="h-7 w-7 fill-berry text-berry" /> My Wishlist
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {ready ? `${items.length} saved ${items.length === 1 ? "item" : "items"}` : "Loading..."}
      </p>

      {ready && items.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            emoji="🥕"
            title="Nothing saved yet"
            message="Your wishlist is waiting for some fresh picks! 🥕"
            cta={{ label: "Start shopping", to: "/shop" }}
          />
        </div>
      ) : (
        <ul className="mt-8 grid gap-3">
          {items.map((p) => (
            <li
              key={p!.id}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft sm:flex"
            >
              <Link
                to="/product/$productId"
                params={{ productId: p!.id }}
                className="shrink-0"
                aria-label={p!.name}
              >
                <ProductTile product={p!} size="sm" />
              </Link>

              <div className="min-w-0 sm:flex-1">
                <Link
                  to="/product/$productId"
                  params={{ productId: p!.id }}
                  className="block truncate font-bold hover:text-primary"
                >
                  {p!.name}
                </Link>
                <span className="text-xs text-muted-foreground">{p!.unit}</span>
                <div className="mt-1 flex items-center gap-2">
                  <Stars rating={p!.rating} />
                  <span className="font-bold text-primary">{money(p!.price)}</span>
                </div>
              </div>

              <div className="col-span-2 flex flex-wrap gap-2 sm:col-span-1 sm:shrink-0">
                <button
                  type="button"
                  onClick={() => moveToCart(p!.id)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-105 sm:flex-none"
                >
                  <ShoppingCart className="h-4 w-4" /> Move to cart
                </button>
                <button
                  type="button"
                  onClick={() => removeWishlist(p!.id)}
                  aria-label={`Remove ${p!.name}`}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-destructive transition hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
