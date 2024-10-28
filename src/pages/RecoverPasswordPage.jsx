import { useForm } from "react-hook-form";
import Input from "../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import useRecovery from "../hooks/auth/useRecovery";
import { LOGIN_ROUTE, PASSWORD_CODE_ROUTE } from "../utils/Constants";
import ReusableModal from "../components/modals/ReusableModal";
import { useState } from "react";
const RecoverPasswordPage = () => {
  const [modalMensaje, setModalMensaje] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { postRecoveryPassword, loading } = useRecovery();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email } = data;
    const respuesta = await postRecoveryPassword({ email });
    console.log(respuesta);
    if (respuesta.response) {
      setModalMensaje(true);
    } else {
      navigate(`/${LOGIN_ROUTE}/${PASSWORD_CODE_ROUTE}`);
    }
  };

  return (
    <form className="w-full font-roboto" onSubmit={handleSubmit(onSubmit)}>
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

        <button
          type="submit"
          className="shadow-gray-500 mt-5 h-11 w-[13.25rem] rounded-[1.3rem] bg-red_b font-roboto text-sm font-medium uppercase text-white shadow-md"
        >
          ENVIAR CODIGO
        </button>
      </div>
      <ReusableModal
        isOpen={modalMensaje}
        onClose={() => setModalMensaje(false)}
        title="Correo inválido"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setModalMensaje(false)}
      >
        Este correo no se encuentra en la base de datos.
      </ReusableModal>
    </form>
  );
};
export default RecoverPasswordPage;
