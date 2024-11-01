import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import x from "../../assets/icons/x.svg";
import search from "../../assets/icons/search.svg";

const ProductsAutocomplete = ({
  array,
  label,
  name,
  setValue,
  onChange,
  array2,
  placeholder = "Buscar...",
  isDisabled = false,
  setAutocompleteResults,
}) => {
  const [selectedItems, setSelectedItems] = useState(array2 || []);

  const handleSelect = (item) => {
    if (!selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
      const updatedSelectedItems = [...selectedItems, item];
      setSelectedItems(updatedSelectedItems);
      setValue(name, updatedSelectedItems);
      setAutocompleteResults(updatedSelectedItems);
    } else {
      const updatedSelectedItems = selectedItems.filter(
        (selectedItem) => selectedItem.id !== item.id,
      );
      setSelectedItems(updatedSelectedItems);
      setValue(name, updatedSelectedItems);
      setAutocompleteResults(updatedSelectedItems);
    }
  };

  const handleAutocompleteChange = (e) => {
    const filteredResults = array.filter((item) =>
      item.name.toLowerCase().includes(e.toLowerCase()),
    );
    setAutocompleteResults(filteredResults);
    onChange(e);
  };

  return (
    <>
      <label className="mt-1 block font-roboto text-sm">{label}</label>
      <Autocomplete
        isDisabled={isDisabled}
        disabledKeys={selectedItems.map((item) => item.id)}
        className="autocomplete-dropdown w-full rounded-lg border"
        selectedKey={""}
        placeholder={placeholder}
        startContent={<img src={search}></img>}
        onInputChange={(e) => handleAutocompleteChange(e)}
      >
        {array.map((item) => (
          <AutocompleteItem
            key={item.id}
            value={item.id}
            onClick={() => handleSelect(item)}
            endContent={
              selectedItems.some(
                (selectedItem) => selectedItem.id === item.id,
              ) && <p>Seleccionado</p>
            }
          >
            {item.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
};

export default ProductsAutocomplete;
