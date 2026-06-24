import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { getProducts } from "../services/products";
import type { Product } from "../types/product";
import LazyImage from "../components/LazyImage";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const color = searchParams.get("color") || "Black";
  const size = searchParams.get("size") || "M";

  // MOCK VARIANT STOCK
  const variantStock: Record<string, number> = {
    "Black-S": 10,
    "Black-M": 3,
    "Black-L": 0,
    "Black-XL": 8,

    "Blue-S": 5,
    "Blue-M": 2,
    "Blue-L": 0,
    "Blue-XL": 6,

    "Pink-S": 4,
    "Pink-M": 1,
    "Pink-L": 0,
    "Pink-XL": 3,
  };

  const key = `${color}-${size}`;
  const currentStock = variantStock[key] ?? 10;
  const isSoldOut = currentStock <= 0;

  // LOAD PRODUCT
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await getProducts();
        const item = products.find((p) => p.id === Number(id));

        if (item) {
          setProduct(item);
          setMainImage(item.image);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadProduct();
  }, [id]);

  // RESET QUANTITY ON VARIANT CHANGE
  useEffect(() => {
    setQuantity(1);
  }, [color, size]);

  // THUMBNAILS
  const thumbnails = product
    ? [product.image, product.image, product.image]
    : [];
  // CART ITEM (IMPORTANT)
  const cartItem = cart.find((item) => {
    return (
      item.productId === product?.id &&
      item.color === color &&
      item.size === size
    );
  });

  const remainingStock = currentStock - (cartItem?.quantity || 0);

  const isDisabled = !product || remainingStock <= 0;

  // STOCK LABEL
  const getStockLabel = (stock: number) => {
    if (stock <= 0) return { text: "Sold Out ❗", class: "sold-out" };
    if (stock <= 5)
      return {
        text: `Low Stock (${stock})`,
        class: "low-stock",
      };
    return { text: "Available", class: "available" };
  };

  const stockInfo = getStockLabel(currentStock);

  // ADD TO CART
  const handleAddToCart = () => {
    if (!product || remainingStock <= 0) return;

    addToCart(product, {
      color,
      size,
      quantity,
      stock: currentStock,
    });
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="loading">Loading Product...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="product-wrapper">
        <div className="container">
          <div className="product-layout">
            {/* LEFT */}
            <div className="image-section">
              <div className="thumbnails">
                {thumbnails.map((img, i) => (
                  <button
                    key={i}
                    className={`thumb ${mainImage === img ? "active" : ""}`}
                    onClick={() => setMainImage(img)}
                  >
                    <LazyImage src={mainImage} alt={product.title} />
                  </button>
                ))}
              </div>

              <div className="main-image">
                <img src={mainImage} alt={product.title} decoding="async" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="info-section">
              <h1 className="title">{product.title}</h1>

              <p className="price">${product.price}</p>

              <p className={stockInfo.class}>{stockInfo.text}</p>

              <p className="desc">{product.description}</p>

              {/* COLOR */}
              <div className="block">
                <p className="label">
                  Color: <b>{color}</b>
                </p>

                {["Black", "Blue", "Pink"].map((c) => (
                  <button
                    key={c}
                    onClick={() =>
                      setSearchParams({
                        color: c,
                        size,
                      })
                    }
                    className={`pill ${color === c ? "active" : ""}`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* SIZE */}
              <div className="block">
                <p className="label">
                  Size: <b>{size}</b>
                </p>

                <div className="size-list">
                  {["S", "M", "L", "XL"].map((s) => {
                    const stock = variantStock[`${color}-${s}`] ?? 0;

                    return (
                      <button
                        key={s}
                        disabled={stock <= 0}
                        onClick={() =>
                          setSearchParams({
                            color,
                            size: s,
                          })
                        }
                        className={`size ${size === s ? "active" : ""}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QUANTITY */}
              <div className="block">
                <p className="label">Quantity</p>

                <div className="qty-wrapper">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={isSoldOut}
                    className="qty-btn"
                  >
                    −
                  </button>

                  <span className="qty-value">{quantity}</span>

                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(remainingStock, q + 1))
                    }
                    disabled={isSoldOut || quantity >= remainingStock}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA */}
              <button
                className="cta"
                onClick={handleAddToCart}
                disabled={isDisabled}
              >
                {remainingStock <= 0 ? "Max Stock Reached" : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductDetail;
