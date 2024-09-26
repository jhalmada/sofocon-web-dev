import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link } from "react-router-dom";

const SellersPage = () => {
  return (
    <div className="flex h-full flex-col justify-between bg-gray">
      <div className="flex-grow p-6">
        <Link
          to="/inicio/usuarios"
          className="cursor-pointer text-sm font-medium leading-4"
        >
          <div className="mb-4 flex items-center">
            <img
              src={ChevronLeftIcon}
              alt="arrow left"
              className="-ml-1 h-4 w-4"
            />
            Volver
          </div>
        </Link>
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Vendedores
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-36 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Vendedores
            </span>
          </div>
        </div>
        <div className="rounded-tr-lg bg-white p-5 py-10 shadow-t">
          {" "}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
          dolore adipisci accusamus alias unde labore cumque odit explicabo
          ullam reiciendis. Quibusdam nam maxime porro soluta voluptas iure
          doloremque nostrum in.{" "}
        </div>
      </div>
    </div>
  );
};

export default SellersPage;
