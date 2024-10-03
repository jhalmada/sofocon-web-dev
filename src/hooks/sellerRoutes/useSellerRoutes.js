import { useEffect, useState } from "react";
import { sellerRoutesService } from "../../services/sellerRoutes/sellerRoute.service.js";
const useSellerRoutes = () => {
  const [sellerRoutesResponse, setSellerRouteResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [modified, setModified] = useState(false);

  //la funcion principal
  const getAllSellerRoutes = async () => {
    try {
      setLoading(true);
      const { data } = await sellerRoutesService.getAllSellerRoutesApi({
        page,
        itemsPerPage,
      });
      setTotalPage(data.pagination.totalPages);
      setSellerRouteResponse(data.result);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  //que permite actualizar las lista cada vez que se modifica el paginado, se elimina o se agrega un nuevo registro
  useEffect(() => {
    getAllSellerRoutes();
  }, [page, itemsPerPage, modified]);
  return {
    sellerRoutesResponse,
    loading,
    setItemsPerPage,
    totalPage,
    setPage,
    page,
    itemsPerPage,
    setModified,
    modified,
  };
};

export default useSellerRoutes;
