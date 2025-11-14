import axios from "axios";
import { extinguisher } from "./extinguisher.routes";

export class ExtinguisherService {
  static addExtinguisher = async (data) =>
    await axios.post(`${extinguisher}`, data);

  static updateExtinguisher = async (id, data) =>
    await axios.patch(`${extinguisher}/${id}`, data);

  static getAllExtinguisher = async (query) =>
    await axios.get(`${extinguisher}`, query);
}
