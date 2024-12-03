import { useState } from "react";
import { sellerRoutesService } from "../../services/sellerRoutes/sellerRoute.service.js";

const usePutSellerRoute = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changedSellerRoute = async (routeData, routeId, setModified) => {
    try {
      setIsLoading(true);
      await sellerRoutesService.putSellerRoutesApi(routeData, routeId);
      setModified((prev) => !prev);
      return true;
    } catch (error) {
      console.error("Error al modificar la ruta: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { changedSellerRoute, isChanged, isLoading };
};

export default usePutSellerRoute;
