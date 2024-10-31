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
const CompleteSearchInput = ({
  array,
  label,
  name,
  setValue,
  onChange,
  label2,
  array2,
  placeholder = "Buscar...",
  isDisabled = false,
  onSelect,
}) => {
  //estados
  const [selectedItem, setSelectedItem] = useState(array2 || []);

  const handleSelect = (item) => {
    if (selectedItem?.id !== item.id) {
      setSelectedItem(item);
      setValue(name, item);
      onSelect(item.rut);
    } else {
      setSelectedItem(null);
      setValue(name, null);
    }
  };

  return (
    <>
      <label className="mt-1 block font-roboto text-sm">{label}</label>
      <Autocomplete
        isDisabled={isDisabled}
        className="w-full rounded-lg border"
        selectedKey={selectedItem ? selectedItem.id : ""}
        placeholder={placeholder}
        startContent={<img src={search}></img>}
        onInputChange={(e) => onChange(e)}
        onSelect={onSelect}
      >
        {array.map((item) => (
          <AutocompleteItem
            key={item.id}
            value={item.rut}
            onClick={() => handleSelect(item)}
            endContent={selectedItem?.id === item.id && <p>Seleccionado</p>}
          >
            {item.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
};

export default CompleteSearchInput;
