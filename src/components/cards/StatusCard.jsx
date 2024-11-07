import bellWhiteIcon from "../../assets/icons/bell-white.svg";
import calendarIcon from "../../assets/icons/calendar.svg";
import briefCaseFillIcon from "../../assets/icons/briefcase-fill.svg";
const StatusCard = ({
  title,
  clientName,
  orderId,
  productsList,
  bg = "bg-red_e",
  date,
  sellerName,
}) => {
  return (
    <div className="mt-2 flex h-[12rem] flex-col space-y-2 rounded-lg py-2 shadow-br">
      <div
        className={`flex ${bg} justify-center space-x-1 rounded-tl-lg rounded-tr-lg p-2`}
      >
        <img src={bellWhiteIcon} alt="bell white icon" />
        <p className="text-sm font-semibold leading-[1rem] text-white 2xl:text-md">
          {clientName}
        </p>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="px-2 text-xxs leading-[.75rem] text-black_l 2xl:text-md">
          {" "}
          {orderId}
        </div>
        <div className="flex flex-col px-2 text-sm font-normal 2xl:text-md">
          {productsList}
        </div>
        <div className="flex justify-between space-x-2 px-2">
          <div className="flex items-center text-xxs leading-[.75rem] text-black_m 2xl:text-sm">
            <img
              src={calendarIcon}
              alt="calendar"
              className="h-2.5 w-2.5 2xl:h-4 2xl:w-4"
            />
            {date}
          </div>
          <div className="flex items-center text-xxs leading-[.75rem] text-black_m 2xl:text-md">
            <img
              src={briefCaseFillIcon}
              alt="briefcase icon"
              className="h-2.5 w-2.5"
            />
            {sellerName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
