import bellWhiteIcon from "../../assets/icons/bell-white.svg";
import calendarIcon from "../../assets/icons/calendar.svg";
import briefCaseFillIcon from "../../assets/icons/briefcase-fill-black.svg";
const StatusCard = ({
  clientName,
  orderId,
  productsList,
  bg = "bg-red_e",
  date,
  sellerName,
}) => {
  const productArray = Array.isArray(productsList) ? productsList : [];
  const displayedProducts = productArray.slice(0, 2);
  const additionalItems = productArray.length - displayedProducts.length;
  return (
    <div className="mt-2 flex h-auto min-h-[9rem] flex-col space-y-2 rounded-lg pb-2 shadow-br 2xl:min-h-[11rem]">
      <div
        className={`flex ${bg} justify-center space-x-1 rounded-tl-lg rounded-tr-lg p-2`}
      >
        <img src={bellWhiteIcon} alt="bell white icon" />
        <p className="text-sm font-semibold leading-[1rem] text-white 2xl:text-md">
          {clientName}
        </p>
      </div>
      <div className="flex h-full min-h-[9rem] flex-col justify-between 2xl:min-h-[11rem]">
        <div className="px-2 text-xxs leading-[.75rem] text-black_l 2xl:text-md">
          {" "}
          {orderId}
        </div>
        <div className="flex flex-col px-2 text-sm font-normal 2xl:text-md">
          <ul className="space-y-1">
            {displayedProducts.map((product, index) => (
              <li key={index} className="py-1">
                {product}
              </li>
            ))}

            {additionalItems > 0 && (
              <li className="py-1 text-xs leading-[.75rem] text-black_l underline 2xl:text-md">
                +{additionalItems} ítems
              </li>
            )}
          </ul>
        </div>
        <div className="space-y-2 px-2">
          <div className="flex items-center text-sm leading-[.75rem] text-black_m 2xl:text-sm">
            <img
              src={calendarIcon}
              alt="calendar"
              className="mr-1 h-2.5 w-2.5 2xl:h-4 2xl:w-4"
            />
            {date}
          </div>
          <div className="flex items-center text-sm leading-[.75rem] text-black_m 2xl:text-md">
            <img
              src={briefCaseFillIcon}
              alt="briefcase icon"
              className="mr-1 h-3 w-3 2xl:h-4 2xl:w-4"
            />
            {sellerName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
