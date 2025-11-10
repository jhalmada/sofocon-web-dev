import { useState } from "react";
import { ExtinguisherService } from "../../services/extinguisher/extinguisher.service";

const useUpdateExtinguisher = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateExtinguisher = async (id, data, callback = null) => {
    try {
      setIsLoading(true);
      const response = await ExtinguisherService.updateExtinguisher(id, data);
      if (callback) callback(response.data);
      return true;
    } catch (error) {
      console.error("Error al modificar", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateExtinguisher, isLoading };
};

export default useUpdateExtinguisher;
