import { createBrowserRouter } from "react-router-dom";
import {
  LOGIN_ROUTE,
  NEW_PASSWORD_ROUTE,
  PASSWORD_CHANGED_ROUTE,
  RECOVER_ROUTE,
  REDIRECTION_ROUTE,
  HOME_ROUTE,
  COMPANIES_ROUTE,
  ADD_COMPANIE_ROUTE,
  USERS_ROUTE,
  ADD_USER_ROUTE,
  ADD_SELLER_ROUTE,
  ADD_ROLE_ROUTE,
  ROUTES_ROUTE,
  ROUTES_MAP_ROUTE,
  NOTES_ROUTE,
  ADD_NOTE_ROUTE,
  ADD_ROUTE_ROUTE,
  PRODUCTS_ROUTE,
  ORDERS_ROUTE,
  CLIENTS_ORDERS_ROUTE,
  WORKSHOP_ROUTE,
  UNIT_TEMPLATE_ROUTE,
  RECHARGE_ROUTE,
  RECHARGE_DATA_ROUTE,
  DEPOSIT_ROUTE,
  PRODUCTS_INVENTORY,
  PRODUCTS_ADD,
  CATEGORY_ADD,
  PASSWORD_CODE_ROUTE,
  NEW_SALE_ROUTE,
  NEW_BUDGET_ROUTE,
  BUDGET_ROUTE,
  LIST_PRICE_ADD,
  LIST_PRICE_ID,
} from "../utils/Constants";
import LoginPage from "../pages/LoginPage";
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
import NewPasswordPage from "../pages/NewPasswordPage";
import PasswordPage from "../pages/PasswordPage";
import Public from "../layouts/Public";
import UsersLayout from "../layouts/Users";
import NotesLayout from "../layouts/Notes";
import CompaniesLayout from "../layouts/Companies";
import RoutesLayout from "../layouts/Routes";
import HomePage from "../pages/HomePage";
import CompaniesPage from "../pages/CompaniesPage";
import UsersPage from "../pages/UsersPage";
import AddCompaniePage from "../pages/AddCompaniePage";
import AddUserPage from "../pages/AddUserPage";
import AddSellerPage from "../pages/AddSellerPage";
import AddRolePage from "../pages/AddRolePage";
import AddNotesPage from "../pages/AddNotePage";
import AddRoutePage from "../pages/AddRoutePage";
import RoutesPage from "../pages/RoutesPage";
import ProductsPage from "../pages/ProductsPage";
import { Login } from "../layouts/Login";
import RedirectionPage from "../pages/RedirectionPage";
import NotesPage from "../pages/NotesPage";
import RouteMapDetailsPage from "../pages/RouteMapDetailsPage";
import OrdersPage from "../pages/OrdersPage";
import OrdersLayout from "../layouts/Orders";
import NewBudgetPage from "../pages/NewBudgetPage";
import WorkshopLayout from "../layouts/Workshop";
import WorkshopPage from "../pages/WorkshopPage";
import UnitTemplate from "../pages/UnitTemplate";
import RechargePage from "../pages/RechargePage";
import RechargeDataPage from "../pages/RechargeDataPage";
import AddProductPage from "../pages/AddProductPage";
import Products from "../layouts/Products";
import InventoryPage from "../pages/InventoryPage";
import DepositPage from "../pages/DepositPage";
import Inventory from "../layouts/Inventory";
import AddCategoryPage from "../pages/AddCategoryPage";
import PasswordCodePage from "../pages/PasswordCodePage";
import ClientsOrdersPage from "../pages/ClientsOrdersPage";
import NewSalePage from "../pages/NewSalePage";
import BudgetDataPage from "../pages/BudgetDataPage";
import AddPriceListPage from "../pages/AddPriceListPage";
import { path } from "framer-motion/client";
import ListPriceDetailsPage from "../pages/ListPriceDetailsPage";

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
      {
        path: PASSWORD_CODE_ROUTE,
        element: <PasswordCodePage />,
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
        element: <CompaniesLayout />,
        children: [
          {
            index: true,
            element: <CompaniesPage />,
          },
          {
            path: ADD_COMPANIE_ROUTE,
            element: <AddCompaniePage />,
          },

          {
            path: ADD_ROUTE_ROUTE,
            element: <AddRoutePage />,
          },

          {
            path: NOTES_ROUTE,
            element: <NotesLayout />,
            children: [
              {
                index: true,
                element: <NotesPage />,
              },
              {
                path: ADD_NOTE_ROUTE,
                element: <AddNotesPage />,
              },
            ],
          },
        ],
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
            path: ADD_SELLER_ROUTE,
            element: <AddSellerPage />,
          },
          {
            path: ADD_ROLE_ROUTE,
            element: <AddRolePage />,
          },
        ],
      },
      {
        path: ROUTES_ROUTE,
        element: <RoutesLayout />,
        children: [
          {
            index: true,
            element: <RoutesPage />,
          },
          {
            path: ADD_ROUTE_ROUTE,
            element: <AddRoutePage />,
          },
          {
            path: ROUTES_MAP_ROUTE,
            element: <RouteMapDetailsPage />,
          },
        ],
      },
      {
        path: PRODUCTS_ROUTE,
        element: <Products />,
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
          {
            path: PRODUCTS_INVENTORY,
            element: <Inventory />,
            children: [
              {
                index: true,
                element: <InventoryPage />,
              },
              {
                path: PRODUCTS_ADD,
                element: <AddProductPage />,
              },
            ],
          },

          {
            path: CATEGORY_ADD,
            element: <AddCategoryPage />,
          },
          {
            path: LIST_PRICE_ADD,
            element: <AddPriceListPage />,
          },
          {
            path: LIST_PRICE_ID,
            element: <ListPriceDetailsPage />,
          },
        ],
      },
      {
        path: ORDERS_ROUTE,
        element: <OrdersLayout />,
        children: [
          {
            index: true,
            element: <OrdersPage />,
          },
          {
            path: CLIENTS_ORDERS_ROUTE,
            element: <ClientsOrdersPage />,
          },
          {
            path: BUDGET_ROUTE,
            element: <BudgetDataPage />,
          },
          {
            path: NEW_SALE_ROUTE,
            element: <NewSalePage />,
          },
          {
            path: NEW_BUDGET_ROUTE,
            element: <NewBudgetPage />,
          },
        ],
      },
      {
        path: WORKSHOP_ROUTE,
        element: <WorkshopLayout />,
        children: [
          {
            index: true,
            element: <WorkshopPage />,
          },
          {
            path: UNIT_TEMPLATE_ROUTE,
            element: <UnitTemplate />,
          },
          {
            path: RECHARGE_ROUTE,
            element: <RechargePage />,
          },
          {
            path: RECHARGE_DATA_ROUTE,
            element: <RechargeDataPage />,
          },
          {
            path: DEPOSIT_ROUTE,
            element: <DepositPage />,
          },
        ],
      },
    ],
  },
  {
    path: REDIRECTION_ROUTE,
    element: <RedirectionPage />,
  },
]);
