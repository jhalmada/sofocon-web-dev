import { useState } from "react";
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
const NextAutoComplete = ({
  array,
  label,
  name,
  setValue,
  onChange,
  label2,
  array2,
  placeholder = "Buscar...",
}) => {
  //estados
  const [selectedItems, setSelectedItems] = useState(array2 || []);

  const handleSelect = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
      setValue(name, [...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((selection) => selection !== item));
    }
  };
  //para eliminar de la lista
  const handleDeleteSelection = (item) => {
    setSelectedItems(selectedItems.filter((selection) => selection !== item));
    setValue(
      name,
      selectedItems.filter((selection) => selection !== item),
    );
  };

  return (
    <>
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
      <label className="mt-1 block font-roboto text-sm">{label}</label>
      <Autocomplete
        disabledKeys={selectedItems.map((item) => item.id)}
        className="w-full rounded-lg border"
        selectedKey={""}
        placeholder={placeholder}
        startContent={<img src={search}></img>}
        onInputChange={(e) => onChange(e)}
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
    </>
  );
};

export default NextAutoComplete;
