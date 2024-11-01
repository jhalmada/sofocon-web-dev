import { useEffect, useState } from "react";
import { PriceListService } from "../../services/priceList/priceList.service.js";
const useGetPriceList = () => {
  const [priceListResponse, setPriceListResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modified, setModified] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const getAllPriceList = async () => {
    try {
      setLoading(true);
      const { data } = await PriceListService.getAllPriceListApi({
        page,
        itemsPerPage,
        search,
        category,
      });
      setTotalPage(data.pagination.totalPages);
      setTotal(data.pagination.total);
      console.log("la data de LISTA de precios es");
      console.log(data.result);
      setPriceListResponse(data.result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllPriceList();
  }, [page, itemsPerPage, modified, search, category]);
  return {
    priceListResponse,
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

export default useGetPriceList;
