import axios from "axios";
import * as productsRoutes from "./products.routes.js";

export class ProductsService {
  static getAllProductsApi = async (params) =>
    await axios.get(productsRoutes.getProducts, { params });

  static postAddProductsApi = async (productData) =>
    await axios.post(productsRoutes.postProducts, productData);

  static putProductApi = async (productData, productId) =>
    await axios.put(`${productsRoutes.putProducts}/${productId}`, productData);

  static deleteProductApi = async (productId) =>
    await axios.delete(`${productsRoutes.deleteProducts}/${productId}`);
}
