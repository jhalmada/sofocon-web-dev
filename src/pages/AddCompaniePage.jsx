import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import geoaltIcon from "../assets/icons/geo-alt.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import PlusFillIcon from "../assets/icons/plus-fill.svg";
import Button from "../components/buttons/Button";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import { useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { Checkbox, DatePicker, Tooltip } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import useAddCompany from "../hooks/companies/useAddCompanies";
import { I18nProvider } from "@react-aria/i18n";
const AddCompaniePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { postAddCompany } = useAddCompany();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapModal, setIsMapModal] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [msjError, setMsjError] = useState("");
  const [checkSelected, setCheckSelected] = useState("RUT");
  const [competence, setCompetence] = useState(false);
  const handleCompanyCreation = async (companyData) => {
    try {
      const newCompany = await postAddCompany(companyData);
      if (newCompany) {
        setSaveConfirmationModalOpen(true);
      } else {
        console.error(
          "No se recibió una nueva empresa después de la actualización",
        );
      }
    } catch (error) {
      console.error("Error al crear la empresa:", error);
      setMsjError("El nombre de la empresa ya existe.");
      setIsModalOpen(true);
    }
  };
  const onSubmit = (data) => {
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
  const closeModalMap = () => {
    setIsMapModal(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    //setConfirmCancelModalOpen(false);
    setSaveConfirmationModalOpen(false);
    //setConfirmDeleteModalOpen(false);
  };
  const closeSaveConfirmationModal = () => {
    navigate("/inicio/empresas");
    setSaveConfirmationModalOpen(false);
    closeModal();
  };
  const handleConfirmSaveClick = () => {
    navigate("/inicio/empresas");
    closeSaveConfirmationModal();
  };
  const handleCancelClick = () => closeModal();
  return (
    <div className="flex min-h-full flex-col justify-between bg-gray">
      <div className="flex-grow p-6">
        <Link
          to="/inicio/empresas"
          className="cursor-pointer text-sm font-medium leading-4"
        >
          <div className="mb-4 flex items-center">
            <img
              src={ChevronLeftIcon}
              alt="arrow left"
              className="-ml-1 h-4 w-4"
            />
            Volver
          </div>
        </Link>
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          Empresas
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-38 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Nueva empresa
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-tr-lg bg-white px-14 py-4 shadow-t"
        >
          <div className="flex flex-col gap-1">
            <Input
              label={"Nombre de la empresa"}
              placeholder={"Escribe el nombre del local..."}
              {...register("name", {
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
              errorApi={errors.name}
              msjError={errors.name ? errors.name.message : ""}
            />
            <div className="mb-2">
              <Checkbox
                onClick={() => setCompetence(!competence)}
                radius="full"
              >
                <p className="text-sm font-light">Cliente de la competencia</p>
              </Checkbox>
            </div>
            <div>
              <Input
                disabled={!competence}
                label={"Empresa actual"}
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
            <div className="flex gap-4">
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
                msjError={
                  errors.neighborhood ? errors.neighborhood.message : ""
                }
              />
            </div>

            <div
              // onClick={() => openMapModalMap()}
              className="mb-2 flex w-[9rem] cursor-pointer justify-center"
            >
              <img src={geoaltIcon} alt="geo Icon" />
              <span className="text-sm leading-[.88rem] underline">
                Marcar en el mapa
              </span>
            </div>
            <Input
              label={"Referente"}
              placeholder={"Escribe el nombre del referente..."}
              {...register("managerName", {
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
                >
                  <label className="text-sm">Asignar R.U.T.:</label>
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
                >
                  <label htmlFor="ci" className="text-sm">
                    {" "}
                    Asignar CI:
                  </label>
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
            <div className="mb-3">
              <label
                className={`${errors.status ? "text-red_e" : "text-gray-700"} block text-sm font-light`}
              >
                Asignar estado:
              </label>
              <Select
                placeholder="Seleccionar estado"
                className={`rounded-lg border ${errors.status ? "border-red_e" : ""}`}
                {...register("status", {
                  required: "Este campo es requerido",
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
            <div className="mb-3 h-full w-[28.3rem]">
              <label
                className={`${errors.nextVisit ? "text-red_e" : "text-black"} text-sm font-light`}
              >
                Próxima visita
              </label>
              <I18nProvider locale="es-ES">
                <Controller
                  name={"nextVisit"}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      className={`${errors.nextVisit ? "text-red_e" : ""} ${errors.nextVisit ? "border-red_e" : ""} rounded-lg border`}
                      {...field}
                      label={""}
                      placeholder="Seleccione una fecha"
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  }}
                />
                <p className="font-roboto text-xs text-red_e">
                  {errors.nextVisit ? errors.nextVisit.message : ""}
                </p>
              </I18nProvider>
            </div>
            <div className="mt-4 flex justify-between">
              <Tooltip content="Viene en una mejora" placement="bottom">
                <div className="space-y-2">
                  <span>Notas</span>

                  <Button
                    text="Nueva Nota"
                    icon={PlusFillIcon}
                    iconPosition={"left"}
                    width="w-40"
                    color={"cancel"}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="flex w-full justify-end py-6">
            <Button
              text={"GUARDAR"}
              color={"save"}
              type={"submit"}
              icon={ArrowRightIcon}
            />
          </div>
        </form>
        <ReusableModal
          width="w-[45.37rem]"
          isOpen={isMapModal}
          onClose={closeModalMap}
          title="Marcar ubicación en el mapa"
          buttons={["cancel", "save"]}
          handleCancelClick={handleCancelClick}
        >
          <div className="flex flex-col">
            <Input label={"Dirección"} placeholder={"Escribir..."} />
            <div className="flex h-[15rem] items-center justify-center bg-blue_l text-2xl text-white">
              Mapa
            </div>
          </div>
        </ReusableModal>
        <ReusableModal
          isOpen={isSaveConfirmationModalOpen}
          onClose={closeSaveConfirmationModal}
          title="Cambios guardados"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={closeSaveConfirmationModal}
        >
          Los cambios fueron guardados exitosamente.
        </ReusableModal>
        <ReusableModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Error al guardar"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={() => setIsModalOpen(false)}
        >
          {msjError}
        </ReusableModal>
      </div>
    </div>
  );
};
export default AddCompaniePage;
