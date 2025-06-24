import { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import x from "../../assets/icons/x.svg";
import search from "../../assets/icons/search.svg";
//array es el array de objetos que se va a mostrar en el autocomplete
//array2 es el array de los objetos ya seleccionados.
//label es el texto que se muestra arriba del autocomplete
//label2 es el texto que se muestra arriba de los elementos seleccionados
//setValue es la función que se encarga de setear el valor en el useForm
//onChange es la función que se encarga de setear el valor que se utilizara para la query de search
//name es el nombre del campo que se va a setear en el useForm
const NextAutoCompleteCompanies = ({
  array,
  label,
  name,
  setValue,
  onChange,
  label2,
  array2,
  placeholder = "Buscar...",
  isDisabled = false,
  hidden = false,
  setErrors = null,
  msjError = "",
  user = null,
}) => {
  //estados
  const [selectedItems, setSelectedItems] = useState(array2);

  useEffect(() => {
    if (user && array2.length > 0) {
      const merged = [...selectedItems];

      array2.forEach((item) => {
        const exists = merged.some((i) => i.id === item.id);
        if (!exists) merged.push(item);
      });

      setSelectedItems(merged);
      setValue(name, merged);
    }
  }, [array2]);

  const handleSelect = (item) => {
    const exists = selectedItems.some((i) => i.id === item.id);
    if (!exists) {
      const updated = [...selectedItems, item];
      setSelectedItems(updated);
      setValue(name, updated);
      setErrors && setErrors(name, null);
    } else {
      const updated = selectedItems.filter((i) => i.id !== item.id);
      setSelectedItems(updated);
      setValue(name, updated);
    }
  };

  const handleDeleteSelection = (item) => {
    const updated = selectedItems.filter((i) => i.id !== item.id);
    setSelectedItems(updated);
    setValue(name, updated);
  };

  return (
    <div className="mb-1">
      <label className="mt-3 block font-roboto text-sm">{label}</label>
      <Autocomplete
        isDisabled={isDisabled}
        disabledKeys={selectedItems.map((item) => item.id)}
        className="w-full rounded-lg border"
        selectedKey={""}
        placeholder={placeholder}
        startContent={<img src={search}></img>}
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
            endContent={selectedItems.includes(item) && <p>Seleccionado</p>}
          >
            {item.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      {msjError.length > 0 && (
        <p className="font-roboto text-xs text-red_e">{msjError}</p>
      )}
      {!hidden && !isDisabled && (
        <div className="flex w-full flex-wrap">
          {selectedItems.length > 0 && (
            <p className="font-roboto text-sm">{label2}</p>
          )}
          {selectedItems.map((item, index) => (
            <span
              key={index}
              className="mt-1 flex h-10 w-full items-center justify-between rounded-lg p-2 shadow-br"
            >
              {item.name}
              <img
                src={x}
                alt="delete"
                className="mr-1 cursor-pointer"
                onClick={() => handleDeleteSelection(item)}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NextAutoCompleteCompanies;
