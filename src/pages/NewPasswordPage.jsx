import { Link, useSearchParams } from "react-router-dom";
import Input from "../components/inputs/Input";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";
import { useForm } from "react-hook-form";
import ReusableModal from "../components/modals/ReusableModal";
import { useState } from "react";
import useChangedPassword from "../hooks/auth/useChangedPassword";

const NewPasswordPage = () => {
  const [modalMensaje, setModalMensaje] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { changedPassword } = useChangedPassword();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = (data) => {
    const { password } = data;
    if (data.password === data.password2) {
      const respuesta = changedPassword({ password }, token);
      console.log(respuesta);
    } else {
      setModalMensaje(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
      />
      <Input
        placeholder={"Escribe tu contraseña"}
        label={"Contraseña"}
        type={"password"}
        icon1={IconEye}
        icon2={IconEyeSlash}
        {...register("password2", {
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
        msjError={errors.password2 ? errors.password2.message : ""}
      />
      <div className="flex w-[100%] items-center justify-between">
        <Link
          to={"/login"}
          className="mt-5 font-roboto text-xs font-medium text-[#555]"
        >
          <h4 className="uppercase">VOLVER</h4>
        </Link>
        {/* <Link to="/login/cambiar-contraseña"> */}
        <button className="shadow-gray-500 mt-5 h-11 w-[13.25rem] rounded-[1.3rem] bg-[#E03030] font-roboto text-sm font-medium uppercase text-white shadow-md">
          CAMBIAR CONTRASEÑA
        </button>
        {/* </Link> */}
      </div>
      <ReusableModal
        isOpen={modalMensaje}
        onClose={() => setModalMensaje(false)}
        title="Error de contraseña"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setModalMensaje(false)}
      >
        Las contraseñas no coinciden.
      </ReusableModal>
    </form>
  );
};

export default NewPasswordPage;
