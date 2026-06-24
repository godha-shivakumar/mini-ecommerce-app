import { useState } from "react";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../context/CartContext";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function handleDecrease(item: CartItem) {
    const newQty = item.quantity - 1;
    if (newQty < 1) return;
    updateQuantity(item.id, newQty);
  }

  function handleIncrease(item: CartItem) {
    const newQty = item.quantity + 1;

    // prevent going beyond stock
    if (newQty > item.stock) return;

    updateQuantity(item.id, newQty);
  }

  return (
    <>
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 40px",
          background: "#FAF9F7",
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <h1
          style={{
            margin: 0,
            cursor: "pointer",
            fontSize: "30px",
            fontWeight: "700",
            letterSpacing: "-1px",
          }}
        >
          NUA
        </h1>

        <button
          onClick={() => setOpen(true)}
          aria-label={`Open cart with ${totalItems} items`}
          style={{
            background: "#d63384",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "12px 24px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(214,51,132,0.25)",
          }}
        >
          🛒 Cart ({totalItems})
        </button>
      </nav>

      {/* OVERLAY */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(3px)",
              zIndex: 998,
            }}
          />

          {/* DRAWER */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "400px",
              maxWidth: "100%",
              height: "100vh",
              background: "#fff",
              zIndex: 999,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-10px 0 40px rgba(0,0,0,0.12)",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0 }}>Shopping Cart</h2>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close shopping cart"
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* CART ITEMS */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.id}-${item.color}-${item.size}`}
                    style={{
                      display: "flex",
                      gap: "12px",
                      paddingBottom: "16px",
                      marginBottom: "16px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "contain",
                        borderRadius: "10px",
                        background: "#fafafa",
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        {item.title.length > 35
                          ? item.title.slice(0, 35) + "..."
                          : item.title}
                      </p>

                      <p
                        style={{
                          color: "#d63384",
                          fontWeight: "700",
                          marginBottom: "10px",
                        }}
                      >
                        ${item.price.toFixed(2)}
                      </p>

                      <p style={{ fontSize: "12px", color: "#666" }}>
                        {item.color} • {item.size}
                      </p>

                      {/* QUANTITY */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginTop: "8px",
                        }}
                      >
                        <button
                          onClick={() => handleDecrease(item)}
                          disabled={item.quantity <= 1}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            border: "1px solid #ddd",
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => handleIncrease(item)}
                          disabled={item.quantity >= item.stock}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            border: "1px solid #ddd",
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          +
                        </button>
                      </div>

                      <p
                        style={{
                          marginTop: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#666",
                          fontSize: "14px",
                          cursor: "pointer",
                          padding: 0,
                          textDecoration: "underline",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {cart.length > 0 && (
              <div
                style={{
                  borderTop: "1px solid #e5e5e5",
                  paddingTop: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    color: "#666",
                  }}
                >
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "700",
                    fontSize: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <button
                  style={{
                    width: "100%",
                    padding: "14px",
                    border: "none",
                    borderRadius: "12px",
                    background: "#d63384",
                    color: "#fff",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
