import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import NewPasswordPage from "../pages/NewPasswordPage";
import PasswordPage from "../pages/PasswordPage";
import Public from "../layouts/Public";
import UsersLayout from "../layouts/Users";
import HomePage from "../pages/HomePage";
import CompaniesPage from "../pages/CompaniesPage";
import UsersPage from "../pages/UsersPage";
import AddUserPage from "../pages/AddUserPage";
import AddRolePage from "../pages/AddRolePage";
import SellersPage from "../pages/SellersPage";
import RoutesPage from "../pages/RoutesPage";
import ProductsPage from "../pages/ProductsPage";
import { Login } from "../layouts/Login";
import RedirectionPage from "../pages/RedirectionPage";


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
        element: <UsersLayout />,
        children: [
          {
            index: true,
            element: <UsersPage />,
          },
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
