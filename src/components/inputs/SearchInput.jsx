import SearchIcon from "../../assets/icons/search.svg";
import XlgIcon from "../../assets/icons/x-lg.svg";
import FilterRightIcon from "../../assets/icons/filter-right.svg";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg";

const SearchInput = ({
  placeholder,
  visibility = "hidden",
  border = "none",
  rounded = "rounded-[2rem]",
}) => {
  return (
    <div className={`${border} ${rounded} relative flex px-1`}>
      <input
        type="text"
        placeholder={placeholder || "Buscar..."}
        className={`h-10 min-w-64 bg-white pl-10 pr-10 outline-none ${rounded}`}
      />
      <img
        src={SearchIcon}
        alt="Search icon"
        className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 transform cursor-pointer rounded-[1.875rem] p-1"
      />

      <div className={`${visibility} absolute right-10 top-[.6rem] flex gap-2`}>
        <img
          src={FilterRightIcon}
          alt="chevron-down icon"
          className="h-5 w-5 cursor-pointer"
        />
      </div>
      <img
        src={XlgIcon}
        alt="Close icon"
        className="absolute right-2 top-1/2 mr-1 h-4 w-4 -translate-y-1/2 transform cursor-pointer rounded-[1.875rem]"
      />
    </div>
  );
};

export default SearchInput;
