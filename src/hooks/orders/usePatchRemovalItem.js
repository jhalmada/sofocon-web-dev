import { useState } from "react";
import { OrdersService } from "../../services/orders/orders.service";
const usePatchRemovalItem = (id) => {
  const [oneItemResponse, setOneItemResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modified, setModified] = useState(false);

  //la funcion principal
  const patchOneItem = async (body) => {
    try {
      setLoading(true);

      const { data } = await OrdersService.patchOneItemApi(id, body);
      return data;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    oneItemResponse,
    patchOneItem,
    loading,
    setModified,
    modified,
  };
};

export default usePatchRemovalItem;
