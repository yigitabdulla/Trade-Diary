import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Layout} from "./pages/Layout";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/auth",
          element:<Auth/>
        },
        {
          path:"/",
          element:<Landing/>
        },
        {
          path:"/dashboard",
          element:<Dashboard/>
        },
        {
          path:"/trades",
          element:<Trades/>
        },
        {
          path:"/contact",
          element:<Dashboard/>
        }
      ]
    }
  ]);

  return (

   <>
    <RouterProvider router={router}/>
    <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
   </>
  );
}

export default App;