import axios from "axios";
import * as categoryRoutes from "./category.routes.js";

export class CategoryService {
  static getAllCategoryApi = async (params) =>
    await axios.get(categoryRoutes.getCategory, { params });

  static postAddCategoryApi = async (categoryData) =>
    await axios.post(categoryRoutes.postCategory, categoryData);

  static putEditCategoryApi = async (categoryData, categoryId) =>
    await axios.put(
      `${categoryRoutes.putCategory}/${categoryId}`,
      categoryData,
    );

  static deleteCategoryApi = async (categoryId) =>
    await axios.delete(`${categoryRoutes.deleteCategory}/${categoryId}`);
}
