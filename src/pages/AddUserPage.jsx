import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link } from "react-router-dom";
import Checkbox from "../components/checkboxs/Checkbox";
import Input from "../components/inputs/Input";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useState } from "react";
import AddUsers from "../Hooks/users/use.addUsers";
import ReusableModal from "../components/modals/ReusableModal";
import { permisos } from "../utils/permisons";
import { roles } from "../utils/DataInfo";
import { Select, SelectItem } from "@nextui-org/select";

const AddUserPage = () => {
  const { postAddUsers, loading } = AddUsers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [values, setValues] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = await postAddUsers({
        firstName: name,
        lastName: name,
        email,
        password,
        role: "b3137878-2db6-41a0-a697-49638086ca83",
      });

      console.log(newUser);
      if (newUser) {
        setSaveConfirmationModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      setIsModalOpen(true);
    }
  };

  const handleSelectionChange = (e) => {
    setValues(e.target.value.split(","));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
  };

  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
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
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Input
              label={"Correo electrónico"}
              placeholder={"Escribe el email del usuario..."}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="pb-8">
              <Input
                type="password"
                icon1={IconEye}
                icon2={IconEyeSlash}
                label={"Contraseña"}
                placeholder={"Escribe la contraseña..."}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <p className="-mt-6 text-xs leading-[.875rem] text-black_b">
                *Este campo debe contener entre 8 y 20 caracteres alfanuméricos
              </p>
            </div>
            <Checkbox text={"Asignar rol existente"} />
            <Select
              labelPlacement="outside"
              selectionMode="multiple"
              placeholder="Rol"
              selectedKeys={values}
              className="max-w rounded-md border font-roboto font-medium"
              onChange={handleSelectionChange}
            >
              {roles.map((rol, index) => (
                <SelectItem key={index}>{rol.fullName}</SelectItem>
              ))}
            </Select>

            <div className="flex items-center space-x-10">
              <div className="mt-9 flex w-full flex-col space-y-2">
                <Checkbox text={"Asignar nuevo rol"} />
                <Input placeholder={"Escribe el nombre del rol..."} />
              </div>
              <div className="w-full">
                <Select
                  labelPlacement="outside"
                  label="Asignar permisos"
                  selectionMode="multiple"
                  placeholder="Permisos"
                  selectedKeys={values}
                  className="max-w rounded-md border font-roboto font-medium"
                  onChange={handleSelectionChange}
                >
                  {permisos.map((permiso) => (
                    <SelectItem key={permiso.key}>{permiso.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
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

        {isModalOpen && (
          <ReusableModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Error al agregar usuario"
            variant="confirmation"
            buttons={["accept"]}
            onAccept={handleCloseModal}
          >
            Ha ocurrido un error mientras se creaba el usuario
          </ReusableModal>
        )}
      </div>
    </div>
  );
};

export default AddUserPage;
