import axios from "axios";
import * as settlementsRoutes from "./settlements.routes.js";

export class SettlementsService {
  static getSummary = async () =>
    await axios.get(settlementsRoutes.getSummary);

  static getAll = async (params) =>
    await axios.get(settlementsRoutes.getSettlements, { params });

  static getOne = async (id) =>
    await axios.get(settlementsRoutes.getOne(id));

  static getBySeller = async (sellerId) =>
    await axios.get(settlementsRoutes.getBySeller(sellerId));

  static create = async (data) =>
    await axios.post(settlementsRoutes.createSettlement, data);

  static addPayment = async (settlementId, data) =>
    await axios.post(settlementsRoutes.addPayment(settlementId), data);
}
