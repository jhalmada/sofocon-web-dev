import { useState } from "react";
import { OrdersService } from "../../services/orders/orders.service";

const usePutOrders = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modified, setModified] = useState(false);

  const changedOrder = async (orderData, orderId, setModifiedCallback) => {
    try {
      setIsLoading(true);
      await OrdersService.putOrderApi(orderData, orderId);
      if (setModifiedCallback) setModifiedCallback((prev) => !prev);
      setModified((prev) => !prev);

      return true;
    } catch (error) {
      console.error("Error al modificar la órden: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { changedOrder, isChanged, isLoading, modified, setModified };
};

export default usePutOrders;
