import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/buttons/Button";
import ReusableModal from "../components/modals/ReusableModal";
import Input from "../components/inputs/Input";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import useNotes from "../hooks/notes/useNotes.js";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, DatePicker } from "@nextui-org/react";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import useAddNotes from "../hooks/notes/useAddNotes.js";
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, today } from "@internationalized/date";
import BackButton from "../components/buttons/BackButton.jsx";
const NOTES_TAB = "notes";
const AddNotesPage = () => {
  const [noteId, setNoteId] = useState(null);
  const [activeTab, setActiveTab] = useState(NOTES_TAB);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [noteData, setNoteData] = useState(null);

  const [dateSelected, setDateSelected] = useState(false);
  const [reminderSelected, setReminderSelected] = useState(false);
  const { id } = useParams();
  const [idCliente, setIdCliente] = useState(null);
  const [errorDataPicker, setErrorDataPicker] = useState(false);

  useEffect(() => {
    setIdCliente(id);
  }, [id]);

  const navigate = useNavigate();
  const {
    notesResponse,
    setItemsPerPage,
    totalPage,
    setPage,
    page,
    itemsPerPage,
    setModified,
  } = useNotes();
  const { postAddNotes, loading } = useAddNotes();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

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
    navigate(`/inicio/empresas/notas/${idCliente}`);
    setSaveConfirmationModalOpen(false);
    closeModal();
  };
  const openConfirmDeleteModal = (id) => {
    setNoteId(id);
    setConfirmDeleteModalOpen(true);
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);
  const handleConfirmDelete = () => {
    closeConfirmDeleteModal();
  };
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };
  const handleNoteCreation = async (noteData) => {
    try {
      const newNote = await postAddNotes(noteData, noteId);
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
      client: {
        id: idCliente,
      },
      isReminder: reminderSelected,
      date: formattedDate,
    });
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-grow p-6">
        <div className="w-[4rem]">
          <BackButton route="/inicio/empresas" />
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
                      <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
                        <DatePicker
                          minValue={today(getLocalTimeZone())}
                          className={`${errors.dateV ? "text-red_e" : ""} ${errors.dateV ? "border-red_e" : ""} rounded-lg border`}
                          {...field}
                          label={""}
                          placeholder="Seleccione una fecha"
                          isDisabled={!dateSelected}
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
                      </div>
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
                onClick={() => setReminderSelected(!reminderSelected)}
                radius="full"
              >
                <span className="text-sm font-light leading-[1rem] text-black_b">
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
        onClose={() => setSaveConfirmationModalOpen(false)}
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
