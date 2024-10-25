import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Input from "../components/inputs/Input";
import SearchInput from "../components/inputs/SearchInput";
import PlusIcon from "../assets/icons/plus.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import useNotes from "../hooks/notes/useNotes.js";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import usePutNotes from "../hooks/notes/usePutNotes.js";
import { Controller, useForm } from "react-hook-form";
import useDeleteNotes from "../hooks/notes/useDeleteNotes.js";
import { Checkbox, DatePicker } from "@nextui-org/react";
import NotesRow from "../components/NotesRow.jsx";
import { I18nProvider } from "@react-aria/i18n";
import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  today,
} from "@internationalized/date";
import FilterSelect from "../components/filters/FilterSelect.jsx";

const NOTES_TAB = "notes";
const NotesPage = () => {
  const [dateSelected, setDateSelected] = useState(false);
  const { changedNote, isChanged } = usePutNotes();
  const [noteId, setNoteId] = useState(null);
  const { deleteNote, isDeleted, isLoading } = useDeleteNotes();
  const [activeTab, setActiveTab] = useState(NOTES_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [reminderSelected, setReminderSelected] = useState(false);
  const [errorDataPicker, setErrorDataPicker] = useState(false);
  const [visitFilter, setVisitFilter] = useState("");
  const { id } = useParams();

  const visitOptions = ["< 1 mes", "< 2 meses", "> 2 meses"];
  const {
    notesResponse,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setModified,
    setClient,
    setNextVisit,
    setSearch,
  } = useNotes();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const openModal = (noteId) => {
    const noteToEdit = notesResponse.find((note) => note.id === noteId);
    if (noteToEdit) {
      setValue("title", noteToEdit.title);
      setValue("description", noteToEdit.description);
      setValue("date", noteToEdit.date);
      if (noteToEdit.date) {
        setValue("dateV", parseAbsoluteToLocal(noteToEdit.date));
      }
      setReminderSelected(noteToEdit.isReminder);
      setDateSelected(true);
    }
    setIsModalOpen(true);
    setNoteId(noteId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setConfirmCancelModalOpen(false);
    setSaveConfirmationModalOpen(false);
    setConfirmDeleteModalOpen(false);
  };

  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);
  const closeConfirmCancelModal = () => setConfirmCancelModalOpen(false);
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
    closeModal();
  };
  const openConfirmDeleteModal = (id) => {
    setNoteId(id);
    setConfirmDeleteModalOpen(true);
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);
  const handleConfirmDelete = () => {
    deleteNote(noteId, setModified);
    closeConfirmDeleteModal();
  };
  const handleCancelClick = () => openConfirmCancelModal();
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };
  const handleNoteCreation = async (noteData) => {
    try {
      const newNote = await changedNote(noteData, noteId, setModified);

      if (newNote) {
        setSaveConfirmationModalOpen(true);
      } else {
        console.error(
          "No se recibió un nuevo usuario después de la actualización",
        );
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setIsModalOpen(true);
    }
  };
  const onSubmit = (data) => {
    const { title, description, dateV } = data;
    const newdata = new Date(
      dateV?.year || 1,
      dateV?.month - 1 || 1,
      dateV?.day || 1,
    );
    const formattedDate = newdata.toISOString();
    handleNoteCreation({
      title,
      description,
      isReminder: reminderSelected,
      date: formattedDate,
    });
  };

  useEffect(() => {
    setClient(id);
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
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
  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between">
      <div className="flex flex-grow flex-col px-6 pt-6">
        <div className="w-[4rem]">
          <Link to="/inicio/empresas" className="text-sm font-medium leading-4">
            <div className="mb-4 flex w-[4rem] items-center">
              <img
                src={ChevronLeftIcon}
                alt="arrow left"
                className="-ml-1 h-4 w-4"
              />
              Volver
            </div>
          </Link>
        </div>
        <div className="flex justify-between">
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            Empresas
          </h1>
          <SearchInput placeholder="Buscar..." onChange={setSearch} />
        </div>
        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(NOTES_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === NOTES_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Notas
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded py-2">
            {activeTab === NOTES_TAB && (
              <div className="flex gap-[.6rem]">
                <Link to={"agregar-nota"}>
                  <Button text="Nueva Nota" icon={PlusIcon} />
                </Link>
              </div>
            )}
          </div>
        </div>
        {activeTab === NOTES_TAB && (
          <div className="flex-grow overflow-auto rounded-tr-lg bg-white p-5">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Nombre
                  </th>
                  <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Contenido
                  </th>
                  <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Fecha
                  </th>
                  <th className="p-2 text-md font-semibold leading-[1.125rem]">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {notesResponse.map((note, index) => (
                  <NotesRow
                    key={index}
                    name={note.title}
                    content={note.description}
                    date={note.date ? formatDate(note.date) : "Sin fecha"}
                    editIconSrc={editIcon}
                    deleteIconSrc={deleteIcon}
                    onEditClick={() => openModal(note.id)}
                    onDeleteClick={() => openConfirmDeleteModal(note.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ReusableModal
        width="w-[45.37rem]"
        isOpen={isModalOpen}
        onClose={handleCancelClick}
        title="Editar Nota"
        buttons={["cancel", "save"]}
        handleCancelClick={() => setIsModalOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Input
            label={"Nombre de nota"}
            placeholder={"Escribir..."}
            {...register("title", {
              required: "El nombre es obligatorio",
            })}
            errorApi={errors.title}
            msjError={errors.title ? errors.title.message : ""}
          />
          <Input
            label={"Contenido"}
            placeholder={"Escribir..."}
            {...register("description", {
              required: "El contenido es obligatorio",
            })}
            errorApi={errors.description}
            msjError={errors.description ? errors.description.message : ""}
          />
          {errors.permissions && (
            <span className="font-roboto text-xs text-red_e">
              {errors.permissions.message}
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
        isOpen={isConfirmCancelModalOpen}
        onClose={closeConfirmCancelModal}
        title="Cambios sin guardar"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={handleConfirmCancel}
      >
        Los cambios realizados no se guardarán. <br /> ¿Desea continuar?
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
        isOpen={isConfirmDeleteModalOpen}
        onClose={closeConfirmDeleteModal}
        title="Eliminar nota"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(noteId)}
      >
        Esta nota será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};
export default NotesPage;
