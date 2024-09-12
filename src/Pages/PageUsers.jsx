import { useState } from "react";
import UserRow from "../components/UserRow";
import { users } from "../Utils/Datainfo";
import CompTableRoles from "../Components/Tables/CompTableRoles";
import CompButtonAdd from "../Components/Buttons/CompButtonAdd";
import { Link } from "react-router-dom";
import CompFormAddRol from "../Components/Forms/CompFormAddRol";

const PageUsers = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [addRol, setAddRol] = useState(false);
  console.log(addRol);
  return (
    <div className="bg-black_l">
      <div className="p-4">
        <h1 className="mb-5 text-xl font-medium leading-[24px]">Usuarios</h1>
        <div className="flex items-center justify-between">
          <div className="flex">
            <h2
              onClick={() => setActiveTab("users")}
              className={`w-[145px] cursor-pointer rounded-t-lg ${activeTab === "users" ? "bg-white" : "bg-gray_b"} p-4 text-center text-md font-medium leading-[24px] shadow-t`}
            >
              Usuarios
            </h2>
            <h2
              onClick={() => setActiveTab("roles")}
              className={`${activeTab === "roles" ? "bg-white" : "bg-gray_b"} w-[145px] cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-[24px]`}
            >
              Roles
            </h2>
            {addRol && (
              <h2
                onClick={() => setActiveTab("newRoles")}
                className={`${activeTab === "newRoles" ? "bg-white" : "bg-gray_b"} w-[145px] cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-[24px]`}
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
              {/* aqui manejo los diferentes botones que permitiran agregar un usuario o un rol */}
              {activeTab === "users" && (
                <CompButtonAdd text="Agregar Usuario" />
              )}
              {activeTab === "roles" && (
                <CompButtonAdd
                  text="Agregar Rol"
                  onClick={() => setAddRol(!addRol)}
                />
              )}
            </div>
          )}
        </div>
        {/* Desde aqui empezaremos a trabajar con el renderizado condional teniendo en cuenta el valor del activeTab */}
        {/* Si activeTab es igual a "users" se renderiza el siguiente bloque de codigo */}
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
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Si activeTab es igual a "roles" se renderiza el siguiente bloque de codigo */}
        {activeTab === "roles" && <CompTableRoles />}
        {/* Si activeTab es igual a "roles" se renderiza el siguiente bloque de codigo */}
        {activeTab === "newRoles" && <CompFormAddRol />}
        {/* Esto tiene que llevarse a un componente aparte para la paginacion  */}
        <div className="flex justify-center p-4">
          <div className="flex px-[6px]">
            <button className="rounded px-4 py-2">
              <img
                src="/assets/icons/SkipPreviousFilled.svg"
                alt="Skipe field icon"
              />
            </button>
            <div className="flex space-x-2">
              <button className="rounded px-4 py-2">
                <img
                  src="/assets/icons/ChevronLeftFilled.svg"
                  alt="Skipe field icon"
                />
              </button>
              <button className="rounded rounded-full bg-gray-400 px-4 py-2">
                1
              </button>
              <button className="rounded px-4 py-2">2</button>
              <button className="rounded px-4 py-2">3</button>
              <button className="rounded px-4 py-2">4</button>
              <button className="rounded px-4 py-2">5</button>
              <button className="rounded px-4 py-2">6</button>
              <button className="rounded px-4 py-2">7</button>
              <button className="rounded px-4 py-2">
                <img
                  src="/assets/icons/ChevronRightFilled.svg"
                  alt="Skipe field icon"
                />
              </button>
            </div>
            <button className="rounded px-4 py-2">
              <img
                src="/assets/icons/SkipNextFilled.svg"
                alt="Skipe field icon"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageUsers;
