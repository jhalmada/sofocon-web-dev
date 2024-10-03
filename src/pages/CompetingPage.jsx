import { useState } from "react";
import Pagination from "../components/Pagination";
import { Select, SelectItem } from "@nextui-org/select";
import { permisos } from "../utils/permisons";
import usePatchRoles from "../hooks/roles/usePatchRoles";
import { useForm } from "react-hook-form";
import useRoles from "../hooks/roles/use.roles";
import ReusableModal from "../components/modals/ReusableModal";
import Input from "../components/inputs/Input";
import CompetingRow from "../components/CompetingRow";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import FilterRightIcon from "../assets/icons/filter-right.svg";
import ChevronDownIcon from "../assets/icons/chevron-down.svg";
import notesIcon from "../assets/icons/sticky-fill.svg";
import DownloadIcon from "../assets/icons/download.svg";
import PlusFillIcon from "../assets/icons/plus-fill.svg";
import Button from "../components/buttons/Button";
import { DatePicker } from "@nextui-org/react";
import CompanieRow from "../components/CompanieRow";
import useCompanies from "../hooks/companies/useCompanies";

const CompetingPage = () => {
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
    setPage,
    page,
    itemsPerPage,
    setModified,
  } = useCompanies();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses están indexados desde 0
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  };

  return (
    <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Nombre
            </th>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Dirección
            </th>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Empresa actual
            </th>

            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Próx. visita
            </th>
            <th className="flex gap-4 p-2 text-left text-md font-semibold leading-[1.125rem]">
              <div className="flex gap-2">
                <h3>Estado</h3>
                <img
                  src={FilterRightIcon}
                  alt="chevron-down icon"
                  className="h-5 w-5 cursor-pointer"
                />
                <img
                  src={ChevronDownIcon}
                  alt="chevron-down icon"
                  className="h-5 w-5 cursor-pointer"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {companiesResponse
            .filter((comp) => comp.status === "Potencial/Competencia")
            .map((companie, index) => (
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
        />
      </div>
    </div>
  );
};

export default CompetingPage;
