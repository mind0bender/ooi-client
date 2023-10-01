import { useEffect, useRef } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import Homepage from "./pages/homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
]);

function App() {
  const socket = useRef<Socket | undefined>();
  useEffect(() => {
    const soc: Socket = io("http://localhost:8080");
    console.log("Connecting to socket.io server");
    socket.current = soc;
    return () => {
      soc.close();
    };
  }, []);
  useEffect(() => {
    if (!socket.current) return;
    socket.current.on("disconnect", () => {
      console.log("Disconnected from socket.io server");
    });
    socket.current.on("error", (err) => {
      console.error(err);
    });
  }, [socket]);
  return (
    <div className={`flex flex-col w-full min-h-screen bg-sky-50`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
