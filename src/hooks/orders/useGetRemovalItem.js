import { useState } from "react";
import { OrdersService } from "../../services/orders/orders.service";
const useGetRemovalItem = (id) => {
  const [oneRemovalItemResponse, setOneRemovalItemResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modified, setModified] = useState(false);

  //la funcion principal
  const getOneItemRemoval = async () => {
    try {
      setLoading(true);
      const { data } = await OrdersService.getOneItemApi(id);
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    oneRemovalItemResponse,
    getOneItemRemoval,
    loading,
    setModified,
    modified,
  };
};

export default useGetRemovalItem;
