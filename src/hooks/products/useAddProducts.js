import { useCallback, useState } from "react";
import { ProductsService } from "../../services/products/products.service.js";

const useAddProducts = () => {
  const [loading, setLoading] = useState(false);

  const postAddProducts = useCallback(async (productsData) => {
    try {
      setLoading(true);
      const { data } = await ProductsService.postAddProductsApi(productsData);
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postAddProducts, loading };
};

export default useAddProducts;
