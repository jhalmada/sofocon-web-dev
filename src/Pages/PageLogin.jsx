import ImgElipse from "../assets/Login/ImgElipse2.png";
import CompInput from "../Components/Inputs/CompInput";
import CompInputPass from "../Components/Inputs/CompInputPass";
import LogoSofocon from "../assets/Iconos/LogoSofocon.png";
import IconConfig from "../assets/Iconos/IconConfig.svg";
import { Link } from "react-router-dom";

const PageLogin = () => {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${ImgElipse})` }}
    >
      <img
        src={IconConfig}
        className="absolute right-8 top-7 h-7 w-7 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center">
        <img
          src={LogoSofocon}
          alt="Elipse"
          style={{ width: "275px", height: "105px", marginBottom: "40px" }}
        />
        <CompInput
          placeholder={"escribe tu correo"}
          label={"Dirección de correo"}
        />
        <CompInputPass
          placeholder={"escribe tu contraseña"}
          label={"Contraseña"}
        />
        <button className="font-roboto mt-[100px] h-[45px] w-[147px] rounded-[20px] bg-[#D70000] text-sm text-xl font-medium text-white shadow-md shadow-gray-500">
          INGRESAR
        </button>
        <Link className="font-roboto mt-5 text-xs font-medium text-[#555]">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
};

export default PageLogin;
