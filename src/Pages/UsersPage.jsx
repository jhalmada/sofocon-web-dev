import { useState } from "react";
import { Link } from "react-router-dom";
import UserRow from "../components/UserRow";
import { users } from "../Utils/Datainfo";
import TableRole from "../components/Tables/TableRole";
import Button from "../components/Buttons/Button";
import ModalAddUser from "../components/Modals/ModalAddUser";
import Pagination from "../components/Pagination";

import PlusIcon from "../assets/Iconos/plus.svg";
import ChevronLeftIcon from "../assets/Iconos/chevron-left.svg";
import SearchIcon from "../assets/Iconos/search.svg";
import FilterRightIcon from "../assets/Iconos/filter-right.svg";
import ChevronDownIcon from "../assets/Iconos/chevron-down.svg";

const USER_TAB = "users";
const ROLES_TAB = "roles";

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState(USER_TAB);
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
          <Link to="/inicio">
            <p className="text-sm font-medium leading-4">Volver</p>
          </Link>
        </div>
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Usuarios
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(USER_TAB)}
              className={`w-36 cursor-pointer rounded-t-lg ${activeTab === USER_TAB ? "bg-white" : "bg-black_l"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Usuarios
            </h2>
            <h2
              onClick={() => setActiveTab(ROLES_TAB)}
              className={`${activeTab === ROLES_TAB ? "bg-white" : "bg-black_l"} w-36 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Roles
            </h2>
          </div>
          <div className="flex h-8 items-center gap-[0.875rem] rounded px-1 py-2">
            <img
              src={SearchIcon}
              alt="Search icon"
              className="h-8 w-8 rounded-[1.875rem] bg-white p-1"
            />
            {activeTab === USER_TAB && (
              <Link to="agregar-usuario">
                <Button text="Nuevo Usuario" icon={PlusIcon} />
              </Link>
            )}
            {activeTab === ROLES_TAB && (
              <Link to="agregar-rol">
                <Button text="Agregar Rol" icon={PlusIcon} />
              </Link>
            )}
          </div>
        </div>
        {activeTab === USER_TAB && (
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
        {activeTab === ROLES_TAB && <TableRole />}
      </div>
      <div className="flex justify-center p-6">
        <Pagination />
      </div>
      <ModalAddUser isOpen={isModalOpen} onClose={closeModal} />
      {/* Se renderiza el modal */}
    </div>
  );
};

export default UsersPage;
