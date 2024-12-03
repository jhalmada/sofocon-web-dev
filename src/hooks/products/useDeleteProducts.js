import { useState } from "react";
import { ProductsService } from "../../services/products/products.service";

const useDeleteProduct = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteProduct = async (productId, setModified) => {
    try {
      setIsLoading(true);
      await ProductsService.deleteProductApi(productId);
      setIsDeleted(true);
      setModified((prev) => !prev);
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteProduct, isDeleted, isLoading };
};

export default useDeleteProduct;
