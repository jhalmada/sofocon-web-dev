import * as priceList from "./priceList.routes";
import axios from "axios";

export class PriceListService {
  static getAllPriceListApi = async (params) =>
    await axios.get(priceList.getPriceList, { params });

  static postAddPriceListApi = async (priceListData) =>
    await axios.post(priceList.postPriceList, priceListData);

  static putPriceListApi = async (priceListData, priceListId) =>
    await axios.put(`${priceList.putPriceList}/${priceListId}`, priceListData);

  static deletePriceListApi = async (priceListId) =>
    await axios.delete(`${priceList.deletePriceList}/${priceListId}`);

  static putProductinListApi = async (productData, productId) =>
    await axios.put(`${priceList.putProductinList}/${productId}`, productData);

  static deleteProductinListApi = async (productId) =>
    await axios.delete(`${priceList.putProductinList}/${productId}`);
}
