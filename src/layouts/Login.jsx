import logoSofocon from "../assets/icons/logoSofocon2.svg";
import { Outlet } from "react-router-dom";
import { SOFOCON_JWT_TOKEN } from "../utils/Constants";
import { useEffect } from "react";

const Login = () => {
  const token = localStorage.getItem(SOFOCON_JWT_TOKEN);
  useEffect(() => {
    if (token) {
      window.location.href = "/inicio";
    }
  }, []);
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-login bg-cover bg-center">
      <div className="flex h-[33.156rem] w-[27.1875rem] flex-col items-center justify-center">
        <img
          src={logoSofocon}
          alt="logo"
          className="mb-10 h-[9.5rem] w-[17.1575rem]"
        />
        <Outlet />
      </div>
    </div>
  );
};

export { Login };
