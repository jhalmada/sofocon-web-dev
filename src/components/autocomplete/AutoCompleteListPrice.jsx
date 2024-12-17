import { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import x from "../../assets/icons/x.svg";
import search from "../../assets/icons/search.svg";
import Input from "../inputs/Input";

const AutoCompleteListPrice = ({
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
  onChange,
}) => {
  const [selectedItems, setSelectedItems] = useState(array2 || []);
  const [hasPriceError, setHasPriceError] = useState(false);
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    if (setValue) {
      setValue(name, selectedItems);
    }
  }, [selectedItems, name, setValue]);

  const handleSelect = (item) => {
    if (!selectedItems.find((el) => el.id === item.id)) {
      const newSelection = [...selectedItems, { ...item, value: "" }];
      const newdata = [...newList, { ...item, value: "" }];
      setSelectedItems(newSelection);
      setNewList(newdata);

      clearErrors && clearErrors(name);
    }
  };

  const handleInputChange = (item, newValue) => {
    const updatedItems = newList.map((el) =>
      el.id === item.id ? { ...el, value: newValue } : el,
    );
    setSelectedItems(updatedItems);
    setNewList(updatedItems);

    // Verificar si todos los precios han sido ingresados
    const allPricesEntered = updatedItems.every((item) => item.value !== "");
    setHasPriceError(!allPricesEntered);
  };

  const handleDeleteSelection = (item) => {
    const filteredItems = newList.filter((el) => el.id !== item.id);
    setSelectedItems(filteredItems);
    setNewList(filteredItems);
  };

  return (
    <div>
      <label className="mt-2 block font-roboto text-sm">{label}</label>
      <div>
        <Autocomplete
          disabledKeys={selectedItems.map((item) => item.id)}
          className="w-full rounded-lg border"
          selectedKey={""}
          placeholder={placeholder}
          startContent={<img src={search} alt="Buscar" />}
          onInputChange={(e) => onChange(e)}
          popoverProps={{
            placement: "top-start",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 8],
                },
              },
            ],
          }}
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
      {msjError && <p className="font-roboto text-xs text-red_e">{msjError}</p>}

      {!hidden && (
        <div className="flex w-full flex-wrap">
          {newList.length > 0 && (
            <div className="flex w-full items-center justify-between">
              <div className="w-[68%]">
                <p className="font-roboto text-sm">{label2}</p>
              </div>
              <div className="w-[30%]">
                <p className="font-roboto text-sm">Precio</p>
              </div>
            </div>
          )}
          {newList.map((item) => (
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
                onChange={(e) => handleInputChange(item, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {hasPriceError && (
        <div className="mt-2 font-roboto text-sm text-red-500">
          Por favor, ingrese todos los precios.
        </div>
      )}
    </div>
  );
};

export default AutoCompleteListPrice;
