import CompInput from "../Components/Inputs/CompInput";
import { Link } from "react-router-dom";

const PageRecoverPass = () => {
  return (
    <>
      <CompInput
        placeholder={"example@ejemail.com"}
        label={"Confirma tu correo"}
        msjError={
          "*Este campo debe contener una direccion de correo válida vinculada a la plataforma."
        }
      />
      <p className="mt-4 max-w-[435px] font-roboto text-xs font-light">
        Introduce tu dirección de correo electrónico y te enviaremos un enlace
        para restablecer tu contraseña.
      </p>
      <div className="flex w-[100%] justify-between">
        <Link
          to={"/login"}
          className="mt-5 font-roboto text-xs font-medium text-[#555]"
        >
          <h4>VOLVER</h4>
        </Link>
        <Link to={"/login/new-password"}>
          <button className="h-[45px] w-[147px] rounded-[20px] bg-[#D70000] font-roboto text-sm text-xl font-medium text-white shadow-md shadow-gray-500">
            ENVIAR CODIGO
          </button>
        </Link>
      </div>
    </>
  );
};

export default PageRecoverPass;
