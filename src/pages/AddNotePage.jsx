import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Input from "../components/inputs/Input";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import useNotes from "../hooks/notes/useNotes.js";
import usePutNotes from "../hooks/notes/usePutNotes.js";
import { useForm } from "react-hook-form";
import { Checkbox, DatePicker } from "@nextui-org/react";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
const NOTES_TAB = "notes";
const AddNotesPage = () => {
  const [NotePage, setNotePage] = useState(5);
  const { changedNote, isChanged } = usePutNotes();
  const [noteId, setNoteId] = useState(null);
  const [activeTab, setActiveTab] = useState(NOTES_TAB);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [checkSelected, setCheckSelected] = useState("existente");
  const [noteData, setNoteData] = useState(null);

  const {
    notesResponse,
    setItemsPerPage,
    totalPage,
    setPage,
    page,
    itemsPerPage,
    setModified,
  } = useNotes();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const openModal = (id) => {
    const noteToEdit = notesResponse.find((note) => note.id === id);
    if (noteToEdit) {
      setNoteData({
        title: notesResponse.title,
        description: notesResponse.description,
        date: notesResponse.date,
        client: {
          id: notesResponse.client.id,
        },
      });
      setValue("title", noteToEdit.title);
      setValue("description", noteToEdit.description);
      setValue("date", noteToEdit.date);
      setValue("client", noteToEdit.client.id);
    }
    setIsModalOpen(true);
    setNoteId(id);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setConfirmCancelModalOpen(false);
    setSaveConfirmationModalOpen(false);
    setConfirmDeleteModalOpen(false);
  };
  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);
  const closeConfirmCancelModal = () => setConfirmCancelModalOpen(false);
  const openSaveConfirmationModal = () => setSaveConfirmationModalOpen(true);
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
    deleteNote(noteId);
    closeConfirmDeleteModal();
  };
  const handleCancelClick = () => openConfirmCancelModal();
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };
  const handleNoteCreation = async (noteData) => {
    try {
      const newNote = await changedNote(noteData, noteId);
      if (newNote) {
        setSaveConfirmationModalOpen(true);
      } else {
        console.error(
          "No se recibió una nueva nota después de la actualización",
        );
      }
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
      setIsModalOpen(true);
    }
  };
  const onSubmit = (data) => {
    const { title, description, date, id } = data;
    handleNoteCreation({
      title,
      description,
      date,
      client: {
        id,
      },
    });
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-grow p-6">
        <div className="w-[4rem]">
          <Link to="/inicio/empresas" className="text-sm font-medium leading-4">
            <div className="mb-4 flex items-center">
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
            Nombre Empresa
          </h1>
        </div>
        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(NOTES_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === NOTES_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Nueva nota
            </h2>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-tr-lg bg-white px-14 py-4 shadow-t"
        >
          <div className="flex flex-col">
            <Input
              label={"Nombre de nota"}
              placeholder={"Escribir..."}
              {...register("title", {
                required: "Este campo es obligatorio",
              })}
              errorApi={errors.title}
              msjError={errors.title ? errors.title.message : ""}
            />
            <Input
              label={"Contenido"}
              placeholder={"Escribir..."}
              {...register("description", {
                required: "Este campo es obligatorio",
              })}
              errorApi={errors.description}
              msjError={errors.description ? errors.description.message : ""}
            />

            {errors.permissions && (
              <span className="font-roboto text-xs text-red_e">
                {errors.permissions.message}
              </span>
            )}
          </div>
          <div className="flex gap-[4.4rem]">
            <div>
              <Checkbox
                defaultSelected={checkSelected === "existente"}
                isSelected={checkSelected === "existente"}
                onClick={() => setCheckSelected("existente")}
                radius="full"
                className="font-light"
              >
                <span className="text-sm font-light leading-[1rem] text-black_b">
                  Asignar fecha
                </span>
              </Checkbox>
              <div className="flex w-[18rem]">
                <DatePicker
                  className="rounded-lg border"
                  {...register("date", {
                    required: "Este campo es obligatoria",
                  })}
                  errorApi={errors.date}
                  msjError={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>
            <div className="w-[12.6rem]">
              <Checkbox
                defaultSelected={checkSelected === "existente"}
                isSelected={checkSelected === "existente"}
                onClick={() => setCheckSelected("existente")}
                radius="full"
                className="font-light"
              >
                <span className="text-sm font-light leading-[1rem] text-black_m">
                  Destacar como recordatorio
                </span>
              </Checkbox>
            </div>
          </div>
          <div className="flex justify-end pt-6">
            <div>
              <Button
                text={"GUARDAR"}
                color={"save"}
                type={"submit"}
                icon={ArrowRightIcon}
              />
            </div>
          </div>
        </form>
      </div>
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
        title="Eliminar usuario"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(noteId)}
      >
        Este usuario será eliminado de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};
export default AddNotesPage;
