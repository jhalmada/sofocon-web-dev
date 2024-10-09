import { useEffect, useState } from "react";
import { sellerRoutesService } from "../../services/sellerRoutes/sellerRoute.service.js";
const useOneSellerRoutes = () => {
  const [sellerRoutesResponse, setSellerRouteResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modified, setModified] = useState(false);
  const [id, setId] = useState(0);

  //la funcion principal
  const getOneSellerRoute = async (routeId) => {
    try {
      setLoading(true);
      setId(routeId);
      const { data } = await sellerRoutesService.getOneSellerRouteApi(routeId);
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    sellerRoutesResponse,
    getOneSellerRoute,
    loading,
    setModified,
    modified,
  };
};

export default useOneSellerRoutes;
