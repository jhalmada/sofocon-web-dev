const PageUsers = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <h2 className="bg-pink_l text-md shadow-t w-[145px] cursor-pointer rounded-t-lg p-4 text-center font-medium leading-[24px]">
            Usuarios
          </h2>
          <h2 className="bg-black_l text-md w-[145px] cursor-pointer rounded-t-lg p-4 text-center font-medium leading-[24px]">
            Roles
          </h2>
        </div>
        <div className="bg-black_l flex h-[30px] items-center gap-[14px] rounded-[4px] px-[4px] py-[8px] md:mr-5">
          <img
            src="assets/icons/filter-right.svg"
            alt="filter-right icon"
            className="h-[24px] w-[24px]"
          />
          <img
            src="assets/icons/chevron-down.svg"
            alt="chevron-down icon"
            className="h-[24px] w-[24px] cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-pink_l shadow-t p-[20px]">
        <div className="flex justify-between px-2 pt-6">
          <div>
            <img
              src="assets/icons/avatar.svg"
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
              src="assets/icons/pencil-square.svg"
              alt="pencil-square icon"
              className="h-[20px] w-[20px]"
            />
          </div>
        </div>
        <div className="flex justify-between px-2 pt-6">
          <div>
            <img
              src="assets/icons/avatar.svg"
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
              src="assets/icons/pencil-square.svg"
              alt="pencil-square icon"
              className="h-[20px] w-[20px]"
            />
          </div>
        </div>
        <div className="flex justify-between px-2 pt-6">
          <div>
            <img
              src="assets/icons/avatar.svg"
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
              src="assets/icons/pencil-square.svg"
              alt="pencil-square icon"
              className="h-[20px] w-[20px]"
            />
          </div>
        </div>
        <div className="flex justify-between px-2 pt-6">
          <div>
            <img
              src="assets/icons/avatar.svg"
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
              src="assets/icons/pencil-square.svg"
              alt="pencil-square icon"
              className="h-[20px] w-[20px]"
            />
          </div>
        </div>

        <div className="flex justify-between px-2 pt-6">
          <div>
            <img
              src="assets/icons/avatar.svg"
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
              src="assets/icons/pencil-square.svg"
              alt="pencil-square icon"
              className="h-[20px] w-[20px]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-6 pt-6">
        <button className="bg-blue_b shadow-blur flex h-[60px] w-[321px] items-center justify-between rounded-[12px] px-6">
          <h2 className="text-md font-medium leading-[24px] text-white">
            Nuevo usuario
          </h2>
          <img
            src="assets/icons/plus.svg"
            alt="plus-icon"
            className="h-[30px] w-[30px]"
          />
        </button>
      </div>
    </div>
  );
};

export default PageUsers;
