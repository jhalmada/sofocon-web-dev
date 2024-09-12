import { roles } from "../../Utils/Datainfo";
//esta funcion nos va a permitir formatear los permisos de un rol para que se muestre como en el figma
const formatPermisos = (permisos) => {
  return permisos.join("/");
};
const CompTableRoles = () => {
  return (
    <div className="rounded-tr-lg bg-white p-[20px] shadow-t">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 text-left text-md font-semibold leading-[18px]"></th>
            <th className="w-[60%] p-2 text-left text-md font-semibold leading-[18px]">
              Rol
            </th>

            <th className="flex gap-4 p-2 text-left text-md font-semibold leading-[18px]">
              Permisos
            </th>
            <th className="p-2 text-left text-md font-semibold leading-[18px]">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {roles.map((user, index) => (
            <tr key={index}>
              <td className="p-2">
                <img
                  src={user.avatarSrc}
                  alt="Avatar icon"
                  className="h-[30px] w-[27px]"
                />
              </td>
              <td className="p-2">{user.fullName}</td>
              <td className="p-2">{formatPermisos(user.permisos)}</td>
              <td className="p-2">
                <div className="flex gap-[20px]">
                  <img
                    src={user.editIconSrc}
                    alt="Edit icon"
                    className="h-[20px] w-[20px]"
                  />
                  <img
                    src={user.deleteIconSrc}
                    alt="Delete icon"
                    className="h-[20px] w-[20px]"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompTableRoles;
