import { useCallback, useEffect, useState } from "react";
import { MetricsService } from "../../services/metrics/metrics.service.js";

const useGetMetrics = () => {
  const [metricsResponse, setMetricsResponse] = useState();
  const [loading, setLoading] = useState(false);

  const getAllMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await MetricsService.getMetricsApi();
      setMetricsResponse(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllMetrics();
  }, [getAllMetrics]);
  return { metricsResponse, loading };
};

export default useGetMetrics;
