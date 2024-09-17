import { roles } from "../../Utils/Datainfo";

const Select = ({ width = "100%", label = null, option, selectedOption }) => {
  return (
    <>
      {label && <label className="font-roboto font-medium">{label}</label>}
      <div
        className="flex items-center justify-between rounded-md bg-gray px-2 py-1"
        style={{ width: width }}
      >
        <select
          className="w-full bg-transparent font-semibold outline-none"
          defaultValue={selectedOption}
        >
          <option value="" disabled>
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
