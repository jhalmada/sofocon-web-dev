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
import disconnectedImg from "../assets/images/disconnected.svg";
import { CompaniesTable } from "./clients/components/companiesTable";

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
  route,
}) => {
  const { changedSellerRoute } = usePutSellerRoute();
  const {
    companiesResponse,
    setSearch: setSearchCompany,
    getAllCompanies,
  } = useCompanies({ competence: false });
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  //estados
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  const stateOptions = ["Frecuente", "Potencial", "De baja"];

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
  useEffect(() => {
    getAllCompanies();
  }, [getAllCompanies]);
  return (
    <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      <div>
        <CompaniesTable
          isCompeting={false}
          route={route}
          companyModified={companyModified}
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
    </div>
  );
};

export default AddCompanyRoutePage;
