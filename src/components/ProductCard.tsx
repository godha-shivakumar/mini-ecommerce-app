// import { Link } from "react-router-dom";
// import { memo } from "react";

// import type { Product } from "../types/product";
// import { useCart } from "../context/CartContext";
// import LazyImage from "./LazyImage";
// interface Props {
//   product: Product;
// }

// function ProductCard({ product }: Props) {
//   const { addToCart, cart } = useCart();

//   // STEP 1: find product in cart
//   const cartItem = cart.find((item) => {
//     return (
//       item.productId === product.id &&
//       item.color === "Black" &&
//       item.size === "M"
//     );
//   });

//   // STEP 2: stock
//   const stock = product.stock ?? 10;

//   // STEP 3: remaining stock
//   const remainingStock = stock - (cartItem?.quantity || 0);

//   // STEP 4: disable logic
//   const isDisabled = remainingStock <= 0;

//   // STOCK UI
//   const getStockStatus = () => {
//     if (remainingStock <= 0) {
//       return <p className="sold-out">Sold Out ❗</p>;
//     }

//     if (remainingStock <= 5) {
//       return <p className="low-stock">Low Stock ({remainingStock} left)</p>;
//     }

//     return <p className="available">Available</p>;
//   };

//   function handleQuickAdd() {
//     if (isDisabled) return;

//     addToCart(product, {
//       color: "Black",
//       size: "M",
//       quantity: 1,
//     });
//   }

//   return (
//     <div className="product-card">
//       <Link to={`/product/${product.id}`}>
//         <LazyImage src={product.image} alt={`${product.title} product image`} />

//         <h3>{product.title}</h3>
//       </Link>

//       <p className="price">${product.price.toFixed(2)}</p>

//       {getStockStatus()}

//       {/* QUICK ADD BUTTON */}
//       <button
//         className="primary-btn"
//         disabled={isDisabled}
//         onClick={handleQuickAdd}
//       >
//         {isDisabled ? "Max Reached " : "Quick Add"}
//       </button>
//     </div>
//   );
// }

// export default memo(ProductCard);

import { Link } from "react-router-dom";
import { memo } from "react";

import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import LazyImage from "./LazyImage";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { addToCart, cart } = useCart();

  // Find the current product variant in the cart
  const cartItem = cart.find((item) => {
    return (
      item.productId === product.id &&
      item.color === "Black" &&
      item.size === "M"
    );
  });

  // Product stock value
  const stock = product.stock ?? 10;

  // Remaining stock after cart quantity is considered
  const remainingStock = stock - (cartItem?.quantity || 0);

  // Disable quick add when no stock remains
  const isDisabled = remainingStock <= 0;

  // Display stock availability status
  const getStockStatus = () => {
    if (remainingStock <= 0) {
      return <p className="sold-out">Sold Out ❗</p>;
    }

    if (remainingStock <= 5) {
      return <p className="low-stock">Low Stock ({remainingStock} left)</p>;
    }

    return <p className="available">Available</p>;
  };

  // Add default product variant to cart
  function handleQuickAdd() {
    if (isDisabled) return;

    addToCart(product, {
      color: "Black",
      size: "M",
      quantity: 1,
    });
  }

  return (
    <div className="product-card">
      {/* Navigate to product details page */}
      <Link to={`/product/${product.id}`}>
        {/* Product image with lazy loading */}
        <LazyImage src={product.image} alt={`${product.title} product image`} />

        {/* Product title */}
        <h3>{product.title}</h3>
      </Link>

      {/* Product price */}
      <p className="price">${product.price.toFixed(2)}</p>

      {/* Stock availability indicator */}
      {getStockStatus()}

      {/* Quick add button */}
      <button
        className="primary-btn"
        disabled={isDisabled}
        onClick={handleQuickAdd}
      >
        {isDisabled ? "Max Reached " : "Quick Add"}
      </button>
    </div>
  );
}

export default memo(ProductCard);
