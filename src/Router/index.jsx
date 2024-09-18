import { createBrowserRouter } from "react-router-dom";
import Public from "../layouts/Public";
import HomePage from "../pages/HomePage";
import CompaniesPage from "../pages/CompaniesPage";
import UsersPage from "../pages/UsersPage";
import SellersPage from "../pages/SellersPage";
import RoutesPage from "../pages/RoutesPage";
import ProductsPage from "../pages/ProductsPage";
import LoginPage from "../pages/LoginPage";
import Login from "../layouts/Login";
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import NewPasswordPage from "../pages/NewPasswordPage";
import PasswordPage from "../pages/PasswordPage";
import RedirectionPage from "../pages/RedirectionPage";
import AddUserPage from "../pages/AddUserPage";
import AddRolePage from "../pages/AddRolePage";

// Rutas path
const LOGIN_ROUTE = "login";
const RECOVER_ROUTE = "recuperar-contraseña";
const NEW_PASSWORD_ROUTE = "nueva-contraseña";
const PASSWORD_CHANGED_ROUTE = "cambiar-contraseña";
const HOME_ROUTE = "/inicio";
const COMPANIES_ROUTE = "empresas";
const USERS_ROUTE = "usuarios";
const ADD_USER_ROUTE = "agregar-usuario";
const ADD_ROLE_ROUTE = "agregar-rol";
const SELLERS_ROUTE = "vendedores";
const ROUTES_ROUTE = "rutas";
const PRODUCTS_ROUTE = "productos";
const REDIRECTION_ROUTE = "/";

export const router = createBrowserRouter([
  {
    path: LOGIN_ROUTE,
    element: <Login />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: RECOVER_ROUTE,
        element: <RecoverPasswordPage />,
      },
      {
        path: NEW_PASSWORD_ROUTE,
        element: <NewPasswordPage />,
      },
      {
        path: PASSWORD_CHANGED_ROUTE,
        element: <PasswordPage />,
      },
    ],
  },
  {
    path: HOME_ROUTE,
    element: <Public />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: COMPANIES_ROUTE,
        element: <CompaniesPage />,
      },
      {
        path: USERS_ROUTE,
        element: <UsersPage />,
        children: [
          {
            path: ADD_USER_ROUTE,
            element: <AddUserPage />,
          },
          {
            path: ADD_ROLE_ROUTE,
            element: <AddRolePage />,
          },
        ],
      },
      {
        path: SELLERS_ROUTE,
        element: <SellersPage />,
      },
      {
        path: ROUTES_ROUTE,
        element: <RoutesPage />,
      },
      {
        path: PRODUCTS_ROUTE,
        element: <ProductsPage />,
      },
    ],
  },
  {
    path: REDIRECTION_ROUTE,
    element: <RedirectionPage />,
  },
]);
