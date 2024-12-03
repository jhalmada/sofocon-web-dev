import { useState } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  const socketConnected = () => {
    let newSocket;

    try {
      newSocket = io("https://sofocon.api.novexisconsulting.xyz");

      newSocket.on("connect", () => {
        console.log("Conectado al servidor de Socket.IO");
      });

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
