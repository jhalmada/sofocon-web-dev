import { useState } from "react";
import { OrdersService } from "../../services/orders/orders.service";

const useDeleteOrders = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteOrder = async (orderId, setModified = null) => {
    try {
      setIsLoading(true);
      await OrdersService.deleteOrderApi(orderId);
      setIsDeleted(true);
      setModified((prev) => !prev);
    } catch (error) {
      console.error("Error al eliminar la orden: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteOrder, isDeleted, isLoading };
};

export default useDeleteOrders;
