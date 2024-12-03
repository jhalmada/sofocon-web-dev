import { useState } from "react";
import { PriceListService } from "../../services/priceList/priceList.service";

const useDeletePriceList = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deletePriceList = async (priceListId, setModified) => {
    try {
      setIsLoading(true);
      await PriceListService.deletePriceListApi(priceListId);
      setIsDeleted(true);
      setModified((prev) => !prev);
    } catch (error) {
      console.error("Error al eliminar la lista: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deletePriceList, isDeleted, isLoading };
};

export default useDeletePriceList;
