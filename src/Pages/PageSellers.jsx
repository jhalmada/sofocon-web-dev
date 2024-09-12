import { Link } from "react-router-dom";
const PageSellers = () => {
  return (
    <div className="bg-gray p-4">
      <div className="mb-4 flex items-center">
        <img
          src="/assets/icons/chevron-left.svg"
          alt="arrow left"
          className="-ml-1 h-[16px] w-[16px]"
        />
        <Link to={"/home"}>
          {" "}
          <p className="text-sm font-medium leading-[16px]">Volver</p>
        </Link>
      </div>
      <h1 className="mb-5 text-xl font-medium leading-[24px] text-black_m">
        Vendedores
      </h1>
    </div>
  );
};

export default PageSellers;
