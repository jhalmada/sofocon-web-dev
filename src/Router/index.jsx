import { createBrowserRouter } from "react-router-dom";
import Public from "../Layouts/Public";
import HomePage from "../Pages/HomePage";
import CompaniesPage from "../Pages/CompaniesPage";
import UsersPage from "../Pages/UsersPage";
import SellersPage from "../Pages/SellersPage";
import RoutesPage from "../Pages/RoutesPage";
import ProductsPage from "../Pages/ProductsPage";
import LoginPage from "../Pages/LoginPage";
import Login from "../Layouts/Login";
import RecoverPasswordPage from "../Pages/RecoverPasswordPage";
import NewPasswordPage from "../Pages/NewPasswordPage";
import PasswordPage from "../Pages/PasswordPage";
import RedirectionPage from "../Pages/RedirectionPage";
import AddUserPage from "../Pages/AddUserPage";
import AddRolePage from "../Pages/AddRolePage";

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
