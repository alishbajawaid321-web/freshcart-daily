import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { getCategory, productImage, type Product } from "@/lib/fc-data";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i <= Math.round(rating)
              ? "fill-accent text-accent"
              : "fill-muted text-muted-foreground/40",
          )}
        />
      ))}
    </span>
  );
}

export function ProductTile({
  product,
  size = "md",
  className,
  priority = false,
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
}) {
  const tint = getCategory(product.category)?.tint ?? "bg-pastel-mint";
  const photo = productImage(product.id);
  return (
    <div
      className={cn(
        "grid place-items-center overflow-hidden rounded-2xl bg-white dark:bg-white/95",
        !photo && tint,
        size === "sm" && "h-20 w-20",
        size === "md" && "aspect-square w-full",
        size === "lg" && "aspect-square w-full",
        className,
      )}
    >
      {photo ? (
        <img
          src={photo}
          alt={product.name}
          width={768}
          height={768}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
        />
      ) : (
        <span
          role="img"
          aria-label={product.name}
          className={cn(
            "select-none drop-shadow-sm transition-transform duration-500 group-hover:scale-110",
            size === "sm" && "text-3xl",
            size === "md" && "text-6xl sm:text-7xl",
            size === "lg" && "text-[8rem] sm:text-[11rem]",
          )}
        >
          {product.emoji}
        </span>
      )}
    </div>
  );
}


export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="mb-7 grid gap-4 sm:flex sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-deep dark:text-primary">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle ? (
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          to={action.to}
          className="shrink-0 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          {action.label} →
        </Link>
      ) : null}
    </div>
  );
}

export function EmptyState({
  emoji,
  title,
  message,
  cta,
}: {
  emoji: string;
  title: string;
  message: string;
  cta?: { label: string; to: string };
}) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center shadow-soft">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary-soft text-4xl">
        {emoji}
      </div>
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      {cta ? (
        <Link
          to={cta.to}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card transition hover:brightness-105"
        >
          {cta.label}
        </Link>
      ) : null}
    </div>
  );
}

export function Skeletons({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-3xl border border-border bg-card p-3">
          <div className="aspect-square w-full animate-pulse rounded-2xl bg-muted" />
          <div className="mt-4 h-3 w-2/3 animate-pulse rounded-full bg-muted" />
          <div className="mt-2 h-3 w-1/3 animate-pulse rounded-full bg-muted" />
          <div className="mt-4 h-9 w-full animate-pulse rounded-full bg-muted" />
        </div>
      ))}
    </div>
  );
}
