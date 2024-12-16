import Input from "../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";
import { useState } from "react";
import useApiRequest from "../hooks/useApiRequest";
import ReusableModal from "../components/modals/ReusableModal";
import { BASE_URL, HOME_ROUTE } from "../utils/Constants";
import useLogin from "../hooks/auth/use.login.js";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, onLogin } = useLogin();
  const navigate = useNavigate();
  const { error } = useApiRequest(BASE_URL);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      const loginResult = await onLogin(data);

      if (!loginResult) {
        // Mostrar mensaje de error
        setIsModalOpen(true);
      } else {
        navigate(HOME_ROUTE);
      }
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error
      alert("Ocurrió un error durante el inicio de sesión");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder={"Escribe tu correo"}
        label={"Dirección de correo"}
        {...register("email", {
          required: {
            value: true,
            message: "Campo obligatorio",
          },
          pattern: {
            value:
              /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto",
          },
        })} // Add this line
        errorApi={errors.email}
        msjError={errors.email ? errors.email.message : ""}
      />
      <Input
        placeholder={"Escribe tu contraseña"}
        label={"Contraseña"}
        type={"password"}
        icon1={IconEye}
        icon2={IconEyeSlash}
        {...register("password", {
          required: {
            value: true,
            message: "Campo obligatorio",
          },
          minLength: {
            value: 8,
            message: "La contraseña debe contener al menos 8 caracteres.",
          },
          maxLength: {
            value: 20,
            message: "La contraseña no puede exceder los 20 caracteres.",
          },
        })}
        msjError={errors.password ? errors.password.message : ""}
        errorApi={error}
      />

      <div className="mt-5 flex flex-col items-center">
        <Button
          isLoading={loading}
          disabled={loading}
          type="submit"
          color="primary"
          className={`shadow-gray-500 h-11 w-[9.1885rem] rounded-[1.25rem] font-roboto text-sm font-medium uppercase text-white shadow-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#D70000]"}`}
        >
          Ingresar
        </Button>
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
