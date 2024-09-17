import Input from "../Components/Inputs/Input";
import { Link } from "react-router-dom";

const RecoverPasswordPage = () => {
  return (
    <div className="w-full font-roboto">
      <Input
        placeholder={"example@ejemail.com"}
        label={"Confirma tu correo"}
        msjError={
          "*Este campo debe contener una direccion de correo válida vinculada a la plataforma."
        }
      />
      <p className="mt-4 max-w-[27.1875rem] text-xs font-light">
        Introduce tu dirección de correo electrónico y te enviaremos un enlace
        para restablecer tu contraseña.
      </p>
      <div className="flex items-center justify-between">
        <Link
          to="/login"
          className="mt-5 text-xs font-medium uppercase text-black_m"
        >
          VOLVER
        </Link>
        <Link to={"/login/nueva-contraseña"}>
          <button className="shadow-gray-500 mt-5 h-11 w-[13.25rem] rounded-[1.3rem] bg-red_b font-roboto text-sm font-medium uppercase text-white shadow-md">
            ENVIAR CODIGO
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
