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
import SearchInput from "../components/inputs/SearchInput";
import disconnectedImg from "../assets/images/disconnected.svg";

const AddSellerRoutePage = ({
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
  setIsActive,
}) => {
  //estados
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [sellerId, setSellerId] = useState(null);

  const stateOptions = ["Activo", "Inactivo"];
  //Hooks
  const { userSellerResponse, setSearch } = useUsersSellers();
  console.log(userSellerResponse);
  console.log(arraySeller);
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
      name: item?.userInfo?.fullName,
    }));
  };
  const handleStateFilterChange = (value) => {
    switch (value) {
      case "Activo":
        setIsActive(true);
        break;
      case "Inactivo":
        setIsActive(false);
        break;
      default:
        setIsActive(null);
        break;
    }
  };
  return (
    <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      <div>
        <div className="flex justify-end">
          <SearchInput placeholder="Buscar..." onChange={setSearch} />
        </div>

        <table className="mt-2 w-full">
          <thead>
            <tr>
              <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                Nombre completo
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Contacto
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                <div className="flex flex-col items-center gap-2">
                  <FilterSelect
                    options={stateOptions}
                    placeholder="Estado"
                    onChange={handleStateFilterChange}
                  />
                </div>
              </th>
              <th className="p-2 text-md font-semibold leading-[1.125rem]">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {arraySeller.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                    Ningún elemento coincide con tu búsqueda, inténtalo de
                    nuevo. <br /> Puedes encontrar las rutas creadas aquí.
                  </p>
                  <img
                    src={disconnectedImg}
                    alt="Tabla vacía"
                    className="mx-auto"
                  />
                </td>
              </tr>
            ) : (
              arraySeller.map((seller) => (
                <RouteSellerDetailsRow
                  key={seller.id}
                  name={seller?.userInfo?.fullName}
                  contact={seller.email}
                  state={seller.isActive ? "Activo" : "Inactivo"}
                  deleteIconSrc={deleteIcon}
                  onDeleteClick={() => openConfirmDeleteModal(seller.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <div
        className={
          arraySeller.length === 0 ? "hidden" : `flex justify-center p-6`
        }
      >
        <Pagination
          pageIndex={setItemsPerPage}
          currentPage={page}
          totalPages={totalPage}
          onPageChange={setPage}
          itemPerPage={itemsPerPage}
          total={total}
        />
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

export default AddSellerRoutePage;
