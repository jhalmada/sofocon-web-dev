import Input from "../Inputs/Input";
import Select from "../Selects/Select";

const AddRole = () => {
  return (
    <div className="rounded-tr-lg bg-white p-5 shadow-t">
      <div className="w-[55.6rem]">
        <Input
          placeholder={"Escribe el nombre del rol"}
          label={"Nombre del rol"}
        />
      </div>
      <div className="w-[55.6rem]">
        <Select label={"Asignar Permisos"} />
      </div>
    </div>
  );
};

export default AddRole;
