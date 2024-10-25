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

  // Calcular el grupo de botones visibles en el rango de 5
  const startIndex = Math.floor(currentPage / 5) * 5;
  const pageButtons = Array.from(
    { length: Math.min(5, totalPages - startIndex) },
    (_, i) => startIndex + i,
  );

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

        {/* Botón para la primera página */}
        {currentPage > 4 && (
          <>
            <button
              key={0}
              className={`rounded-full px-4 py-2 ${currentPage === 0 ? "bg-black_l" : "bg-black/5"}`}
              onClick={() => onPageChange(0)}
            >
              1
            </button>
            <div className="flex items-center">
              <span className="px-2">...</span>
            </div>
          </>
        )}

        {/* Botones de paginación en el grupo de 5 */}
        {pageButtons.map((index) => (
          <button
            key={index}
            className={`rounded-full px-4 py-2 ${currentPage === index ? "bg-black_l" : ""}`}
            onClick={() => onPageChange(index)}
          >
            {index + 1}
          </button>
        ))}

        {/* Botón para la última página */}
        {currentPage < totalPages - 5 && (
          <>
            <div className="flex items-center">
              <span className="px-2">...</span>
            </div>
            <button
              key={totalPages - 1}
              className={`rounded-full px-4 py-2 ${currentPage === totalPages - 1 ? "bg-black_l" : "bg-black/5"}`}
              onClick={() => onPageChange(totalPages - 1)}
            >
              {totalPages}
            </button>
          </>
        )}

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
