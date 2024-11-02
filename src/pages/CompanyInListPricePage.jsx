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

const CompanyInListPricePage = ({
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
  console.log(companiesResponse);
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

  return (
    <div className="min-h-[calc(100vh-4.375rem)] overflow-auto rounded-tr-lg bg-white p-5">
      <table className={`mt-2 w-full text-center`}>
        {total > 0 ? (
          <thead>
            <tr>
              <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                Empresa
              </th>
              <th className="p-2 text-md font-semibold leading-[1.125rem]">
                Acción
              </th>
            </tr>
          </thead>
        ) : (
          <h4 className="text-xl font-semibold">
            Estan aignadas todas las empresas
          </h4>
        )}
        <tbody>
          {total > 0 &&
            arrayCompanies.map((companie, index) => (
              <tr className="border-b border-gray text-center" key={index}>
                <td
                  className="overflow-hidden text-ellipsis whitespace-nowrap p-2 text-left"
                  title={companie.name}
                >
                  {companie.name}
                </td>
                <td className="p-2">
                  <div className="flex justify-center gap-4">
                    <img
                      src={deleteIcon}
                      alt="Delete icon"
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => console.log("presionado")}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center p-6">
        {total > 0 && (
          <Pagination
            pageIndex={setItemsPerPage}
            currentPage={page}
            totalPages={totalPage}
            onPageChange={setPage}
            itemsPerPage={itemsPerPage}
            total={total}
          />
        )}
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

export default CompanyInListPricePage;
