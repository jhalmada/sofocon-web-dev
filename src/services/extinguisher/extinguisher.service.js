import axios from "axios";
import { extinguisher } from "./extinguisher.routes";

export class ExtinguisherService {
  static updateExtinguisher = async (id, data) =>
    await axios.patch(`${extinguisher}/${id}`, data);

  static getAllExtinguisher = async (query) =>
    await axios.get(`${extinguisher}`, query);
}
