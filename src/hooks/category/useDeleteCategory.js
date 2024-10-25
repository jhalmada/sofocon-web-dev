import { useState } from "react";
import { CategoryService } from "../../services/category/category.service";

const useDeleteCategory = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteCategory = async (categoryId, setModified) => {
    try {
      setIsLoading(true);
      await CategoryService.deleteCategoryApi(categoryId);
      setIsDeleted(true);
      setModified((prev) => !prev);
    } catch (error) {
      console.error("Error al eliminar la categoria: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteCategory, isDeleted, isLoading };
};

export default useDeleteCategory;
