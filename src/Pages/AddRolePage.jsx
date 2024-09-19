import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link } from "react-router-dom";
import Select from "../components/selects/Select";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";

const AddRolePage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
  };
  return (
    <div className="flex h-full flex-col justify-between overflow-auto bg-gray">
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

        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-36 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Roles
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-tr-lg bg-white px-14 py-10 shadow-t"
        >
          <div className="space-y-6">
            <Input
              label={"Nombre del rol"}
              placeholder={"Escribe el nombre del rol..."}
            />

            <Select option={"Permisos"} />
          </div>
        </form>
        <div className="flex justify-end py-6">
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
  );
};

export default AddRolePage;
