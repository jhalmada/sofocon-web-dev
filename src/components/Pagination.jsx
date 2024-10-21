import SkipPreviousFilledIcon from "../assets/icons/SkipPreviousFilled.svg";
import ChevronLeftFilledIcon from "../assets/icons/ChevronLeftFilled.svg";
import ChevronRightFilledIcon from "../assets/icons/ChevronRightFilled.svg";
import SkipNextFilledIcon from "../assets/icons/SkipNextFilled.svg";

const Pagination = ({
  currentPage = 0,
  totalPages = 0,
  onPageChange,
  pageIndex,
  itemsPerPage = 10,
  total = 0,
}) => {
  const startItem = total > 0 ? currentPage * itemsPerPage + 1 : 0;
  const endItem = Math.min((currentPage + 1) * itemsPerPage, total);

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
        <select
          className="w-[7rem] cursor-pointer rounded-lg border bg-white outline-none"
          onChange={(e) => {
            pageIndex(Number(e.target.value));
            onPageChange(0);
          }}
          value={itemsPerPage}
        >
          <option value={10}>10 / Pág.</option>
          <option value={20}>20 / Pág.</option>
          <option value={30}>30 / Pág.</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
