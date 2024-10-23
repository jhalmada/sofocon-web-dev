import Pagination from "../components/Pagination";
import { useForm } from "react-hook-form";
import CompetingRow from "../components/CompetingRow";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import notesIcon from "../assets/icons/sticky-fill.svg";
import useCompanies from "../hooks/companies/useCompanies";
import { useState } from "react";
import FilterSelect from "../components/filters/FilterSelect";
import StorageRow from "../components/StorageRow";
const StoragePage = () => {
  const [companyId, setCompanyId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [competence, setCompetence] = useState(false);
  const [visitFilter, setVisitFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const visitOptions = ["< 1 mes", "< 2 meses", "> 3 meses"];
  const stateOptions = ["Activo", "Inactivo"];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    companiesResponse,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setModified,
  } = useCompanies();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  };
  const openModal = (id) => {
    const companyToEdit = companiesResponse.find(
      (company) => company.id === id,
    );
    if (companyToEdit) {
      setValue("name", companyToEdit?.name || "");
      setValue("department", companyToEdit?.department || "");
      setValue("neighborhood", companyToEdit?.neighborhood || "");
      setValue("address", companyToEdit?.address || "");
      setValue("managerName", companyToEdit?.managerName || "");
      setValue("phone", companyToEdit?.phone || "");
      setValue("rut", companyToEdit?.rut || "");
      setValue("status", companyToEdit?.status || "");
      setValue(
        "nextVisit",
        parseAbsoluteToLocal(
          companyToEdit?.nextVisit || "2024-10-02T21:46:00.330Z",
        ),
      );
      companyToEdit.competenceName
        ? setValue("competenceName", companyToEdit.competenceName)
        : setValue("competenceName", "");
      companyToEdit.competenceName ? setCompetence(true) : setCompetence(false);
    }
    setIsModalOpen(true);
    setCompanyId(id);
    setIsModalOpen(true);
  };
  const openConfirmDeleteModal = (id) => {
    setCompanyId(id);
    setConfirmDeleteModalOpen(true);
  };
  const handleVisitFilterChange = (value) => {
    setVisitFilter(value);
  };
  const handleStateFilterChange = (value) => {
    setStateFilter(value);
  };
  return (
    <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Empresa
            </th>
            <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
              ID de orden
            </th>
            <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
              Fecha de ingreso
            </th>

            <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
              Fecha de retiro
            </th>
            <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
              Vendedor
            </th>
            <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
              <div className="flex flex-col gap-2">
                <FilterSelect
                  options={stateOptions}
                  placeholder="Estado"
                  onChange={handleStateFilterChange}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <StorageRow
            key={""}
            id={""}
            name={"Nombre de la empresa"}
            orderId={"ID de orden"}
            entryData={"Fecha de ingreso"}
            retirementDate={"Fecha de retiro"}
            seller={"Vendedor"}
            state={"estado"}
          />
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
    </div>
  );
};
export default StoragePage;
