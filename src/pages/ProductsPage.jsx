import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import CardProducts from "../components/cards/CardProducts";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useState } from "react";
import Button from "../components/buttons/Button";

import plusIcon from "../assets/icons/plus.svg";
import downloadIcon from "../assets/icons/download.svg";
import SearchInput from "../components/inputs/SearchInput";

const INVENTORY_TAB = "inventory";
const PRICES_TAB = "prices";

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState(INVENTORY_TAB);

  const onChange = (search) => {
    console.log(search);
  };

  return (
    <div className="flex h-full flex-col justify-between bg-gray">
      <div className="flex-grow p-6">
        <div className="w-[4rem]">
          <Link to="/inicio/personal" className="text-sm font-medium leading-4">
            <div className="mb-4 flex items-center">
              <img
                src={ChevronLeftIcon}
                alt="arrow left"
                className="-ml-1 h-4 w-4"
              />
              Volver
            </div>
          </Link>
        </div>

        <h1 className="pb-6 text-xl font-medium leading-6 text-black_m">
          Productos
        </h1>
        {/*navbar */}
        <div className="flex max-h-[57px] items-center justify-between">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(INVENTORY_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === INVENTORY_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Inventario
            </h2>
            <h2
              onClick={() => setActiveTab(PRICES_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === PRICES_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Precios
            </h2>
          </div>
          <div className="mb-12 flex flex-col items-end justify-start">
            <SearchInput onChange={onChange} placeholder="Buscar..." />
            <div className="flex gap-[0.625rem] p-2">
              <Button
                text="Exportar Lista"
                icon={downloadIcon}
                color="cancel"
              />
              <Button text="Nueva Categoria" icon={plusIcon} />
            </div>
          </div>
        </div>

        <div className="grid place-content-center gap-7 rounded-tr-lg bg-white px-7 pb-3 pt-7 shadow-t">
          <section className="grid grid-cols-3 place-content-center gap-8 p-[0.625rem]">
            <CardProducts />
            <CardProducts />
            <CardProducts />
            <CardProducts />
            <CardProducts />
            <CardProducts />
          </section>

          <Pagination />
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
