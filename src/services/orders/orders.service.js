import axios from "axios";
import * as ordersRoutes from "./orders.routes.js";

export class OrdersService {
  static getAllOrdersApi = async (params) =>
    await axios.get(ordersRoutes.getOrders, { params });

  static getOneOrderApi = async (routeId) =>
    await axios.get(`${ordersRoutes.getOrders}/one/${routeId}`);

  static postAddOrdersApi = async (orderData) =>
    await axios.post(ordersRoutes.postOrders, orderData);

  static putOrderApi = async (orderData, orderId) =>
    await axios.put(`${ordersRoutes.putOrders}/${orderId}`, orderData);

  static deleteOrderApi = async (orderId) =>
    await axios.delete(`${ordersRoutes.deleteOrders}/${orderId}`);
}
