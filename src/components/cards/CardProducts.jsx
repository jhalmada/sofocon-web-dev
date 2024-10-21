import Arrow from "../../assets/icons/arrow-left.svg";

const CardProducts = () => {
  return (
    <div className="flex h-[16.25rem] w-[21.25rem] flex-col justify-between rounded-[0.875rem] p-4 shadow-blur">
      <div className="h-[6.5rem] w-[100%] rounded-[0.63rem]">
        <img
          src="https://protectamx.com/wp-content/uploads/2024/02/extintor-pqs-6-kg-protecta-venta-mantenimiento-recarga.jpg"
          alt=""
          className="h-[6.5rem] w-[100%] rounded-[0.63rem]"
        />
      </div>
      <div>botones</div>
      <div className="h-24">
        <p className="text-[1.125rem] font-semibold uppercase">Extintores</p>
        <p className="text-xs font-light">10 items</p>
        <div className="flex">
          <p className="Class Properties w-[90%] text-sm font-normal leading-[0.875rem]">
            Detalle descriptivo del grupo de productos que se pueden encontrar
            en esta categoría
          </p>
          <img src={Arrow} className="w-[10%] rotate-180 cursor-pointer"></img>
        </div>
      </div>
    </div>
  );
};

export default CardProducts;
