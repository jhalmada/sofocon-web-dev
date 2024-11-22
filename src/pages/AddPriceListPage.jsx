import { Link, useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import Input from "../components/inputs/Input";
import uploadIcon from "../assets/icons/upload.svg";
import Button from "../components/buttons/Button";
import arrowRigthIcon from "../assets/icons/arrow-right.svg";
import { Controller, set, useForm } from "react-hook-form";
import { useState } from "react";
import useAddProducts from "../hooks/products/useAddProducts";
import AutoCompleteArray from "../components/autocomplete/AutoCompleteArray";
import ReusableModal from "../components/modals/ReusableModal";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";
import { Checkbox } from "@nextui-org/react";
import useGetProducts from "../hooks/products/useGetProducts";
import useCompanies from "../hooks/companies/useCompanies";
import useAddPriceList from "../hooks/priceList/useAddPriceList";

const AddPriceListPage = () => {
  //estados
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isDirect, setIsDirect] = useState(false);
  const [isAllCompanies, setIsAllCompanies] = useState(false);
  const [modalValidationProduct, setModalValidationProduct] = useState(false);

  //Hooks
  const { productsResponse, setSearch } = useGetProducts();

  const { companiesResponse, setSearch: setSearchCompany } = useCompanies();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm();

  const { postAddPriceList } = useAddPriceList();

  //Funciones

  const validateInput = (array) => {
    console.log(array);
    const result = array.find((product) => {
      product.value === "";
    });

    return result ? false : true;
  };

  const onSubmit = async (data) => {
    const { name, productos, company } = data;
    const respuesta = validateInput(productos);
    if (respuesta) {
      setModalValidationProduct(true);
      return;
    } else {
      const PriceData = {
        name,
        product: productos.map((product) => ({
          product: product.id,
          price: product.value,
        })),
        client: isAllCompanies
          ? null
          : company.map((compan) => ({ id: compan.id })),
        isDirect,
      };
      const response = await postAddPriceList(PriceData);
      if (response) {
        setSaveConfirmationModalOpen(true);
      }
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
                  value: 30,
                  message: "El nombre no puede exceder los 30 caracteres.",
                },
                minLength: {
                  value: 3,
                  message: "El nombre debe contener al menos 3 caracteres.",
                },
              })}
              msjError={errors.name ? errors.name.message : ""}
            />

            <Controller
              name="productos"
              control={control}
              rules={{ required: "Debes seleccionar al menos un producto" }}
              render={({ field }) => (
                <AutoCompleteArray
                  array={productsResponse}
                  label={"Seleccionar Productos"}
                  label2={"Producto"}
                  name={field.name}
                  setValue={setValue}
                  control={field}
                  msjError={errors.productos?.message}
                  clearErrors={clearErrors}
                />
              )}
            />
            <div>
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
                setErrors={setError}
                {...register("company", {
                  required: {
                    value: !isAllCompanies,
                    message: "Campo obligatorio",
                  },
                })}
                msjError={!isAllCompanies && errors?.company?.message}
              />
            </div>

            <Checkbox onChange={() => setIsAllCompanies(!isAllCompanies)}>
              <p className="text-sm">Asignar a todas las empresas existente</p>
            </Checkbox>
            <Checkbox onChange={() => setIsDirect(!isDirect)}>
              <p className="text-sm">Lista de precios de venta directa</p>
            </Checkbox>

            <div className="flex justify-end">
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
            onClose={() => handleAccept()}
            title="Lista Agregada"
            variant="confirmation"
            buttons={["accept"]}
            onAccept={() => handleAccept()}
          >
            La lista fue agregada correctamente.
          </ReusableModal>
          <ReusableModal
            isOpen={modalValidationProduct}
            onClose={() => setModalValidationProduct(false)}
            title="Faltan Precios"
            variant="confirmation"
            buttons={["accept"]}
            onAccept={() => setModalValidationProduct(false)}
          >
            Porfavor ingresa el precio a todos los productos seleccionados.
          </ReusableModal>
        </div>
      </div>
    </div>
  );
};

export default AddPriceListPage;
