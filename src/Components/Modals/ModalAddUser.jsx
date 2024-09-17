import React from "react";
import CheckLgIcon from "../../assets/Iconos/check-lg.svg";
import Button from "../Buttons/Button";
import Checkbox from "../Checkboxs/Checkbox";
import Input from "../Inputs/Input";
import CompSelects from "../Selects/CompSelects";
import IconEye from "../../assets/Iconos/IconEye.svg";
import IconEyeSlash from "../../assets/Iconos/IconEyeSlash.svg";
import XlgIcon from "../../assets/Iconos/x-lg.svg";

const ModalAddUser = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative max-h-screen w-[27.75rem] max-w-[27.75rem] overflow-auto rounded-lg bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 hover:text-gray-700 absolute right-7 top-8"
          onClick={onClose}
        >
          <img src={XlgIcon} alt="Close icon" className="h-6 w-6" />
        </button>
        <h2 className="mb-8 text-xl font-semibold">Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Input
              label={"Nombre completo"}
              placeholder={"Escribe el nombre completo del usuario..."}
            />

            <Input
              label={"Correo electrónico"}
              placeholder={"Escribe el email del usuario..."}
            />

            <div>
              <Input
                label={"Contraseña"}
                placeholder={"Escribe la contraseña..."}
                type="password"
                icon1={IconEye}
                icon2={IconEyeSlash}
              />
              <p className="-mt-6 text-xs leading-[.875rem] text-black_b">
                *Este campo debe contener entre 8 y 20 caracteres alfanuméricos
              </p>
            </div>

            <Checkbox text={"Asignar rol existente"} />
            <CompSelects option={"Rol"} />
            <Checkbox text={"Asignar nuevo rol"} />
            <Input placeholder={"Escribe el nombre del rol..."} />
          </div>

          <div className="mt-10 flex justify-between">
            <Button text={"Cancelar"} color={"cancel"} type={"button"} />
            <Button
              text={"GUARDAR"}
              color={"save"}
              icon={CheckLgIcon}
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddUser;
