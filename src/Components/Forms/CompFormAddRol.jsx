import React from "react";
import CompInput from "../Inputs/CompInput";

const CompFormAddRol = () => {
  return (
    <div className="mt-4">
      <CompInput
        placeholder={"Escribe el nombre del rol"}
        label={"Nombre del rol"}
        width="890px"
      />
    </div>
  );
};

export default CompFormAddRol;
