import Input from "../components/inputs/Input";
import { Link } from "react-router-dom";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";

const LoginPage = () => {
  return (
    <div className="w-full">
      <Input
        placeholder={"escribe tu correo"}
        label={"Dirección de correo"}
        msjError={
          "*Este campo debe contener una direccion de correo válida vinculada a la plataforma."
        }
      />
      <Input
        placeholder={"escribe tu contraseña"}
        label={"Contraseña"}
        msjError={
          "*Este campo debe contener entre 8 y 20 caracteres alfanuméricos."
        }
        type={"password"}
        icon1={IconEye}
        icon2={IconEyeSlash}
      />
      <div className="flex flex-col items-center">
        <Link to={"/inicio"} className="mt-[6.25rem]">
          <button className="shadow-gray-500 h-11 w-[9.1885rem] rounded-[1.25rem] bg-[#D70000] font-roboto text-sm font-medium uppercase text-white shadow-md">
            INGRESAR
          </button>
        </Link>

        <Link
          to={"recuperar-contraseña"}
          className="mt-5 font-roboto text-xs font-medium text-[#555]"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
