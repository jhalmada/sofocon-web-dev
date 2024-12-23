import { useCallback, useEffect, useState } from "react";
import { OrdersService } from "../../services/orders/orders.service";
import { SOFOCON_JWT_TOKEN } from "../../utils/Constants";
import axios from "axios";

const anhoActual = () => {
  const fechaActual = new Date();
  const anio = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  return { anio, mes };
};
const useGetUnitOrders = () => {
  const [orderUnitResponse, setOrderUnitResponse] = useState([]);
  const [order, setOrder] = useState([]);
  const { anio, mes } = anhoActual();
  const [year, setYear] = useState(anio);

  const [month, setMonth] = useState(mes);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const downloadFile = useCallback(async (url, fileName) => {
    try {
      setLoading(true);
      console.log("Descargando archivo desde:", url);
      const response = await axios.get(url, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(SOFOCON_JWT_TOKEN)}`,
        },
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const urlObject = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = urlObject;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlObject);

      setLoading(false);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  }, []);
  const getAllUnitOrders = async () => {
    try {
      setLoading(true);
      const { data } = await OrdersService.getAllUnitOrdersApi({
        order,
        year,
        month,
        page,
        itemsPerPage,
        search,
      });
      setTotalPage(data.pagination.totalPages);
      setTotal(data.pagination.total);
      setOrderUnitResponse(data.result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUnitOrders();
  }, [page, itemsPerPage, search, order, year, month]);
  return {
    orderUnitResponse,
    order,
    year,
    month,
    loading,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    search,
    itemsPerPage,
    setOrder,
    setYear,
    setMonth,
    setSearch,
    downloadFile,
  };
};

export default useGetUnitOrders;
