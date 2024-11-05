import Pagination from "../components/Pagination";
import RouteCompanieDetailsRow from "../components/RouteCompanieDetailsRow";
import deleteIcon from "../assets/icons/trash3.svg";
import useCompanies from "../hooks/companies/useCompanies";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";
import { useForm } from "react-hook-form";
import ReusableModal from "../components/modals/ReusableModal";
import usePutSellerRoute from "../hooks/sellerRoutes/usePutSellerRoutes";
import { useState } from "react";
import FilterSelect from "../components/filters/FilterSelect";

const AddCompanyRoutePage = ({
  setItemsPerPage,
  setPage,
  page,
  totalPage,
  total,
  itemsPerPage,
  arrayCompanies,
  isModalOpen,
  closeModal,
  handleCancelClick,
  idCompany,
  setModified,
  nameCompany,
  setStatus,
}) => {
  //estados
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [stateFilter, setStateFilter] = useState("");

  const stateOptions = ["Frecuente", "Potencial", "De baja"];
  //hooks
  const { companiesResponse, setSearch } = useCompanies();
  const { changedSellerRoute } = usePutSellerRoute();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  //funciones
  const onSubmit = (data) => {
    const companies = data.empresas.map((company) => ({ client: company.id }));
    const newData = {
      clientInRoute: [...companies],
    };
    changedSellerRoute(newData, idCompany, setModified);
    closeModal();
  };
  const openConfirmDeleteModal = (id) => {
    setCompanyId(id);
    setConfirmDeleteModalOpen(true);
  };
  const handleConfirmDelete = () => {
    const newCompanyArray = transformData(arrayCompanies).filter(
      (element) => element.id !== companyId,
    );
    const newArray = newCompanyArray.map((company) => ({ client: company.id }));
    const newData = {
      clientInRoute: [...newArray],
    };
    changedSellerRoute(newData, idCompany, setModified);
    setConfirmDeleteModalOpen(false);
  };

  //funcion para transformar los Arrays
  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  };
  const handleStateFilterChange = (value) => {
    switch (value) {
      case "frecuente":
        setStatus("FRECUENT");
        break;
      case "potencial":
        setStatus("POTENTIAL");
        break;
      case "de baja":
        setStatus("UNSUBSCRIBED");
        break;
      default:
        setStatus("");
        break;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.375rem)] overflow-auto rounded-tr-lg bg-white p-5">
      <table className="mt-2 w-full">
        <thead>
          <tr>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Nombre
            </th>

            <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
              Dirección
            </th>

            <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
              Próx. visita
            </th>
            <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
              <div className="flex flex-col items-center gap-2">
                <FilterSelect
                  options={stateOptions}
                  placeholder="Estado"
                  onChange={handleStateFilterChange}
                />
              </div>
            </th>
            <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
              Notas
            </th>
            <th className="p-2 text-md font-semibold leading-[1.125rem]">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {arrayCompanies.map((companie, index) => (
            <RouteCompanieDetailsRow
              key={index}
              id={companie.id}
              name={companie.name}
              direction={companie.address}
              nextVisits={formatDate(companie.nextVisit)}
              state={companie.status}
              notes={"Ver notas"}
              deleteIconSrc={deleteIcon}
              onDeleteClick={() => openConfirmDeleteModal(companie.id)}
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center p-6">
        <Pagination
          pageIndex={setItemsPerPage}
          currentPage={page}
          totalPages={totalPage}
          onPageChange={setPage}
          itemsPerPage={itemsPerPage}
          total={total}
        />
      </div>
      <ReusableModal
        isOpen={isModalOpen}
        onClose={handleCancelClick}
        title={`${nameCompany}`}
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <div className="space-y-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <NextAutoComplete
              array2={transformData(arrayCompanies) || []}
              label2={"Empresas asignadas"}
              array={transformData(companiesResponse || []) || []}
              name={"empresas"}
              label={"Agregar Empresas"}
              setValue={setValue}
              onChange={setSearch}
            />
            <p>{errors.vendedores && errors.vendedores.message}</p>
          </form>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setConfirmDeleteModalOpen(false)}
        title="Eliminar empresa"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete()}
      >
        Esta empresa será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};

export default AddCompanyRoutePage;
