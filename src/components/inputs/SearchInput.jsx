import { useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import XlgIcon from "../../assets/icons/x-lg.svg";

const SearchInput = ({
  placeholder,
  border = "border border-gray_b",
  rounded = "rounded-[2rem]",
  onChange = () => {},
}) => {
  const [search, setSearch] = useState("");
  onChange(search);
  return (
    <div className={`${border} ${rounded} relative flex min-w-[22rem]`}>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder={placeholder || "Buscar..."}
        className={`h-10 w-full min-w-64 bg-white pl-10 pr-10 outline-none ${rounded}`}
        required
      />
      <img
        src={SearchIcon}
        alt="Search icon"
        className="absolute left-2 top-[1.3rem] h-8 w-8 -translate-y-1/2 transform cursor-pointer rounded-[1.875rem] p-1"
      />

      <img
        src={XlgIcon}
        alt="Close icon"
        className="absolute right-2 top-[1.26rem] mr-1 h-4 w-4 -translate-y-1/2 transform cursor-pointer rounded-[1.875rem]"
        onClick={() => setSearch("")}
      />
    </div>
  );
};

export default SearchInput;
