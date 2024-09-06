import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../Layouts/LayoutPublic";
import PageHome from "../Pages/PageHome";
import PageCompanies from "../Pages/PageCompanies";
import PageUsers from "../Pages/PageUsers";
import PageSellers from "../Pages/PageSellers";
import PageRoutes from "../Pages/PageRoutes";
import PageProducts from "../Pages/PageProducts";

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <LayoutPublic />,
    children: [
      {
        index: true,
        element: <PageHome />,
      },
      {
        path: "empresas",
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
