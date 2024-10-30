import { useState } from "react";
import { ProductsService } from "../../services/products/products.service.js";

const usePutProduct = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changedProduct = async (productData, productId, setModified) => {
    try {
      setIsLoading(true);
      await ProductsService.putProductApi(productData, productId);
      setModified((prev) => !prev);
      return true;
    } catch (error) {
      console.error("Error al modificar el producto: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { changedProduct, isChanged, isLoading };
};

export default usePutProduct;
