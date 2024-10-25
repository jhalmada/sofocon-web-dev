import Pagination from "../components/Pagination";
import { Controller, useForm } from "react-hook-form";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import useCompanies from "../hooks/companies/useCompanies";
import { useState } from "react";
import FilterSelect from "../components/filters/FilterSelect";
import StorageRow from "../components/StorageRow";
import { Checkbox, DatePicker, Select, SelectItem } from "@nextui-org/react";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";
import { Input } from "postcss";
import { I18nProvider } from "@react-aria/i18n";
import ReusableModal from "../components/modals/ReusableModal";
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
    <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      <div>
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
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Acción
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
              editIconSrc={editIcon}
              deleteIconSrc={deleteIcon}
              onEditClick={() => {
                openModal();
              }}
              onDeleteClick={() => openConfirmDeleteModal()}
            />
          </tbody>
        </table>
      </div>
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
          <I18nProvider locale="es-ES">
            <Controller
              name={"dateV"}
              control={control}
              render={({ field }) => (
                <DatePicker
                  minValue={today(getLocalTimeZone())}
                  className={`${errors.dateV ? "text-red_e" : ""} ${errors.dateV ? "border-red_e" : ""} rounded-lg border`}
                  {...field}
                  label={""}
                  placeholder="Seleccione una fecha"
                  granularity="day"
                  errorMessage={(value) => {
                    if (value.isInvalid) {
                      setErrorDataPicker(true);
                      return "";
                    } else {
                      setErrorDataPicker(false);
                      return "";
                    }
                  }}
                />
              )}
              rules={{
                required: dateSelected && "La fecha es obligatoria",
              }}
            />
            <p className="font-roboto text-xs text-red_e">
              {errors.dateV ? errors.dateV.message : ""}
            </p>
          </I18nProvider>
          <div className="mt-4">
            <Input
              label={"Vendedor"}
              placeholder={"Escribir..."}
              {...register("seller", {
                required: "Este campo es obligatorio",
              })}
            />

            <label className="block text-sm font-light text-black_b">
              Detalle
            </label>
            <Select
              placeholder="Elegir lista de precios..."
              className="rounded-lg border"
              {...register("status")}
              onSelectionChange={(value) => setValue("status", value)}
            >
              {pricesList.map((option) => (
                <SelectItem key={option}>{option}</SelectItem>
              ))}
            </Select>
            <div className="-mt-9">
              <NextAutoComplete
                array2={[]}
                label2={"Vendedores Asignados"}
                label={"Vendedores"}
                array={[]}
                name={"products"}
                setValue={setValue}
                onChange={setSearch}
                placeholder="Producto 1"
              />
              <p>{errors.vendedores && errors.vendedores.message}</p>
            </div>
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
export default StoragePage;
