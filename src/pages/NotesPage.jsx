import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Pagination from "../components/Pagination";
import Input from "../components/inputs/Input";
import SearchInput from "../components/inputs/SearchInput";
import PlusIcon from "../assets/icons/plus.svg";
import FilterRightIcon from "../assets/icons/filter-right.svg";
import ChevronDownIcon from "../assets/icons/chevron-down.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import useNotes from "../hooks/notes/useNotes.js";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import usePutNotes from "../hooks/notes/usePutNotes.js";
import { useForm } from "react-hook-form";
import useDeleteNotes from "../hooks/notes/useDeleteNotes.js";
import { Checkbox, DatePicker } from "@nextui-org/react";
import NotesRow from "../components/NotesRow.jsx";
const NOTES_TAB = "notes";
const NotesPage = () => {
  const [notePage, setNotePage] = useState(5);
  const { changedNote, isChanged } = usePutNotes();
  const [noteId, setNoteId] = useState(null);
  const { deleteNote, isDeleted, isLoading } = useDeleteNotes();
  const [activeTab, setActiveTab] = useState(NOTES_TAB);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [checkSelected, setCheckSelected] = useState("existente");
  const [noteData, setNoteData] = useState(null);
  const { id } = useParams();

  const {
    notesResponse,
    setItemsPerPage,
    totalPage,
    setPage,
    page,
    itemsPerPage,
    setModified,
    setClient,
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
      setValue("title", noteToEdit.title);
      setValue("description", noteToEdit.description);
      setValue("date", noteToEdit.date);
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
          "No se recibió un nuevo usuario después de la actualización",
        );
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setIsModalOpen(true);
    }
  };
  const onSubmit = (data) => {
    const { title, description, date } = data;
    handleNoteCreation({
      title,
      description,
      date,
    });
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setClient(id);
  }, [id]);
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-grow p-6">
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
          <SearchInput placeholder="Buscar..." />
        </div>
        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(NOTES_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === NOTES_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
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
          <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Nombre
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Contenido
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    <div className="flex gap-4">
                      <h3>Fecha importante</h3>
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
                    date={note.date}
                    editIconSrc={editIcon}
                    deleteIconSrc={deleteIcon}
                    onEditClick={() => openModal(note.id)}
                    onDeleteClick={() => openConfirmDeleteModal(note.id)}
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
                itemPerPage={itemsPerPage}
              />
            </div>
          </div>
        )}
      </div>
      <ReusableModal
        width="w-[46rem]"
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Editar Nota"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <div className="flex flex-col">
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
                label="Birth date"
                className="max-w-[18rem] rounded-[.5rem] border"
                {...register("date", {
                  required: "La fecha es obligatoria",
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
