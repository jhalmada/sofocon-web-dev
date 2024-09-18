import SkipPreviousFilledIcon from "../assets/icons/SkipPreviousFilled.svg";
import ChevronLeftFilledIcon from "../assets/icons/ChevronLeftFilled.svg";
import ChevronRightFilledIcon from "../assets/icons/ChevronRightFilled.svg";
import SkipNextFilledIcon from "../assets/icons/SkipNextFilled.svg";

const Pagination = () => {
  return (
    <div className="flex px-1.5">
      <button className="rounded px-4 py-2">
        <img src={SkipPreviousFilledIcon} alt="Skip previous icon" />
      </button>
      <div className="flex space-x-2">
        <button className="rounded px-4 py-2">
          <img src={ChevronLeftFilledIcon} alt="Chevron left icon" />
        </button>
        <button className="rounded-full bg-black_l px-4 py-2">1</button>
        <button className="rounded px-4 py-2">2</button>
        <button className="rounded px-4 py-2">3</button>
        <button className="rounded px-4 py-2">4</button>
        <button className="rounded px-4 py-2">5</button>
        <button className="rounded px-4 py-2">6</button>
        <button className="rounded px-4 py-2">7</button>
        <button className="rounded px-4 py-2">
          <img src={ChevronRightFilledIcon} alt="Chevron right icon" />
        </button>
      </div>
      <button className="rounded px-4 py-2">
        <img src={SkipNextFilledIcon} alt="Skip next icon" />
      </button>
    </div>
  );
};

export default Pagination;
