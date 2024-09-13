const CompCheckbox = ({ text }) => {
  return (
    <div className="flex items-center">
      <label className="relative flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" />
        <div className="border-gray-300 flex h-4 w-4 items-center justify-center rounded-full border-[.1rem] bg-white transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-500">
          <svg
            className="hidden h-4 w-4 text-white peer-checked:block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="ml-2 text-sm font-light leading-4">{text}</p>
      </label>
    </div>
  );
};

export default CompCheckbox;
