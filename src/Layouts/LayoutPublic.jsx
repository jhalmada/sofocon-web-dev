import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { Outlet } from "react-router-dom";

const LayoutPublic = () => {
  const location = useLocation();
  const currentPath = location.pathname || "/";

  const menuItems = [
    {
      name: "Empresas",
      path: "/",
      icon: "assets/icons/shop-window.svg",
      activeIcon: "assets/icons/shop-window-fill.svg",
    },
    {
      name: "Usuarios",
      path: "/usuarios",
      icon: "assets/icons/people.svg",
      activeIcon: "assets/icons/people-fill.svg",
    },
    {
      name: "Vendedores",
      path: "/vendedores",
      icon: "assets/icons/briefcase.svg",
      activeIcon: "assets/icons/briefcase-fill.svg",
    },
    {
      name: "Rutas",
      path: "/rutas",
      icon: "assets/icons/compass.svg",
      activeIcon: "assets/icons/compass-fill.svg",
    },
    {
      name: "Productos",
      path: "/productos",
      icon: "assets/icons/box-seam.svg",
      activeIcon: "assets/icons/box-seam-fill.svg",
    },
  ];

  return (
    <div className="font-roboto flex h-screen flex-col">
      <div className="flex flex-1">
        <aside className="w-[267px] bg-white">
          <div className="flex justify-center">
            <img
              src="assets/img/logo.png"
              alt="Logo img"
              className="mt-[10px] p-4"
            />
          </div>
          <div className="p-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex h-[50px] w-[247px] items-center gap-[6px] rounded-[12px] px-[24px] py-[5px] ${
                  currentPath === item.path ? "bg-red-500 text-white" : ""
                }`}
              >
                <div className="flex items-center gap-[10px]">
                  <img
                    src={
                      currentPath === item.path ? item.activeIcon : item.icon
                    }
                    alt=""
                    className="h-[20px] w-[20px] rounded"
                  />
                  <p className="text-sm font-light leading-[14px]">
                    {item.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
        <div className="flex flex-1 flex-col">
          <nav className="flex items-center justify-between bg-white p-[24px]">
            <Breadcrumbs />
            <div className="flex items-center gap-[38px]">
              <div className="bg-black_l shadow-bl flex w-[250px] items-center gap-[10px] rounded-full px-[16px] py-[8px]">
                <img
                  src="assets/icons/search.svg"
                  alt="Search icon"
                  className="h-[20px] w-[20px]"
                />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent outline-none"
                />
              </div>
              <img
                src="assets/icons/gear.svg"
                alt="Gear icon"
                className="h-[30px] w-[30px]"
              />
              <img
                src="assets/icons/bell.svg"
                alt="Bell icon"
                className="h-[30px] w-[30px]"
              />
              <img
                src="assets/icons/avatar.svg"
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
