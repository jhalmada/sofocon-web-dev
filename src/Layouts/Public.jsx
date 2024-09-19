import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { menuItems } from "../utils/Datainfo";
import arrowIcon from "../assets/icons/arrow-left.svg";
import LogoOpen from "../assets/icons/logo_open.svg";
import LogoClose from "../assets/icons/logo_close.svg";
import gearIcon from "../assets/icons/gear.svg";
import bellIcon from "../assets/icons/bell.svg";
import avatarIcon from "../assets/icons/avatar.svg";

const Public = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    if (path === "/inicio") {
      return currentPath === path;
    }
    return currentPath.startsWith(`${path}/`) || currentPath === path;
  };

  const [isOpen, setIsOpen] = useState(true);

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
                className="mt-2.5 h-20 p-4"
              />
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex h-12 ${isOpen ? "w-[15.625rem]" : "w-20 justify-center"} items-center gap-1.5 rounded-md px-6 py-1.5 ${isActive(item.path) ? "bg-red_m text-white" : ""} transition-all duration-200 ease-in-out`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={isActive(item.path) ? item.activeIcon : item.icon}
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
              ))}
            </div>
          </div>
          <div
            className="flex cursor-pointer justify-end py-4 pr-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={arrowIcon}
              alt="arrow"
              className={`h-10 w-10 ${isOpen ? "rotate-0" : "rotate-180"} transform transition-transform duration-300 ease-in-out`}
            />
          </div>
        </aside>
        <div className="flex flex-1 flex-col overflow-auto">
          <nav className="flex h-[15vh] items-center justify-between bg-white p-6">
            <Breadcrumbs />
            <div className="flex items-center gap-9">
              <img src={gearIcon} alt="Gear icon" className="h-8 w-8" />
              <img src={bellIcon} alt="Bell icon" className="h-8 w-8" />
              <img src={avatarIcon} alt="Avatar icon" className="h-10 w-10" />
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
