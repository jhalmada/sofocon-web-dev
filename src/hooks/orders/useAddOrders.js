import { useCallback, useState } from "react";
import { OrdersService } from "../../services/orders/orders.service.js";

const useAddOrders = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const postAddOrders = useCallback(async (orderData) => {
    try {
      setLoading(true);
      const response = await OrdersService.postAddOrdersApi(orderData);
      setStatus(response.status);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postAddOrders, loading, status };
};

export default useAddOrders;
