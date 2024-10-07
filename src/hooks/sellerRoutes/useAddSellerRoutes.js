import { useCallback, useState } from "react";
import { sellerRoutesService } from "../../services/sellerRoutes/sellerRoute.service";

const AddSellersRoutes = () => {
  const [loading, setLoading] = useState(false);

  const postAddSellersRoutes = useCallback(async (routeData) => {
    try {
      setLoading(true);
      const { data } =
        await sellerRoutesService.postAddSellerRoutesApi(routeData);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    postAddSellersRoutes,
    loading,
  };
};
export default AddSellersRoutes;
