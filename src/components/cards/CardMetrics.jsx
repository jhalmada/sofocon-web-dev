import React, { useEffect, useState } from "react";
import IconMetrics from "../../assets/icons/IconMetrics.png";
import IconShop from "../../assets/icons/IconShop.png";
import IconCompany from "../../assets/icons/IconClients.png";
import IconStock from "../../assets/icons/IconStock.png";

const CardMetrics = ({ title, total }) => {
  const [image, setImage] = useState();

  const numberFormatter = new Intl.NumberFormat("es-ES", {
    useGrouping: true,
  });

  const reescribir = (str) => {
    return str
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    switch (title) {
      case "orders":
        setImage(IconShop);
        break;
      case "clients":
        setImage(IconCompany);
        break;
      case "stock":
        setImage(IconStock);
        break;
      default:
        setImage(null);
    }
  }, [title]);
  return (
    <div className="shadow-card relative flex h-[11.125rem] w-[23.4375rem] flex-col justify-between rounded-[0.875rem] bg-white p-[0.875rem]">
      <div className="h-[3.75rem]">
        <img
          src={image}
          alt="iconMetrics"
          className="h-[3.75rem] w-[3.75rem]"
        />
      </div>
      <div className="h-[3.4325rem]">
        <p className="text-base font-semibold text-red_m">
          {reescribir(title)}
        </p>
        <p className="text-xl font-medium text-red_m">
          {numberFormatter.format(total)}
        </p>
      </div>
      <img
        src={IconMetrics}
        alt=""
        className="absolute bottom-4 right-5 h-[1.375rem] w-[1.375rem]"
      />
    </div>
  );
};

export default CardMetrics;
