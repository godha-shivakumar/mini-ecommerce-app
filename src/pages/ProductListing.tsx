import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/products";
import type { Product } from "../types/product";

function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts();

        if (!Array.isArray(data)) {
          setProducts([]);
          return;
        }

        setProducts(data);
      } catch (err) {
        console.error("API ERROR:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    return () => controller.abort();
  }, []);

  // LOADING UI
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="state-box">
            <div className="spinner"></div>
            <h3 className="loading ">Loading amazing products...</h3>
            <p>Please wait a moment</p>
          </div>
        </div>
      </>
    );
  }

  // ERROR UI
  if (error) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="state-box error">
            <h3>{error}</h3>
            <button
              className="retry-btn"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container">
        {products.length === 0 ? (
          <div className="state-box">
            <h3>No products found 😕</h3>
            <p>Try refreshing or check back later</p>
          </div>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default ProductListing;
