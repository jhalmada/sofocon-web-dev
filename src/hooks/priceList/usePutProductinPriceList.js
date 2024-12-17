import { useState } from "react";
import { PriceListService } from "../../services/priceList/priceList.service.js";

const usePutProductInPriceList = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changedProductInPriceList = async (
    priceListData,
    priceListId,
    setModified,
  ) => {
    try {
      setIsLoading(true);
      await PriceListService.putProductinListApi(priceListData, priceListId);
      setModified((prev) => !prev);
      return true;
    } catch (error) {
      console.error("Error al modificar la lista: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { changedProductInPriceList, isChanged, isLoading };
};

export default usePutProductInPriceList;
