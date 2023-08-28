// api.js

import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

