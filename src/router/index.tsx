import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

// Lazy loaded pages
const ProductListing = lazy(() => import("../pages/ProductListing"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));

function NotFound() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ color: "#d63384", fontWeight: "bold" }}>
        Go Home
      </Link>
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<h3 style={{ textAlign: "center" }}>Loading...</h3>}>
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
