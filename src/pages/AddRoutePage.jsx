import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useEffect, useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { useForm } from "react-hook-form";
import useCompanies from "../hooks/companies/useCompanies";
import AddSellersRoutes from "../hooks/sellerRoutes/useAddSellerRoutes";
import BackButton from "../components/buttons/BackButton";
import useUsersSellers from "../hooks/users/useUsersSellers";
import NextAutoCompleteUsers from "../components/autocomplete/NextAutocompleteUsers";
import NextAutoCompleteCompanies from "../components/autocomplete/NextAutocompleteCompanies";
import SearchInput from "../components/inputs/SearchInput";
import TableCompaniesRoutes from "../components/tables/TableCompaniesRoutes";
import FilterSelect from "../components/filters/FilterSelect";
import { Autocomplete, AutocompleteItem, Checkbox } from "@nextui-org/react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
};

const visitOptions = [
  "Vencidos",
  "A un mes de vencerse",
  "A dos meses de vencerse",
  "Más de dos meses para vencerse",
];

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
  const {
    companiesResponse: companiesResponse2,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setNextVisit,
    nextVisit,
    setNeighborhood,
    setDepartment,
    setUser: setUser2,
    user: user2,
    getAllCompanies,
  } = useCompanies({});

  //estados para el nuevo metodo de filtrado
  const [nextVisit2, setNextVisit2] = useState(null);
  const [neighborhood, setNeighborhood2] = useState("");
  const [department, setDepartment2] = useState("");

  const handleVisitFilterChange = (value) => {
    console.log(value);
    if (!value || value == "") setNextVisit(null);
    else setNextVisit(visitOptions.findIndex((item) => item === value));
    setPage(0);
  };

  const [msjError, setMsjError] = useState("");
  const { companiesResponse, setSearch: setSearchCompany } = useCompanies();
  const { postAddSellersRoutes } = AddSellersRoutes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const { route } = useParams();
  const { companiesResponse: CompanieResult, setUser, user } = useCompanies({});

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

    const baseData = {
      name,
      zone,
      isActive: status === "Activo",
      user: [...seller],
    };

    const newData =
      checkSelected === "filters"
        ? {
            ...baseData,
            filters: {
              user: user2,
              department: department,
              neighborhood: neighborhood,
              nextVisit: nextVisit,
            },
          }
        : {
            ...baseData,
            clientInRoute: [...companies],
          };

    handleSellerCreation(newData);
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
  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.userInfo.fullName,
    }));
  };

  const [checkSelected, setCheckSelected] = useState("manual");
  useEffect(() => {
    getAllCompanies();
  }, [getAllCompanies]);

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
              <NextAutoCompleteUsers
                label2={"Vendedores Asignados"}
                array={transformData(userSellerResponse?.result || []) || []}
                name={"vendedores"}
                label={"Agregar Vendedores"}
                setUser={setUser}
                setValue={setValue}
                onChange={setSearch}
              />
            </div>
            <Checkbox
              radius="full"
              isSelected={checkSelected === "manual"}
              onClick={() => setCheckSelected("manual")}
              className="font-light"
              size="sm"
            >
              Agregar Manualmente{" "}
            </Checkbox>

            <div className="mb-4 space-y-2">
              <NextAutoCompleteCompanies
                isDisabled={checkSelected !== "manual"}
                array2={CompanieResult}
                label2={"Empresas Asignadas"}
                array={companiesResponse || []}
                name={"empresas"}
                label={"Agregar Empresas"}
                setValue={setValue}
                onChange={setSearchCompany}
                user={user}
              />
            </div>
            <Checkbox
              radius="full"
              isSelected={checkSelected === "filters"}
              onClick={() => setCheckSelected("filters")}
              className="font-light"
              size="sm"
            >
              Agregar por filtros
            </Checkbox>
            <div className="mt-4">
              <div className="flex flex-wrap gap-4">
                {" "}
                <div className="flex w-[22rem] flex-col">
                  <label
                    htmlFor="userFilter"
                    className={`font-roboto text-sm font-light text-black`}
                  >
                    Vendedor
                  </label>

                  <Autocomplete
                    isDisabled={checkSelected !== "filters"}
                    className="max-w-[21.875rem] rounded-lg border font-roboto font-medium"
                    placeholder="Buscar vendedor"
                    onInputChange={(e) => setSearch(e)}
                    onSelectionChange={(value) => {
                      console.log(value);
                      setUser2(value?.anchorKey || null);
                    }}
                  >
                    {userSellerResponse &&
                      userSellerResponse?.result?.map((rol) => (
                        <AutocompleteItem
                          key={rol.id}
                          onClick={() => setUser2(rol.id)}
                        >
                          {rol.userInfo.fullName}
                        </AutocompleteItem>
                      ))}
                  </Autocomplete>
                </div>
                <SearchInput
                  disabled={checkSelected !== "filters"}
                  label={"Departamento"}
                  border={`border ${checkSelected !== "filters" ? "border-stone-400" : "border-black"}`}
                  rounded="rounded-[0.5rem]"
                  placeholder="Buscar..."
                  onChange={setDepartment}
                  icon={false}
                  name="departmentSearch"
                  onChange2={setDepartment2}
                />
                <SearchInput
                  disabled={checkSelected !== "filters"}
                  label={"Barrio"}
                  border={`border ${checkSelected !== "filters" ? "border-stone-400" : "border-black"}`}
                  rounded="rounded-[0.5rem]"
                  placeholder="Buscar..."
                  onChange={setNeighborhood}
                  icon={false}
                  name="neighborhoodSearch"
                  onChange2={setNeighborhood2}
                />
                <div className="flex flex-col">
                  <label
                    htmlFor="visitFilter"
                    className={`font-roboto text-sm font-light text-black`}
                  >
                    Próxima visita
                  </label>
                  <FilterSelect
                    disabled={checkSelected !== "filters"}
                    options={visitOptions}
                    placeholder="Próx. visita"
                    onChange={handleVisitFilterChange}
                    onChange2={setNextVisit2}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Table for companies routes */}
          {checkSelected === "filters" && (
            <TableCompaniesRoutes
              companiesResponse2={companiesResponse2}
              formatDate={formatDate}
              setItemsPerPage={setItemsPerPage}
              totalPage={totalPage}
              page={page}
              itemsPerPage={itemsPerPage}
              total={total}
              setPage={setPage}
            />
          )}

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
