import deleteIcon from "../assets/icons/trash3.svg";
import editIcon from "../assets/icons/pencil-square.svg";
import Pagination from "../components/Pagination";
import ReusableModal from "../components/modals/ReusableModal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ProductsinListRow from "../components/ProductsinListRow";
import useGetProducts from "../hooks/products/useGetProducts";
import usePutPriceList from "../hooks/priceList/usePutPriceList";
import { useParams } from "react-router-dom";
import AutoCompleteListPrice from "../components/autocomplete/AutoCompleteListPrice";
import Input from "../components/inputs/Input";
import usePutProductInPriceList from "../hooks/priceList/usePutProductinPriceList";
import SaveImg from "../assets/img/save.png";
import deleteImg from "../assets/img/deleted.png";
import { isMatch } from "lodash";
import SearchInput from "../components/inputs/SearchInput";
const ProductsInListPricePage = ({
  arraySeller,
  setItemsPerPage,
  page,
  totalPage,
  total,
  setPage,
  itemsPerPage,
  isSellersModalOpen,
  closeModal,
  handleCancelClick,
  setModified,
  setSearch,
}) => {
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [productId, setProductId] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [savedChanged, setSavedChanged] = useState(false);

  const { productsResponse, setSearch: setSearchProduct } = useGetProducts();
  const { changedPriceList } = usePutPriceList();
  const [modalValidationProduct, setModalValidationProduct] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,

    setValue: setValue2,
    formState: { errors: errors2 },
    watch,
  } = useForm();
  const { id } = useParams();

  const { changedProductInPriceList } = usePutProductInPriceList();

  const validateInput = (array) => {
    const result = array.find((product) => product.value === "");
    return result ? false : true;
  };

  const onSubmit = async (data) => {
    const { products } = data;

    const newArray2 = arraySeller.map((product) => ({
      id: product.id,
      name: product.name,
      value: product.list[0].price,
    }));

    const newArray = [...newArray2, ...products];

    const respuesta = validateInput(products);
    if (!respuesta) {
      setModalValidationProduct(true);
      return;
    }
    const PriceData = {
      product: newArray.map((product) => ({
        product: product.id,
        price: product.value,
      })),
    };
    try {
      changedPriceList(PriceData, id, setModified);
      closeModal();
      setSaveConfirmationModalOpen(true);
    } catch (error) {
      console.error("Error al modificar la lista: ", error);
    }
  };

  const openConfirmDeleteModal = (id) => {
    setProductId(id);
    setConfirmDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const newProducts = transformData(arraySeller).filter(
      (element) => element.id !== productId,
    );
    const PriceData = {
      product: newProducts.map((product) => ({
        product: product.id,
        price: product.price,
      })),
    };
    changedPriceList(PriceData, id, setModified);
    setConfirmDeleteModalOpen(false);
    setConfirmDelete(true);
  };

  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.list[0].price,
    }));
  };

  const handleEdit = (id) => {
    const product = arraySeller.find((product) => product.id === id);
    setValue2("price", product.list[0].price);
    setValue2("name", product.name);
    setEditProduct(product);
    setEditModalOpen(true);
  };

  const onSubmitEdit = async (data) => {
    const productData = { price: data.price };
    const response = await changedProductInPriceList(
      productData,
      editProduct.list[0].id,
      setModified,
    );
    if (response) {
      setEditModalOpen(false);
      setModalConfirmation(true);
    }
  };

  const cancelEdit = () => {
    const datos = watch();
    const datos2 = { ...datos, price: Number(datos.price) };
    const newDatos = {
      name: editProduct.name,
      price: editProduct.list[0].price,
    };
    const response = !isMatch(datos2, newDatos);
    if (response) {
      setSavedChanged(true);
    } else {
      setEditModalOpen(false);
    }
  };

  return (
    <div>
      <div className="flex min-h-[calc(90vh-4.375rem)] flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
        <div>
          <div className="flex justify-end">
            <SearchInput placeholder="Buscar..." onChange={setSearch} />
          </div>

          <table className="mt-2 w-full">
            <thead>
              <tr>
                <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                  Producto
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Precio
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Categoria
                </th>
                <th className="p-2 text-md font-semibold leading-[1.125rem]">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {arraySeller.length > 0 &&
                arraySeller?.map((seller) => (
                  <ProductsinListRow
                    key={seller?.id || 0}
                    name={seller?.name || "Sin nombre"}
                    price={seller?.list[0]?.price || 0}
                    category={seller?.category?.name || "Sin categoria"}
                    deleteIconSrc={deleteIcon}
                    editIconSrc={editIcon}
                    onDeleteClick={() => openConfirmDeleteModal(seller.id)}
                    onEditClick={() => handleEdit(seller.id)}
                  />
                ))}
            </tbody>
          </table>
        </div>
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
      <ReusableModal
        onSubmit={handleSubmit(onSubmit)}
        isOpen={isSellersModalOpen}
        onClose={handleCancelClick}
        title={"Agregar Productos"}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <div className="space-y-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AutoCompleteListPrice
              array2={arraySeller.map((seller) => ({
                id: seller.id,
                name: seller.name,
                value: seller.list[0].price,
              }))}
              label={"Agregar Productos"}
              array={productsResponse.map((product) => ({
                name: product.name,
                id: product.id,
              }))}
              setValue={setValue}
              name={"products"}
              label2={"Productos"}
              onChange={setSearchProduct}
            />
          </form>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setConfirmDeleteModalOpen(false)}
        title="Eliminar vendedor"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete()}
      >
        Este producto será eliminado de forma permanente. ¿Desea continuar?
      </ReusableModal>
      <ReusableModal
        isOpen={isSaveConfirmationModalOpen}
        onClose={() => setSaveConfirmationModalOpen(false)}
        title="Producto Agregado"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setSaveConfirmationModalOpen(false)}
      >
        <div className="flex h-[14rem] flex-col items-center justify-center">
          <img src={SaveImg} alt="save" />
          <p className="font-roboto text-sm font-light text-black">
            Los cambios fueron guardados correctamente.
          </p>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={modalValidationProduct}
        onClose={() => setModalValidationProduct(false)}
        title="Faltan Precios"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setModalValidationProduct(false)}
      >
        Porfavor asegurate de que todos los productos tengan un precio.
      </ReusableModal>
      {/*/Modal de edicion*/}
      <ReusableModal
        isOpen={isEditModalOpen}
        onClose={() => cancelEdit()}
        title="Editar Precio"
        buttons={["cancel", "save"]}
        onAccept={() => setEditModalOpen(false)}
        onSubmit={handleSubmit2(onSubmitEdit)}
        handleCancelClick={() => cancelEdit()}
      >
        <form
          className="flex items-center justify-between gap-2"
          onSubmit={handleSubmit2(onSubmitEdit)}
        >
          <Input
            label="Nombre"
            disabled={true}
            bg="bg-gray"
            border="none"
            type="number"
            className="border-gray-300 mt-2 border p-2"
            {...register2("name")}
          />
          <Input
            label="Precio"
            width="w-[10rem]"
            type="number"
            className="border-gray-300 mt-2 border p-2"
            {...register2("price", { required: true })}
          />
        </form>
      </ReusableModal>
      {/*/Modal de confirmacion de guardado*/}
      <ReusableModal
        isOpen={modalConfirmation}
        onClose={() => setModalConfirmation(false)}
        title="Cambios guardados"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setModalConfirmation(false)}
      >
        <div className="flex h-[14rem] flex-col items-center justify-center">
          <img src={SaveImg} alt="save" />
          <p className="font-roboto text-sm font-light text-black">
            Los cambios fueron guardados correctamente.
          </p>
        </div>
      </ReusableModal>
      {/*/Modal de confirmacion de eliminacion*/}
      <ReusableModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Usuario eliminado"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setConfirmDelete(false)}
      >
        <div className="flex h-[14rem] flex-col items-center justify-center">
          <img src={deleteImg} alt="delete" />
          <p className="font-roboto text-sm font-light text-black">
            El producto fue eliminado correctamente.
          </p>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={savedChanged}
        onClose={() => setSavedChanged(false)}
        title="Cambios sin guardar"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => {
          setSavedChanged(false), setEditModalOpen(false);
        }}
      >
        Los cambios realizados no se guardarán. <br /> ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};

export default ProductsInListPricePage;
