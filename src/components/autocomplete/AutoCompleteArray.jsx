import { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import x from "../../assets/icons/x.svg";
import search from "../../assets/icons/search.svg";
import Input from "../inputs/Input";

const AutoCompleteArray = ({
  array,
  label,
  name,
  setValue,
  clearErrors,
  label2,
  array2,
  placeholder = "Buscar...",
  hidden = false,
  msjError,
}) => {
  // Estado para las opciones seleccionadas y sus valores
  const [selectedItems, setSelectedItems] = useState(array2 || []);

  // Actualiza las opciones seleccionadas en el formulario
  useEffect(() => {
    if (setValue) {
      setValue(name, selectedItems); // Asegura que los valores se pasen correctamente al formulario
    }
  }, [selectedItems, name, setValue]);

  // Maneja la selección de una opción del Autocomplete
  const handleSelect = (item) => {
    if (!selectedItems.find((el) => el.id === item.id)) {
      const newSelection = [...selectedItems, { ...item, value: "" }];
      setSelectedItems(newSelection);
      // Limpia el error cuando se selecciona un producto
      clearErrors && clearErrors(name);
    }
  };

  // Maneja la actualización del valor ingresado en el input de cada opción seleccionada
  const handleInputChange = (id, newValue) => {
    const updatedItems = selectedItems.map((el) =>
      el.id === id ? { ...el, value: newValue } : el,
    );
    setSelectedItems(updatedItems);
  };

  // Elimina una opción seleccionada
  const handleDeleteSelection = (item) => {
    const filteredItems = selectedItems.filter((el) => el.id !== item.id);
    setSelectedItems(filteredItems);
  };

  return (
    <div>
      {!hidden && (
        <div className="flex w-full flex-wrap">
          {selectedItems.length > 0 && (
            <div className="flex w-full items-center justify-between">
              <div className="w-[68%]">
                <p className="font-roboto text-sm">{label2}</p>
              </div>
              <div className="w-[30%]">
                <p className="font-roboto text-sm">Precio</p>
              </div>
            </div>
          )}
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex h-[3rem] w-full items-center justify-between"
            >
              <span className="flex h-10 w-[68%] items-center justify-between rounded-lg p-2 shadow-br">
                <span className="mr-2">{item.name}</span>
                <img
                  src={x}
                  alt="Eliminar"
                  className="cursor-pointer"
                  onClick={() => handleDeleteSelection(item)}
                />
              </span>
              <Input
                type="number"
                mb="mb-0"
                width="w-[30%]"
                placeholder="Ingrese valor"
                value={item.value}
                onChange={(e) => handleInputChange(item.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Autocomplete */}
      <label className="mt-2 block font-roboto text-sm">{label}</label>
      <Autocomplete
        disabledKeys={selectedItems.map((item) => item.id)}
        className="w-full rounded-lg border"
        selectedKey={""}
        placeholder={placeholder}
        startContent={<img src={search} alt="Buscar" />}
      >
        {array.map((item) => (
          <AutocompleteItem
            key={item.id}
            value={item.id}
            onClick={() => handleSelect(item)}
            endContent={
              selectedItems.some((el) => el.id === item.id) && (
                <p>Seleccionado</p>
              )
            }
          >
            {item.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      {msjError && <p className="font-roboto text-xs text-red_e">{msjError}</p>}
    </div>
  );
};

export default AutoCompleteArray;
