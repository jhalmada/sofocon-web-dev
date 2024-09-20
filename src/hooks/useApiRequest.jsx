import { useState } from "react";
import axios from "axios";

const useApiRequest = (baseUrl) => {
  //ESTE PODRIAMOS UTILIZARLO EN CASO DE QUE SE QUIERA MOSTRAR ALGO MIENTRAS SE CARGA LA INFORMACION
  const [loading, setLoading] = useState(false);
  //ESTE ES EL ERROR QUE SE MOSTRARA EN LOS INPUTS
  const [error, setError] = useState(false);
  //ESTE ES EL DATO QUE SE OBTENDRA DE LA API
  const [data, setData] = useState(null);

  const sendRequest = async ({
    endpoint = "",
    method = "GET",
    body = null,
    headers = {},
  }) => {
    setLoading(true);
    setError(false);

    try {
      const url = `${baseUrl}${endpoint}`;
      const config = {
        method,
        url,
        headers,
        data: body,
      };

      const response = await axios(config);
      setData(response.data);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error, data };
};

export default useApiRequest;
