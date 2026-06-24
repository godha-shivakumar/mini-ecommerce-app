// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   type ReactNode,
// } from "react";

// import type { Product } from "../types/product";

// export interface CartItem {
//   id: string;
//   productId: number;

//   title: string;
//   image: string;
//   price: number;

//   color?: string;
//   size?: string;

//   stock: number;
//   quantity: number;
// }

// interface AddToCartOptions {
//   color?: string;
//   size?: string;
//   quantity?: number;
//   stock?: number;
// }

// interface CartContextType {
//   cart: CartItem[];

//   addToCart: (product: Product, options?: AddToCartOptions) => void;

//   removeFromCart: (cartId: string) => void;

//   updateQuantity: (cartId: string, quantity: number) => void;
// }

// const CartContext = createContext<CartContextType | null>(null);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     try {
//       const saved = localStorage.getItem("cart");
//       return saved ? JSON.parse(saved) : [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   function addToCart(product: Product, options?: AddToCartOptions) {
//     const color = options?.color;
//     const size = options?.size;

//     const qty = options?.quantity ?? 1;

//     const stock = options?.stock ?? product.stock ?? 10;

//     const cartId = `${product.id}-${color ?? ""}-${size ?? ""}`;

//     setCart((prev) => {
//       const existing = prev.find((item) => item.id === cartId);

//       if (existing) {
//         return prev.map((item) =>
//           item.id === cartId
//             ? {
//                 ...item,
//                 quantity: Math.min(item.quantity + qty, item.stock),
//               }
//             : item,
//         );
//       }

//       return [
//         ...prev,
//         {
//           id: cartId,
//           productId: product.id,

//           title: product.title,
//           image: product.image,
//           price: product.price,

//           color,
//           size,

//           stock,

//           quantity: Math.min(qty, stock),
//         },
//       ];
//     });
//   }

//   function removeFromCart(cartId: string) {
//     setCart((prev) => prev.filter((item) => item.id !== cartId));
//   }

//   function updateQuantity(cartId: string, quantity: number) {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === cartId
//           ? {
//               ...item,
//               quantity: Math.max(1, Math.min(quantity, item.stock)),
//             }
//           : item,
//       ),
//     );
//   }

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);

//   if (!context) {
//     throw new Error("useCart must be inside CartProvider");
//   }

//   return context;
// }

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../types/product";

export interface CartItem {
  id: string;
  productId: number;

  title: string;
  image: string;
  price: number;

  color?: string;
  size?: string;

  stock: number;
  quantity: number;
}

interface AddToCartOptions {
  color?: string;
  size?: string;
  quantity?: number;
  stock?: number;
}

interface CartContextType {
  cart: CartItem[];

  addToCart: (product: Product, options?: AddToCartOptions) => void;

  removeFromCart: (cartId: string) => void;

  updateQuantity: (cartId: string, quantity: number) => void;
}

// Cart context instance
const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart state from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist cart changes to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add a product to the cart
  function addToCart(product: Product, options?: AddToCartOptions) {
    const color = options?.color;
    const size = options?.size;

    const qty = options?.quantity ?? 1;

    // Resolve stock from options or product data
    const stock = options?.stock ?? product.stock ?? 10;

    // Create a unique cart item identifier
    const cartId = `${product.id}-${color ?? ""}-${size ?? ""}`;

    setCart((prev) => {
      // Check if the product variant already exists
      const existing = prev.find((item) => item.id === cartId);

      if (existing) {
        // Update quantity while respecting stock limits
        return prev.map((item) =>
          item.id === cartId
            ? {
                ...item,
                quantity: Math.min(item.quantity + qty, item.stock),
              }
            : item,
        );
      }

      // Add new item to the cart
      return [
        ...prev,
        {
          id: cartId,
          productId: product.id,

          title: product.title,
          image: product.image,
          price: product.price,

          color,
          size,

          stock,

          quantity: Math.min(qty, stock),
        },
      ];
    });
  }

  // Remove an item from the cart
  function removeFromCart(cartId: string) {
    setCart((prev) => prev.filter((item) => item.id !== cartId));
  }

  // Update item quantity within valid stock limits
  function updateQuantity(cartId: string, quantity: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartId
          ? {
              ...item,
              quantity: Math.max(1, Math.min(quantity, item.stock)),
            }
          : item,
      ),
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for accessing cart context
export function useCart() {
  const context = useContext(CartContext);

  // Ensure hook is used within CartProvider
  if (!context) {
    throw new Error("useCart must be inside CartProvider");
  }

  return context;
}
