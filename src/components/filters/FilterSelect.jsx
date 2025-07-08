import { Select, SelectItem } from "@nextui-org/select";

const FilterSelect = ({
  options,
  placeholder,
  onChange,
  disabled = false,
  onChange2 = false,
}) => {
  const handleChange = (value) => {
    onChange(value);
    if (onChange2) {
      onChange2(value);
    }
  };

  return (
    <Select
      maxMenuHeight={200}
      className="max-h-11 min-w-[9rem] max-w-[12rem] rounded-lg border 2xl:min-w-[8.5rem]"
      placeholder={placeholder}
      isDisabled={disabled}
      onChange={(e) => handleChange(e.target.value)}
      title={placeholder}
    >
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FilterSelect;
