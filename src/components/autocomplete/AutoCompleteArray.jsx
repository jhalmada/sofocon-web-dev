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
  onChange,
  label2,
  array2,
  placeholder = "Buscar...",
}) => {
  // Estado para las opciones seleccionadas y sus valores
  const [selectedItems, setSelectedItems] = useState(array2 || []);

  // Actualiza las opciones seleccionadas en el formulario
  useEffect(() => {
    console.log("Selected items:", selectedItems); // Verifica los valores seleccionados
    setValue(name, selectedItems); // Asegura que los valores se pasen correctamente al formulario
  }, [selectedItems, name, setValue]);

  // Maneja la selección de una opción del Autocomplete
  const handleSelect = (item) => {
    if (!selectedItems.find((el) => el.id === item.id)) {
      const newSelection = [...selectedItems, { ...item, value: "" }];
      setSelectedItems(newSelection);
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
      {/* Opciones seleccionadas con inputs */}
      <div className="flex w-full flex-wrap">
        {selectedItems.length > 0 && (
          <p className="font-roboto text-sm">{label2}</p>
        )}
        {selectedItems.map((item) => (
          <div
            key={item.id}
            className="flex h-[4.5rem] w-full items-center justify-between"
          >
            <span
              key={item.id}
              className="flex w-[68%] items-center justify-between rounded-lg p-2 shadow-br"
            >
              <span className="mr-2">{item.name}</span>
              <img
                src={x}
                alt="Eliminar"
                className="cursor-pointer"
                onClick={() => handleDeleteSelection(item)}
              />
            </span>
            <Input
              label="Precio"
              width="w-[30%]"
              placeholder="Ingrese valor"
              value={item.value}
              onChange={(e) => handleInputChange(item.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Autocomplete */}
      <label className="mt-4 block font-roboto text-sm">{label}</label>
      <Autocomplete
        disabledKeys={selectedItems.map((item) => item.id)}
        className="w-full rounded-lg border"
        selectedKey={""}
        placeholder={placeholder}
        startContent={<img src={search} alt="Buscar" />}
        onInputChange={(e) => onChange(e)}
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
    </div>
  );
};

export default AutoCompleteArray;
