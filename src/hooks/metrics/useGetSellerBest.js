import { useEffect, useState } from "react";
import { MetricsService } from "../../services/metrics/metrics.service.js";

const anhoActual = () => {
  const fechaActual = new Date();
  const anio = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  return { anio, mes };
};

const useGetSellerBest = () => {
  const { anio, mes } = anhoActual();
  const [sellerBestResponse, setSellerBestResponse] = useState();
  const [year, setYear] = useState(anio);
  const [month, setMonth] = useState(mes);
  const [loading, setLoading] = useState(false);

  const getAllSellersBest = async () => {
    try {
      setLoading(true);
      const { data } = await MetricsService.getSellerBestApi({
        year,
        month,
      });
      setSellerBestResponse(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSellersBest();
  }, [year, month]);
  return { sellerBestResponse, loading, setYear, setMonth, month };
};

export default useGetSellerBest;
