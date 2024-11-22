import axios from "axios";
import * as metricsRoutes from "./metrics.routes.js";

export class MetricsService {
  static getMetricsApi = async (params) =>
    await axios.get(metricsRoutes.getMetrics, { params });

  static getMetricsOrdersApi = async (params) =>
    await axios.get(metricsRoutes.getMetricsOrders, { params });

  static getMetricsProductsApi = async (params) =>
    await axios.get(metricsRoutes.getMetricsProducts, { params });

  static getSellerBestApi = async (params) =>
    await axios.get(metricsRoutes.getSellerBest, { params });
}
