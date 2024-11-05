import useUsersSellers from "../hooks/users/useUsersSellers";
import deleteIcon from "../assets/icons/trash3.svg";
import RouteSellerDetailsRow from "../components/RouteSellerDetailsRow";
import Pagination from "../components/Pagination";
import ReusableModal from "../components/modals/ReusableModal";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";
import { useForm } from "react-hook-form";
import usePutSellerRoute from "../hooks/sellerRoutes/usePutSellerRoutes";
import { useState } from "react";
import FilterSelect from "../components/filters/FilterSelect";
import { a } from "framer-motion/client";
import ProductsinListRow from "../components/ProductsinListRow";
import useGetProducts from "../hooks/products/useGetProducts";
import AutoCompleteArray from "../components/autocomplete/AutoCompleteArray";
import usePutPriceList from "../hooks/priceList/usePutPriceList";
import { useParams } from "react-router-dom";

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
  idCompany,
  nameCompany,
}) => {
  //estados
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [productId, setProductId] = useState(null);
  //Hooks
  const { productsResponse, setSearch } = useGetProducts();
  const { changedPriceList } = usePutPriceList();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  //funciones
  const onSubmit = async (data) => {
    const { products } = data;
    const PriceData = {
      product: products.map((product) => ({
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
    console.log(newProducts);
    const PriceData = {
      product: newProducts.map((product) => ({
        product: product.id,
        price: product.price,
      })),
    };
    changedPriceList(PriceData, id, setModified);
    setConfirmDeleteModalOpen(false);
  };

  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.list[0].price,
    }));
  };
  return (
    <div>
      <div className="min-h-[calc(100vh-4.375rem)] overflow-auto rounded-tr-lg bg-white p-5">
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
                  onDeleteClick={() => openConfirmDeleteModal(seller.id)}
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
            <AutoCompleteArray
              array2={arraySeller.map((seller) => ({
                id: seller.id,
                name: seller.name,
              }))}
              label={"Agregar Productos"}
              array={productsResponse.map((product) => ({
                name: product.name,
                id: product.id,
              }))}
              setValue={setValue}
              name={"products"}
              label2={"Productos"}
              onChange={setSearch}
              hidden={true}
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
        El producto fue agregado Exitosamente.
      </ReusableModal>
    </div>
  );
};

export default ProductsInListPricePage;
