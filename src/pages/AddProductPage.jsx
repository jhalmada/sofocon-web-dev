import { Link } from "react-router-dom";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import Input from "../components/inputs/Input";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";

import uploadIcon from "../assets/icons/upload.svg";
import Button from "../components/buttons/Button";
import arrowRigthIcon from "../assets/icons/arrow-right.svg";

const busquedas = [
  { name: "Busqueda 1" },
  { name: "Busqueda 2" },
  { name: "Busqueda 3" },
  { name: "Busqueda 4" },
];

const AddProductPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col px-6 pt-6">
        <div className="w-[4rem]">
          <Link to="/inicio/personal" className="text-sm font-medium leading-4">
            <div className="mb-4 flex items-center">
              <img
                src={ChevronLeftIcon}
                alt="arrow left"
                className="-ml-1 h-4 w-4"
              />
              Volver
            </div>
          </Link>
        </div>

        <h1 className="pb-6 text-xl font-medium leading-6 text-black_m">
          Inventario
        </h1>

        <div className="flex max-h-[57px] items-center justify-between">
          <div className="flex">
            <h2
              className={`w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Nuevo Producto
            </h2>
          </div>
        </div>

        <div className="rounded-tr-lg bg-white px-7 pb-3 pt-7 shadow-t">
          <form className="grid gap-5 pl-2 pr-24">
            <Input placeholder="Escribir..." label="Nombre" />
            <Input placeholder="Escribir..." label="Descripcion" />
            <div className="flex gap-3">
              <Input placeholder="Escribir..." label="Subproducto" />
              <Input placeholder="Escribir..." label="Color" />
            </div>

            <Input placeholder="1234" label="Stock" type="number" />
            <NextAutoComplete
              label="Agregar a la lista de precios"
              label2="Busacr Lista.."
              array={busquedas}
            />

            <div className="grid gap-2">
              <h4 className="text-sm font-light text-black">Agregar Imagen</h4>

              <Link
                to={"/"}
                className="flex gap-2 font-medium underline decoration-2"
              >
                <img src={uploadIcon} alt="icon" />
                Cargar Imagen
              </Link>
            </div>
          </form>
        </div>
        <div className="absolute right-0 mx-6 mt-12">
          <Button
            color="save"
            icon={arrowRigthIcon}
            text={"GUARDAR"}
            width="w-8.75rem"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
