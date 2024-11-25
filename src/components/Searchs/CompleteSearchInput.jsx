import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import search from "../../assets/icons/search.svg";

const CompleteSearchInput = ({
  array,
  label,
  name,
  setValue,
  onChange,
  array2,
  placeholder = "Buscar...",
  isDisabled = false,
  onSelect,
}) => {
  const [selectedItem, setSelectedItem] = useState(array2 || []);

  const handleSelect = (item) => {
    if (selectedItem?.id !== item.id) {
      setSelectedItem(item);
      setValue(name, item.id);
      onSelect(item);
    } else {
      setSelectedItem(null);
      setValue(name, null);
      onSelect(null);
    }
  };

  const handleInputChange = (e) => {
    if (!e) {
      setSelectedItem(null);
      setValue(name, null);
      onSelect(null);
    }
    onChange(e);
  };

  return (
    <>
      <label className="mt-1 block font-roboto text-sm">{label}</label>
      <Autocomplete
        isDisabled={isDisabled}
        className="w-full rounded-lg border"
        selectedKey={selectedItem ? selectedItem.id : ""}
        placeholder={placeholder}
        startContent={<img src={search} alt="search icon" />}
        onInputChange={handleInputChange}
        onSelect={(key) => {
          const selected = array.find((item) => item.id === key);
          handleSelect(selected || null);
        }}
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
