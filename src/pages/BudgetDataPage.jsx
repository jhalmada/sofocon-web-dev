import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import { useEffect, useState } from "react";
import ReusableModal from "../components/modals/ReusableModal";
import { useForm } from "react-hook-form";
import DownloadIcon from "../assets/icons/download-white.svg";
import useGetOneOrder from "../hooks/orders/useGetOneOrder";

const ClientsOrdersPage = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getOneOrder } = useGetOneOrder(id);

  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);

  const [orderDetails, setOrderDetails] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  };
  const oneOrder = async (id) => {
    const newdatos = await getOneOrder(id);
    setOrderDetails(newdatos);
  };

  useEffect(() => {
    oneOrder(id);
  }, [id]);

  useEffect(() => {
    let newDiscount = 0;
    let newSubTotal = 0;
    let newIva = 0;
    let newTotal = 0;

    orderDetails?.productInOrder?.forEach((order) => {
      newDiscount += order.discountPercent;
      newSubTotal += order.fixedPrice * order.amount - order.discountPercent;
      newIva += newSubTotal * 1.22;
      newTotal += newSubTotal + newIva;
    });

    setDiscount(newDiscount);
    setSubTotal(newSubTotal);
    setIva(newIva);
    setTotal(newTotal);
  }, [orderDetails]);
  const onSubmit = () => {
    navigate("/inicio/ordenes");
  };
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
  };
  const handleConfirmSaveClick = () => {
    closeSaveConfirmationModal();
    navigate("/inicio/ordenes");
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
          {orderDetails?.id || "sin id"}
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
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                border="none"
                label={"ID de órden"}
                placeholder={orderDetails?.id}
                placeholderColor="placeholder-black_b"
                disabled
              />
              <Input
                bg="bg-gray"
                border="none"
                label={"Empresa"}
                placeholder={orderDetails?.client?.name}
                placeholderColor="placeholder-black_b"
                disabled
              />
            </div>
            <Input
              bg="bg-gray"
              border="none"
              label={"R.U.T./CI"}
              placeholder={orderDetails?.client?.rut || "sin rut"}
              placeholderColor="placeholder-black_b"
              disabled
            />
            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Fecha de venta"}
                placeholder={formatDate(orderDetails?.created_at)}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Vendedor"}
                placeholder={orderDetails?.user?.userInfo?.fullName}
                disabled
              />
            </div>
            {console.log(orderDetails)}
            {orderDetails?.productInOrder?.map((order, index) => (
              <div key={index} className="flex space-x-2">
                <div className="flex w-1/2 space-x-2">
                  <Input
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    label={"Producto"}
                    placeholder={order?.product?.name}
                    disabled
                  />
                </div>

                <div className="flex w-1/2 space-x-2">
                  <Input
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    label={"Precio"}
                    placeholder={order?.fixedPrice}
                    disabled
                  />
                  <Input
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    label={"Cant."}
                    placeholder={order?.amount}
                    disabled
                  />
                  <Input
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    label={"Desc."}
                    placeholder={order?.discountPercent + "%"}
                    disabled
                  />
                  <Input
                    bg="bg-gray"
                    placeholderColor="placeholder-black_b"
                    border="none"
                    label={"Recarga"}
                    placeholder={order?.isRechargue ? "Si" : "No"}
                    disabled
                  />
                </div>
              </div>
            ))}

            <div className="flex space-x-2">
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Subtotal"}
                placeholder={subTotal}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"IVA 22%"}
                placeholder={iva}
                disabled
              />
              <Input
                bg="bg-gray"
                placeholderColor="placeholder-black_b"
                border="none"
                label={"Desc."}
                placeholder={orderDetails?.discountPercent + "%"}
                disabled
              />
            </div>
            <Input
              bg="bg-gray"
              placeholderColor="placeholder-black_b"
              border="none"
              label={"TOTAL"}
              placeholder={total - total * orderDetails?.discountPercent}
              disabled
            />

            <div className="w-1/2">
              <Input
                bg="bg-gray"
                border="none"
                label={"Forma de pago"}
                placeholder={orderDetails?.paymentType}
                placeholderColor="placeholder-black_b"
                disabled
              />
              <Input
                bg="bg-gray"
                border="none"
                label={"Compra autorizada por:"}
                placeholder={orderDetails?.user?.userInfo?.fullName}
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
