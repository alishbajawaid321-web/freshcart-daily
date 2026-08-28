export type Category = {
  id: string;
  name: string;
  emoji: string;
  tint: string;
  blurb: string;
};

export type Product = {
  id: string;
  name: string;
  emoji: string;
  category: string;
  unit: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  sold: number;
  fresh: boolean;
  freshness?: number;
  deal?: boolean;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    emoji: "🍎",
    tint: "bg-pastel-mint",
    blurb: "Picked at sunrise, delivered by noon",
  },
  {
    id: "dairy-eggs",
    name: "Dairy & Eggs",
    emoji: "🥛",
    tint: "bg-pastel-sky",
    blurb: "Chilled the whole way to your door",
  },
  {
    id: "bakery",
    name: "Bakery",
    emoji: "🍞",
    tint: "bg-pastel-wheat",
    blurb: "Baked fresh every single morning",
  },
  {
    id: "meat-seafood",
    name: "Meat & Seafood",
    emoji: "🥩",
    tint: "bg-pastel-rose",
    blurb: "Butcher cut, ocean fresh",
  },
  {
    id: "rice-grains",
    name: "Rice & Grains",
    emoji: "🍚",
    tint: "bg-pastel-sand",
    blurb: "Pantry staples that never run out",
  },
  {
    id: "snacks",
    name: "Snacks",
    emoji: "🍪",
    tint: "bg-pastel-butter",
    blurb: "For the 4pm crunch craving",
  },
  {
    id: "beverages",
    name: "Beverages",
    emoji: "🥤",
    tint: "bg-pastel-aqua",
    blurb: "Sip, brew, repeat",
  },
  {
    id: "personal-care",
    name: "Personal Care",
    emoji: "🧴",
    tint: "bg-pastel-lilac",
    blurb: "Everyday self-care essentials",
  },
  {
    id: "household",
    name: "Household",
    emoji: "🧹",
    tint: "bg-pastel-peach",
    blurb: "Keep the home sparkling",
  },
  {
    id: "chocolates-sweets",
    name: "Chocolates & Sweets",
    emoji: "🍫",
    tint: "bg-pastel-cocoa",
    blurb: "A little treat is self-care too",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "fresh-apples",
    name: "Fresh Red Apples",
    emoji: "🍎",
    category: "fruits-vegetables",
    unit: "1 kg pack",
    price: 3.49,
    oldPrice: 4.99,
    rating: 4.8,
    reviews: 412,
    sold: 1820,
    fresh: true,
    freshness: 98,
    deal: true,
    description:
      "Crisp, juicy red apples hand-picked from hillside orchards. Perfect for lunchboxes, baking, or a straight-from-the-fridge snack.",
  },
  {
    id: "bananas",
    name: "Ripe Bananas",
    emoji: "🍌",
    category: "fruits-vegetables",
    unit: "Bunch of 6",
    price: 1.79,
    oldPrice: 2.29,
    rating: 4.7,
    reviews: 388,
    sold: 2410,
    fresh: true,
    freshness: 96,
    deal: true,
    description:
      "Naturally sweet bananas at just the right ripeness. Great for smoothies, oatmeal or a quick energy boost.",
  },
  {
    id: "tomatoes",
    name: "Vine Tomatoes",
    emoji: "🍅",
    category: "fruits-vegetables",
    unit: "500 g",
    price: 2.29,
    rating: 4.5,
    reviews: 201,
    sold: 1240,
    fresh: true,
    freshness: 94,
    description:
      "Deep-red vine tomatoes with a sweet, tangy bite. Ideal for salads, pasta sauces and sandwiches.",
  },
  {
    id: "potatoes",
    name: "Golden Potatoes",
    emoji: "🥔",
    category: "fruits-vegetables",
    unit: "2 kg bag",
    price: 2.99,
    oldPrice: 3.79,
    rating: 4.4,
    reviews: 176,
    sold: 990,
    fresh: true,
    freshness: 92,
    deal: true,
    description:
      "All-purpose golden potatoes with buttery flesh. Roast them, mash them, or turn them into the crispiest fries.",
  },
  {
    id: "carrots",
    name: "Sweet Carrots",
    emoji: "🥕",
    category: "fruits-vegetables",
    unit: "1 kg",
    price: 1.99,
    rating: 4.6,
    reviews: 143,
    sold: 870,
    fresh: true,
    freshness: 95,
    description:
      "Snappy, sweet carrots with the greens trimmed. Great raw with dips or slow-roasted with honey.",
  },
  {
    id: "avocado",
    name: "Creamy Avocados",
    emoji: "🥑",
    category: "fruits-vegetables",
    unit: "Pack of 3",
    price: 4.49,
    oldPrice: 5.99,
    rating: 4.6,
    reviews: 264,
    sold: 1130,
    fresh: true,
    freshness: 93,
    deal: true,
    description:
      "Buttery ripe avocados ready to smash on toast tomorrow morning. Rich in healthy fats and fibre.",
  },
  {
    id: "milk",
    name: "Whole Fresh Milk",
    emoji: "🥛",
    category: "dairy-eggs",
    unit: "1 litre bottle",
    price: 2.19,
    rating: 4.9,
    reviews: 623,
    sold: 3120,
    fresh: true,
    freshness: 97,
    description:
      "Creamy whole milk from local grass-fed herds, bottled the same day it is collected.",
  },
  {
    id: "eggs",
    name: "Free-Range Eggs",
    emoji: "🥚",
    category: "dairy-eggs",
    unit: "Dozen",
    price: 3.89,
    oldPrice: 4.59,
    rating: 4.8,
    reviews: 511,
    sold: 2760,
    fresh: true,
    freshness: 96,
    deal: true,
    description:
      "Large free-range eggs with golden yolks from hens raised on open pasture.",
  },
  {
    id: "cheddar",
    name: "Aged Cheddar Block",
    emoji: "🧀",
    category: "dairy-eggs",
    unit: "250 g",
    price: 5.29,
    rating: 4.7,
    reviews: 189,
    sold: 640,
    fresh: true,
    freshness: 90,
    description:
      "Twelve-month matured cheddar with a sharp, nutty finish. Melts beautifully on toast.",
  },
  {
    id: "greek-yogurt",
    name: "Greek Yogurt",
    emoji: "🍦",
    category: "dairy-eggs",
    unit: "500 g tub",
    price: 3.19,
    oldPrice: 3.99,
    rating: 4.6,
    reviews: 233,
    sold: 880,
    fresh: true,
    freshness: 94,
    deal: true,
    description:
      "Thick, high-protein Greek yogurt with nothing added. Perfect base for fruit and honey bowls.",
  },
  {
    id: "bread",
    name: "Sourdough Bread",
    emoji: "🍞",
    category: "bakery",
    unit: "600 g loaf",
    price: 2.99,
    rating: 4.8,
    reviews: 405,
    sold: 2180,
    fresh: true,
    freshness: 99,
    description:
      "Slow-fermented sourdough with a crackling crust and open, chewy crumb. Baked before dawn.",
  },
  {
    id: "croissant",
    name: "Butter Croissants",
    emoji: "🥐",
    category: "bakery",
    unit: "Pack of 4",
    price: 4.19,
    oldPrice: 5.49,
    rating: 4.7,
    reviews: 158,
    sold: 720,
    fresh: true,
    freshness: 97,
    deal: true,
    description:
      "All-butter croissants laminated by hand for that shatteringly flaky finish.",
  },
  {
    id: "chicken-breast",
    name: "Chicken Breast Fillets",
    emoji: "🍗",
    category: "meat-seafood",
    unit: "500 g",
    price: 6.49,
    oldPrice: 7.99,
    rating: 4.6,
    reviews: 276,
    sold: 1310,
    fresh: true,
    freshness: 95,
    deal: true,
    description:
      "Skinless, boneless chicken breast, trimmed and ready for the pan. Free from added water.",
  },
  {
    id: "salmon",
    name: "Atlantic Salmon Fillet",
    emoji: "🐟",
    category: "meat-seafood",
    unit: "300 g",
    price: 9.99,
    rating: 4.8,
    reviews: 192,
    sold: 540,
    fresh: true,
    freshness: 93,
    description:
      "Responsibly farmed salmon with rich, buttery flakes. Pan-sear it skin-side down for four minutes.",
  },
  {
    id: "beef-mince",
    name: "Lean Beef Mince",
    emoji: "🥩",
    category: "meat-seafood",
    unit: "500 g",
    price: 7.29,
    rating: 4.5,
    reviews: 164,
    sold: 610,
    fresh: true,
    freshness: 92,
    description:
      "Five-percent-fat beef mince from grass-fed cattle. Ideal for bolognese, tacos and burgers.",
  },
  {
    id: "rice",
    name: "Basmati Rice",
    emoji: "🍚",
    category: "rice-grains",
    unit: "5 kg bag",
    price: 11.49,
    oldPrice: 13.99,
    rating: 4.7,
    reviews: 349,
    sold: 1480,
    fresh: false,
    deal: true,
    description:
      "Aged long-grain basmati that cooks up fluffy and separate with a delicate aroma.",
  },
  {
    id: "cereal",
    name: "Honey Oat Cereal",
    emoji: "🥣",
    category: "rice-grains",
    unit: "750 g box",
    price: 4.59,
    rating: 4.4,
    reviews: 218,
    sold: 940,
    fresh: false,
    description:
      "Toasted whole-grain oat clusters lightly sweetened with honey. A five-minute breakfast win.",
  },
  {
    id: "pasta",
    name: "Durum Wheat Pasta",
    emoji: "🍝",
    category: "rice-grains",
    unit: "500 g",
    price: 1.89,
    rating: 4.5,
    reviews: 176,
    sold: 1020,
    fresh: false,
    description:
      "Bronze-cut penne with a rough surface that holds on to every last drop of sauce.",
  },
  {
    id: "chips",
    name: "Salted Potato Chips",
    emoji: "🍟",
    category: "snacks",
    unit: "175 g",
    price: 2.49,
    oldPrice: 3.29,
    rating: 4.3,
    reviews: 302,
    sold: 1690,
    fresh: false,
    deal: true,
    description:
      "Kettle-cooked in small batches for an extra-crunchy chip with just the right salt hit.",
  },
  {
    id: "popcorn",
    name: "Butter Popcorn",
    emoji: "🍿",
    category: "snacks",
    unit: "120 g",
    price: 2.19,
    rating: 4.4,
    reviews: 147,
    sold: 810,
    fresh: false,
    description:
      "Air-popped corn tossed in real butter and sea salt. Movie night sorted.",
  },
  {
    id: "mixed-nuts",
    name: "Roasted Mixed Nuts",
    emoji: "🥜",
    category: "snacks",
    unit: "300 g",
    price: 6.79,
    oldPrice: 8.49,
    rating: 4.7,
    reviews: 205,
    sold: 700,
    fresh: false,
    deal: true,
    description:
      "Almonds, cashews, walnuts and hazelnuts, dry-roasted with a light sprinkle of salt.",
  },
  {
    id: "orange-juice",
    name: "Fresh Orange Juice",
    emoji: "🧃",
    category: "beverages",
    unit: "1 litre",
    price: 3.29,
    oldPrice: 4.19,
    rating: 4.6,
    reviews: 289,
    sold: 1420,
    fresh: true,
    freshness: 95,
    deal: true,
    description:
      "Squeezed from sun-ripened oranges with the pulp left in. Never from concentrate.",
  },
  {
    id: "coffee",
    name: "Ground Arabica Coffee",
    emoji: "☕",
    category: "beverages",
    unit: "500 g",
    price: 8.99,
    rating: 4.9,
    reviews: 476,
    sold: 1980,
    fresh: false,
    description:
      "Medium-roast Arabica with cocoa and caramel notes, ground for filter and cafetière.",
  },
  {
    id: "soft-drink",
    name: "Sparkling Cola",
    emoji: "🥤",
    category: "beverages",
    unit: "6 x 330 ml",
    price: 4.49,
    oldPrice: 5.49,
    rating: 4.2,
    reviews: 168,
    sold: 1090,
    fresh: false,
    deal: true,
    description:
      "Classic ice-cold cola in slim cans, ready for the fridge door. Best served over crushed ice.",
  },
  {
    id: "green-tea",
    name: "Green Tea Bags",
    emoji: "🍵",
    category: "beverages",
    unit: "50 bags",
    price: 3.79,
    rating: 4.5,
    reviews: 131,
    sold: 520,
    fresh: false,
    description:
      "Delicate whole-leaf green tea in unbleached bags. Light, grassy and calming.",
  },
  {
    id: "shampoo",
    name: "Nourishing Shampoo",
    emoji: "🧴",
    category: "personal-care",
    unit: "400 ml",
    price: 5.99,
    oldPrice: 7.49,
    rating: 4.4,
    reviews: 224,
    sold: 760,
    fresh: false,
    deal: true,
    description:
      "Sulphate-free shampoo with argan oil and aloe for soft, manageable hair.",
  },
  {
    id: "toothpaste",
    name: "Mint Toothpaste",
    emoji: "🪥",
    category: "personal-care",
    unit: "125 ml",
    price: 2.79,
    rating: 4.6,
    reviews: 187,
    sold: 900,
    fresh: false,
    description:
      "Fluoride toothpaste with cool mint for all-day fresh breath and stronger enamel.",
  },
  {
    id: "hand-soap",
    name: "Gentle Hand Soap",
    emoji: "🧼",
    category: "personal-care",
    unit: "300 ml",
    price: 3.49,
    rating: 4.5,
    reviews: 112,
    sold: 480,
    fresh: false,
    description:
      "Moisturising liquid hand soap with a light citrus scent. Kind to everyday hands.",
  },
  {
    id: "dish-liquid",
    name: "Dishwashing Liquid",
    emoji: "🫧",
    category: "household",
    unit: "750 ml",
    price: 2.89,
    oldPrice: 3.69,
    rating: 4.5,
    reviews: 256,
    sold: 1180,
    fresh: false,
    deal: true,
    description:
      "Concentrated lemon dish liquid that cuts grease fast and rinses away clean.",
  },
  {
    id: "laundry-detergent",
    name: "Laundry Detergent",
    emoji: "🧺",
    category: "household",
    unit: "2 litres",
    price: 8.49,
    rating: 4.6,
    reviews: 198,
    sold: 690,
    fresh: false,
    description:
      "Low-foam liquid detergent for up to 40 washes, gentle on colours and fabrics.",
  },
  {
    id: "paper-towels",
    name: "Kitchen Paper Towels",
    emoji: "🧻",
    category: "household",
    unit: "4 rolls",
    price: 4.29,
    rating: 4.3,
    reviews: 121,
    sold: 560,
    fresh: false,
    description:
      "Thick two-ply sheets that stay strong when wet. Recycled core, plastic-free wrap.",
  },
  {
    id: "chocolate",
    name: "Dark Chocolate Bar",
    emoji: "🍫",
    category: "chocolates-sweets",
    unit: "100 g",
    price: 2.59,
    oldPrice: 3.49,
    rating: 4.8,
    reviews: 341,
    sold: 1560,
    fresh: false,
    deal: true,
    description:
      "Seventy-percent cocoa dark chocolate with a smooth snap and fruity finish.",
  },
  {
    id: "cookies",
    name: "Choc Chip Cookies",
    emoji: "🍪",
    category: "chocolates-sweets",
    unit: "200 g",
    price: 2.99,
    rating: 4.5,
    reviews: 214,
    sold: 980,
    fresh: false,
    description:
      "Chunky bakery-style cookies loaded with melting chocolate chips.",
  },
  {
    id: "honey",
    name: "Wildflower Honey",
    emoji: "🍯",
    category: "chocolates-sweets",
    unit: "450 g jar",
    price: 6.19,
    oldPrice: 7.29,
    rating: 4.7,
    reviews: 156,
    sold: 470,
    fresh: false,
    deal: true,
    description:
      "Raw, unfiltered wildflower honey from local hives. Floral, thick and golden.",
  },
];

export type Bundle = {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  tint: string;
  items: string[];
};

export const BUNDLES: Bundle[] = [
  {
    id: "breakfast",
    name: "Breakfast Bundle",
    tagline: "Mornings, handled",
    emoji: "🌅",
    tint: "bg-pastel-butter",
    items: ["milk", "bread", "eggs", "cereal"],
  },
  {
    id: "movie-night",
    name: "Movie Night Bundle",
    tagline: "Lights, camera, snacks",
    emoji: "🎬",
    tint: "bg-pastel-lilac",
    items: ["popcorn", "soft-drink", "chocolate", "chips"],
  },
  {
    id: "healthy-start",
    name: "Healthy Start Bundle",
    tagline: "Fuel the good habits",
    emoji: "🌿",
    tint: "bg-pastel-mint",
    items: ["fresh-apples", "bananas", "mixed-nuts", "milk"],
  },
];

/** Category pairs used for the smart cart suggestion engine. */
const AFFINITY: Record<string, string[]> = {
  "dairy-eggs": ["bakery", "rice-grains"],
  bakery: ["dairy-eggs", "chocolates-sweets"],
  "fruits-vegetables": ["dairy-eggs", "snacks"],
  "meat-seafood": ["rice-grains", "fruits-vegetables"],
  "rice-grains": ["meat-seafood", "fruits-vegetables"],
  snacks: ["beverages", "chocolates-sweets"],
  beverages: ["snacks", "bakery"],
  "personal-care": ["household"],
  household: ["personal-care"],
  "chocolates-sweets": ["beverages", "bakery"],
};

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}

export function discountPercent(p: Product) {
  if (!p.oldPrice) return 0;
  return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
}

export function suggestionsFor(ids: string[], limit = 3): Product[] {
  const owned = new Set(ids);
  const cats = ids.map((id) => getProduct(id)?.category).filter(Boolean) as string[];
  const wanted = new Set<string>();
  cats.forEach((c) => (AFFINITY[c] ?? []).forEach((x) => wanted.add(x)));
  const pool = PRODUCTS.filter((p) => !owned.has(p.id) && wanted.has(p.category));
  const fallback = PRODUCTS.filter((p) => !owned.has(p.id));
  const ranked = (pool.length ? pool : fallback).sort((a, b) => b.sold - a.sold);
  return ranked.slice(0, limit);
}

export function relatedTo(product: Product, limit = 4): Product[] {
  const same = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  ).sort((a, b) => b.sold - a.sold);
  const rest = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category !== product.category,
  ).sort((a, b) => b.sold - a.sold);
  return [...same, ...rest].slice(0, limit);
}

export const money = (n: number) => `$${n.toFixed(2)}`;
