import CompInput from "../Inputs/CompInput";
import CompSelects from "../Selects/CompSelects";

const CompFormAddRol = () => {
  return (
    <div className="rounded-tr-lg bg-white p-5 shadow-t">
      <div className="w-[55.6rem]">
        <CompInput
          placeholder={"Escribe el nombre del rol"}
          label={"Nombre del rol"}
        />
      </div>
      <div className="w-[55.6rem]">
        <CompSelects label={"Asignar Permisos"} />
      </div>
    </div>
  );
};

export default CompFormAddRol;
