import { useCallback, useState } from "react";
import { sellerRoutesService } from "../../services/sellerRoutes/sellerRoute.service.js";

const useDeleteSellerRoute = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteSellerRoute = useCallback(async (routeId, setModified) => {
    try {
      setIsLoading(true);
      await sellerRoutesService.deleteSellerRoutesApi(routeId);
      setIsDeleted(true);
      setModified((prev) => !prev);
    } catch (error) {
      console.error("Error al eliminar la ruta: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { deleteSellerRoute, isDeleted, isLoading };
};

export default useDeleteSellerRoute;
