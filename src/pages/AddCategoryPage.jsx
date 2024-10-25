import { useEffect, useState } from "react";
import uploadIcon from "../assets/icons/upload.svg";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import Button from "../components/buttons/Button.jsx";
import ReusableModal from "../components/modals/ReusableModal.jsx";
import Input from "../components/inputs/Input.jsx";
import BackButton from "../components/buttons/BackButton.jsx";
import { useForm } from "react-hook-form";
import useAddCategory from "../hooks/category/useAddCategory.js";
import { useNavigate } from "react-router-dom";
const NOTES_TAB = "notes";
const AddCategoryPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [noteId, setNoteId] = useState(null);
  const [activeTab, setActiveTab] = useState(NOTES_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const { postAddCategory } = useAddCategory();
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
    setConfirmCancelModalOpen(false);
    setSaveConfirmationModalOpen(false);
    setConfirmDeleteModalOpen(false);
  };
  const closeConfirmCancelModal = () => setConfirmCancelModalOpen(false);
  const openSaveConfirmationModal = () => setSaveConfirmationModalOpen(true);
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
    closeModal();
    navigate("..");
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);
  const handleConfirmDelete = () => {
    closeConfirmDeleteModal();
  };
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      setError("file", { message: "" });
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("file", file);
    const response = postAddCategory(formData);
    console.log(response);
    if (response) {
      openSaveConfirmationModal();
    }
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-grow p-6">
        <div className="w-[4rem]">
          <BackButton />
        </div>
        <div className="flex justify-between">
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            Inventario
          </h1>
        </div>
        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(NOTES_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === NOTES_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Nueva categoría
            </h2>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-tr-lg bg-white px-14 py-4 shadow-t"
        >
          <div className="flex flex-col">
            <Input
              label={"Nombre"}
              placeholder={"Escribir..."}
              {...register("name", {
                required: "Este campo es obligatorio",
                maxLength: {
                  value: 50,
                  message: "Este campo no debe exceder los 50 caracteres",
                },
                minLength: {
                  value: 3,
                  message: "Este campo debe tener al menos 3 caracteres",
                },
              })}
              errorApi={errors.name}
              msjError={errors.name ? errors.name.message : ""}
            />
            <Input
              label={"Descripcion"}
              placeholder={"Escribir..."}
              {...register("description", {
                required: "Este campo es obligatorio",
                maxLength: {
                  value: 50,
                  message: "Este campo no debe exceder los 50 caracteres",
                },
                minLength: {
                  value: 3,
                  message: "Este campo debe tener al menos 3 caracteres",
                },
              })}
              errorApi={errors.description}
              msjError={errors.description ? errors.description.message : ""}
            />
            <div className="mt-1">
              <p
                className={`font-roboto font-light ${errors?.file?.message ? "text-red_e" : "text-black"} text-sm`}
              >
                Agregar imagen
              </p>
              <input
                className="hidden"
                id="file"
                type="file"
                accept="image/*"
                {...register("file", {
                  required: "Este campo es obligatorio",
                })}
                onChange={handleFileChange}
              />
              <label htmlFor="file" className="flex items-center gap-4">
                <div
                  className="flex cursor-pointer gap-2"
                  onClick={() => setFileName("")}
                >
                  {" "}
                  <img src={uploadIcon} alt="iconUploads" />
                  Cargar imagen
                </div>
                <p
                  className={`font-roboto text-xs ${errors?.file?.message ? "text-red_e" : "text-black"}`}
                >
                  {fileName || "Selecciona un archivo"}
                </p>
              </label>
              {errors.file && (
                <p className="font-roboto text-xs text-red_e">
                  {errors?.file?.message}
                </p>
              )}
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
        Esta categoria será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};
export default AddCategoryPage;
