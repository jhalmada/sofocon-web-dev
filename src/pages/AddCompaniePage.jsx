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
import { Checkbox } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import useAddCompany from "../hooks/companies/useAddCompanies";
import Cards from "../components/cards/Cards";
import SaveImg from "../assets/img/save.svg";
import { PlaceAutocomplete, MapHandler } from "../hooks/Maps/funtionMaps";
import {
  AdvancedMarker,
  Map,
  Marker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import Calendar from "../components/calendar/Calendar";

const coordenadasUruguay = {
  lat: -34.901,
  lng: -56.1698,
};

const AddCompaniePage = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectManual, setSelectManual] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [modalPrueba, setModalPrueba] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  //notas
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm();
  const navigate = useNavigate();
  const { postAddCompany } = useAddCompany();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [msjError, setMsjError] = useState("");

  const [checkSelected, setCheckSelected] = useState("RUT");
  const [competence, setCompetence] = useState(false);
  const [errorDataPicker, setErrorDataPicker] = useState(false);
  const [isModalOpenNote, setIsModalOpenNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [indexEdit, setIndexEdit] = useState(null);
  const [dateSelected, setDateSelected] = useState(false);
  const [reminderSelected, setReminderSelected] = useState(false);
  const [modalEditSave, setModalEditSave] = useState(false);
  const [direccion, setDireccion] = useState("");

  const handleCompanyCreation = async (companyData) => {
    console.log("entra aqui");
    try {
      const newCompany = await postAddCompany(companyData);
      console.log(newCompany);
      console.log("Empresa creada exitosamente");
      if (newCompany) {
        setSaveConfirmationModalOpen(true);
      } else {
        setIsModalOpen(true);
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
    } = data;
    const newdata = new Date(
      nextVisit.year,
      nextVisit.month - 1,
      nextVisit.day,
    );
    console.log(newdata);
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
          competenceName: competence ? data.competenceName : "",
          note: notes,
          latitude:
            selectManual === false
              ? selectedPlace?.geometry?.location.lat()
              : selectManual.lat,
          longitude:
            selectManual === false
              ? selectedPlace?.geometry?.location.lng()
              : selectManual.lng,
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
          competenceName: competence ? data.competenceName : "",
          note: notes,
          latitude:
            selectManual === false
              ? selectedPlace?.geometry?.location.lat()
              : selectManual.lat,
          longitude:
            selectManual === false
              ? selectedPlace?.geometry?.location.lng()
              : selectManual.lng,
        });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    //setConfirmCancelModalOpen(false);
    setSaveConfirmationModalOpen(false);
    //setConfirmDeleteModalOpen(false);
  };

  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
    closeModal();
  };

  const handleConfirmSaveClick = () => {
    navigate("..");
    closeSaveConfirmationModal();
  };

  //Para las notas
  const onSubmit2 = (data) => {
    const { title, description, dateV } = data;
    const notesArray = [...notes];
    const newdata = new Date(
      dateV?.year || 1,
      dateV?.month - 1 || 1,
      dateV?.day || 1,
    );
    const formattedDate = newdata.toISOString();
    if (indexEdit === null) {
      notesArray.push({
        title,
        description,
        date: formattedDate,
        isReminder: reminderSelected,
      });
    } else {
      notesArray.splice(indexEdit, 1, {
        title,
        description,
        date: formattedDate,
        isReminder: reminderSelected,
      });
    }
    setNotes([...notesArray]);
    setValue2("title", "");
    setValue2("description", "");
    setIndexEdit(null);
    setModalEditSave(true);
    setIsModalOpenNote(false);
  };

  const handleEdit = (index) => {
    const noteT = [...notes];
    setIndexEdit(index);
    setValue2("title", noteT[index].title);
    setValue2("description", noteT[index].description);
    setIsModalOpenNote(true);
    setReminderSelected(noteT[index].isReminder);
  };

  const handleDelete = (index) => {
    const noteT = [...notes];
    noteT.splice(index, 1);
    setNotes(noteT);
  };

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col px-6 pt-6">
        <Link to=".." className="cursor-pointer text-sm font-medium leading-4">
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
          Empresa
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-38 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Nueva Empresa
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow flex-col justify-between rounded-tr-lg bg-white px-14 py-4"
        >
          <div>
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
            <div>
              <Checkbox
                onClick={() => setCompetence(!competence)}
                radius="full"
                className="font-light"
              >
                Cliente de la competencia
              </Checkbox>
              <Input
                disabled={!competence}
                bg={!competence ? "bg-gray" : "bg-white"}
                border={!competence ? "none" : "border"}
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
              onClick={() => setModalPrueba(true)}
              className="mb-2 flex w-[8rem] cursor-pointer justify-center"
            >
              <img src={geoaltIcon} alt="geo Icon" />
              <span className="mb-1 mt-2 text-xs leading-[.88rem] underline">
                Marcar en el mapa
              </span>
            </div>

            <Input
              label={"Otros datos"}
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
                minLength: {
                  value: 2,
                  message: "Debe ingresar minimo 1 digitos.",
                },
                maxLength: {
                  value: 15,
                  message: "Solo se permiten 15 digitos.",
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
            <label
              className={`${errors.status ? "text-red_e" : "text-gray-700"} mt-2 block text-sm font-medium`}
            >
              Asignar estado:
            </label>
            {competence ? (
              <>
                <Select
                  placeholder="Seleccionar estado"
                  className={`rounded-lg border ${errors.status ? "border-red_e" : ""}`}
                  {...register("status", {
                    required: "Este campo es requerido",
                  })}
                  onSelectionChange={(values) => setValue("status", values)}
                >
                  <SelectItem key={"COMPETENCE"}>Competencia</SelectItem>
                </Select>
                <p className="mt-1 font-roboto text-xs text-red_e">
                  {errors.status ? errors.status.message : ""}
                  {console.log(errors.status)}
                </p>
              </>
            ) : (
              <>
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
                </Select>
                <p className="mt-1 font-roboto text-xs text-red_e">
                  {errors.status ? errors.status.message : ""}
                </p>
              </>
            )}

            <div className="h-full w-[28.3rem]">
              <label
                className={`${errors.nextVisit ? "text-red_e" : "text-black"} text-sm font-light`}
              >
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
            <div className="mt-4 flex flex-col justify-between">
              <div className="max-w-[10rem] space-y-2">
                <span>Notas</span>

                <Button
                  text="Nueva Nota"
                  icon={PlusFillIcon}
                  iconPosition={"left"}
                  width="w-40"
                  color={"cancel"}
                  onClick={() => setIsModalOpenNote(true)}
                  disabled={notes.length > 2 && true}
                />
              </div>

              <div className="flex gap-4">
                {notes.map((note, index) => (
                  <Cards
                    handleDelete={() => handleDelete(index)}
                    handleEdite={() => handleEdit(index)}
                    key={note.id}
                    titleNote={note.title}
                    bodyNote={note.description}
                  />
                ))}
              </div>
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
          isOpen={isSaveConfirmationModalOpen}
          onClose={closeSaveConfirmationModal}
          title="Cambios guardados"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={handleConfirmSaveClick}
        >
          <div className="flex h-[14rem] flex-col items-center justify-center">
            <img src={SaveImg} alt="save" />
            <p className="font-roboto text-sm font-light text-black">
              Los cambios fueron guardados correctamente.
            </p>
          </div>
        </ReusableModal>
        {/* modal de Errores */}
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

        <ReusableModal
          width="w-[45.37rem]"
          isOpen={isModalOpenNote}
          onClose={() => setIsModalOpenNote(false)}
          title="Editar Nota"
          buttons={["cancel", "save"]}
          handleCancelClick={() => setIsModalOpenNote(false)}
          onSubmit={handleSubmit2(onSubmit2)}
        >
          <form onSubmit={handleSubmit2(onSubmit2)} className="flex flex-col">
            <Input
              label={"Nombre de nota"}
              placeholder={"Escribir..."}
              {...register2("title", {
                required: "El nombre es obligatorio",
              })}
              errorApi={errors2.title}
              msjError={errors2.title ? errors2.title.message : ""}
            />
            <Input
              label={"Contenido"}
              placeholder={"Escribir..."}
              {...register2("description", {
                required: "El contenido es obligatorio",
              })}
              errorApi={errors2.description}
              msjError={errors2.description ? errors2.description.message : ""}
            />
            {errors2.permissions && (
              <span className="font-roboto text-xs text-red_e">
                {errors2.permissions.message}
              </span>
            )}
            <div className="flex gap-[4.4rem]">
              <div>
                <Checkbox
                  defaultSelected={dateSelected}
                  onClick={() => setDateSelected(!dateSelected)}
                  radius="full"
                  className="font-light"
                >
                  <span className="text-sm font-light leading-[1rem] text-black_b">
                    Asignar fecha
                  </span>
                </Checkbox>
                <div className="flex w-[18rem] flex-col">
                  <Calendar
                    control={control2}
                    errors={errors2}
                    setErrorDataPicker={setErrorDataPicker}
                    errorDataPicker={errorDataPicker}
                    name="dateV"
                  />
                </div>
              </div>
              <div className="w-[12.6rem]">
                <Checkbox
                  defaultSelected={reminderSelected}
                  onClick={() => setReminderSelected(!reminderSelected)}
                  radius="full"
                >
                  <span className="text-sm font-light leading-[1rem] text-black_b">
                    Destacar como recordatorio
                  </span>
                </Checkbox>
              </div>
            </div>
          </form>
        </ReusableModal>
        <ReusableModal
          isOpen={modalEditSave}
          onClose={() => setModalEditSave(false)}
          title="Cambios guardados"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={() => setModalEditSave(false)}
        >
          Los cambios fueron guardados exitosamente.
        </ReusableModal>
        <ReusableModal
          isOpen={modalPrueba}
          onClose={() => setModalPrueba(false)}
          title="Marcar ubicacion"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={() => setModalPrueba(false)}
          width="w-[45.37rem]"
        >
          <div className="flex flex-col">
            <PlaceAutocomplete
              onPlaceSelect={setSelectedPlace}
              value={direccion}
              setSelectManual={setSelectManual}
            />

            <div>
              {" "}
              <Map
                style={{ height: "15rem" }}
                mapId={"8c732c82e4ec29d9"}
                defaultCenter={coordenadasUruguay}
                defaultZoom={5}
                gestureHandling={"greedy"}
                center={selectManual === false ? null : selectManual}
                disableDefaultUI={true}
              >
                <Marker
                  ref={markerRef}
                  draggable={true}
                  position={selectManual === false ? null : selectManual}
                  onDragEnd={(e) => {
                    setSelectManual({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    }),
                      console.log(e);
                  }}
                />

                <AdvancedMarker
                  className={`${selectManual === false ? "visible" : "invisible"}`}
                  ref={markerRef}
                  position={null}
                  draggable={true}
                  onDragEnd={(e) =>
                    setSelectManual({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    })
                  }
                />
              </Map>
              <MapHandler
                place={selectedPlace}
                marker={marker}
                setValue={setValue}
                setDireccion={setDireccion}
              />
            </div>
          </div>
        </ReusableModal>
      </div>
    </div>
  );
};

export default AddCompaniePage;
