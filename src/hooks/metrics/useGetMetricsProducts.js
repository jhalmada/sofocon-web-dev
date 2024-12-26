import { useEffect, useState } from "react";
import { MetricsService } from "../../services/metrics/metrics.service.js";

const useMetricsProduts = () => {
  const [metricsProductsResponse, setMetricsProductsResponse] = useState();
  const [year, setYear] = useState(2024);
  const [loading, setLoading] = useState(false);

  const getAllMetricsProducts = async () => {
    try {
      setLoading(true);
      const { data } = await MetricsService.getMetricsProductsApi({
        year,
      });
      setMetricsProductsResponse(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMetricsProducts();
  }, [year]);
  return { metricsProductsResponse, loading, setYear };
};

export default useMetricsProduts;
