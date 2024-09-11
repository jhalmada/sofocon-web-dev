import { Link } from "react-router-dom";
import CompInputPass from "../Components/Inputs/CompInputPass";

const PageNewPassword = () => {
  return (
    <>
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
      <div className="mt-8 flex w-[100%] justify-between">
        <Link
          to={"/login"}
          className="mt-5 font-roboto text-xs font-medium text-[#555]"
        >
          <h4>VOLVER</h4>
        </Link>
        <Link to="/login/password-Changed">
          <button className="h-[45px] w-[188px] rounded-[20px] bg-[#D70000] font-roboto text-sm text-xl font-medium text-white shadow-md shadow-gray-500">
            CAMBIAR CONTRASEÑA
          </button>
        </Link>
      </div>
    </>
  );
};

export default PageNewPassword;
