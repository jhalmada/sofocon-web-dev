import Input from "../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";
import { useState, useEffect } from "react";
import useApiRequest from "../Hooks/useApiRequest";
import { BASE_URL, HOME_ROUTE } from "../utils/Constants";
import ReusableModal from "../components/modals/ReusableModal";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sendRequest, error, data, loading } = useApiRequest(BASE_URL);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendRequest({
      endpoint: "/auth/login",
      method: "POST",
      body: {
        email,
        password,
      },
      headers: {
        "origin-login": "dashboard",
        "Content-Type": "application/json",
      },
    });

    if (data) {
      localStorage.setItem("token", data.accessToken);
      navigate(HOME_ROUTE);
    } else if (error) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (error) {
      setIsModalOpen(true);
    }
  }, [error]);

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
        {error && (
          <ReusableModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Error de inicio de sesión"
            variant="confirmation"
            buttons={["accept"]}
            onAccept={handleCloseModal}
          >
            <p>{error}</p>
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
