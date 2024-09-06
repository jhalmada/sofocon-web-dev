import ImgElipse from "../assets/Login/ImgElipse2.png";
import LogoSofocon from "../assets/Iconos/LogoSofocon.png";
import IconConfig from "../assets/Iconos/IconConfig.svg";
import { Outlet } from "react-router-dom";

const LayoutLogin = () => {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${ImgElipse})` }}
    >
      <img
        src={IconConfig}
        className="absolute right-8 top-7 h-7 w-7 transform cursor-pointer transition-transform duration-1000 ease-in-out hover:rotate-180"
      />
      <div className="flex h-[530px] w-[435px] flex-col items-center justify-stretch">
        <img
          src={LogoSofocon}
          alt="Elipse"
          style={{ width: "275px", height: "105px", marginBottom: "40px" }}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutLogin;
