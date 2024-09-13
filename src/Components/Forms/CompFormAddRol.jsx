import CompInput from "../Inputs/CompInput";
import CompSelects from "../Selects/CompSelects";

const CompFormAddRol = () => {
  return (
    <div className="rounded-tr-lg bg-white p-[20px] shadow-t">
      <CompInput
        placeholder={"Escribe el nombre del rol"}
        label={"Nombre del rol"}
        width="890px"
      />
      <div>
        <label htmlFor="">Asignar Permisos</label>
        <CompSelects width="890px" />
      </div>
    </div>
  );
};

export default CompFormAddRol;
