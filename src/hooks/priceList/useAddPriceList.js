import { useCallback, useState } from "react";
import { PriceListService } from "../../services/priceList/priceList.service.js";

const useAddPriceList = () => {
  const [loading, setLoading] = useState(false);

  const postAddPriceList = useCallback(async (priceListData) => {
    try {
      setLoading(true);
      const { data } =
        await PriceListService.postAddPriceListApi(priceListData);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postAddPriceList, loading };
};

export default useAddPriceList;
