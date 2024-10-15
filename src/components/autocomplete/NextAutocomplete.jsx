import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import x from "../../assets/icons/x.svg";
import search from "../../assets/icons/search.svg";

const NextAutoComplete = ({
  array,
  label,
  name,
  setValue,
  onChange,
  label2,
}) => {
  //estados
  const [selectedItems, setSelectedItems] = useState([]);

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
    <div>
      <div className="mt-2 flex w-full flex-wrap">
        {selectedItems.length > 0 && (
          <p className="font-roboto text-sm">{label2}</p>
        )}
        {selectedItems.map((item, index) => (
          <span
            key={index}
            className="mt-2 flex h-10 w-full items-center justify-between rounded-lg p-2 shadow-br"
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
      <label className="mt-2 block font-roboto text-sm">{label}</label>
      <Autocomplete
        disabledKeys={selectedItems.map((item) => item.id)}
        className="w-full rounded-lg border"
        selectedKey={""}
        placeholder="Buscar"
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
    </div>
  );
};

export default NextAutoComplete;
