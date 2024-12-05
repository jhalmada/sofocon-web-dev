import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import arrowIcon from "../assets/icons/arrow-left.svg";
import LogoOpen from "../assets/icons/logo_open2.svg";
import LogoClose from "../assets/icons/logo_close2.svg";
import gearIcon from "../assets/icons/gear.svg";
import bellIcon from "../assets/icons/bell.svg";
import avatarIcon from "../assets/icons/avatar.svg";
import { menuItems } from "../utils/DataInfo";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useAuthContext } from "../hooks/context/AuthContext";

const Public = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === "/inicio") {
      return currentPath === path;
    }
    return currentPath.startsWith(`${path}/`) || currentPath === path;
  };

  const [isOpen, setIsOpen] = useState(true);

  const { logout } = useAuthContext();
  const userToken = localStorage.getItem("SOFOCON_JWT_TOKEN");

  useEffect(() => {
    if (userToken === null) {
      navigate("/");
    }
  }, [userToken]);

  function formatearArrayLocalStorage() {
    // Extraer los datos del localStorage
    const datosGuardados = localStorage.getItem("SOFOCON_PERMISSIONS");

    // Si no hay datos guardados, retornar un array vacío
    if (!datosGuardados) {
      return [];
    }

    // Dividir la cadena en un array
    const arrayOriginal = datosGuardados.split(",");

    // Convertir cada elemento a una cadena si es necesario
    const arrayFormateado = arrayOriginal.map((item) => String(item).trim());

    // Aplicar el formateador para excluir "USER_ADMIN"
    const elementosExcluir = ["USER_ADMIN"];
    return arrayFormateado.filter((item) => !elementosExcluir.includes(item));
  }

  const permisos = formatearArrayLocalStorage();
  console.log(permisos);

  return (
    <div className="flex h-screen flex-col font-roboto">
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`flex flex-col justify-between bg-white transition-all duration-300 ease-in-out ${isOpen ? "w-[16.7rem]" : "w-24"}`}
        >
          <div>
            <div className="flex justify-center">
              <img
                src={isOpen ? LogoOpen : LogoClose}
                alt="Logo img"
                className={`${isOpen ? "" : "h-20"} mt-2.5 cursor-pointer p-4`}
                onClick={() => navigate("/inicio")}
              />
            </div>
            <div className="flex h-[30.625rem] flex-col items-center space-y-4 p-2">
              {menuItems.map((item) => (
                <>
                  {item.permisses.some((permiso) =>
                    permisos.includes(permiso),
                  ) && (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex h-12 ${isOpen ? "w-[15.625rem]" : "w-20 justify-center"} items-center gap-1.5 rounded-[.75rem] px-6 py-1.5 ${isActive(item.path) ? "bg-red_m text-white" : ""} transition-all duration-200 ease-in-out ${isActive(item.path) ? "shadow-br" : ""}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={
                            isActive(item.path) ? item.activeIcon : item.icon
                          }
                          alt=""
                          className="h-5 w-5 rounded"
                        />
                        {isOpen && (
                          <p className="text-sm font-light leading-[.875rem]">
                            {item.name}
                          </p>
                        )}
                      </div>
                    </Link>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className="pr-4">
            <div className="-mt-12 flex justify-end">
              <img
                onClick={() => setIsOpen(!isOpen)}
                src={arrowIcon}
                alt="arrow"
                className={`h-10 w-10 cursor-pointer ${isOpen ? "rotate-0" : "rotate-180"} transform transition-transform duration-300 ease-in-out`}
              />
            </div>
          </div>
        </aside>
        <div className="flex flex-1 flex-col overflow-auto">
          <nav className="flex h-[4.375rem] items-center justify-between bg-white p-6">
            <Breadcrumbs />
            <div className="flex items-center gap-9">
              <img src={gearIcon} alt="Gear icon" className="h-6 w-6" />
              <img src={bellIcon} alt="Bell icon" className="h-6 w-6" />
              <Dropdown>
                <DropdownTrigger className="cursor-pointer">
                  <img src={avatarIcon} alt="Avatar icon" className="h-7 w-7" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="log out"
                    className="text-danger"
                    color="danger"
                    onClick={() => logout()}
                  >
                    Cerrar Sesion
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </nav>
          <main className="flex-grow overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Public;
