import { useState } from "react";
import { ExtinguisherService } from "../../services/extinguisher/extinguisher.service";

const useAddExtinguisher = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addExtinguisher = async (data, callback = null) => {
    try {
      setIsLoading(true);
      const response = await ExtinguisherService.addExtinguisher(data);
      if (callback) callback(response.data);
      return true;
    } catch (error) {
      console.error("Error al modificar", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { addExtinguisher, isLoading };
};

export default useAddExtinguisher;
