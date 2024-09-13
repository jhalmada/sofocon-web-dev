const Pagination = () => {
  return (
    <div className="flex px-1.5">
      <button className="rounded px-4 py-2">
        <img
          src="/assets/icons/SkipPreviousFilled.svg"
          alt="Skip previous icon"
        />
      </button>
      <div className="flex space-x-2">
        <button className="rounded px-4 py-2">
          <img
            src="/assets/icons/ChevronLeftFilled.svg"
            alt="Chevron left icon"
          />
        </button>
        <button className="rounded-full bg-black_l px-4 py-2">1</button>
        <button className="rounded px-4 py-2">2</button>
        <button className="rounded px-4 py-2">3</button>
        <button className="rounded px-4 py-2">4</button>
        <button className="rounded px-4 py-2">5</button>
        <button className="rounded px-4 py-2">6</button>
        <button className="rounded px-4 py-2">7</button>
        <button className="rounded px-4 py-2">
          <img
            src="/assets/icons/ChevronRightFilled.svg"
            alt="Chevron right icon"
          />
        </button>
      </div>
      <button className="rounded px-4 py-2">
        <img src="/assets/icons/SkipNextFilled.svg" alt="Skip next icon" />
      </button>
    </div>
  );
};

export default Pagination;
