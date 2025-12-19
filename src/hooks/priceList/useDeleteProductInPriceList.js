import { useState } from "react";
import { PriceListService } from "../../services/priceList/priceList.service.js";

const useDeleteProductInPriceList = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteProductInPriceList = async (productId, setModified) => {
    try {
      setIsLoading(true);
      await PriceListService.deleteProductinListApi(productId);
      setModified((prev) => !prev);
      return true;
    } catch (error) {
      console.error("Error al modificar la lista: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteProductInPriceList, isChanged, isLoading };
};

export default useDeleteProductInPriceList;
