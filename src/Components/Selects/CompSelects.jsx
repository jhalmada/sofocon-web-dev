import { roles } from "../../Utils/Datainfo";

const CompSelects = ({ width = "100%", label = null }) => {
  return (
    <div>
      {label && <label className="font-roboto font-medium">{label}</label>}
      <div
        className="flex items-center justify-between rounded-md bg-gray px-2 py-1"
        style={{ width: width }}
      >
        <select className="w-full bg-transparent font-semibold outline-none">
          <option selected disabled>
            Rol
          </option>
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role.fullName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CompSelects;
