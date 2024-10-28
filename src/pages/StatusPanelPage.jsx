import Pagination from "../components/Pagination";
import { useForm } from "react-hook-form";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import useCompanies from "../hooks/companies/useCompanies";
import { useState } from "react";
import { Checkbox, Select, SelectItem } from "@nextui-org/react";
import { Input } from "postcss";
import ReusableModal from "../components/modals/ReusableModal";
import BudgetRow from "../components/BudgetRow";
const StatusPanelPage = () => {
  const [companyId, setCompanyId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [competence, setCompetence] = useState(false);
  const [visitFilter, setVisitFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const visitOptions = ["< 1 mes", "< 2 meses", "> 3 meses"];
  const stateOptions = ["Activo", "Inactivo"];
  const monthsOptions = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const {
    control,
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

  const onSubmit = (data) => {
    console.log(data);
    const {
      nextVisit,
      name,
      department,
      managerName,
      phone,
      status,
      address,
      neighborhood,
    } = data;
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
  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);
  const handleCancelClick = () => {
    openConfirmCancelModal();
    setOpenScannerModal(false);
  };
  const handleVisitFilterChange = (value) => {
    setVisitFilter(value);
  };
  const handleStateFilterChange = (value) => {
    setStateFilter(value);
  };
  return (
    <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      <div>
        <div className="flex items-center gap-2">
          <p className="ml-2 text-black_m">Período</p>
          <Select
            className="w-52 rounded-lg border"
            placeholder="OCTUBRE 2024 "
            onSelectionChange={(values) => setValue("period", values)}
          >
            {monthsOptions.map((option) => (
              <SelectItem key={option}>{option}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={handleCancelClick}
        title="Editar Órden"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-700 block text-sm font-light">
            Asignar estado:
          </label>
          <Select
            placeholder="Estado"
            className="mb-4 rounded-lg border"
            {...register("status")}
            onSelectionChange={(value) => setValue("status", value)}
          >
            {stateOptions.map((option) => (
              <SelectItem key={option}>{option}</SelectItem>
            ))}
          </Select>

          <Input
            label={"ID de órden"}
            placeholder={"Escribir..."}
            {...register("orderId", {
              required: "Este campo es obligatorio",
            })}
          />
          <Input
            label={"Cliente"}
            placeholder={"Escribir..."}
            {...register("client", {
              required: "Este campo es obligatorio",
            })}
          />
          <Input
            label={"R.U.T./CI"}
            placeholder={"Escribir..."}
            {...register("rut", {
              required: "Este campo es obligatorio",
            })}
          />
          <span className="text-sm font-light leading-[1rem] text-black_b">
            Fecha de venta
          </span>

          <div className="mt-4">
            <Input
              label={"Vendedor"}
              placeholder={"Escribir..."}
              {...register("seller", {
                required: "Este campo es obligatorio",
              })}
            />
          </div>
          <div className="mt-9 rounded-lg border p-2">
            {" "}
            <Checkbox
              placeholder="Retiro de extintores"
              radius="full"
              className="font-light"
              size="sm"
            >
              Retiro de extintores
            </Checkbox>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};
export default StatusPanelPage;
