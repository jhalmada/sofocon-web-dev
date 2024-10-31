import { useEffect, useState } from "react";
import { ProductsService } from "../../services/products/products.service.js";
const useGetProducts = () => {
  const [productsResponse, setProductsResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modified, setModified] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const getAllCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await ProductsService.getAllProductsApi({
        page,
        itemsPerPage,
        search,
        category,
      });
      setTotalPage(data.pagination.totalPages);
      setTotal(data.pagination.total);
      setProductsResponse(data.result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllCompanies();
  }, [page, itemsPerPage, modified, search, category]);
  return {
    productsResponse,
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
    setCategory,
  };
};

export default useGetProducts;
