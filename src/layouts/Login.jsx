import LogoSofocon from "../assets/icons/LogoSofocon.png";
import { Outlet } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-login bg-cover bg-center">
      <div className="flex h-[33.156rem] w-[27.1875rem] flex-col items-center justify-center">
        <img
          src={LogoSofocon}
          alt="logo"
          className="mb-10 h-[9.5rem] w-[17.1575rem]"
        />
        <Outlet />
      </div>
    </div>
  );
};

export { Login };
