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
  const [sellerId, setSellerId] = useState(null);
  const [stateFilter, setStateFilter] = useState("");
  //Hooks
  const { userSellerResponse, setSearch } = useUsersSellers();
  const { changedSellerRoute } = usePutSellerRoute();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  //funciones
  const onSubmit = (data) => {
    const sellers = data.vendedores.map((seller) => ({ id: seller.id }));
    const newData = {
      user: [...sellers],
    };
    changedSellerRoute(newData, idCompany, setModified);
    closeModal();
  };

  const openConfirmDeleteModal = (id) => {
    setSellerId(id);
    setConfirmDeleteModalOpen(true);
  };
  const handleConfirmDelete = () => {
    // const newSellersArray = transformData(arraySeller).filter(
    //   (element) => element.id !== sellerId,
    // );
    // const newArray = newSellersArray.map((seller) => ({ id: seller.id }));
    // const newData = {
    //   user: [...newArray],
    // };
    // changedSellerRoute(newData, idCompany, setModified);
    // setConfirmDeleteModalOpen(false);
  };

  //   //funcion para transformar los Arrays
  const transformData = (array) => {
    //   return array.map((item) => ({
    //     id: item.id,
    //     name: item.userInfo.fullName,
    //   }));
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
            {arraySeller.map((seller) => (
              <ProductsinListRow
                key={seller.id}
                name={seller.name}
                price={seller?.list[0]?.price || 0}
                category={seller.category.name}
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
        title={`${nameCompany}`}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <div className="space-y-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <NextAutoComplete
              array2={transformData(arraySeller) || []}
              label2={"Vendedores Asignados"}
              array={transformData(userSellerResponse?.result || []) || []}
              name={"vendedores"}
              label={"Agregar Vendedores"}
              setValue={setValue}
              onChange={setSearch}
            />
            <p>{errors.vendedores && errors.vendedores.message}</p>
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
        Este vendedor será eliminado de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};

export default ProductsInListPricePage;
