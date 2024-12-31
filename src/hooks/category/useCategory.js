import { useEffect, useState } from "react";
import { CategoryService } from "../../services/category/category.service.js";
const useCategory = () => {
  const [categoryResponse, setCategoryResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modified, setModified] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);

  //la funcion principal
  const getAllCategory = async () => {
    try {
      setLoading(true);
      //consumir el servicio
      const { data } = await CategoryService.getAllCategoryApi({
        page,
        itemsPerPage,
        search,
        status,
      });
      //aqui haces con el resultado lo que necesites

      setTotalPage(data.pagination.totalPages);
      setTotal(data.pagination.total);
      setCategoryResponse(data.result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  //que permite actualizar las lista de empresa cada vez que se modifica el paginado, o se elimina una empresa
  useEffect(() => {
    getAllCategory();
  }, [page, itemsPerPage, modified, search, status]);
  return {
    categoryResponse,
    loading,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setModified,
    modified,
    setSearch,
    setStatus,
  };
};

export default useCategory;
