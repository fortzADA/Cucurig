import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  arrangementById,
  cities,
  floristById,
  type City,
} from "./data";

export type CartLine = {
  arrangementId: string;
  quantity: number;
};

export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
  date: string;
  cardMessage: string;
  note: string;
};

export type OrderLine = {
  arrangementId: string;
  name: string;
  floristName: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  createdAt: string;
  city: City;
  lines: OrderLine[];
  deliveryFee: number;
  total: number;
  customer: CustomerDetails;
};

type Persisted = {
  city: City;
  lines: CartLine[];
  orders: Order[];
};

type MarketValue = {
  city: City;
  setCity: (city: City) => void;
  lines: CartLine[];
  add: (arrangementId: string, quantity?: number) => void;
  setQuantity: (arrangementId: string, quantity: number) => void;
  remove: (arrangementId: string) => void;
  clear: () => void;
  count: number;
  placeOrder: (customer: CustomerDetails, city: City, deliveryFee: number) => Order;
  orderById: (id: string) => Order | undefined;
};

const STORAGE_KEY = "cucurig-market";

const MarketContext = createContext<MarketValue | null>(null);

function isCity(value: unknown): value is City {
  return typeof value === "string" && (cities as readonly string[]).includes(value);
}

function load(): Persisted {
  const empty: Persisted = { city: "Los Angeles", lines: [], orders: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      city: isCity(parsed.city) ? parsed.city : empty.city,
      lines: Array.isArray(parsed.lines)
        ? parsed.lines.filter(
            (line): line is CartLine =>
              !!line &&
              typeof line.arrangementId === "string" &&
              typeof line.quantity === "number" &&
              line.quantity > 0 &&
              !!arrangementById(line.arrangementId),
          )
        : [],
      orders: Array.isArray(parsed.orders) ? (parsed.orders as Order[]) : [],
    };
  } catch {
    return empty;
  }
}

export function MarketProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<MarketValue>(() => {
    const count = state.lines.reduce((sum, line) => sum + line.quantity, 0);
    return {
      city: state.city,
      setCity: (city) =>
        setState((current) => (current.city === city ? current : { ...current, city })),
      lines: state.lines,
      count,
      add: (arrangementId, quantity = 1) => {
        if (!arrangementById(arrangementId) || quantity < 1) return;
        setState((current) => {
          const existing = current.lines.find((line) => line.arrangementId === arrangementId);
          const lines = existing
            ? current.lines.map((line) =>
                line.arrangementId === arrangementId
                  ? { ...line, quantity: Math.min(20, line.quantity + quantity) }
                  : line,
              )
            : [...current.lines, { arrangementId, quantity: Math.min(20, quantity) }];
          return { ...current, lines };
        });
      },
      setQuantity: (arrangementId, quantity) => {
        setState((current) => ({
          ...current,
          lines:
            quantity < 1
              ? current.lines.filter((line) => line.arrangementId !== arrangementId)
              : current.lines.map((line) =>
                  line.arrangementId === arrangementId
                    ? { ...line, quantity: Math.min(20, quantity) }
                    : line,
                ),
        }));
      },
      remove: (arrangementId) => {
        setState((current) => ({
          ...current,
          lines: current.lines.filter((line) => line.arrangementId !== arrangementId),
        }));
      },
      clear: () => setState((current) => ({ ...current, lines: [] })),
      placeOrder: (customer, city, deliveryFee) => {
        const lines: OrderLine[] = state.lines.flatMap((line) => {
          const arrangement = arrangementById(line.arrangementId);
          const florist = arrangement ? floristById(arrangement.floristId) : undefined;
          if (!arrangement || !florist) return [];
          return [
            {
              arrangementId: arrangement.id,
              name: arrangement.name,
              floristName: florist.name,
              quantity: line.quantity,
              price: arrangement.price,
            },
          ];
        });
        const goods = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
        const order: Order = {
          id: `CU-${String(Date.now()).slice(-6)}`,
          createdAt: new Date().toISOString(),
          city,
          lines,
          deliveryFee,
          total: goods + deliveryFee,
          customer,
        };
        setState((current) => ({
          ...current,
          lines: [],
          orders: [order, ...current.orders],
        }));
        return order;
      },
      orderById: (id) => state.orders.find((order) => order.id === id),
    };
  }, [state]);

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const value = useContext(MarketContext);
  if (!value) throw new Error("useMarket must be used within MarketProvider");
  return value;
}
