import ChevronLeftIcon from "../assets/Iconos/chevron-left.svg";
import { Link } from "react-router-dom";
import CompCheckbox from "../components/Checkboxs/CompCheckbox";
import CompSelects from "../components/Selects/CompSelects";
import CompInput from "../components/Inputs/CompInput";
import CompInputPass from "../components/Inputs/CompInputPass";
import Button from "../components/Buttons/Button";
import ArrowRightIcon from "../assets/Iconos/arrow-right.svg";
const CompaniesPage = () => {
  return (
    <div className="flex h-full flex-col justify-between bg-gray">
      <div className="flex-grow p-6">
        <div className="mb-4 flex items-center">
          <img
            src={ChevronLeftIcon}
            alt="arrow left"
            className="-ml-1 h-4 w-4"
          />
          <Link to={"/home"}>
            <p className="text-sm font-medium leading-4">Volver</p>
          </Link>
        </div>
        <div></div>
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Empresas
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-36 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Nuevo Usuario
            </span>
          </div>
        </div>
        <div className="rounded-tr-lg bg-white px-14 py-5 shadow-t">
          <div className="space-y-6">
            <CompInput
              label={"Nombre Completo"}
              placeholder={"Escribe el nombre completo del usuario..."}
            />
            <CompInput
              label={"Correo electrónico"}
              placeholder={"Escribe el email del usuario..."}
            />
            <div className="pb-8">
              <CompInputPass
                label={"Contraseña"}
                placeholder={"Escribe la contraseña..."}
              />
              <p className="-mt-6 text-xs leading-[.875rem] text-black_b">
                *Este campo debe contener entre 8 y 20 caracteres alfanuméricos{" "}
              </p>
            </div>
            <CompCheckbox text={"Asignar rol existente"} />
            <CompSelects option={"Rol"} />
            <CompCheckbox text={"Asignar nuevo rol"} />
            <div className="flex items-start space-x-10">
              <CompInput placeholder={"Escribe el nombre del rol..."} />
              <CompSelects option={"Permisos"} width="30%" />
            </div>
          </div>
        </div>
        <div className="flex justify-end py-6">
          <Button text={"GUARDAR"} type={"save"} icon={ArrowRightIcon} />
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
