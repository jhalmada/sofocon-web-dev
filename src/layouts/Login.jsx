import LogoSofocon from "../assets/icons/LogoSofocon.png";
import IconConfig from "../assets/icons/IconConfig.svg";
import { Outlet } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-login bg-cover bg-center">
      <img
        src={IconConfig}
        className="absolute right-8 top-7 h-7 w-7 transform cursor-pointer transition-transform duration-1000 ease-in-out hover:rotate-180"
      />
      <div className="flex h-[33.156rem] w-[27.1875rem] flex-col items-center justify-stretch">
        <img
          src={LogoSofocon}
          alt="logo"
          className="mb-10 h-[6.3025rem] w-[17.1575rem]"
        />
        <Outlet />
      </div>
    </div>
  );
};

export { Login };
