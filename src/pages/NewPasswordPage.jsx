import { Link } from "react-router-dom";
import Input from "../components/inputs/Input";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";

const NewPasswordPage = () => {
  return (
    <div className="w-full">
      <Input
        placeholder={"escribe tu nueva contraseña"}
        label={"Nueva contraseña"}
        msjError={
          "*Este campo debe contener entre 8 y 20 caracteres alfanuméricos."
        }
        type={"password"}
        icon1={IconEye}
        icon2={IconEyeSlash}
      />
      <Input
        placeholder={"escribe tu nueva contraseña"}
        label={"Confirma tu contraseña"}
        msjError={
          "*Este campo debe contener entre 8 y 20 caracteres alfanuméricos. Debe coincidir con el campo anterior."
        }
        type={"password"}
        icon1={IconEye}
        icon2={IconEyeSlash}
      />
      <div className="flex w-[100%] items-center justify-between">
        <Link
          to={"/login"}
          className="mt-5 font-roboto text-xs font-medium text-[#555]"
        >
          <h4 className="uppercase">VOLVER</h4>
        </Link>
        <Link to="/login/cambiar-contraseña">
          <button className="shadow-gray-500 mt-5 h-11 w-[13.25rem] rounded-[1.3rem] bg-[#E03030] font-roboto text-sm font-medium uppercase text-white shadow-md">
            CAMBIAR CONTRASEÑA
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewPasswordPage;
