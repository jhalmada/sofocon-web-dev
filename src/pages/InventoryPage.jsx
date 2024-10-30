import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/buttons/Button.jsx";
import ReusableModal from "../components/modals/ReusableModal.jsx";
import Pagination from "../components/Pagination.jsx";
import Input from "../components/inputs/Input.jsx";
import uploadIcon from "../assets/icons/upload.svg";
import SaveImg from "../assets/img/save.png";
import SearchInput from "../components/inputs/SearchInput.jsx";
import PlusIcon from "../assets/icons/plus.svg";
import DownloadIcon from "../assets/icons/download.svg";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import { useForm } from "react-hook-form";
import BackButton from "../components/buttons/BackButton.jsx";
import useGetProducts from "../hooks/products/useGetProducts.js";
import InventaryRow from "../components/InventaryRow.jsx";
import useDeleteProduct from "../hooks/products/useDeleteProducts.js";
import deleteImg from "../assets/img/deleted.png";
import AutoCompleteArray from "../components/autocomplete/AutoCompleteArray.jsx";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete.jsx";
import useCategory from "../hooks/category/useCategory.js";
import usePutProduct from "../hooks/products/usePutProducts.js";

const busquedas = [
  { name: "Busqueda 1", id: 1 },
  { name: "Busqueda 2", id: 2 },
  { name: "Busqueda 3", id: 3 },
  { name: "Busqueda 4", id: 4 },
];

const UsersPage = () => {
  //estados
  const [productId, setProductId] = useState(null);
  const [deletemodal, setDeleteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] =
    useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);

  //Hooks

  const { id, name } = useParams();

  const {
    productsResponse,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setModified,
    setSearch,
    setCategory,
  } = useGetProducts();

  const { categoryResponse, setSearch: setSearchCategory } = useCategory();

  const { deleteProduct } = useDeleteProduct();

  const { changedProduct } = usePutProduct();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  //funciones
  const handleDelete = (id) => {
    setProductId(id);
    setDeleteModal(true);
  };
  const acceptDelete = () => {
    deleteProduct(productId, setModified);
    setDeleteModal(false);
    setConfirmDelete(true);
  };

  const handleEdit = async (id, category) => {
    setProductId(id);
    const product = await productsResponse.find((product) => product.id === id);
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("stock", product.stock);
      setValue("subProduct", product.subProduct);
      setValue("color", product.color);
      setValue("unit", product.unit);
      setListCategory(category);
      setEditModal(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      setError("file", { message: "" });
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("subProduct", data.subProduct);
    formData.append("unit", data.unit);
    formData.append("stock", data.stock);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("color", data.color);
    if (file) {
      formData.append("file", file);
    }

    const response = await changedProduct(formData, productId, setModified);
    if (response) {
      setEditModal(false);
      setConfirmModal(true);
    }
  };

  useEffect(() => {
    setCategory(id);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-grow flex-col px-6 pt-6">
        <div className="w-[4rem]">
          <BackButton />
        </div>
        <div className="flex justify-between">
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            Inventario
          </h1>
          <SearchInput placeholder="Buscar..." onChange={setSearch} />
        </div>
        <div className="flex items-center">
          <div className="flex">
            <h2
              className={`w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              {name}
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            <div className="flex space-x-4">
              <Button
                text="Exportar lista"
                icon={DownloadIcon}
                color={"cancel"}
                //onClick={() => openExportModal()}
              />
              <Link to={"agregar-producto"}>
                <Button text="Nuevo Producto" icon={PlusIcon} />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-grow overflow-auto rounded-tr-lg bg-white p-5">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                  Nombre
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Descripción
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Stock
                </th>

                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {productsResponse.map((product, index) => (
                <InventaryRow
                  name={product.name}
                  key={index}
                  description={product.description}
                  stock={product.stock}
                  editIconSrc={editIcon}
                  deleteIconSrc={deleteIcon}
                  onEditClick={() => {
                    handleEdit(product.id, product.category);
                  }}
                  onDeleteClick={() => handleDelete(product.id)}
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
              total={total}
            />
          </div>
        </div>
        {/*modal para eliminar*/}
        <ReusableModal
          isOpen={deletemodal}
          onClose={() => setDeleteModal(false)}
          title="Eliminar Producto"
          variant="confirmation"
          buttons={["back", "accept"]}
          onAccept={() => acceptDelete()}
        >
          Este producto será eliminado de forma permanente. ¿Desea continuar?
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
        {/*modal para editar*/}
        <ReusableModal
          isOpen={editModal}
          onClose={() => setIsConfirmCancelModalOpen(true)}
          title="Editar Producto"
          onSubmit={handleSubmit(onSubmit)}
          buttons={["cancel", "save"]}
          handleCancelClick={() => setIsConfirmCancelModalOpen(true)}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder={"Escribir..."}
              label={"Nombre"}
              {...register("name", {
                required: {
                  value: true,
                  message: "Campo obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres.",
                },
                minLength: {
                  value: 3,
                  message: "El nombre debe contener al menos 3 caracteres.",
                },
              })}
              msjError={errors.name ? errors.name.message : ""}
            />
            <Input
              placeholder="Escribir..."
              label="Descripcion"
              {...register("description", {
                required: {
                  value: true,
                  message: "Campo obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "la descripcion no puede exceder los 50 caracteres.",
                },
                minLength: {
                  value: 3,
                  message:
                    "la descripcion debe contener al menos 3 caracteres.",
                },
              })}
              msjError={errors.description ? errors.description.message : ""}
            />
            <div className="flex gap-3">
              <Input
                placeholder="Escribir..."
                label="Subproducto"
                {...register("subProduct", {
                  required: {
                    value: true,
                    message: "Campo obligatorio",
                  },
                  maxLength: {
                    value: 50,
                    message: "el campo no puede exceder los 50 caracteres.",
                  },
                  minLength: {
                    value: 3,
                    message: "el campo debe contener al menos 3 caracteres.",
                  },
                })}
                msjError={errors.subProduct ? errors.subProduct.message : ""}
              />
              <Input
                placeholder="Escribir..."
                label="Color"
                {...register("color", {
                  required: {
                    value: true,
                    message: "Campo obligatorio",
                  },
                  maxLength: {
                    value: 50,
                    message: "el campo no puede exceder los 50 caracteres.",
                  },
                  minLength: {
                    value: 3,
                    message: "el campo debe contener al menos 3 caracteres.",
                  },
                })}
                msjError={errors.color ? errors.color.message : ""}
              />
            </div>
            <Input
              placeholder="Kg"
              label="Unidad de Medida"
              {...register("unit", {
                required: {
                  value: true,
                  message: "Campo obligatorio",
                },
                maxLength: {
                  value: 5,
                  message: "el campo no puede exceder los 5 caracteres.",
                },
                minLength: {
                  value: 1,
                  message: "el campo debe contener al menos 1 caracteres.",
                },
              })}
              msjError={errors.unit ? errors.unit.message : ""}
            />

            <Input
              placeholder="1234"
              label="Stock"
              type="number"
              {...register("stock", {
                required: {
                  value: true,
                  message: "Campo obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "el campo no puede exceder los 50 caracteres.",
                },
                minLength: {
                  value: 1,
                  message: "el campo debe contener al menos 1 caracteres.",
                },
              })}
              msjError={errors.stock ? errors.stock.message : ""}
            />
            <NextAutoComplete
              label={"Categoria"}
              label2={"Categorias Seleccionadas"}
              name={"category"}
              setValue={setValue}
              onChange={setSearchCategory}
              array={categoryResponse.map((category) => ({
                name: category.name,
                id: category.id,
              }))}
              // array2={listCategory.map((category) => ({
              //   id: category.id,
              //   name: category.name,
              // }))}
            />
            {console.log(listCategory)}
            <AutoCompleteArray
              label={"Lista de precios"}
              array={busquedas}
              setValue={setValue}
              name={"list"}
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
              {errors.file && (
                <p className="font-roboto text-xs text-red_e">
                  {errors?.file?.message}
                </p>
              )}
            </div>
          </form>
        </ReusableModal>
        {/*modal para confirmar cancel o cambios no guardados*/}
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
      </div>
    </div>
  );
};

export default UsersPage;
