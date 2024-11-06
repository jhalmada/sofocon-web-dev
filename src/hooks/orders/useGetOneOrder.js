import { useState } from "react";
import { OrdersService } from "../../services/orders/orders.service";
const useGetOneOrder = (id) => {
  const [oneOrderResponse, setOneOrderResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modified, setModified] = useState(false);

  //la funcion principal
  const getOneOrder = async () => {
    try {
      setLoading(true);

      const { data } = await OrdersService.getOneOrderApi(id);
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    oneOrderResponse,
    getOneOrder,
    loading,
    setModified,
    modified,
  };
};

export default useGetOneOrder;
