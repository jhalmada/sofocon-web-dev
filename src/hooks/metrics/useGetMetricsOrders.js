import { useEffect, useState } from "react";
import { MetricsService } from "../../services/metrics/metrics.service.js";

const anhoActual = () => {
  const fechaActual = new Date();
  const anio = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  return { anio, mes };
};

const useMetricsOrders = () => {
  const { anio, mes } = anhoActual();
  const [metricsOrdersResponse, setMetricsOrderResponse] = useState();
  const [year, setYear] = useState(anio);
  const [month, setMonth] = useState(mes);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllMetrics = async () => {
    try {
      setLoading(true);
      const { data } = await MetricsService.getMetricsOrdersApi({
        year,
        month,
        user,
      });
      setMetricsOrderResponse(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMetrics();
  }, [year, month, user]);
  return {
    metricsOrdersResponse,
    loading,
    setYear,
    setMonth,
    setUser,
    month,
    year,
  };
};

export default useMetricsOrders;
