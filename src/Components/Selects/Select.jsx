import { roles } from "../../utils/Datainfo";

const Select = ({
  width = "100%",
  label = null,
  option,
  variant = "roles",
}) => {
  return (
    <>
      {label && <label className="font-roboto font-medium">{label}</label>}
      <div
        className="flex items-center justify-between rounded-md bg-gray px-2 py-1"
        style={{ width: width }}
      >
        <select
          defaultValue="Rol"
          className="w-full cursor-pointer bg-transparent font-semibold outline-none"
        >
          <option value="Rol" disabled>
            {option}
          </option>
          {variant === "roles"
            ? roles.map((role, index) => (
                <option key={index} value={role.fullName}>
                  {role.fullName}
                </option>
              ))
            : (() => {
                const uniquePermissions = new Set();

                roles.forEach((role) => {
                  role.permisos.forEach((permiso) => {
                    uniquePermissions.add(permiso);
                  });
                });

                return Array.from(uniquePermissions).map((permiso, index) => (
                  <option key={index} value={permiso}>
                    {permiso}
                  </option>
                ));
              })()}
        </select>
      </div>
    </>
  );
};

export default Select;
