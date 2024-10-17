import SkipPreviousFilledIcon from "../assets/icons/SkipPreviousFilled.svg";
import ChevronLeftFilledIcon from "../assets/icons/ChevronLeftFilled.svg";
import ChevronRightFilledIcon from "../assets/icons/ChevronRightFilled.svg";
import SkipNextFilledIcon from "../assets/icons/SkipNextFilled.svg";
import { Select, SelectItem } from "@nextui-org/select";

const Pagination = ({
  currentPage = 0,
  totalPages = 0,
  onPageChange,
  pageIndex,
  itemPerPage = 10,
  total = 0,
}) => {
  const startItem = total > 0 ? currentPage * itemPerPage + 1 : 0;
  const endItem = Math.min((currentPage + 1) * itemPerPage, total);

  return (
    <div className="flex flex-col items-center px-1.5">
      <div className="flex space-x-2">
        <div className="mt-2">
          <span className="text-sm text-black_m">
            {startItem} - {endItem} de {total} items
          </span>
        </div>
        <button
          className="rounded px-4 py-2"
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}
        >
          <img src={SkipPreviousFilledIcon} alt="Skip previous icon" />
        </button>
        <button
          className="rounded px-4 py-2"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <img src={ChevronLeftFilledIcon} alt="Chevron left icon" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`rounded-full px-4 py-2 ${currentPage === index ? "bg-black_l" : ""}`}
            onClick={() => onPageChange(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="rounded px-4 py-2"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          <img src={ChevronRightFilledIcon} alt="Chevron right icon" />
        </button>
        <button
          className="rounded px-4 py-2"
          onClick={() => onPageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
        >
          <img src={SkipNextFilledIcon} alt="Skip next icon" />
        </button>
        <Select
          value={itemPerPage}
          onChange={(value) => {
            pageIndex(value);
            onPageChange(0);
          }}
          className="w-[7rem] rounded-lg border bg-white outline-none"
          placeholder="10 / pág."
        >
          <SelectItem value={10}>10 / pág.</SelectItem>
          <SelectItem value={20}>20 / pág.</SelectItem>
          <SelectItem value={30}>30 / pág.</SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default Pagination;
