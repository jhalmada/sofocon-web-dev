import Input from "../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";
import { useState, useEffect } from "react";
import useApiRequest from "../Hooks/useApiRequest";
import { BASE_URL, HOME_ROUTE } from "../utils/Constants";
import useLogin from "../Hooks/auth/use.login.js";
import ReusableModal from "../components/modals/ReusableModal.jsx";

const LoginPage = () => {
  const { loading, onLogin } = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sendRequest, error, data } = useApiRequest(BASE_URL);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginResult = await onLogin({ email, password });
    console.log(loginResult);
    if (!loginResult) {
      setIsModalOpen(true);
    } else {
      navigate(HOME_ROUTE);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <Input
        placeholder={"Escribe tu correo"}
        label={"Dirección de correo"}
        msjError={
          "*Este campo debe contener una dirección de correo válida vinculada a la plataforma."
        }
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorApi={error}
      />
      <Input
        placeholder={"Escribe tu contraseña"}
        label={"Contraseña"}
        msjError={
          "*Este campo debe contener entre 8 y 20 caracteres alfanuméricos."
        }
        type={"password"}
        icon1={IconEye}
        icon2={IconEyeSlash}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorApi={error}
      />
      <div className="flex flex-col items-center">
        <button
          type="submit"
          disabled={loading}
          className={`shadow-gray-500 h-11 w-[9.1885rem] rounded-[1.25rem] font-roboto text-sm font-medium uppercase text-white shadow-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#D70000]"}`}
        >
          INGRESAR
        </button>
        {isModalOpen && (
          <ReusableModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Error de inicio de sesión"
            variant="confirmation"
            buttons={["accept"]}
            onAccept={handleCloseModal}
          >
            <p>Usuario o contraseña incorrectos</p>
          </ReusableModal>
        )}
        <Link
          to={"recuperar-contraseña"}
          className="mt-5 font-roboto text-xs font-medium text-[#555]"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
