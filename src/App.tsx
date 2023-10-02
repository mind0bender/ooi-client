import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage";
import SocketProvider from "./components/contextproviders/socketprovider";
import PageNotFound from "./pages/404";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <div
      className={`flex flex-col w-full min-h-screen bg-sky-50 dark:bg-slate-950 dark:text-slate-50 selection:bg-blue-500 selection:text-white text-slate-950`}
    >
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
      <div className="dark:hidden">
        <ToastContainer position="bottom-right" />
      </div>
      <div className="hidden dark:block">
        <ToastContainer theme="dark" position="bottom-right" />
      </div>
    </div>
  );
}

export default App;
