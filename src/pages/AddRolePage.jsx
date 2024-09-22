import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";

const AddRolePage = () => {
  const [name, setName] = useState("");
  const { postAddRoles, loading, idRol } = useAddroles();

  const [values, setValues] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRole = await postAddRoles({
      name,
      permissions: values,
    });
    console.log("rol creado");
    console.log(newRole);
    console.log(idRol);
  };

  const handleSelectionChange = (e) => {
    setValues(e.target.value.split(","));
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
          <div className="space-y-3">
            <Input
              label={"Nombre del rol"}
              placeholder={"Escribe el nombre del rol..."}
            />

            <Select
              label={"Asignar permisos"}
              option={"Permisos"}
              variant={"permisos"}
            />
          </div>

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
        </form>
        <ReusableModal
          isOpen={isSaveConfirmationModalOpen}
          onClose={closeSaveConfirmationModal}
          title="Cambios guardados"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={handleConfirmSaveClick}
        >
          Los cambios fueron guardados exitosamente.
        </ReusableModal>
      </div>
    </div>
  );
};

export default AddRolePage;
