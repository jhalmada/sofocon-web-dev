import axios from "axios";
import * as companiesRoutes from "./companies.routes.js";

export class CompaniesService {
  static getAllCompaniesApi = async (params) =>
    await axios.get(companiesRoutes.getClients, { params });

  static postAddCompaniesApi = async (companyData) =>
    await axios.post(companiesRoutes.postClients, companyData);

  static putCompanyApi = async (companyData, companyId) =>
    await axios.put(`${companiesRoutes.putClients}/${companyId}`, companyData);

  static deleteCompanyApi = async (companyId) =>
    await axios.delete(`${companiesRoutes.deleteClients}/${companyId}`);
}
