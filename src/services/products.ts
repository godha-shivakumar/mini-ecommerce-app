import type { Product } from "../types/product";

const API_URL = "https://fakestoreapi.com/products";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return (data as Product[]).map((product) => ({
    ...product,
    stock: (product.id % 10) + 5,
  }));
}
