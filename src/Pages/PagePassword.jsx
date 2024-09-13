import { Link } from "react-router-dom";

const PagePassword = () => {
  return (
    <div className="text-center">
      <h4 className="font-roboto text-2xl font-medium">
        ¡Contraseña actualizada con exito!
      </h4>
      <p className="text-4 font-roboto font-normal">
        Tu contraseña ha sido cambiada correctamente. Ahora puedes iniciar
        sesión con tu nueva contraseña.
      </p>
      <Link to={"/login"}>
        <button className="shadow-gray-500 mt-5 h-11 w-[13.25rem] rounded-[1.3rem] bg-[#E03030] font-roboto text-sm font-medium text-white shadow-md">
          INGRESAR
        </button>
      </Link>
    </div>
  );
};

export default PagePassword;
