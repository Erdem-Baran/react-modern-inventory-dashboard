import axiosClient from "./axiosClient";
import type { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>("/products");
  return response.data;
};
export const addProduct = async (
  newProduct: Omit<Product, "id">
): Promise<Product> => {
  const response = await axiosClient.post<Product>("/product", newProduct);
  return response.data;
};
