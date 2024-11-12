import { useState } from "react";
import { OrdersService } from "../../services/orders/orders.service";

const usePutOrders = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changedOrder = async (orderData, orderId, setModified) => {
    try {
      setIsLoading(true);
      await OrdersService.putOrderApi(orderData, orderId);
      setModified((prev) => !prev);
      return true;
    } catch (error) {
      console.error("Error al modificar la órden: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { changedOrder, isChanged, isLoading };
};

export default usePutOrders;
