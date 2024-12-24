import Pagination from "../components/Pagination";
import RouteCompanieDetailsRow from "../components/RouteCompanieDetailsRow";
import deleteIcon from "../assets/icons/trash3.svg";
import useCompanies from "../hooks/companies/useCompanies";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";
import { useForm } from "react-hook-form";
import ReusableModal from "../components/modals/ReusableModal";
import usePutSellerRoute from "../hooks/sellerRoutes/usePutSellerRoutes";
import { useEffect, useState } from "react";
import FilterSelect from "../components/filters/FilterSelect";
import SearchInput from "../components/inputs/SearchInput";
import SaveImg from "../assets/img/save.svg";
import disconnectedImg from "../assets/images/disconnected.svg";

const AddCompanyRoutePage = ({
  setSearch,
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
  companyModified,
}) => {
  //estados
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  const stateOptions = ["Frecuente", "Potencial", "De baja"];
  //hooks
  const { companiesResponse, setSearch: setSearchCompany } = useCompanies();
  console.log(companiesResponse);
  console.log(arrayCompanies);
  const { changedSellerRoute } = usePutSellerRoute();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //funciones
  const onSubmit = (data) => {
    const companies = data.empresas.map((company) => ({
      client: company.id,
      status: company?.clientInRoute[0]?.status || "AVAILABLE",
    }));
    const newData = {
      clientInRoute: [...companies],
    };
    changedSellerRoute(newData, idCompany, setModified);
    closeModal();
    companyModified((prev) => !prev);
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
    companyModified((prev) => !prev);
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
      case "Frecuente":
        setStatus("FRECUENT");
        break;
      case "Potencial":
        setStatus("POTENTIAL");
        break;
      case "De baja":
        setStatus("UNSUBSCRIBED");
        break;
      default:
        setStatus("");
        break;
    }
  };

  return (
    <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      <div>
        <div className="flex justify-end">
          <SearchInput placeholder="Buscar..." onChange={setSearch} />
        </div>
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
            {arrayCompanies.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                    Ningún elemento coincide con tu búsqueda, inténtalo de
                    nuevo. <br /> Puedes encontrar las rutas creadas aquí.
                  </p>
                  <img
                    src={disconnectedImg}
                    alt="Tabla vacía"
                    className="mx-auto"
                  />
                </td>
              </tr>
            ) : (
              arrayCompanies.map((companie, index) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
      <div
        className={
          arrayCompanies.length === 0 ? "hidden" : `flex justify-center p-6`
        }
      >
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
              array2={arrayCompanies || []}
              label2={"Empresas asignadas"}
              array={companiesResponse || []}
              name={"empresas"}
              label={"Agregar Empresas"}
              setValue={setValue}
              onChange={setSearchCompany}
            />
            <p>{errors.empresas && errors.empresas.message}</p>
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
