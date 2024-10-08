import axios from "axios";
import * as sellerRoutes from "./sellerRoute.routes";

export class sellerRoutesService {
  static getAllSellerRoutesApi = async (params) =>
    await axios.get(sellerRoutes.getSeller, { params });

  static postAddSellerRoutesApi = async (sellerRouteData) =>
    await axios.post(sellerRoutes.postSeller, sellerRouteData);

  static putSellerRoutesApi = async (sellerRouteData, routeId) =>
    await axios.put(`${sellerRoutes.putSeller}/${routeId}`, sellerRouteData);

  static deleteSellerRoutesApi = async (routeId) =>
    await axios.delete(`${sellerRoutes.deleteSeller}/${routeId}`);

  static getOneSellerRouteApi = async (routeId) =>
    await axios.get(`${sellerRoutes.getSeller}/${routeId}`);
}
