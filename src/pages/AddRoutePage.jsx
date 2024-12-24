import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../components/inputs/Input";
import PlusFillIcon from "../assets/icons/plus-fill.svg";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { useForm } from "react-hook-form";
import useUsers from "../hooks/users/use.users";
import useCompanies from "../hooks/companies/useCompanies";
import AddSellersRoutes from "../hooks/sellerRoutes/useAddSellerRoutes";
import SearchInput from "../components/inputs/SearchInput";
import BackButton from "../components/buttons/BackButton";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";
import useUsersSellers from "../hooks/users/useUsersSellers";

const AddRoutePage = () => {
  const options = ["Activo", "Inactivo"];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { userSellerResponse, setSearch } = useUsersSellers();
  const [isMapModal, setIsMapModal] = useState(false);
  const [msjError, setMsjError] = useState("");
  const { companiesResponse, setSearch: setSearchCompany } = useCompanies();
  const { postAddSellersRoutes, loading } = AddSellersRoutes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const { route } = useParams();

  const handleSellerCreation = async (sellerData) => {
    try {
      const newSeller = await postAddSellersRoutes(sellerData);
      if (newSeller) {
        setSaveConfirmationModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      setMsjError("El nombre de la ruta ya existe.");
      console.error("Error al crear la ruta:", error);
      setIsModalOpen(true);
    }
  };
  const onSubmit = (data) => {
    const { name, status, vendedores, empresas, zone } = data;
    const seller = vendedores
      ? vendedores.map((vendedor) => ({ id: vendedor.id }))
      : [];
    const companies = empresas
      ? empresas.map((empresa) => ({ client: empresa.id }))
      : [];
    const newData = {
      name,
      zone,
      isActive: status === "Activo" ? true : false,
      user: [...seller],
      clientInRoute: [...companies],
    };

    handleSellerCreation(newData);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSaveConfirmationModalOpen(false);
  };

  const closeSaveConfirmationModal = () => {
    navigate("/inicio/rutas");
    setSaveConfirmationModalOpen(false);
    closeModal();
  };
  const handleCancelClick = () => closeModal();
  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.userInfo.fullName,
    }));
  };

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col p-6">
        {route === "true" ? (
          <BackButton route={"/inicio/empresas"} />
        ) : (
          <div className="w-[4rem]">
            <BackButton route={"/inicio/rutas"} />
          </div>
        )}

        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Rutas
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="min-w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Nueva ruta
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow flex-col justify-between rounded-tr-lg bg-white px-14 py-4"
        >
          <div>
            <Input
              label={"Nombre"}
              placeholder={"Escribir..."}
              {...register("name", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 2,
                  message: "El nombre debe contener al menos 2 caracteres.",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres.",
                },
              })}
              errorApi={errors.name}
              msjError={errors.name ? errors.name.message : ""}
            />
            <Input
              label={"Zona"}
              placeholder={"Escribir..."}
              {...register("zone", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 2,
                  message: "El nombre debe contener al menos 2 caracteres.",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres.",
                },
              })}
              errorApi={errors.zone}
              msjError={errors.zone ? errors.zone.message : ""}
            />
            <div className="mb-4 space-y-2">
              <label className="text-gray-700 block text-sm font-light">
                Asignar estado:
              </label>
              <Select
                defaultSelectedKeys={["Activo"]}
                onSelectionChange={(value) => setValue("status", value)}
                placeholder="Estado"
                className="rounded-lg border"
                {...register("status", {
                  validate: (value) =>
                    value ? true : "Debes seleccionar una opción",
                })}
                errorApi={errors.status}
                msjError={errors.status ? errors.status.message : ""}
              >
                {options.map((option) => (
                  <SelectItem key={option}>{option}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="mb-4 space-y-2">
              <NextAutoComplete
                label2={"Vendedores Asignados"}
                array={transformData(userSellerResponse?.result || []) || []}
                name={"vendedores"}
                label={"Agregar Vendedores"}
                setValue={setValue}
                onChange={setSearch}
              />
            </div>

            <div className="mb-4 space-y-2">
              <NextAutoComplete
                label2={"Empresas Asignadas"}
                array={companiesResponse || []}
                name={"empresas"}
                label={"Agregar Empresas"}
                setValue={setValue}
                onChange={setSearchCompany}
              />
            </div>
          </div>
          <div className="flex w-full justify-end py-6">
            <Button
              text={"GUARDAR"}
              color={"save"}
              type={"submit"}
              icon={ArrowRightIcon}
            />
          </div>
        </form>
        <ReusableModal
          width="w-[45.37rem]"
          isOpen={isMapModal}
          onClose={handleCancelClick}
          title="Marcar ubicación en el mapa"
          onSubmit={handleSubmit(onSubmit)}
          buttons={["cancel", "save"]}
          handleCancelClick={handleCancelClick}
        >
          <div className="flex flex-col">
            <Input label={"Dirección"} placeholder={"Escribir..."} />
            <div className="flex h-[15rem] items-center justify-center bg-blue_l text-2xl text-white">
              Mapa
            </div>
          </div>
        </ReusableModal>
        <ReusableModal
          isOpen={isSaveConfirmationModalOpen}
          onClose={closeSaveConfirmationModal}
          title="Cambios guardados"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={closeSaveConfirmationModal}
        >
          Los cambios fueron guardados exitosamente.
        </ReusableModal>
        <ReusableModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Error al guardar"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={() => setIsModalOpen(false)}
        >
          {msjError}
        </ReusableModal>
      </div>
    </div>
  );
};
export default AddRoutePage;
