import { Select, SelectItem } from "@nextui-org/select";

const FilterSelect = ({ options, placeholder, onChange }) => {
  return (
    <Select
      maxMenuHeight={200}
      className="min-w-[8rem] rounded-lg border"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
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
