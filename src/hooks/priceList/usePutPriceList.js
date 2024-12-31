import { useState } from "react";
import { PriceListService } from "../../services/priceList/priceList.service.js";

const usePutPriceList = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changedPriceList = async (priceListData, productId, setModified) => {
    try {
      setIsLoading(true);
      await PriceListService.putPriceListApi(priceListData, productId);
      setModified((prev) => !prev);
      return true;
    } catch (error) {
      console.error("Error al modificar la lista: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { changedPriceList, isChanged, isLoading };
};

export default usePutPriceList;
