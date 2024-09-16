import CompInput from "../Components/Inputs/CompInput";
import CompInputPass from "../components/Inputs/CompInputPass";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="w-full">
      <CompInput
        placeholder={"escribe tu correo"}
        label={"Dirección de correo"}
        msjError={
          "*Este campo debe contener una direccion de correo válida vinculada a la plataforma."
        }
      />
      <CompInputPass
        placeholder={"escribe tu contraseña"}
        label={"Contraseña"}
      />
      <div className="flex flex-col items-center">
        <Link to={"/home"}>
          <button className="shadow-gray-500 mt-[6.25rem] h-11 w-[9.1885rem] rounded-[1.25rem] bg-[#D70000] font-roboto text-sm font-medium text-white shadow-md">
            INGRESAR
          </button>
        </Link>

        <Link
          to={"recover"}
          className="mt-5 font-roboto text-xs font-medium text-[#555]"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
