import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import CardProducts from "../components/cards/CardProducts";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useState } from "react";
import Button from "../components/buttons/Button";
import uploadIcon from "../assets/icons/upload.svg";
import plusIcon from "../assets/icons/plus.svg";
import SearchInput from "../components/inputs/SearchInput";
import useCategory from "../hooks/category/useCategory";
import ReusableModal from "../components/modals/ReusableModal";
import Input from "../components/inputs/Input";
import { useForm } from "react-hook-form";
import useDeleteCategory from "../hooks/category/useDeleteCategory";
import usePutCategory from "../hooks/category/usePutCategory";
import SaveImg from "../assets/img/save.png";
import deleteImg from "../assets/img/deleted.png";

const INVENTORY_TAB = "inventory";
const PRICES_TAB = "prices";

const ProductsPage = () => {
  //estados
  const [activeTab, setActiveTab] = useState(INVENTORY_TAB);
  const [editModal, setEditModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] =
    useState(false);
  const [idCategory, setIdCategory] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  //hooks
  const {
    categoryResponse,
    itemsPerPage,
    page,
    setItemsPerPage,
    total,
    totalPage,
    setPage,
    setSearch,
    setModified,
  } = useCategory();
  console.log(categoryResponse);

  const { deleteCategory } = useDeleteCategory();

  const { changedCategory } = usePutCategory();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm();
  //funciones

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      setError("file", { message: "" });
    }
  };
  const handleDelete = (id) => {
    setIdCategory(id);
    setDeleteModal(true);
  };
  const acceptDelete = () => {
    deleteCategory(idCategory, setModified);
    setConfirmDelete(true);
    setDeleteModal(false);
  };

  const handleEdit = (id) => {
    const categoryEdit = categoryResponse.find(
      (category) => category.id === id,
    );
    if (categoryEdit) {
      setValue("name", categoryEdit.name);
      setValue("description", categoryEdit.description);
    }
    setIdCategory(id);
    setEditModal(true);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (file) {
      formData.append("file", file);
    }
    const response = changedCategory(formData, idCategory, setModified);
    if (response) {
      setEditModal(false);
      setConfirmModal(true);
      setFileName("");
    }
  };
  return (
    <div className="flex h-full flex-col justify-between bg-gray">
      <div className="flex-grow p-6">
        <div className="w-[4rem]">
          <Link to=".." className="text-sm font-medium leading-4">
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

        <h1 className="pb-6 text-xl font-medium leading-6 text-black_m">
          Productos
        </h1>
        {/*navbar */}
        <div className="flex max-h-[57px] items-center justify-between">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(INVENTORY_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === INVENTORY_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Inventario
            </h2>
            <h2
              onClick={() => setActiveTab(PRICES_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === PRICES_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Listas de precios
            </h2>
          </div>
          {activeTab === INVENTORY_TAB && (
            <div className="mb-12 flex flex-col items-end justify-start">
              <SearchInput onChange={setSearch} placeholder="Buscar..." />
              <div className="flex gap-[0.625rem] p-2">
                <Link to="agregar-categoria">
                  <Button text="Nueva Categoria" icon={plusIcon} />
                </Link>
              </div>
            </div>
          )}
          {activeTab === PRICES_TAB && (
            <div className="mb-12 flex flex-col items-end justify-start">
              <SearchInput placeholder="Buscar..." />
              <div className="flex gap-[0.625rem] p-2">
                <Button text="Nueva Lista" icon={plusIcon} />
              </div>
            </div>
          )}
        </div>

        <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-tr-lg bg-white px-7 pb-3 pt-7 shadow-t">
          {activeTab === INVENTORY_TAB && (
            <>
              <section className="mb-4 flex min-h-[60vh] flex-wrap items-center justify-center gap-8 p-[0.625rem]">
                {categoryResponse?.map((category) => (
                  <CardProducts
                    key={category.id}
                    name={category.name}
                    img={category.picture}
                    description={category.description}
                    totalProducts={category.totalProducts}
                    onEdit={() => handleEdit(category.id)}
                    onDelete={() => handleDelete(category.id)}
                  />
                ))}
              </section>
              <Pagination
                pageIndex={setItemsPerPage}
                currentPage={page}
                totalPages={totalPage}
                onPageChange={setPage}
                itemPerPage={itemsPerPage}
                total={total}
              />
            </>
          )}
        </div>
        {/*modal para editar*/}
        <ReusableModal
          isOpen={editModal}
          onClose={() => setIsConfirmCancelModalOpen(true)}
          title="Editar Categoria"
          onSubmit={handleSubmit(onSubmit)}
          buttons={["cancel", "save"]}
          handleCancelClick={() => setIsConfirmCancelModalOpen(true)}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label={"Nombre"}
              placeholder={"Escribir..."}
              {...register("name", {
                required: "Este campo es obligatorio",
              })}
              errorApi={errors.name}
              msjError={errors.name ? errors.name.message : ""}
            />
            <Input
              label={"Descripcion"}
              placeholder={"Escribir..."}
              {...register("description", {
                required: "Este campo es obligatorio",
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
                {...register("file")}
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
            </div>
          </form>
        </ReusableModal>
        {/*modal para eliminar*/}
        <ReusableModal
          isOpen={deletemodal}
          onClose={() => setDeleteModal(false)}
          title="Eliminar Categoria"
          variant="confirmation"
          buttons={["back", "accept"]}
          onAccept={() => acceptDelete()}
        >
          Esta categoria será eliminada de forma permanente. ¿Desea continuar?
        </ReusableModal>
        {/*modal para cambios guardados*/}
        <ReusableModal
          isOpen={confirmModal}
          onClose={() => setConfirmModal(false)}
          title="Cambios guardados"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={() => setConfirmModal(false)}
        >
          <div className="flex flex-col items-center justify-center">
            <img src={SaveImg} alt="save" />
            <p className="font-roboto text-sm font-light text-black">
              Los cambios fueron guardados correctamente.
            </p>
          </div>
        </ReusableModal>
        {/*modal para confirmar cancel*/}
        <ReusableModal
          isOpen={isConfirmCancelModalOpen}
          onClose={() => setIsConfirmCancelModalOpen(false)}
          title="Cambios sin guardar"
          variant="confirmation"
          buttons={["back", "accept"]}
          onAccept={() => {
            setIsConfirmCancelModalOpen(false);
            setEditModal(false);
          }}
        >
          Los cambios realizados no se guardarán. <br /> ¿Desea continuar?
        </ReusableModal>
        {/*modal para elementos eliminados*/}
        <ReusableModal
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          title="Item eliminado"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={() => setConfirmDelete(false)}
        >
          <div className="flex flex-col items-center justify-center">
            <img src={deleteImg} alt="delete" />
            <p className="font-roboto text-sm font-light text-black">
              El elemento fue eliminado correctamente.
            </p>
          </div>
        </ReusableModal>
      </div>
    </div>
  );
};
export default ProductsPage;
