import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button.jsx";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import PlusIcon from "../assets/icons/plus.svg";
import DirectOrdersPage from "./DirectOrdersPage.jsx";
import BudgetPage from "./BudgetPage.jsx";
import StatusPanelPage from "./StatusPanelPage.jsx";
import { ClientOrdersSection } from "./orders/components/clientOrdersSection.jsx";

const CLIENTS_ORDERS_TAB = "ordenes-clientes";
const DIRECT_ORDERS_TAB = "ordenes-directas";
const BUDGET_TAB = "presupuesto";
const STATUS_PANEL_TAB = "panel-de-estado";

const OrdersPage = () => {
  const navigationActive = (tab) => {
    switch (tab) {
      case CLIENTS_ORDERS_TAB:
        return CLIENTS_ORDERS_TAB;
      case DIRECT_ORDERS_TAB:
        return DIRECT_ORDERS_TAB;
      case BUDGET_TAB:
        return BUDGET_TAB;
      case STATUS_PANEL_TAB:
        return STATUS_PANEL_TAB;
      default:
        return STATUS_PANEL_TAB;
    }
  };
  const [activeTab, setActiveTab] = useState(
    navigationActive(sessionStorage.getItem("activeTab")),
  );

  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col p-6">
        <div className="w-[4rem]">
          <Link to="/inicio" className="text-sm font-medium leading-4">
            <div className="mb-4 flex items-center">
              <img
                src={ChevronLeftIcon}
                alt="arrow left"
                className="-ml-1 h-4 w-4"
              />
              Volver
            </div>
          </Link>
        </div>
        <div className="flex justify-between">
          <div className="mb-5 flex items-center justify-between space-x-4">
            <h1 className="text-xl font-medium leading-6 text-black_m">
              Órdenes
            </h1>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(STATUS_PANEL_TAB)}
              className={`${activeTab === STATUS_PANEL_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} w-48 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Panel de órdenes
            </h2>
            <h2
              onClick={() => setActiveTab(CLIENTS_ORDERS_TAB)}
              className={`w-48 cursor-pointer rounded-t-lg ${activeTab === CLIENTS_ORDERS_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Órdenes de clientes
            </h2>
            <h2
              onClick={() => setActiveTab(DIRECT_ORDERS_TAB)}
              className={`${activeTab === DIRECT_ORDERS_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} w-48 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Órdenes directas
            </h2>
            <h2
              onClick={() => setActiveTab(BUDGET_TAB)}
              className={`${activeTab === BUDGET_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} w-48 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Presupuestos
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            {(activeTab === CLIENTS_ORDERS_TAB ||
              activeTab === DIRECT_ORDERS_TAB ||
              activeTab === STATUS_PANEL_TAB) && (
              <div className="flex gap-[.6rem]">
                <Link to={"/inicio/ordenes/nueva-venta"}>
                  <Button text="Nueva venta" icon={PlusIcon} />
                </Link>
              </div>
            )}
            {activeTab === BUDGET_TAB && (
              <div className="flex gap-[.6rem]">
                <Link to={"/inicio/ordenes/nuevo-presupuesto"}>
                  <Button text="Nuevo presupuesto" icon={PlusIcon} />
                </Link>
              </div>
            )}
          </div>
        </div>
        {activeTab === CLIENTS_ORDERS_TAB && <ClientOrdersSection />}
        {activeTab === DIRECT_ORDERS_TAB && <DirectOrdersPage />}
        {activeTab === BUDGET_TAB && <BudgetPage />}
        {activeTab === STATUS_PANEL_TAB && <StatusPanelPage />}
      </div>
    </div>
  );
};

export default OrdersPage;
