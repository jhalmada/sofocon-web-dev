import { useState } from "react";

const PageUsers = () => {
  const [activeTab, setActiveTab] = useState("users");
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <h2
            className={`w-[145px] cursor-pointer rounded-t-lg ${activeTab === "users" ? "bg-pink_l" : "bg-black_l"} p-4 text-center text-md font-medium leading-[24px] shadow-t`}
            onClick={() => setActiveTab("users")}
          >
            Usuarios
          </h2>
          <h2
            onClick={() => setActiveTab("rols")}
            className={`w-[145px] cursor-pointer rounded-t-lg ${activeTab === "rols" ? "bg-pink_l" : "bg-black_l"} p-4 text-center text-md font-medium leading-[24px]`}
          >
            Roles
          </h2>
        </div>
        <div className="flex h-[30px] items-center gap-[14px] rounded-[4px] bg-black_l px-[4px] py-[8px] md:mr-5">
          <img
            src="/assets/icons/filter-right.svg"
            alt="filter-right icon"
            className="h-[24px] w-[24px]"
          />
          <img
            src="/assets/icons/chevron-down.svg"
            alt="chevron-down icon"
            className="h-[24px] w-[24px] cursor-pointer"
          />
        </div>
      </div>
      {activeTab === "users" && (
        <div className="bg-pink_l p-[20px] shadow-t">
          <div className="flex justify-between px-2 pt-6">
            <div>
              <img
                src="/assets/icons/avatar.svg"
                alt="Avatar icon"
                className="h-[40px] w-[40px]"
              />
            </div>
            <div>Nombre completo</div>
            <div>Email</div>
            <div>Contraseña</div>
            <div>Rol</div>
            <div>
              {" "}
              <img
                src="/assets/icons/pencil-square.svg"
                alt="pencil-square icon"
                className="h-[20px] w-[20px]"
              />
            </div>
          </div>
          <div className="flex justify-between px-2 pt-6">
            <div>
              <img
                src="/assets/icons/avatar.svg"
                alt="Avatar icon"
                className="h-[40px] w-[40px]"
              />
            </div>
            <div>Nombre completo</div>
            <div>Email</div>
            <div>Contraseña</div>
            <div>Rol</div>
            <div>
              {" "}
              <img
                src="/assets/icons/pencil-square.svg"
                alt="pencil-square icon"
                className="h-[20px] w-[20px]"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end pr-6 pt-6">
        <button className="flex h-[60px] w-[321px] items-center justify-between rounded-[12px] bg-blue_b px-6 shadow-blur">
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
  );
};

export default PageUsers;
