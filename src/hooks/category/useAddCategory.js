import { useCallback, useState } from "react";
import { CategoryService } from "../../services/category/category.service.js";

const useAddCategory = () => {
  const [loading, setLoading] = useState(false);

  const postAddCategory = useCallback(async (categoryData) => {
    try {
      setLoading(true);
      const { data } = await CategoryService.postAddCategoryApi(categoryData);
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postAddCategory, loading };
};

export default useAddCategory;
