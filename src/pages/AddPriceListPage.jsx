import { Link, useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import Input from "../components/inputs/Input";
import uploadIcon from "../assets/icons/upload.svg";
import Button from "../components/buttons/Button";
import arrowRigthIcon from "../assets/icons/arrow-right.svg";
import { set, useForm } from "react-hook-form";
import { useState } from "react";
import useAddProducts from "../hooks/products/useAddProducts";
import AutoCompleteArray from "../components/autocomplete/AutoCompleteArray";
import ReusableModal from "../components/modals/ReusableModal";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";
import { Checkbox } from "@nextui-org/react";
import useGetProducts from "../hooks/products/useGetProducts";
import useCompanies from "../hooks/companies/useCompanies";
import useAddPriceList from "../hooks/priceList/useAddPriceList";

const busquedas = [
  { name: "Busqueda 1", id: 1 },
  { name: "Busqueda 2", id: 2 },
  { name: "Busqueda 3", id: 3 },
  { name: "Busqueda 4", id: 4 },
];

const AddPriceListPage = () => {
  //estados
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isDirect, setIsDirect] = useState(false);
  const [isAllCompanies, setIsAllCompanies] = useState(false);

  //Hooks
  const { productsResponse, setSearch } = useGetProducts();

  const { companiesResponse, setSearch: setSearchCompany } = useCompanies();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const { postAddPriceList } = useAddPriceList();

  //Funciones

  const onSubmit = async (data) => {
    const { name, product, company } = data;
    const PriceData = {
      name,
      product: product.map((product) => ({
        uuid: product.id,
        price: product.value,
      })),
      isDirect,
    };
    const response = await postAddPriceList(PriceData);
    if (response) {
      setSaveConfirmationModalOpen(true);
    }
  };

  const handleAccept = () => {
    setSaveConfirmationModalOpen(false);
    navigate("..");
  };

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col px-6 pt-6">
        <div className="w-[4rem]">
          <Link to=".." className="text-sm font-medium leading-4">
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
          Inventario
        </h1>

        <div className="flex max-h-[57px] items-center justify-between">
          <div className="flex">
            <h2
              className={`w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Nueva Lista
            </h2>
          </div>
        </div>

        <div className="rounded-tr-lg bg-white px-7 pb-3 pt-7 shadow-t">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Input
              placeholder={"Escribir..."}
              label={"Nombre"}
              {...register("name", {
                required: {
                  value: true,
                  message: "Campo obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres.",
                },
                minLength: {
                  value: 3,
                  message: "El nombre debe contener al menos 3 caracteres.",
                },
              })}
              msjError={errors.name ? errors.name.message : ""}
            />

            <AutoCompleteArray
              label={"Productos"}
              array={productsResponse.map((product) => ({
                name: product.name,
                id: product.id,
              }))}
              setValue={setValue}
              name={"product"}
              label2={"Productos"}
              onChange={setSearch}
            />

            <NextAutoComplete
              array={companiesResponse.map((company) => ({
                id: company.id,
                name: company.name,
              }))}
              label={"Empresas"}
              isDisabled={isAllCompanies}
              setValue={setValue}
              name={"company"}
              label2={"Empresas"}
              onChange={setSearchCompany}
            />
            <Checkbox onChange={() => setIsAllCompanies(!isAllCompanies)}>
              <p className="text-sm">Asignar a todas las empresas existente</p>
            </Checkbox>
            <Checkbox onChange={() => setIsDirect(!isDirect)}>
              <p className="text-sm">Lista de precios de venta directa</p>
            </Checkbox>

            <div className="left-0">
              <Button
                type="submit"
                color="save"
                icon={arrowRigthIcon}
                text={"GUARDAR"}
                width="w-8.75rem"
              />
            </div>
          </form>
          <ReusableModal
            isOpen={isSaveConfirmationModalOpen}
            onClose={() => setSaveConfirmationModalOpen(false)}
            title="Producto Agregado"
            variant="confirmation"
            buttons={["accept"]}
            onAccept={() => handleAccept()}
          >
            El producto fue agregado Exitosamente.
          </ReusableModal>
        </div>
      </div>
    </div>
  );
};

export default AddPriceListPage;
