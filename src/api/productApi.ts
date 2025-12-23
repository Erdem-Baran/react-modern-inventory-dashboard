import axiosClient from "./axiosClient";
import type { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>("/products");
  return response.data;
};
export const addProduct = async (
  newProduct: Omit<Product, "id">
): Promise<Product> => {
  const response = await axiosClient.post<Product>("/products", newProduct);
  return response.data;
};
export const deleteProduct = async (id: number): Promise<void> => {
  await axiosClient.delete(`/products/${id}`);
};
export const updateProduct = async (product: Product): Promise<Product> => {
  const response = await axiosClient.put<Product>(
    `/products/${product.id}`,
    product
  );
  return response.data;
};
