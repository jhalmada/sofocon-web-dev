import { roles } from "../../utils/Datainfo";

const Select = ({ width = "100%", label = null, option }) => {
  return (
    <>
      {label && <label className="font-roboto font-medium">{label}</label>}
      <div
        className="flex items-center justify-between rounded-md bg-gray px-2 py-1"
        style={{ width: width }}
      >
        <select
          defaultValue="Rol"
          className="w-full bg-transparent font-semibold outline-none"
        >
          <option value="Rol" disabled>
            {option}
          </option>
          {roles.map((role, index) => (
            <option key={index} value={role.fullName}>
              {role.fullName}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
