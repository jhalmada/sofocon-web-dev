import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import { useState } from "react";
import AddUsers from "../hooks/users/use.addUsers";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { useForm } from "react-hook-form";
import DownloadIcon from "../assets/icons/download-white.svg";
import useGetPriceList from "../hooks/priceList/useGetPriceList";
import useUsersSellers from "../hooks/users/useUsersSellers";
import useCompanies from "../hooks/companies/useCompanies";
import useAddOrders from "../hooks/orders/useAddOrders";
import useOrders from "../hooks/orders/useOrders";
import useGetProducts from "../hooks/products/useGetProducts";

const ClientsOrdersPage = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { postAddUsers, loading } = AddUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [checkSelected, setCheckSelected] = useState("existente");
  const [mnsError, setMnsError] = useState("");
  const [dateSelected, setDateSelected] = useState(false);
  const [errorDataPicker, setErrorDataPicker] = useState(false);
  const { postAddOrders } = useAddOrders();
  const { companiesResponse, setSearch: setSearchCompanies } = useCompanies();
  const { ordersResponse, setStatus } = useOrders();
  const { userSellerResponse, setSearch: setSearchSellers } = useUsersSellers();
  const {
    productsResponse,
    setSearch: setSearchProducts,
    setList,
  } = useGetProducts();
  const { priceListResponse } = useGetPriceList();

  const stateOptions = ["Entregado", "Solicitado", "Preparación", "Retiro"];

  const handleUserCreation = async (userData) => {
    try {
      const newUser = await postAddUsers(userData);

      if (newUser) {
        setSaveConfirmationModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      if (error.response.status === 409) {
        setMnsError("El correo electrónico ya se encuentra registrado");
        setIsModalOpen(true);
      } else {
        setMnsError("Error al crear el usuario");
      }
    }
  };
  const onSubmit = () => {
    navigate("/inicio/ordenes");
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
  };
  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
    navigate("/inicio/personal");
  };
  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col p-6">
        <div className="w-[4rem]">
          <Link to="/inicio/ordenes" className="text-sm font-medium leading-4">
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
        <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
          ID de órden
        </h1>
        {/*navbar */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t">
              Detalle
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow rounded-tr-lg bg-white px-14 py-10"
        >
          <div>
            <Select
              className="mb-4 w-1/6 rounded-lg border"
              label="Estado del extintor"
              labelPlacement="outside"
              placeholder="Estado"
              {...register("status")}
              onSelectionChange={(values) => setValue("status", values)}
            >
              {stateOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                border="none"
                label={"ID de órden"}
                placeholder={ordersResponse.id}
                placeholderColor="placeholder-black_b"
                disabled
              />
              <Input
                bg="bg-gray"
                border="none"
                label={"Empresa"}
                placeholder={"..."}
                placeholderColor="placeholder-black_b"
                disabled
              />
            </div>
            <Input
              bg="bg-gray"
              border="none"
              label={"R.U.T./CI"}
              placeholder={"1234567890"}
              placeholderColor="placeholder-black_b"
              disabled
            />
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Fecha de venta"}
                placeholder={"14/09/2024"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Vendedor"}
                placeholder={"Nombre vendedor"}
                disabled
              />
            </div>

            <div className="flex space-x-2">
              <div className="flex w-1/2 space-x-2">
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Producto"}
                  placeholder={"Producto 1"}
                  disabled
                />
              </div>
              <div className="flex w-1/2 space-x-2">
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Precio"}
                  placeholder={"$345"}
                  disabled
                />
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Cant."}
                  placeholder={"1"}
                  disabled
                />

                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Desc."}
                  placeholder={"10%"}
                  disabled
                />
                <Input
                  bg="bg-gray"
                  placeholderColor="placeholder-black_b"
                  border="none"
                  label={"Recarga"}
                  placeholder={"Si"}
                  disabled
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Subtotal"}
                placeholder={"$10000"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"IVA 22%"}
                placeholder={"$1000"}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Desc."}
                placeholder={"-$350"}
                disabled
              />
            </div>
            <Input
              bg="bg-gray"
              placeholderColor="placeholder-black_b"
              border="none"
              label={"TOTAL"}
              placeholder={"$100000"}
              disabled
            />

            <div className="w-1/2">
              <Input
                bg="bg-gray"
                border="none"
                label={"Forma de pago"}
                placeholder={"Efectivo"}
                placeholderColor="placeholder-black_b"
                disabled
              />
              <Input
                bg="bg-gray"
                border="none"
                label={"Compra autorizada por:"}
                placeholder={"Nombre del cliente"}
                placeholderColor="placeholder-black_b"
                disabled
              />
            </div>
          </div>
          <div className="mt-5 flex w-full justify-end">
            <Button
              text={"DESCARGAR"}
              color={"save"}
              type={"submit"}
              icon={DownloadIcon}
            />
          </div>
        </form>
        <ReusableModal
          isOpen={isSaveConfirmationModalOpen}
          onClose={closeSaveConfirmationModal}
          title="Cambios guardados"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={handleConfirmSaveClick}
        >
          Los cambios fueron guardados exitosamente.
        </ReusableModal>
      </div>
    </div>
  );
};
export default ClientsOrdersPage;
