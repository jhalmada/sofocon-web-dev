import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chip } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import Button from "../components/buttons/Button.jsx";
import ReusableModal from "../components/modals/ReusableModal.jsx";
import Input from "../components/inputs/Input.jsx";
import { SettlementsService } from "../services/settlements/settlements.service.js";
import SaveImg from "../assets/img/save.svg";

const SettlementsPage = () => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSeller, setExpandedSeller] = useState(null);
  const [sellerOrders, setSellerOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    method: "",
    amount: "",
    checkNumber: "",
    date: new Date().toISOString().split("T")[0],
  });

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await SettlementsService.getSummary();
      setSummary(response.data?.data || response.data || []);
    } catch (error) {
      setSummary([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSellerOrders = async (sellerId) => {
    try {
      setLoadingOrders(true);
      const response = await SettlementsService.getBySeller(sellerId);
      setSellerOrders(response.data?.data || response.data || []);
    } catch (error) {
      setSellerOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleExpandSeller = (sellerId) => {
    if (expandedSeller === sellerId) {
      setExpandedSeller(null);
      setSellerOrders([]);
    } else {
      setExpandedSeller(sellerId);
      fetchSellerOrders(sellerId);
    }
  };

  const openPaymentModal = (settlement) => {
    setSelectedSettlement(settlement);
    setPaymentForm({
      method: "",
      amount: "",
      checkNumber: "",
      date: new Date().toISOString().split("T")[0],
    });
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedSettlement(null);
  };

  const handlePaymentSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!selectedSettlement || !paymentForm.method || !paymentForm.amount) return;

    try {
      const payload = {
        method: paymentForm.method,
        amount: parseFloat(paymentForm.amount),
        date: paymentForm.date,
      };
      if (paymentForm.method === "Cheque" && paymentForm.checkNumber) {
        payload.checkNumber = paymentForm.checkNumber;
      }
      await SettlementsService.addPayment(selectedSettlement.id, payload);
      closePaymentModal();
      setIsSuccessModalOpen(true);
      fetchSummary();
      if (expandedSeller) {
        fetchSellerOrders(expandedSeller);
      }
    } catch (error) {
      // Error handling silencioso - el usuario ve que no se cierra el modal
    }
  };

  const getStatusChip = (status) => {
    const statusMap = {
      pending: { label: "Pendiente", color: "warning" },
      partial: { label: "Parcial", color: "primary" },
      paid: { label: "Pagado", color: "success" },
    };
    const mapped = statusMap[status] || { label: status, color: "default" };
    return (
      <Chip color={mapped.color} size="sm" variant="flat">
        {mapped.label}
      </Chip>
    );
  };

  const formatCurrency = (value) => {
    const num = parseFloat(value) || 0;
    return `$${num.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col p-6">
        <div className="w-[4rem]">
          <Link to="/inicio" className="text-sm font-medium leading-4">
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
        <div className="flex justify-between">
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            Liquidaciones
          </h1>
        </div>

        {/* Tabla resumen por vendedor */}
        <div className="flex flex-grow flex-col overflow-auto rounded-lg bg-white p-5">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <p className="text-md text-black_l">Cargando...</p>
            </div>
          ) : summary.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                No hay liquidaciones disponibles.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Vendedor
                  </th>
                  <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Total a liquidar
                  </th>
                  <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Monto pagado
                  </th>
                  <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Saldo pendiente
                  </th>
                  <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Estado
                  </th>
                  <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {summary.map((seller) => (
                  <>
                    <tr
                      key={seller.sellerId || seller.id}
                      className="border-b border-gray hover:bg-gray/50"
                    >
                      <td className="p-2 text-left text-sm font-medium">
                        {seller.sellerName || seller.seller?.fullName || "-"}
                      </td>
                      <td className="p-2 text-center text-sm">
                        {formatCurrency(seller.totalAmount)}
                      </td>
                      <td className="p-2 text-center text-sm">
                        {formatCurrency(seller.paidAmount)}
                      </td>
                      <td className="p-2 text-center text-sm">
                        {formatCurrency(seller.pendingAmount)}
                      </td>
                      <td className="p-2 text-center">
                        {getStatusChip(seller.status)}
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() =>
                            handleExpandSeller(seller.sellerId || seller.id)
                          }
                          className="rounded-md bg-blue_m px-3 py-1 text-xs font-medium text-white hover:bg-blue_b"
                        >
                          {expandedSeller === (seller.sellerId || seller.id)
                            ? "Ocultar"
                            : "Ver detalle"}
                        </button>
                      </td>
                    </tr>

                    {/* Detalle expandido */}
                    {expandedSeller === (seller.sellerId || seller.id) && (
                      <tr key={`detail-${seller.sellerId || seller.id}`}>
                        <td colSpan="6" className="bg-gray/30 p-4">
                          {loadingOrders ? (
                            <p className="text-center text-sm text-black_l">
                              Cargando ordenes...
                            </p>
                          ) : sellerOrders.length === 0 ? (
                            <p className="text-center text-sm text-black_l">
                              No hay ordenes para este vendedor.
                            </p>
                          ) : (
                            <table className="w-full">
                              <thead>
                                <tr>
                                  <th className="p-2 text-left text-xs font-semibold">
                                    N° Orden
                                  </th>
                                  <th className="p-2 text-center text-xs font-semibold">
                                    Cliente
                                  </th>
                                  <th className="p-2 text-center text-xs font-semibold">
                                    Total
                                  </th>
                                  <th className="p-2 text-center text-xs font-semibold">
                                    Monto pagado
                                  </th>
                                  <th className="p-2 text-center text-xs font-semibold">
                                    Saldo
                                  </th>
                                  <th className="p-2 text-center text-xs font-semibold">
                                    Estado
                                  </th>
                                  <th className="p-2 text-center text-xs font-semibold">
                                    Acciones
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {sellerOrders.map((order) => (
                                  <tr
                                    key={order.id}
                                    className="border-b border-gray"
                                  >
                                    <td className="p-2 text-left text-xs">
                                      {order.orderNumber || order.id}
                                    </td>
                                    <td className="p-2 text-center text-xs">
                                      {order.clientName ||
                                        order.client?.name ||
                                        "-"}
                                    </td>
                                    <td className="p-2 text-center text-xs">
                                      {formatCurrency(order.totalAmount)}
                                    </td>
                                    <td className="p-2 text-center text-xs">
                                      {formatCurrency(order.paidAmount)}
                                    </td>
                                    <td className="p-2 text-center text-xs">
                                      {formatCurrency(order.pendingAmount)}
                                    </td>
                                    <td className="p-2 text-center">
                                      {getStatusChip(order.status)}
                                    </td>
                                    <td className="p-2 text-center">
                                      <button
                                        onClick={() => openPaymentModal(order)}
                                        className="rounded-md bg-green_m px-3 py-1 text-xs font-medium text-white hover:bg-green_b"
                                      >
                                        Registrar pago
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal de registro de pago */}
      <ReusableModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        title="Registrar pago"
        onSubmit={handlePaymentSubmit}
        buttons={["cancel", "save"]}
        handleCancelClick={closePaymentModal}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Medio de pago
            </label>
            <Select
              className="rounded-lg border"
              placeholder="Seleccionar medio de pago"
              selectedKeys={paymentForm.method ? [paymentForm.method] : []}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] || "";
                setPaymentForm((prev) => ({ ...prev, method: value }));
              }}
            >
              <SelectItem key="Efectivo">Efectivo</SelectItem>
              <SelectItem key="Cheque">Cheque</SelectItem>
              <SelectItem key="Credito">Credito</SelectItem>
            </Select>
          </div>

          <Input
            label="Monto ($)"
            placeholder="0.00"
            type="number"
            value={paymentForm.amount}
            onChange={(e) =>
              setPaymentForm((prev) => ({ ...prev, amount: e.target.value }))
            }
          />

          {paymentForm.method === "Cheque" && (
            <Input
              label="N° de cheque"
              placeholder="Ingrese el numero de cheque"
              value={paymentForm.checkNumber}
              onChange={(e) =>
                setPaymentForm((prev) => ({
                  ...prev,
                  checkNumber: e.target.value,
                }))
              }
            />
          )}

          <Input
            label="Fecha"
            type="date"
            value={paymentForm.date}
            onChange={(e) =>
              setPaymentForm((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </div>
      </ReusableModal>

      {/* Modal de confirmacion */}
      <ReusableModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Pago registrado"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setIsSuccessModalOpen(false)}
      >
        <div className="flex h-[14rem] flex-col items-center justify-center">
          <img src={SaveImg} alt="save" />
          <p className="font-roboto text-sm font-light text-black">
            El pago fue registrado correctamente.
          </p>
        </div>
      </ReusableModal>
    </div>
  );
};

export default SettlementsPage;
