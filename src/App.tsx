import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage";
import SocketProvider from "./components/contextproviders/socketprovider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
]);

function App() {
  return (
    <div
      className={`flex flex-col w-full min-h-screen bg-sky-50 selection:bg-blue-500 selection:text-white text-slate-950`}
    >
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </div>
  );
}

export default App;
