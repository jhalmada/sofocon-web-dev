import { Link } from "react-router-dom";
import CompInputPass from "../Components/Inputs/CompInputPass";

const NewPasswordPage = () => {
  return (
    <div className="w-full">
      <CompInputPass
        placeholder={"escribe tu nueva contraseña"}
        label={"Nueva contraseña"}
        msjError={
          "*Este campo debe contener entre 8 y 20 caracteres alfanuméricos."
        }
      />
      <CompInputPass
        placeholder={"escribe tu nueva contraseña"}
        label={"Confirma tu contraseña"}
        msjError={
          "*Este campo debe contener entre 8 y 20 caracteres alfanuméricos. Debe coincidir con el campo anterior."
        }
      />
      <div className="flex w-[100%] items-center justify-between">
        <Link
          to={"/login"}
          className="mt-5 font-roboto text-xs font-medium text-[#555]"
        >
          <h4>VOLVER</h4>
        </Link>
        <Link to="/login/password-Changed">
          <button className="shadow-gray-500 mt-5 h-11 w-[13.25rem] rounded-[1.3rem] bg-[#E03030] font-roboto text-sm font-medium text-white shadow-md">
            CAMBIAR CONTRASEÑA
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewPasswordPage;
