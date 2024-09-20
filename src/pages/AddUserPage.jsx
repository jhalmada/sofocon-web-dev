import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link } from "react-router-dom";
import Checkbox from "../components/checkboxs/Checkbox";
import Select from "../components/selects/Select";
import Input from "../components/inputs/Input";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";

const AddUserPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
  };

  return (
    <div className="flex h-full flex-col justify-between bg-gray">
      <div className="flex-grow p-6">
        <div className="mb-4 flex items-center">
          <img
            src={ChevronLeftIcon}
            alt="arrow left"
            className="-ml-1 h-4 w-4"
          />
          <Link
            to="/inicio/usuarios"
            className="cursor-pointer text-sm font-medium leading-4"
          >
            Volver
          </Link>
        </div>
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Usuarios
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-36 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Nuevo usuario
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-tr-lg bg-white px-14 py-10 shadow-t"
        >
          <div className="space-y-3">
            <Input
              label={"Nombre Completo"}
              placeholder={"Escribe el nombre completo del usuario..."}
            />
            <Input
              label={"Correo electrónico"}
              placeholder={"Escribe el email del usuario..."}
            />
            <div className="pb-8">
              <Input
                type="password"
                icon1={IconEye}
                icon2={IconEyeSlash}
                label={"Contraseña"}
                placeholder={"Escribe la contraseña..."}
              />
              <p className="-mt-6 text-xs leading-[.875rem] text-black_b">
                *Este campo debe contener entre 8 y 20 caracteres alfanuméricos{" "}
              </p>
            </div>
            <Checkbox text={"Asignar rol existente"} />
            <Select option={"Rol"} />
            <Checkbox text={"Asignar nuevo rol"} />
            <div className="flex items-start space-x-10">
              <Input placeholder={"Escribe el nombre del rol..."} />
              <Select option={"Permisos"} variant="permisos" />
            </div>
          </div>
        </form>
        <div className="flex justify-end py-6">
          <div>
            <Button
              text={"GUARDAR"}
              onClick={handleSubmit}
              color={"save"}
              type={"submit"}
              icon={ArrowRightIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
