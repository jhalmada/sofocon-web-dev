import UserRow from "../components/UserRow";

const users = [
  {
    avatarSrc: "/assets/icons/avatar.svg",
    fullName: "Nombre completo",
    email: "email@example.com",
    password: "Contraseña",
    role: "Rol",
    editIconSrc: "/assets/icons/pencil-square.svg",
    deleteIconSrc: "/assets/icons/trash3.svg",
  },
  {
    avatarSrc: "/assets/icons/avatar.svg",
    fullName: "Nombre completo",
    email: "email@example.com",
    password: "Contraseña",
    role: "Rol",
    editIconSrc: "/assets/icons/pencil-square.svg",
    deleteIconSrc: "/assets/icons/trash3.svg",
  },
  {
    avatarSrc: "/assets/icons/avatar.svg",
    fullName: "Nombre completo",
    email: "email@example.com",
    password: "Contraseña",
    role: "Rol",
    editIconSrc: "/assets/icons/pencil-square.svg",
    deleteIconSrc: "/assets/icons/trash3.svg",
  },
];

const PageUsers = () => {
  return (
    <div className="bg-black_l">
      <div className="p-4">
        <h1 className="mb-5 text-xl font-medium leading-[24px]">Usuarios</h1>
        <div className="flex items-center justify-between">
          <div className="flex">
            <h2 className="w-[145px] cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-[24px] shadow-t">
              Usuarios
            </h2>
            <h2 className="w-[145px] cursor-pointer rounded-t-lg bg-gray_b p-4 text-center text-md font-medium leading-[24px]">
              Roles
            </h2>
          </div>
          <div className="flex h-[30px] items-center gap-[14px] rounded-[4px] px-[4px] py-[8px]">
            <img
              src="/assets/icons/search.svg"
              alt="Search icon"
              className="h-[32px] w-[32px] rounded-[30px] bg-white p-1"
            />

            <button className="flex h-[40px] items-center justify-between rounded-[20px] bg-blue_b px-[20px] py-[4px] shadow-blur">
              <h2 className="text-md font-medium leading-[24px] text-white">
                Nuevo usuario
              </h2>
              <img
                src="/assets/icons/plus.svg"
                alt="plus-icon"
                className="h-[30px] w-[30px]"
              />
            </button>
          </div>
        </div>

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
