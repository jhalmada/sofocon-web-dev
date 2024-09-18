import { roles } from "../../utils/Datainfo";

//esta funcion nos va a permitir formatear los permisos de un rol para que se muestre como en el figma
const formatPermisos = (permisos) => {
  return permisos.join("/");
};
const TableRole = () => {
  return (
    <div className="rounded-tr-lg bg-white p-5 shadow-t">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]"></th>
            <th className="w-[40.4%] p-2 text-left text-md font-semibold leading-[1.125rem]">
              Rol
            </th>

            <th className="flex p-2 text-left text-md font-semibold leading-[1.125rem]">
              Permisos
            </th>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {roles.map((user, index) => (
            <tr key={index}>
              <td className="p-2">
                <img src={user.avatarSrc} alt="role icon" className="h-6 w-6" />
              </td>
              <td className="p-2">{user.fullName}</td>
              <td className="p-2">{formatPermisos(user.permisos)}</td>
              <td className="p-2">
                <div className="flex gap-5">
                  <img
                    src={user.editIconSrc}
                    alt="Edit icon"
                    className="h-5 w-5"
                  />
                  <img
                    src={user.deleteIconSrc}
                    alt="Delete icon"
                    className="h-5 w-5"
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

export default TableRole;
