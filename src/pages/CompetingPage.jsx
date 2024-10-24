import Pagination from "../components/Pagination";
import { useForm } from "react-hook-form";
import CompetingRow from "../components/CompetingRow";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import { parseAbsoluteToLocal } from "@internationalized/date";
import notesIcon from "../assets/icons/sticky-fill.svg";
import useCompanies from "../hooks/companies/useCompanies";
import { useEffect, useState } from "react";
import FilterSelect from "../components/filters/FilterSelect";
import pageLostImg from "../assets/images/pageLost.svg";
const CompetingPage = () => {
  const [companyId, setCompanyId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [competence, setCompetence] = useState(false);
  const [visitFilter, setVisitFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const visitOptions = ["< 1 mes", "< 2 meses", "> 2 meses"];
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
    setNextVisit,
    setCompetence: setCompetenceCompanies,
  } = useCompanies();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
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
    console.log(value);
    switch (value) {
      case "< 1 mes":
        setNextVisit(1);
        break;
      case "< 2 meses":
        setNextVisit(2);
        break;
      case "> 2 meses":
        setNextVisit(3);
        break;
      default:
        setNextVisit(null);
        "selecciona una opción válida";
    }
  };
  const handleStateFilterChange = (value) => {
    setStateFilter(value);
  };

  useEffect(() => {
    setCompetenceCompanies(true);
  }, []);

  return (
    <div className="flex flex-col items-center overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
      {companiesResponse.length === 0 ? (
        <tr>
          <td colSpan="5" className="p-4 text-center">
            <p className="text-md font-semibold leading-[1.3rem] text-black_l">
              Ningún elemento coincide con tu búsqueda, inténtalo de nuevo.{" "}
              <br /> Puedes encontrar a las empresas de la competencia aquí.
            </p>
            <img src={pageLostImg} alt="Tabla vacía" className="mx-auto" />
          </td>
        </tr>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                Nombre
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Dirección
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Empresa actual
              </th>

              <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                <div className="flex flex-col items-center gap-2">
                  <FilterSelect
                    options={visitOptions}
                    placeholder="Próx. visita"
                    onChange={handleVisitFilterChange}
                  />
                </div>
              </th>
              <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                <div className="flex flex-col items-center gap-2">
                  <FilterSelect
                    options={stateOptions}
                    placeholder="Estado"
                    onChange={handleStateFilterChange}
                  />
                </div>
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {companiesResponse.map((companie, index) => (
              <CompetingRow
                key={index}
                name={companie.name}
                direction={companie.address}
                currentCompany={companie.name}
                nextVisits={formatDate(companie.nextVisit)}
                state={companie.status}
                editIconSrc={editIcon}
                deleteIconSrc={deleteIcon}
                notesIcon={notesIcon}
                onEditClick={() => openModal(companie.id)}
                onDeleteClick={() => openConfirmDeleteModal(companie.id)}
              />
            ))}
          </tbody>
        </table>
      )}

      <div
        className={
          companiesResponse.length === 0 ? "hidden" : `flex justify-center p-6`
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
    </div>
  );
};
export default CompetingPage;
