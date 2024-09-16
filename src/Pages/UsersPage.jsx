import { useState } from "react";
import { Link } from "react-router-dom";
import UserRow from "../components/UserRow";
import { users } from "../Utils/Datainfo";
import CompTableRoles from "../components/Tables/CompTableRoles";
import Button from "../components/Buttons/Button";
import CompFormAddRol from "../components/Forms/CompFormAddRol";
import CompModalUsers from "../components/Modals/CompModalUsers";
import Pagination from "../components/Pagination";

import PlusIcon from "../assets/Iconos/plus.svg";
import ChevronLeftIcon from "../assets/Iconos/chevron-left.svg";
import SearchIcon from "../assets/Iconos/search.svg";
import FilterRightIcon from "../assets/Iconos/filter-right.svg";
import ChevronDownIcon from "../assets/Iconos/chevron-down.svg";

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [addRol, setAddRol] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
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
          <Link to={"/home"}>
            <p className="text-sm font-medium leading-4">Volver</p>
          </Link>
        </div>
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Usuarios
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex">
            <h2
              onClick={() => setActiveTab("users")}
              className={`w-36 cursor-pointer rounded-t-lg ${activeTab === "users" ? "bg-white" : "bg-black_l"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Usuarios
            </h2>
            <h2
              onClick={() => setActiveTab("roles")}
              className={`${activeTab === "roles" ? "bg-white" : "bg-black_l"} w-36 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Roles
            </h2>
            {addRol && (
              <h2
                onClick={() => setActiveTab("newRoles")}
                className={`${activeTab === "newRoles" ? "bg-white" : "bg-black_l"} w-36 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
              >
                Nuevo Rol
              </h2>
            )}
          </div>
          {activeTab !== "newRoles" && (
            <div className="flex h-8 items-center gap-[0.875rem] rounded px-1 py-2">
              <img
                src={SearchIcon}
                alt="Search icon"
                className="h-8 w-8 rounded-[1.875rem] bg-white p-1"
              />
              {activeTab === "users" && (
                <Button text="Nuevo Usuario" icon={PlusIcon} />
              )}
              {activeTab === "roles" && (
                <Button
                  text="Agregar Rol"
                  icon={PlusIcon}
                  onClick={() => setAddRol(!addRol)}
                />
              )}
            </div>
          )}
        </div>
        {activeTab === "users" && (
          <div className="rounded-tr-lg bg-white p-5 shadow-t">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]"></th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Nombre Completo
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Email
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Contraseña
                  </th>
                  <th className="flex gap-4 p-2 text-left text-md font-semibold leading-[1.125rem]">
                    <h3>Rol</h3>
                    <div className="flex gap-2">
                      <img
                        src={FilterRightIcon}
                        alt="chevron-down icon"
                        className="h-5 w-5 cursor-pointer"
                      />
                      <img
                        src={ChevronDownIcon}
                        alt="chevron-down icon"
                        className="h-5 w-5 cursor-pointer"
                      />
                    </div>
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <UserRow
                    key={index}
                    avatarSrc={user.avatarSrc}
                    fullName={user.fullName}
                    email={user.email}
                    password={user.password}
                    role={user.role}
                    editIconSrc={user.editIconSrc}
                    deleteIconSrc={user.deleteIconSrc}
                    onEditClick={() => openModal()}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "roles" && <CompTableRoles />}
        {activeTab === "newRoles" && <CompFormAddRol />}
      </div>
      <div className="flex justify-center p-6">
        <Pagination />
      </div>
      <CompModalUsers isOpen={isModalOpen} onClose={closeModal} />{" "}
      {/* Se renderiza el modal */}
    </div>
  );
};

export default UsersPage;
