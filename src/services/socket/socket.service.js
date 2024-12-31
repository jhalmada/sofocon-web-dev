import { io } from "socket.io-client";
import { BASE_URL } from "../../utils/Constants";

export const useSocket = () => {
  const socketConnected = () => {
    let newSocket;

    try {
      newSocket = io(BASE_URL);

      newSocket.on("connect", () => {});

      newSocket.on("error", (err) => {
        console.error("Error en la conexión:", err.message);
      });

      return newSocket;
    } catch (error) {
      console.error("Error al conectar al servidor:", error.message);
    }
  };

  return { socketConnected };
};
