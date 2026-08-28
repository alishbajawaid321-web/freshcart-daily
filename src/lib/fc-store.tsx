import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { PRODUCTS, getProduct } from "./fc-data";

export type CartLine = { id: string; qty: number };

export type Order = {
  id: string;
  date: string;
  items: { id: string; name: string; emoji: string; qty: number; price: number }[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  address: string;
  name: string;
  email: string;
  phone: string;
  deliveryOption: "standard" | "express";
  payment: string;
  eta: string;
  status: "Confirmed" | "Preparing" | "Out for Delivery" | "Delivered";
};

export type Profile = {
  name: string;
  email: string;
  phone: string;
  house: string;
  street: string;
  city: string;
  postal: string;
};

const EMPTY_PROFILE: Profile = {
  name: "",
  email: "",
  phone: "",
  house: "",
  street: "",
  city: "",
  postal: "",
};

export const DELIVERY = { standard: 3, express: 6 } as const;
export const FREE_DELIVERY_OVER = 60;

type Ctx = {
  ready: boolean;
  cart: CartLine[];
  wishlist: string[];
  orders: Order[];
  profile: Profile;
  surprise: number;
  theme: "light" | "dark";
  cartCount: number;
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  addToCart: (id: string, qty?: number, silent?: boolean) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  addBundle: (name: string, ids: string[]) => void;
  toggleWishlist: (id: string) => void;
  removeWishlist: (id: string) => void;
  moveToCart: (id: string) => void;
  inWishlist: (id: string) => boolean;
  setSurprise: (n: number) => void;
  placeOrder: (o: Omit<Order, "id" | "date" | "status">) => Order;
  saveProfile: (p: Profile) => void;
  toggleTheme: () => void;
  lastAdded: string | null;
};

const FCContext = createContext<Ctx | null>(null);

const KEYS = {
  cart: "freshcart.cart",
  wishlist: "freshcart.wishlist",
  orders: "freshcart.orders",
  profile: "freshcart.profile",
  theme: "freshcart.theme",
  surprise: "freshcart.surprise",
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const STATUSES: Order["status"][] = [
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

export function FreshCartProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [surprise, setSurpriseState] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    setCart(read<CartLine[]>(KEYS.cart, []));
    setWishlist(read<string[]>(KEYS.wishlist, []));
    setOrders(read<Order[]>(KEYS.orders, []));
    setProfile(read<Profile>(KEYS.profile, EMPTY_PROFILE));
    setSurpriseState(read<number>(KEYS.surprise, 0));
    const t = read<"light" | "dark">(KEYS.theme, "light");
    setTheme(t);
    document.documentElement.classList.toggle("dark", t === "dark");
    setReady(true);
  }, []);

  const persist = useCallback((key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    if (ready) persist(KEYS.cart, cart);
  }, [cart, ready, persist]);
  useEffect(() => {
    if (ready) persist(KEYS.wishlist, wishlist);
  }, [wishlist, ready, persist]);
  useEffect(() => {
    if (ready) persist(KEYS.orders, orders);
  }, [orders, ready, persist]);
  useEffect(() => {
    if (ready) persist(KEYS.surprise, surprise);
  }, [surprise, ready, persist]);

  const addToCart = useCallback((id: string, qty = 1, silent = false) => {
    const product = getProduct(id);
    if (!product) return;
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
    setLastAdded(id);
    if (!silent) toast.success(`${product.name} added to your cart!`, { icon: product.emoji });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    if (qty < 1) {
      setCart((prev) => prev.filter((l) => l.id !== id));
      return;
    }
    setCart((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
    toast(`${getProduct(id)?.name ?? "Item"} removed from your cart`, { icon: "🗑️" });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const addBundle = useCallback((name: string, ids: string[]) => {
    setCart((prev) => {
      const next = [...prev];
      ids.forEach((id) => {
        const found = next.find((l) => l.id === id);
        if (found) found.qty += 1;
        else next.push({ id, qty: 1 });
      });
      return next;
    });
    toast.success(`${name} added — ${ids.length} items in your cart`, { icon: "🎁" });
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    const product = getProduct(id);
    setWishlist((prev) => {
      if (prev.includes(id)) {
        toast(`${product?.name ?? "Item"} removed from wishlist`, { icon: "💔" });
        return prev.filter((x) => x !== id);
      }
      toast.success(`${product?.name ?? "Item"} saved to your wishlist`, { icon: "❤️" });
      return [...prev, id];
    });
  }, []);

  const removeWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((x) => x !== id));
    toast(`${getProduct(id)?.name ?? "Item"} removed from wishlist`, { icon: "💔" });
  }, []);

  const moveToCart = useCallback(
    (id: string) => {
      addToCart(id, 1, true);
      setWishlist((prev) => prev.filter((x) => x !== id));
      toast.success(`${getProduct(id)?.name ?? "Item"} moved to your cart`, { icon: "🛒" });
    },
    [addToCart],
  );

  const inWishlist = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const setSurprise = useCallback((n: number) => setSurpriseState(n), []);

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, line) => {
        const p = getProduct(line.id);
        return sum + (p ? p.price * line.qty : 0);
      }, 0),
    [cart],
  );

  const cartCount = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY.standard;
  const discount = useMemo(() => +((subtotal * surprise) / 100).toFixed(2), [subtotal, surprise]);
  const total = Math.max(0, +(subtotal + delivery - discount).toFixed(2));

  const placeOrder = useCallback(
    (draft: Omit<Order, "id" | "date" | "status">) => {
      const order: Order = {
        ...draft,
        id: `FC${Math.floor(10000 + Math.random() * 89999)}`,
        date: new Date().toISOString(),
        status: STATUSES[Math.floor(Math.random() * 2)],
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      setSurpriseState(0);
      return order;
    },
    [],
  );

  const saveProfile = useCallback(
    (p: Profile) => {
      setProfile(p);
      persist(KEYS.profile, p);
    },
    [persist],
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      persist(KEYS.theme, next);
      toast(next === "dark" ? "Dark mode on 🌙" : "Light mode on ☀️");
      return next;
    });
  }, [persist]);

  const value: Ctx = {
    ready,
    cart,
    wishlist,
    orders,
    profile,
    surprise,
    theme,
    cartCount,
    subtotal,
    delivery,
    discount,
    total,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    addBundle,
    toggleWishlist,
    removeWishlist,
    moveToCart,
    inWishlist,
    setSurprise,
    placeOrder,
    saveProfile,
    toggleTheme,
    lastAdded,
  };

  return <FCContext.Provider value={value}>{children}</FCContext.Provider>;
}

export function useFreshCart() {
  const ctx = useContext(FCContext);
  if (!ctx) throw new Error("useFreshCart must be used inside FreshCartProvider");
  return ctx;
}

export const ALL_PRODUCTS = PRODUCTS;
