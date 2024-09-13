import { useState } from "react";
import { Link } from "react-router-dom";
import UserRow from "../components/UserRow";
import { users } from "../Utils/Datainfo";
import CompTableRoles from "../Components/Tables/CompTableRoles";
import CompButtonAdd from "../Components/Buttons/CompButtonAdd";
import CompFormAddRol from "../Components/Forms/CompFormAddRol";
import CompModalUsers from "../components/Modals/CompModalUsers";
import Pagination from "../components/Pagination";

const PageUsers = () => {
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
            src="/assets/icons/chevron-left.svg"
            alt="arrow left"
            className="-ml-1 h-[16px] w-[16px]"
          />
          <Link to={"/home"}>
            <p className="text-sm font-medium leading-[16px]">Volver</p>
          </Link>
        </div>
        <h1 className="mb-5 text-xl font-medium leading-[24px] text-black_m">
          Usuarios
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex">
            <h2
              onClick={() => setActiveTab("users")}
              className={`w-[145px] cursor-pointer rounded-t-lg ${activeTab === "users" ? "bg-white" : "bg-black_l"} p-4 text-center text-md font-medium leading-[24px] shadow-t`}
            >
              Usuarios
            </h2>
            <h2
              onClick={() => setActiveTab("roles")}
              className={`${activeTab === "roles" ? "bg-white" : "bg-black_l"} w-[145px] cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-[24px] shadow-t`}
            >
              Roles
            </h2>
            {addRol && (
              <h2
                onClick={() => setActiveTab("newRoles")}
                className={`${activeTab === "newRoles" ? "bg-white" : "bg-black_l"} w-[145px] cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-[24px] shadow-t`}
              >
                Nuevo Rol
              </h2>
            )}
          </div>
          {activeTab !== "newRoles" && (
            <div className="flex h-[30px] items-center gap-[14px] rounded-[4px] px-[4px] py-[8px]">
              <img
                src="/assets/icons/search.svg"
                alt="Search icon"
                className="h-[32px] w-[32px] rounded-[30px] bg-white p-1"
              />
              {activeTab === "users" && <CompButtonAdd text="Nuevo Usuario" />}
              {activeTab === "roles" && (
                <CompButtonAdd
                  text="Agregar Rol"
                  onClick={() => setAddRol(!addRol)}
                />
              )}
            </div>
          )}
        </div>
        {activeTab === "users" && (
          <div className="rounded-tr-lg bg-white p-[20px] shadow-t">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[18px]"></th>
                  <th className="p-2 text-left text-md font-semibold leading-[18px]">
                    Nombre Completo
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[18px]">
                    Email
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[18px]">
                    Contraseña
                  </th>
                  <th className="flex gap-4 p-2 text-left text-md font-semibold leading-[18px]">
                    <h3>Rol</h3>
                    <div className="flex gap-2">
                      <img
                        src="/assets/icons/filter-right.svg"
                        alt="chevron-down icon"
                        className="h-[20px] w-[20px] cursor-pointer"
                      />
                      <img
                        src="/assets/icons/chevron-down.svg"
                        alt="chevron-down icon"
                        className="h-[20px] w-[20px] cursor-pointer"
                      />
                    </div>
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[18px]">
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

export default PageUsers;
