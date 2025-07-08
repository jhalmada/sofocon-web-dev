import { useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import XlgIcon from "../../assets/icons/x-lg.svg";

const SearchInput = ({
  placeholder,
  border = "border border-black_l",
  rounded = "rounded-[2rem]",
  onChange = () => {},
  onChange2 = false,
  icon = true,
  name = "search",
  label = false,
  disabled = false,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    onChange(search);
    if (onChange2) {
      onChange2(search);
    }
  }, [search]);
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className={`font-roboto text-sm font-light text-black`}
        >
          {label}
        </label>
      )}
      <div
        className={`${border} ${rounded} relative flex max-h-12 min-w-[22rem]`}
      >
        <input
          disabled={disabled}
          id={name ? name : ""}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder={placeholder || "Buscar..."}
          className={`h-auto min-h-10 w-full min-w-64 bg-white pl-10 pr-10 outline-none ${rounded}`}
        />
        {icon && (
          <img
            src={SearchIcon}
            alt="Search icon"
            className="absolute left-2 top-[1.3rem] h-8 w-8 -translate-y-1/2 transform cursor-pointer rounded-[1.875rem] p-1"
          />
        )}
        {search.length > 0 && (
          <img
            src={XlgIcon}
            alt="Close icon"
            className="absolute right-2 top-[1.26rem] mr-1 h-4 w-4 -translate-y-1/2 transform cursor-pointer rounded-[1.875rem]"
            onClick={() => setSearch("")}
          />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
