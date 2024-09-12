import { Link } from "react-router-dom";

const PagePassword = () => {
  return (
    <div className="text-center">
      <h4 className="font-roboto text-2xl font-medium">
        ¡Contraseña actualizada con exito!
      </h4>
      <p className="font-roboto text-[16px] font-normal">
        Tu contraseña ha sido cambiada correctamente. Ahora puedes iniciar
        sesión con tu nueva contraseña.
      </p>
      <Link to={"/login"}>
        <button className="mt-10 h-[45px] w-[188px] rounded-[20px] bg-[#D70000] font-roboto text-sm font-medium text-white shadow-md shadow-gray-500">
          INGRESAR
        </button>
      </Link>
    </div>
  );
};

export default PagePassword;
