import { useState } from "react";
import { CategoryService } from "../../services/category/category.service.js";

const usePutCategory = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changedCategory = async (categoryData, categoryId, setModified) => {
    try {
      setIsLoading(true);
      await CategoryService.putEditCategoryApi(categoryData, categoryId);
      setModified((prev) => !prev);
      return true;
    } catch (error) {
      console.error("Error al modificar la categoria: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { changedCategory, isChanged, isLoading };
};

export default usePutCategory;
