import {
  Context,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

export const socketContext: Context<Socket | null> =
  createContext<Socket | null>(null);

export default function SocketProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    console.log("Connecting to socket.io server");
    const soc: Socket = io("http://localhost:8080");

    soc.on("connected", () => {
      console.log("connected to socket.io server");
      setSocket(soc);
    });

    return () => {
      soc.close();
    };
  }, []);

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
}
