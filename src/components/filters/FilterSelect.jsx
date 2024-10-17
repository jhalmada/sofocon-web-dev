import { Select, SelectItem } from "@nextui-org/select";

const FilterSelect = ({ options, placeholder, onChange }) => {
  return (
    <Select
      className="w-full"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
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
