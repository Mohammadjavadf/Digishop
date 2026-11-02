import { createContext, useContext, useEffect, useReducer } from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "digishop_wishlist";

function loadWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function wishlistReducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const exists = state.find((i) => i.id === action.product.id);
      if (exists) return state.filter((i) => i.id !== action.product.id);
      return [
        ...state,
        {
          id: action.product.id,
          title: action.product.title,
          price: action.product.price,
          discount: action.product.discount || 0,
          image: action.product.images[0],
          rating: action.product.rating,
          stock: action.product.stock,
        },
      ];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [items, dispatch] = useReducer(
    wishlistReducer,
    [],
    loadWishlist
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const toggleWishlist = (product) =>
    dispatch({ type: "TOGGLE", product });
  const removeFromWishlist = (id) => dispatch({ type: "REMOVE", id });
  const isInWishlist = (id) => items.some((i) => i.id === id);
  const wishlistCount = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        wishlistCount,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlist باید داخل WishlistProvider استفاده شود");
  return ctx;
}