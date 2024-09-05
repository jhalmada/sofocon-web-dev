import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../Layouts/LayoutPublic";
import PageCompanies from "../Pages/PageCompanies";
import PageUsers from "../Pages/PageUsers";
import PageSellers from "../Pages/PageSellers";
import PageRoutes from "../Pages/PageRoutes";
import PageProducts from "../Pages/PageProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    children: [
      {
        index: true,
        element: <PageCompanies />,
      },
      {
        path: "usuarios",
        element: <PageUsers />,
      },
      {
        path: "vendedores",
        element: <PageSellers />,
      },
      {
        path: "rutas",
        element: <PageRoutes />,
      },
      {
        path: "productos",
        element: <PageProducts />,
      },
    ],
  },
]);
