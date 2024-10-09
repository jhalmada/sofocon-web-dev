import FilterRightIcon from "../assets/icons/filter-right.svg";
import ChevronDownIcon from "../assets/icons/chevron-down.svg";
import useUsersSellers from "../hooks/users/useUsersSellers";
import deleteIcon from "../assets/icons/trash3.svg";
import RouteSellerDetailsRow from "../components/RouteSellerDetailsRow";
import Pagination from "../components/Pagination";
import ReusableModal from "../components/modals/ReusableModal";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";
import { useForm } from "react-hook-form";
import usePutSellerRoute from "../hooks/sellerRoutes/usePutSellerRoutes";
import useDeleteSellerRoute from "../hooks/sellerRoutes/useDeleteSellerRoutes";
import { useState } from "react";

const AddSellerRoutePage = ({
  arraySeller,
  setItemsPerPage,
  page,
  totalPage,
  setPage,
  itemsPerPage,
  isSellersModalOpen,
  closeModal,
  handleCancelClick,
  setModified,
  idCompany,
}) => {
  //estados
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [sellerId, setSellerId] = useState(null);
  //Hooks
  const { userSellerResponse, setSearch } = useUsersSellers();
  const { changedSellerRoute } = usePutSellerRoute();
  const { deleteSellerRoute, isDeleted, isLoading } = useDeleteSellerRoute();
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
    const newSellersArray = transformData(arraySeller).filter(
      (element) => element.id !== sellerId,
    );
    const newArray = newSellersArray.map((seller) => ({ id: seller.id }));
    const newData = {
      user: [...newArray],
    };
    changedSellerRoute(newData, idCompany, setModified);
    setConfirmDeleteModalOpen(false);
  };

  //funcion para transformar los Arrays
  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.userInfo.fullName,
    }));
  };

  return (
    <div>
      <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                Nombre completo
              </th>
              <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                Contacto
              </th>
              <th className="flex gap-4 p-2 text-left text-md font-semibold leading-[1.125rem]">
                <div className="flex gap-2">
                  <h3>Estado</h3>
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
            {arraySeller?.map((seller) => (
              <RouteSellerDetailsRow
                key={seller.id}
                name={seller.userInfo.fullName}
                contact={seller.email}
                state="Activo"
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
          />
        </div>
      </div>
      <ReusableModal
        onSubmit={handleSubmit(onSubmit)}
        isOpen={isSellersModalOpen}
        onClose={closeModal}
        title="Agregar vendedor/es a Ruta 1"
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <div className="space-y-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <NextAutoComplete
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

export default AddSellerRoutePage;
