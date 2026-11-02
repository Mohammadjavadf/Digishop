import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "digishop_cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.id === action.product.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.product.id
            ? { ...i, qty: i.qty + (action.qty || 1) }
            : i
        );
      }
      return [
        ...state,
        {
          id: action.product.id,
          title: action.product.title,
          price: action.product.price,
          discount: action.product.discount || 0,
          image: action.product.images[0],
          stock: action.product.stock,
          qty: action.qty || 1,
        },
      ];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "INCREASE":
      return state.map((i) =>
        i.id === action.id && i.qty < i.stock
          ? { ...i, qty: i.qty + 1 }
          : i
      );
    case "DECREASE":
      return state.map((i) =>
        i.id === action.id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
      );
    case "SET_QTY":
      return state.map((i) =>
        i.id === action.id
          ? { ...i, qty: Math.max(1, Math.min(action.qty, i.stock)) }
          : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, qty = 1) =>
    dispatch({ type: "ADD", product, qty });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", id });
  const increaseQty = (id) => dispatch({ type: "INCREASE", id });
  const decreaseQty = (id) => dispatch({ type: "DECREASE", id });
  const setQty = (id, qty) => dispatch({ type: "SET_QTY", id, qty });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  // قیمت بعد از تخفیف
  const unitPrice = (item) =>
    Math.round(item.price * (1 - item.discount / 100));

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );
  const totalDiscount = items.reduce(
    (sum, i) => sum + (i.price - unitPrice(i)) * i.qty,
    0
  );
  const total = subtotal - totalDiscount;

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        totalDiscount,
        total,
        unitPrice,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        setQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart باید داخل CartProvider استفاده شود");
  return ctx;
}