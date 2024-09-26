import SkipPreviousFilledIcon from "../assets/icons/SkipPreviousFilled.svg";
import ChevronLeftFilledIcon from "../assets/icons/ChevronLeftFilled.svg";
import ChevronRightFilledIcon from "../assets/icons/ChevronRightFilled.svg";
import SkipNextFilledIcon from "../assets/icons/SkipNextFilled.svg";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageIndex,
  itemPerPage,
}) => {
  return (
    <div className="flex px-1.5">
      <button
        className="rounded px-4 py-2"
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
      >
        <img src={SkipPreviousFilledIcon} alt="Skip previous icon" />
      </button>
      <div className="flex space-x-2">
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
      </div>
      <button
        className="rounded px-4 py-2"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages - 1}
      >
        <img src={SkipNextFilledIcon} alt="Skip next icon" />
      </button>
      <select onChange={(e) => pageIndex(e.target.value)} value={itemPerPage}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
    </div>
  );
};

export default Pagination;
