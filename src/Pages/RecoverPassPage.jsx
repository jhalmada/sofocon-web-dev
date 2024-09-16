import CompInput from "../Components/Inputs/CompInput";
import { Link } from "react-router-dom";

const RecoverPassPage = () => {
  return (
    <div className="w-full">
      <CompInput
        placeholder={"example@ejemail.com"}
        label={"Confirma tu correo"}
        msjError={
          "*Este campo debe contener una direccion de correo válida vinculada a la plataforma."
        }
      />
      <p className="mt-4 max-w-[27.1875rem] font-roboto text-xs font-light">
        Introduce tu dirección de correo electrónico y te enviaremos un enlace
        para restablecer tu contraseña.
      </p>
      <div className="flex items-center justify-between">
        <Link
          to={"/login"}
          className="mt-5 font-roboto text-xs font-medium text-[#555]"
        >
          <h4>VOLVER</h4>
        </Link>
        <Link to={"/login/new-password"}>
          <button className="shadow-gray-500 mt-5 h-11 w-[13.25rem] rounded-[1.3rem] bg-[#E03030] font-roboto text-sm font-medium text-white shadow-md">
            ENVIAR CODIGO
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecoverPassPage;
