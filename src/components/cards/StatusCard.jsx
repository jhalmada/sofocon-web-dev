import React from "react";
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
    <div className="mt-2 flex flex-col space-y-2 rounded-lg py-2 shadow-br">
      <div
        className={`flex ${bg} justify-center space-x-1 rounded-tl-lg rounded-tr-lg p-2`}
      >
        <img src={bellWhiteIcon} alt="bell white icon" />
        <p className="text-md font-semibold leading-[1rem] text-white">
          {clientName}
        </p>
      </div>
      <div className="text-xxs px-2 leading-[.75rem] text-black_l">
        {" "}
        {orderId}
      </div>
      <div className="flex flex-col px-2 text-sm font-normal">
        {productsList}
      </div>
      <div className="flex space-x-2 px-2">
        <div className="text-xxs flex leading-[.75rem] text-black_m">
          <img src={calendarIcon} alt="calendar" className="h-2.5 w-2.5" />
          {date}
        </div>
        <div className="text-xxs flex leading-[.75rem] text-black_m">
          <img
            src={briefCaseFillIcon}
            alt="briefcase icon"
            className="h-2.5 w-2.5"
          />
          {sellerName}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
