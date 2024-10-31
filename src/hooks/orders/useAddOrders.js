import { useCallback, useState } from "react";
import { OrdersService } from "../../services/orders/orders.service.js";

const useAddOrders = () => {
  const [loading, setLoading] = useState(false);

  const postAddOrders = useCallback(async (orderData) => {
    try {
      setLoading(true);
      const { data } = await OrdersService.postAddOrdersApi(orderData);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postAddOrders, loading };
};

export default useAddOrders;
