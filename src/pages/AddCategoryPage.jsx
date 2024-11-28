import { useEffect, useState } from "react";
import uploadIcon from "../assets/icons/arrow-blue.svg";
import ArrowRightIcon from "../assets/icons/arrow-right.svg";
import Button from "../components/buttons/Button.jsx";
import ReusableModal from "../components/modals/ReusableModal.jsx";
import Input from "../components/inputs/Input.jsx";
import BackButton from "../components/buttons/BackButton.jsx";
import { set, useForm } from "react-hook-form";
import useAddCategory from "../hooks/category/useAddCategory.js";
import { useNavigate } from "react-router-dom";
const NOTES_TAB = "notes";
const AddCategoryPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [noteId, setNoteId] = useState(null);
  const [activeTab, setActiveTab] = useState(NOTES_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [FileAccept, setFileAccept] = useState(false);
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
      const validTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        setFileAccept(true);
        e.target.value = "";
        return;
      }
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

  const deleteFile = () => {
    setFile(null);
    setFileName("");
    setValue("file", null);
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
              className={`min-w-40 cursor-pointer rounded-t-lg ${activeTab === NOTES_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
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
              label={"Descripción"}
              placeholder={"Escribir..."}
              {...register("description", {
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
            <div className="mt-2 min-w-40 max-w-60">
              <p
                className={`font-roboto font-light ${errors?.file?.message ? "text-red_e" : "text-black"} mb-1 text-sm`}
              >
                Agregar imagen
              </p>
              <input
                className="hidden"
                id="file"
                type="file"
                accept=".png, .jpg, .jpeg"
                {...register("file", { required: "Este campo es obligatorio" })}
                onChange={handleFileChange}
                disabled={fileName.length > 0}
              />
              <label htmlFor="file" className="flex items-center gap-4">
                <div
                  className={`flex h-11 ${fileName.length === 0 && "cursor-pointer"} items-center gap-2 rounded-lg border border-blue-400 p-1`}
                >
                  {" "}
                  <img src={uploadIcon} alt="iconUploads" className="h-5 w-5" />
                  <p className="text-blue-400">{`${fileName.length > 0 ? "Imagen cargada" : "Cargar imagen"} `}</p>
                </div>
              </label>
              <p
                className={`font-roboto text-sm ${errors?.file?.message ? "text-red_e" : "text-black"} mt-1`}
              >
                {fileName.length > 0 && (
                  <>
                    {fileName}
                    {"  "}
                    <label
                      className="cursor-pointer"
                      onClick={() => deleteFile()}
                    >
                      X
                    </label>
                  </>
                )}
              </p>
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
      {/*modal para los archivos */}
      <ReusableModal
        isOpen={FileAccept}
        onClose={() => setFileAccept(false)}
        title="Formato de archivo incorrecto"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setFileAccept(false)}
      >
        Solo se aceptan archivos PNG o JPG.
      </ReusableModal>
    </div>
  );
};
export default AddCategoryPage;
