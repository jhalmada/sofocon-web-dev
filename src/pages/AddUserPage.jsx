import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "../components/checkboxs/Checkbox";
import Select from "../components/selects/Select";
import Input from "../components/inputs/Input";
import IconEye from "../assets/icons/IconEye.svg";
import IconEyeSlash from "../assets/icons/IconEyeSlash.svg";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useState } from "react";
import AddUsers from "../Hooks/users/use.addUsers";
import ReusableModal from "../components/modals/ReusableModal";
import { USERS_ROUTE } from "../utils/Constants";

const AddUserPage = () => {
  const { postAddUsers, loading } = AddUsers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const onPost = await postAddUsers({
      firstName: name,
      lastName: name,
      email,
      password,
      role: "b3137878-2db6-41a0-a697-49638086ca83",
    });
    console.log(onPost);

    if (onPost) {
      setIsModalOpen(true);
    }
    console.log("Formulario enviado");
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        {isModalOpen && (
          <ReusableModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Error al agregar usuario"
            variant="confirmation"
            buttons={["accept"]}
            onAccept={handleCloseModal}
          >
            <p>Usuario o contraseña incorrectos</p>
          </ReusableModal>
        )}
      </div>
    </div>
  );
};

export default AddUserPage;
