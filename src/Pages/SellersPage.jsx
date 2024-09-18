import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link } from "react-router-dom";

const SellersPage = () => {
  return (
    <div className="flex h-full flex-col justify-between overflow-auto bg-gray">
      <div className="flex-grow p-6">
        <div className="mb-4 flex items-center">
          <img
            src={ChevronLeftIcon}
            alt="arrow left"
            className="-ml-1 h-4 w-4"
          />
          <Link to={"/inicio"}>
            <p className="text-sm font-medium leading-4">Volver</p>
          </Link>
        </div>

        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Vendedores
        </h1>

        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-36 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Vendedores
            </span>
          </div>
        </div>

        <form className="rounded-tr-lg bg-white px-14 py-5 shadow-t"></form>
      </div>
    </div>
  );
};

export default SellersPage;
