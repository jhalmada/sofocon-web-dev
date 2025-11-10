import { useCallback, useState } from "react";
import { ExtinguisherService } from "../../services/extinguisher/extinguisher.service";

const useGetAllExtinguisher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [extinguisherResponse, setExtinguisherResponse] = useState([]);

  const getAllExtinguisher = useCallback(async ({ client }) => {
    try {
      setIsLoading(true);
      const response = await ExtinguisherService.getAllExtinguisher({
        params: {
          client,
        },
      });
      setExtinguisherResponse(response.data.result);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { extinguisherResponse, isLoading, getAllExtinguisher };
};
export default useGetAllExtinguisher;
