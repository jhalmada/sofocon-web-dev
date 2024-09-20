import SearchIcon from "../../assets/icons/search.svg";
import XlgIcon from "../../assets/icons/x-lg.svg";

const SearchInput = ({ placeholder }) => {
  return (
    <div className="relative flex">
      <input
        type="text"
        placeholder={placeholder || "Buscar..."}
        className="h-10 min-w-64 rounded-[2rem] bg-white pl-10 pr-10 outline-none"
      />
      <img
        src={SearchIcon}
        alt="Search icon"
        className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 transform cursor-pointer rounded-[1.875rem] p-1"
      />
      <img
        src={XlgIcon}
        alt="Close icon"
        className="absolute right-2 top-1/2 mr-1 h-4 w-4 -translate-y-1/2 transform cursor-pointer rounded-[1.875rem]"
      />
    </div>
  );
};

export default SearchInput;
