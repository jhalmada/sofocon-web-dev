import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const LayoutPublic = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    if (path === "/home") {
      return currentPath === path;
    }

    return currentPath.startsWith(`${path}/`) || currentPath === path;
  };

  //para manejar el abrir o cerrar el menu
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Inicio",
      path: "/home",
      icon: "/assets/icons/house-door.svg",
      activeIcon: "/assets/icons/house-door-fill.svg",
    },
    {
      name: "Empresas",
      path: "/home/empresas",
      icon: "/assets/icons/shop-window.svg",
      activeIcon: "/assets/icons/shop-window-fill.svg",
    },
    {
      name: "Usuarios",
      path: "/home/usuarios",
      icon: "/assets/icons/people.svg",
      activeIcon: "/assets/icons/people-fill.svg",
    },
    {
      name: "Vendedores",
      path: "/home/vendedores",
      icon: "/assets/icons/briefcase.svg",
      activeIcon: "/assets/icons/briefcase-fill.svg",
    },
    {
      name: "Rutas",
      path: "/home/rutas",
      icon: "/assets/icons/compass.svg",
      activeIcon: "/assets/icons/compass-fill.svg",
    },
    {
      name: "Productos",
      path: "/home/productos",
      icon: "/assets/icons/box-seam.svg",
      activeIcon: "/assets/icons/box-seam-fill.svg",
    },
  ];

  return (
    <div className="flex h-screen flex-col font-roboto">
      <div className="flex flex-1">
        <aside
          className={`flex h-screen max-h-screen ${isOpen ? "w-[267px]" : "w-[100px]"} flex-col justify-between bg-white transition-all duration-300 ease-in-out`}
        >
          <div>
            <div className="flex justify-center">
              <img
                src="/assets/img/logo.png"
                alt="Logo img"
                className="mt-[10px] p-4"
              />
            </div>
            <div className="p-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex h-[50px] ${isOpen ? "w-[247px]" : "w-[70px]"} items-center gap-[6px] rounded-[12px] px-[24px] py-[5px] ${
                    isActive(item.path) ? "bg-red_m text-white" : ""
                  } transition-all duration-300 ease-in-out`}
                >
                  <div className="flex items-center gap-[10px]">
                    <img
                      src={isActive(item.path) ? item.activeIcon : item.icon}
                      alt=""
                      className="h-[20px] w-[20px] rounded"
                    />
                    {isOpen && (
                      <p className="text-sm font-light leading-[14px]">
                        {item.name}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div
            style={{
              transform: isOpen ? "rotate(0deg)" : "rotate(180deg)", // Rotación según el estado
              transition: "transform 0.3s ease", // Transición suave
            }}
            className="flex cursor-pointer justify-end py-4 pr-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img src="/assets/icons/arrow-left.svg" alt="" />
          </div>
        </aside>
        <div className="flex flex-1 flex-col">
          <nav className="flex items-center justify-between bg-white p-[24px]">
            <Breadcrumbs />
            <div className="flex items-center gap-[38px]">
              <img
                src="/assets/icons/gear.svg"
                alt="Gear icon"
                className="h-[30px] w-[30px]"
              />
              <img
                src="/assets/icons/bell.svg"
                alt="Bell icon"
                className="h-[30px] w-[30px]"
              />
              <img
                src="/assets/icons/avatar.svg"
                alt="Avatar icon"
                className="h-[40px] w-[40px]"
              />
            </div>
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutPublic;
