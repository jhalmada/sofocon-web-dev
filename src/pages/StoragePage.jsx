import Pagination from "../components/Pagination";
import { useForm } from "react-hook-form";
import x from "../assets/icons/x.svg";
import cameraIcon from "../assets/icons/camera.svg";
import { useEffect, useState } from "react";
import FilterSelect from "../components/filters/FilterSelect";
import StorageRow from "../components/StorageRow";
import { Select, SelectItem } from "@nextui-org/react";
import ReusableModal from "../components/modals/ReusableModal";
import ProductsAutocomplete from "../components/autocomplete/ProductsAutocomplete";
import useGetProducts from "../hooks/products/useGetProducts";
import Input from "../components/inputs/Input";
import { Link, useParams } from "react-router-dom";
import pageLostImg from "../assets/images/pageLostWorkshop.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import useDeleteOrders from "../hooks/orders/useDeleteOrders";
import useGetOneOrder from "../hooks/orders/useGetOneOrder";
import SearchInput from "../components/inputs/SearchInput";
const StoragePage = ({
  ordersResponse,
  setSearch,
  setEntryDate,
  setStatus,
  setItemsPerPage,
  totalPage,
  total,
  setPage,
  page,
  itemsPerPage,
}) => {
  const { id } = useParams();
  const { productsResponse, setSearch: setSearchProducts } = useGetProducts();
  const { getOneOrder, setModified } = useGetOneOrder(id);
  const { deleteOrder } = useDeleteOrders();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [recharged, setRecharged] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExportCompetingModalOpen, setIsExportCompetingModalOpen] =
    useState(false);
  const [isSellersModalOpen, setIsSellersModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [openScannerModal, setOpenScannerModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const stateOptions = [
    "Solicitado",
    "En preparación",
    "Para retirar",
    "Egreso",
    "Entregado",
  ];
  const monthsOptions = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsExportModalOpen(false);
    setOpenScannerModal(false);
    setIsExportCompetingModalOpen(false);
    setIsSellersModalOpen(false);
  };
  const closeConfirmCancelModal = () => {
    setConfirmCancelModalOpen(false);
  };
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
    closeModal();
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);
  const openConfirmDeleteModal = (id) => {
    setOrderId(id);
    setConfirmDeleteModalOpen(true);
  };

  const handleCancelClick = () => {
    openConfirmCancelModal();
    setOpenScannerModal(false);
  };
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };
  const handleConfirmDelete = () => {
    deleteOrder(orderId, setModified);
    closeConfirmDeleteModal();
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  const oneOrder = async (id) => {
    const newdatos = await getOneOrder(id);
    setOrderDetails(newdatos);
  };
  useEffect(() => {
    oneOrder(id);
  }, [id]);

  const handleStateFilterChange = (value) => {
    switch (value) {
      case "Solicitado":
        setStatus("REQUEST");
        setPage(0);
        break;
      case "En preparación":
        setStatus("PREPARATION");
        setPage(0);
        break;
      case "Para retirar":
        setStatus("READY_PICKUP");
        setPage(0);
        break;
      case "Egreso":
        setStatus("EGRESS");
        setPage(0);
        break;
      case "Entregado":
        setStatus("DELIVERED");
        setPage(0);
        break;

      default:
        setStatus("");
        setPage(0);
        break;
    }
  };

  const handleSelectionChange = (id, value) => {
    const selectedValue = value.anchorKey === "true";
    setRecharged((prev) => ({
      ...prev,
      [id]: selectedValue,
    }));
  };
  const handleQuantityChange = (itemId, value) => {
    setQuantity((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };
  const handleDeleteSelection = (id) => {
    const updatedSelectedItems = autocompleteResults.filter(
      (selection) => selection.id !== id,
    );

    setValue(name, updatedSelectedItems);
    setAutocompleteResults(updatedSelectedItems);
  };
  const handleMonthChange = (e) => {
    const monthMap = {
      Enero: "01",
      Febrero: "02",
      Marzo: "03",
      Abril: "04",
      Mayo: "05",
      Junio: "06",
      Julio: "07",
      Agosto: "08",
      Septiembre: "09",
      Octubre: "10",
      Noviembre: "11",
      Diciembre: "12",
    };

    const selectedMonth = monthMap[e.target.value] || "";
    setEntryDate(selectedMonth ? `${selectedMonth}` : "");
    setPage(0);
  };

  return (
    <div className="flex flex-grow flex-col overflow-auto rounded-tr-lg bg-white p-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <p className="ml-2 text-black_m">Período</p>
          <Select
            className="w-52 rounded-lg border"
            placeholder="Selecciona un mes"
            onChange={handleMonthChange}
          >
            {monthsOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <SearchInput placeholder="Buscar..." onChange={setSearch} />
        </div>
      </div>

      <>
        <div className="flex flex-grow flex-col justify-between">
          <div>
            <table className="mt-2 w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Empresa
                  </th>
                  <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                    ID de orden
                  </th>
                  <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Fecha de ingreso
                  </th>
                  <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Vendedor
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
                  <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Acción
                  </th>
                </tr>
              </thead>

              <tbody>
                {ordersResponse.length === 0 ? (
                  <>
                    <tr>
                      <td colSpan="6" className="p-4 text-center">
                        <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                          Ningún elemento coincide con tu búsqueda, inténtalo de
                          nuevo. <br /> Puedes encontrar a las Solicitudes
                          creadas aquí.
                        </p>
                        <img
                          src={pageLostImg}
                          alt="Tabla vacía"
                          className="mx-auto"
                        />
                      </td>
                    </tr>
                  </>
                ) : (
                  ordersResponse.map((order, index) => (
                    <StorageRow
                      key={index}
                      id={order.id}
                      name={order?.client?.name || "Sin nombre"}
                      orderId={order.orderId}
                      entryData={formatDate(order.workShopDateEntry)}
                      seller={order?.user?.userInfo?.fullName || "Sin asignar"}
                      state={order.status}
                      deleteIconSrc={deleteIcon}
                      onDeleteClick={() => openConfirmDeleteModal(order.id)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div
            className={
              ordersResponse.length === 0 ? "hidden" : `flex justify-center p-6`
            }
          >
            <Pagination
              pageIndex={setItemsPerPage}
              currentPage={page}
              totalPages={totalPage}
              onPageChange={setPage}
              itemsPerPage={itemsPerPage}
              total={total}
            />
          </div>
        </div>
      </>

      <ReusableModal
        width="w-[30rem]"
        isOpen={isModalOpen}
        onClose={handleCancelClick}
        title="Editar Orden"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <ProductsAutocomplete
                label={"Productos"}
                array={productsResponse || []}
                name={"products"}
                setValue={setValue}
                onChange={setSearchProducts}
                placeholder="Buscar productos"
                setAutocompleteResults={setAutocompleteResults}
                selectedItems={autocompleteResults}
              />
              <p>{errors.products && errors.products.message}</p>
            </div>
            <div>
              {autocompleteResults.length > 0 && (
                <div>
                  {autocompleteResults.map((item, index) => (
                    <div className="flex w-full space-x-2" key={item.id}>
                      <div className="w-1/2">
                        <span className="mt-[1.50rem] flex h-10 w-full items-center justify-between rounded-lg p-2 shadow-br">
                          {item.name}
                          <img
                            src={x}
                            alt="delete"
                            className="mr-1 cursor-pointer"
                            onClick={() => handleDeleteSelection(item.id)}
                          />
                        </span>
                        <Input
                          hidden={true}
                          value={item.id}
                          defaultValue={item.id}
                          {...register(`productInOrder[${index}].product.id`, {
                            value: item.id,
                          })}
                          disabled
                        />
                      </div>
                      <div className="flex w-1/2 space-x-2">
                        <Input
                          type="number"
                          label={"Cantidad"}
                          defaultValue={1}
                          minValue={1}
                          placeholder={"Cant."}
                          onInput={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          {...register(`productInOrder[${index}].amount`)}
                          msjError={
                            errors[`productInOrder[${index}].amount`]
                              ?.message || ""
                          }
                        />
                        <div className="w-full">
                          <label className="block text-sm font-light">
                            Recarga
                          </label>
                          <Select
                            defaultValue={false}
                            className="rounded-lg border"
                            placeholder={recharged[item.id] ? "Si" : "No"}
                            {...register(`productInOrder[${index}].isRecharge`)}
                            onSelectionChange={(value) =>
                              handleSelectionChange(item.id, value)
                            }
                          >
                            <SelectItem key={true}>Si</SelectItem>
                            <SelectItem key={false}>No</SelectItem>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                  {autocompleteResults.map((item) => {
                    return (
                      recharged[item.id] &&
                      Array.from({ length: quantity[item.id] || 1 }).map(
                        (_, index) => (
                          <div
                            key={`recharged-${item.id}-${index}`}
                            className="mb-8 rounded-lg bg-gray p-4"
                          >
                            <p className="mb-4 text-center text-sm">
                              Recarga del producto
                              <span className="ml-1 font-semibold uppercase">
                                {item.name}
                              </span>
                            </p>
                            <div className="flex space-x-2">
                              <Input
                                label={"Código de barras"}
                                placeholder={"..."}
                                bg="bg-white"
                                {...register(
                                  `productInOrder[${index}].ItemsRemoval[${index}].barCode`,
                                  {
                                    required: "Este campo es obligatorio",
                                  },
                                )}
                                msjError={errors.barCode?.message || ""}
                              />
                              <span className="flex items-center">
                                <Link to={"/inicio"}>
                                  <div className="mt-2 flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center justify-center rounded-full bg-blue_b text-white shadow-blur">
                                    <img
                                      src={cameraIcon}
                                      alt=""
                                      className="h-5 w-5"
                                    />
                                  </div>
                                </Link>
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <Input
                                label={"Matrícula"}
                                placeholder={"X234234"}
                                bg="bg-white"
                                {...register(
                                  `productInOrder[${index}].ItemsRemoval[${index}].enrollment`,
                                  {
                                    required: "Este campo es obligatorio",
                                  },
                                )}
                                msjError={errors.enrollment?.message || ""}
                              />
                              <Input
                                label={"N° UNIT de fábrica"}
                                placeholder={"123455"}
                                bg="bg-white"
                                {...register(
                                  `productInOrder[${index}].ItemsRemoval[${index}].factoryUnit`,
                                  {
                                    required: "Este campo es obligatorio",
                                  },
                                )}
                                msjError={errors.factoryUnit?.message || ""}
                              />
                            </div>
                          </div>
                        ),
                      )
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </form>
      </ReusableModal>
      <ReusableModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={closeConfirmDeleteModal}
        title="Eliminar orden"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(orderId)}
      >
        Esta orden será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
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
        onClose={closeSaveConfirmationModal}
        title="Cambios guardados"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={closeSaveConfirmationModal}
      >
        Los cambios fueron guardados exitosamente.
      </ReusableModal>
    </div>
  );
};
export default StoragePage;
