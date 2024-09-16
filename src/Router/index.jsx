import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../Layouts/LayoutPublic";
import HomePage from "../Pages/HomePage";
import CompaniesPage from "../Pages/CompaniesPage";
import UsersPage from "../Pages/UsersPage";
import SellersPage from "../Pages/SellersPage";
import RoutesPage from "../Pages/RoutesPage";
import ProductsPage from "../Pages/ProductsPage";
import LoginPage from "../Pages/LoginPage";
import LayoutLogin from "../Layouts/LayoutLogin";
import RecoverPassPage from "../Pages/RecoverPassPage";
import NewPasswordPage from "../Pages/NewPasswordPage";
import PasswordPage from "../Pages/PasswordPage";
import RedirectionPage from "../Pages/RedirectionPage";

export const router = createBrowserRouter([
  {
    path: "login",
    element: <LayoutLogin />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "recover",
        element: <RecoverPassPage />,
      },
      {
        path: "new-password",
        element: <NewPasswordPage />,
      },
      {
        path: "password-Changed",
        element: <PasswordPage />,
      },
    ],
  },
  {
    path: "/home",
    element: <LayoutPublic />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "empresas",
        element: <CompaniesPage />,
      },
      {
        path: "usuarios",
        element: <UsersPage />,
      },
      {
        path: "vendedores",
        element: <SellersPage />,
      },
      {
        path: "rutas",
        element: <RoutesPage />,
      },
      {
        path: "productos",
        element: <ProductsPage />,
      },
    ],
  },
  {
    path: "/",
    element: <RedirectionPage />,
  },
]);
