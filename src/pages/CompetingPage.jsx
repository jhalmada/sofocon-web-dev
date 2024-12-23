import Pagination from "../components/Pagination";
import { useForm } from "react-hook-form";
import CompetingRow from "../components/CompetingRow";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import { parseAbsoluteToLocal } from "@internationalized/date";
import notesIcon from "../assets/icons/sticky-fill.svg";
import FilterSelect from "../components/filters/FilterSelect";
import { Select, SelectItem } from "@nextui-org/select";
import Input from "../components/inputs/Input";
import { Checkbox } from "@nextui-org/react";
import ReusableModal from "../components/modals/ReusableModal";
import pageLostImg from "../assets/images/pageLost.svg";
import { useState } from "react";
import SearchInput from "../components/inputs/SearchInput";
import Calendar from "../components/calendar/Calendar";
import SaveImg from "../assets/img/save.svg";
import deleteImg from "../assets/img/deleted.svg";
const CompetingPage = ({
  companiesResponse,
  setSearch,
  setItemsPerPage,
  totalPage,
  total,
  setPage,
  page,
  itemsPerPage,
  setNextVisit,
  changedCompany,
  setModified,
  setSaveConfirmationModalOpen,
  deleteCompany,
}) => {
  const [companyId, setCompanyId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [competence, setCompetenceEdit] = useState(false);
  const [stateFilter, setStateFilter] = useState("");
  const [errorDataPicker, setErrorDataPicker] = useState(false);
  const [checkSelected, setCheckSelected] = useState("RUT");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const visitOptions = ["< 1 mes", "< 2 meses", "> 2 meses"];
  const stateOptions = ["Competencia"];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm();

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
      companyToEdit.competenceName
        ? setCompetenceEdit(true)
        : setCompetenceEdit(false);
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

  const handleCompanyCreation = async (companyData) => {
    try {
      const newCompany = await changedCompany(
        companyData,
        companyId,
        setModified,
      );

      if (newCompany) {
        setSaveConfirmationModalOpen(true);
        setIsModalOpen(false);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al crear la empresa:", error);
      setIsModalOpen(true);
    }
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
      competenceName,
    } = data;
    const newdata = new Date(
      nextVisit.year,
      nextVisit.month - 1,
      nextVisit.day,
    );

    //formate la fecha para que sea aceptada por el back
    const formattedDate = newdata.toISOString();
    switch (checkSelected) {
      case "RUT":
        handleCompanyCreation({
          name,
          department,
          managerName,
          phone,
          status,
          address,
          neighborhood,
          nextVisit: newdata,
          rut: data.rut,
          competenceName: competence ? competenceName : "",
        });
        break;
      default:
        handleCompanyCreation({
          name,
          department,
          managerName,
          phone,
          status,
          address,
          neighborhood,
          nextVisit: formattedDate,
          ci: data.ci,
          competenceName: competence ? competenceName : "",
        });
    }
  };

  const handleConfirmDelete = () => {
    deleteCompany(companyId, setModified);
    setConfirmDeleteModalOpen(false);
    setConfirmDelete(true);
  };

  return (
    <div className="flex h-full flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      <div>
        <div className="flex justify-end">
          <SearchInput placeholder="Buscar..." onChange={setSearch} />
        </div>
        {companiesResponse.length === 0 ? (
          <tr className="flex min-h-[calc(100vh-18rem)] items-center justify-center">
            <td colSpan="5" className="p-4 text-center">
              <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                Ningún elemento coincide con tu búsqueda, inténtalo de nuevo.{" "}
                <br /> Puedes encontrar a las empresas de la competencia aquí.
              </p>
              <img src={pageLostImg} alt="Tabla vacía" className="mx-auto" />
            </td>
          </tr>
        ) : (
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
      </div>

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
      {/*modal para editar*/}
      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Empresa"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              label={"Nombre de la empresa"}
              placeholder={"Escribe el nombre del local..."}
              {...register("name", {
                required: "Este campo es requerido",
              })}
              errorApi={errors.name}
              msjError={errors.name ? errors.name.message : ""}
            />
          </div>

          <div>
            <Checkbox
              defaultSelected={competence}
              onClick={() => setCompetenceEdit(!competence)}
              radius="full"
              className="font-light"
              size="sm"
            >
              Cliente de la competencia
            </Checkbox>
            <Input
              disabled={!competence}
              label={"Empresas actual"}
              placeholder={"Escribe el nombre..."}
              {...register("competenceName", {
                required: competence && "Este campo es requerido",
                minLength: {
                  value: 2,
                  message: "El nombre debe contener al menos 2 caracteres.",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres.",
                },
              })}
              errorApi={errors.competenceName}
              msjError={
                errors.competenceName ? errors.competenceName.message : ""
              }
            />
          </div>
          <Input
            label={"Departamento"}
            placeholder={"Escribir..."}
            {...register("department", {
              required: "Este campo es requerido",
              minLength: {
                value: 2,
                message: "El nombre debe contener al menos 2 caracteres.",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede exceder los 50 caracteres.",
              },
            })}
            errorApi={errors.department}
            msjError={errors.department ? errors.department.message : ""}
          />
          <Input
            label={"Barrio"}
            placeholder={"Escribir..."}
            {...register("neighborhood", {
              required: "Este campo es requerido",
              minLength: {
                value: 2,
                message: "El nombre debe contener al menos 2 caracteres.",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede exceder los 50 caracteres.",
              },
            })}
            errorApi={errors.neighborhood}
            msjError={errors.neighborhood ? errors.neighborhood.message : ""}
          />
          <div>
            <Input
              label={"Dirección"}
              placeholder={"Escribir..."}
              {...register("address", {
                required: "Este campo es requerido",
                minLength: {
                  value: 2,
                  message: "El nombre debe contener al menos 2 caracteres.",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres.",
                },
              })}
              errorApi={errors.address}
              msjError={errors.address ? errors.address.message : ""}
            />
            <Input
              label={"Otros datos..."}
              placeholder={"Escribe..."}
              {...register("managerName", {
                required: "Este campo es requerido",
                minLength: {
                  value: 2,
                  message: "El campo debe contener al menos 2 caracteres.",
                },
                maxLength: {
                  value: 50,
                  message: "El campo no puede exceder los 50 caracteres.",
                },
              })}
              errorApi={errors.managerName}
              msjError={errors.managerName ? errors.managerName.message : ""}
            />
            <Input
              type={"number"}
              label={"Contacto"}
              placeholder={"Escribe el teléfono del contacto..."}
              {...register("phone", {
                required: "Este campo es requerido",
                minLength: {
                  value: 15,
                  message: "Ingrese los 15 digitos de su numero.",
                },
                maxLength: {
                  value: 15,
                  message: "Ingrese solo los 15 digitos de su numero.",
                },
              })}
              errorApi={errors.phone}
              msjError={errors.phone ? errors.phone.message : ""}
            />
            <div className="flex gap-[.63rem]">
              <div className="w-full">
                <Checkbox
                  defaultSelected={checkSelected === "RUT"}
                  isSelected={checkSelected === "RUT"}
                  onClick={() => setCheckSelected("RUT")}
                  radius="full"
                  className="font-light"
                  size="sm"
                >
                  Asignar R.U.T.:
                </Checkbox>
                <Input
                  type={"number"}
                  isSelected={checkSelected === "RUT"}
                  disabled={checkSelected !== "RUT"}
                  placeholder={"Escribe los 12 caracteres del RUT..."}
                  {...register("rut", {
                    required:
                      checkSelected === "RUT" && "Este campo es requerido",
                    minLength: {
                      value: 12,
                      message: "Ingrese los 12 digitos de su RUT.",
                    },
                    maxLength: {
                      value: 12,
                      message: "Ingrese solo los 12 digitos de su RUT.",
                    },
                  })}
                  errorApi={checkSelected === "RUT" && errors.rut}
                  msjError={
                    checkSelected === "RUT" && errors.rut
                      ? errors.rut.message
                      : ""
                  }
                />
              </div>
              <div className="w-full">
                <Checkbox
                  isSelected={checkSelected === "CI"}
                  onClick={() => setCheckSelected("CI")}
                  radius="full"
                  className="font-light"
                  size="sm"
                >
                  Asignar CI:
                </Checkbox>
                <Input
                  type={"number"}
                  disabled={checkSelected !== "CI"}
                  placeholder={"Escribe los 8 caracteres del CI..."}
                  {...register("ci", {
                    required:
                      checkSelected === "CI" && "Este campo es requerido",
                    minLength: {
                      value: 8,
                      message: "Ingrese los 8 digitos de su CI.",
                    },
                    maxLength: {
                      value: 8,
                      message: "Ingrese solo los 8 digitos de su CI.",
                    },
                  })}
                  errorApi={checkSelected === "CI" && errors.ci}
                  msjError={
                    checkSelected === "CI" && errors.ci ? errors.ci.message : ""
                  }
                />
              </div>
            </div>
          </div>
          <div className="mb-4 space-y-2">
            <label
              className={`mb-2 block text-sm font-medium ${errors.status ? "text-red_e" : "text-gray-700"}`}
            >
              Asignar estado:
            </label>
            <Select
              placeholder="Seleccionar estado"
              className={`rounded-lg border ${errors.status ? "border-red_e" : ""}`}
              {...register("status", {
                validate: (value) => (value ? true : "Este campo es requerido"),
              })}
              onSelectionChange={(values) => setValue("status", values)}
            >
              <SelectItem key={"FRECUENT"}>Frecuente</SelectItem>
              <SelectItem key={"POTENTIAL"}>Potencial</SelectItem>
              <SelectItem key={"UNSUBSCRIBED"}>De Baja</SelectItem>
              <SelectItem key={"COMPETENCE"}>Competencia</SelectItem>
            </Select>
            <p className="font-roboto text-xs text-red_e">
              {errors.status ? errors.status.message : ""}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-light text-black">
              Próxima visita
            </label>
            <Calendar
              control={control}
              errors={errors}
              setErrorDataPicker={setErrorDataPicker}
              errorDataPicker={errorDataPicker}
              name="nextVisit"
            />
          </div>
        </form>
      </ReusableModal>
      <ReusableModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setConfirmDeleteModalOpen(false)}
        title="Eliminar Empresa"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(companyId)}
      >
        Esta empresa será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
      {/*modal para elementos eliminados*/}
      <ReusableModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Empresa Eliminada"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setConfirmDelete(false)}
      >
        <div className="flex flex-col items-center justify-center">
          <img src={deleteImg} alt="delete" />
          <p className="font-roboto text-sm font-light text-black">
            La empresa fue eliminada correctamente.
          </p>
        </div>
      </ReusableModal>
    </div>
  );
};
export default CompetingPage;
