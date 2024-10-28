import { Link } from "react-router-dom";

const PasswordCodePage = () => {
  return (
    <div className="text-center">
      <p className="font-roboto text-2xl font-medium">¡Revisa tu correo!</p>
      <p className="text-4 font-roboto font-normal">
        Te enviamos un correo con un enlace para restablecer tu contraseña.
      </p>
      <Link to={"/login"}>
        <button className="shadow-gray-500 mt-5 h-11 w-[13.25rem] rounded-[1.3rem] bg-[#E03030] font-roboto text-sm font-medium uppercase text-white shadow-md">
          Regresar
        </button>
      </Link>
    </div>
  );
};

export default PasswordCodePage;
