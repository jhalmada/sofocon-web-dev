import bellWhiteIcon from "../../assets/icons/bell-white.svg";
import calendarIcon from "../../assets/icons/calendar.svg";
import briefCaseFillIcon from "../../assets/icons/briefcase-fill-black.svg";
import { Checkbox, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import usePutOrders from "../../hooks/orders/usePutOrders";
import { set } from "lodash";

const StatusCard = ({
  id,
  clientName,
  orderId,
  productsList,
  bg = "bg-red_e",
  date,
  sellerName,
  isToDeliver,
  discountTotal,
  paymentType,
  charged,
  setTotalOrders, // Function to update total orders count
}) => {
  const { changedOrder } = usePutOrders();

  const [total, setTotal] = useState(0);
  const [isCharged, setIsCharged] = useState(charged);

  const productArray = Array.isArray(productsList) ? productsList : [];
  const displayedProducts = productArray.slice(0, 2);
  const additionalItems = productArray.length - displayedProducts.length;

  const updateOrderState = async (status) => {
    setIsCharged(status);
    await changedOrder({ isCharged: status }, id);
  };

  useEffect(() => {
    const subtotal = productArray.reduce((acc, item) => {
      const itemQuantity = item.amount || 1;
      const itemPrice = item.fixedPrice;
      const discountPercentage = item.amount ? item.amount / 100 : 0;
      const discountedPrice = itemPrice * (1 - discountPercentage);

      return acc + discountedPrice * itemQuantity;
    }, 0);

    setTotal(
      subtotal ? subtotal * 1.22 - subtotal * 1.22 * (discountTotal / 100) : 0,
    );
    setTotalOrders((prev) => Number(prev) + Number(total.toFixed(0))); // Update total orders count
  }, [setTotalOrders, productArray, discountTotal]);

  useEffect(() => {
    setIsCharged(charged);
  }, [charged]);

  return (
    <div className="mt-2 flex h-auto min-h-[12rem] flex-col rounded-lg pb-2 shadow-br 2xl:min-h-[14rem]">
      <div
        className={`flex ${bg} relative justify-center space-x-1 rounded-tl-lg rounded-tr-lg p-2`}
      >
        {isToDeliver && (
          <Tooltip
            content={isCharged ? "Orden cobrada" : "Marcar como cobrado"}
          >
            <Checkbox
              radius="full"
              className="absolute right-2 top-2"
              size="sm"
              isSelected={isCharged}
              checked={isCharged}
              onChange={() => {
                updateOrderState(!isCharged);
              }}
            />
          </Tooltip>
        )}

        <img src={bellWhiteIcon} alt="bell white icon" />
        <p className="text-xs font-semibold leading-[1rem] text-white 2xl:text-md">
          {clientName}
        </p>
      </div>
      <div className="flex h-full min-h-[12rem] flex-col justify-between 2xl:min-h-[14rem]">
        <div className="p-2 text-xxs leading-[.75rem] text-black_l 2xl:text-md">
          {" "}
          {orderId}
        </div>
        <div className="flex flex-col px-2 text-sm font-normal 2xl:text-md">
          <p className="text-xxs leading-[.75rem] text-black_l 2xl:text-md">
            Producto/s:
          </p>
          <ul>
            {displayedProducts.map((product, index) => (
              <li key={index} className="py-1">
                {product?.product?.name}
              </li>
            ))}

            {additionalItems > 0 && (
              <li className="py-1 text-xs leading-[.75rem] text-black_l underline 2xl:text-md">
                +{additionalItems} ítems
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-col space-y-2 px-2 text-xxs font-semibold leading-[.75rem] text-black_b 2xl:text-md">
          <span>{"Total: $" + total.toFixed()}</span>
          <span>{"Forma de pago: " + paymentType}</span>
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
