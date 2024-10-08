import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button.jsx";
import ReusableModal from "../components/modals/ReusableModal.jsx";
import Pagination from "../components/Pagination.jsx";
import closeIcon from "../assets/icons/x-lg.svg";
import SearchInput from "../components/inputs/SearchInput.jsx";
import PlusIcon from "../assets/icons/plus.svg";
import FilterRightIcon from "../assets/icons/filter-right.svg";
import ChevronDownIcon from "../assets/icons/chevron-down.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import DownloadIcon from "../assets/icons/download.svg";
import useCompanies from "../hooks/companies/useCompanies.js";
import useDeleteCompanies from "../hooks/companies/useDeleteCompanies.js";
import { useForm } from "react-hook-form";
import RouteMapDetailsRow from "../components/RouteMapDetailsRow.jsx";
import RouteSellerDetailsRow from "../components/RouteSellerDetailsRow.jsx";
import RouteCompanieDetailsRow from "../components/RouteCompanieDetailsRow.jsx";
import { sellers } from "../utils/DataInfo.js";
import { BASE_URL } from "../utils/Constants.js";
import { getClientsExcel } from "../services/companies/companies.routes.js";
import { getSellersExcel } from "../services/user/user.routes.js";

const MAP_TAB = "map";
const SELLERS_TAB = "sellers";
const COMPANIES_TAB = "companies";
const RouteMapDetailsPage = () => {
  const [companyId, setCompanyId] = useState(null);
  const { deleteCompany } = useDeleteCompanies();
  const {
    companiesResponse,
    setItemsPerPage,
    totalPage,
    setPage,
    page,
    itemsPerPage,
    setModified,
  } = useCompanies();
  const [isSellersModalOpen, setIsSellersModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(MAP_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSellersExportModalOpen, setIsSellersExportModalOpen] =
    useState(false);
  const [checkSelected, setCheckSelected] = useState("existente");
  {
    /*Vendedores*/
  }
  const [allSellers, setAllSellers] = useState(sellers);
  const [assignedSellers, setAssignedSellers] = useState([]);
  const [availableSellers, setAvailableSellers] = useState(allSellers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSellers, setFilteredSellers] = useState(allSellers);
  {
    /*Empresas*/
  }
  const [allCompanies, setAllCompanies] = useState(companiesResponse || []);
  const [assignedCompanies, setAssignedCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState(allCompanies);
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const openModal = (id) => {
    const companyToEdit = companiesResponse.find(
      (company) => company.id === id,
    );
    if (companyToEdit) {
      setValue("name", companyToEdit?.name || "");
      setValue("department", companyToEdit?.department || "");
      setValue("neighborhood", companyToEdit?.neighborhood || "");
      setValue("address", companyToEdit?.address || "");
      setValue("managerName", companyToEdit?.managerName || "");
      setValue("phone", companyToEdit?.phone || "");
      setValue("rut", companyToEdit?.rut || "");
      setValue("status", companyToEdit?.status || "");
      setValue(
        "nextVisit",
        parseAbsoluteToLocal(
          companyToEdit?.nextVisit || "2024-10-02T21:46:00.330Z",
        ),
      );
      companyToEdit.competenceName
        ? setValue("competenceName", companyToEdit.competenceName)
        : setValue("competenceName", "");
      companyToEdit.competenceName ? setCompetence(true) : setCompetence(false);
    }
    setIsModalOpen(true);
    setCompanyId(id);
    setIsModalOpen(true);
  };

  const openSellersModal = (id) => {
    setIsSellersModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsExportModalOpen(false);
    setIsSellersExportModalOpen(false);
    setIsSellersModalOpen(false);
    setConfirmCancelModalOpen(false);
    setSaveConfirmationModalOpen(false);
    setConfirmDeleteModalOpen(false);
  };

  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);
  const closeConfirmCancelModal = () => setConfirmCancelModalOpen(false);
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
    closeModal();
  };
  const openConfirmDeleteModal = (id) => {
    setCompanyId(id);
    setConfirmDeleteModalOpen(true);
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);

  const handleConfirmDelete = () => {
    deleteCompany(companyId, setModified);
    closeConfirmDeleteModal();
  };

  const handleCancelClick = () => openConfirmCancelModal();
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };

  const handleUserCreation = async (userData) => {
    try {
      const newUser = await changedUser(userData, companyId, setModified);

      if (newUser) {
        setSaveConfirmationModalOpen(true);
      } else {
        console.error(
          "No se recibió un nuevo usuario después de la actualización",
        );
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setIsModalOpen(true);
    }
  };

  const onSubmit = (data) => {
    const { fullName, email, password, role, nameRole, permissions } = data;

    switch (checkSelected) {
      case "existente":
        handleUserCreation({
          email,
          password,
          userInfo: {
            fullName,
          },
          role: { id: role },
        });
        break;
      default:
        handleUserCreation({
          email,
          password,
          fullName: {
            fullName,
          },
          role: {
            name: nameRole,
            permissions: [...permissions, "USER_ADMIN"],
          },
        });
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  };

  const handleAddSeller = (seller) => {
    setAssignedSellers((prev) => [...prev, seller]);
    setAvailableSellers((prev) => prev.filter((s) => s.id !== seller.id));
  };

  const handleAddCompany = (company) => {
    setAssignedCompanies((prev) => [...prev, company]);
    setFilteredCompanies((prev) => prev.filter((c) => c.id !== company.id));
  };

  const handleRemoveSeller = (seller) => {
    setAssignedSellers((prev) => prev.filter((s) => s.id !== seller.id));
    setAvailableSellers((prev) => [...prev, seller]);
  };
  const handleRemoveCompany = (company) => {
    setAssignedCompanies((prev) => prev.filter((c) => c.id !== company.id));
    setFilteredCompanies((prev) => [...prev, company]);
  };
  const handleSearch = (term) => {
    setFilteredSellers(
      availableSellers.filter((seller) =>
        seller.name.toLowerCase().includes(term.toLowerCase()),
      ),
    );
  };
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = availableSellers.filter((seller) =>
      seller.name.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredSellers(filtered);
  };
  const handleCompanySearchChange = (e) => {
    const term = e.target.value;
    setCompanySearchTerm(term);
    const filtered = companiesResponse.filter((company) =>
      company.name.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredCompanies(filtered);
  };

  useEffect(() => {
    if (searchTerm) {
      setFilteredSellers(
        allSellers.filter((seller) =>
          seller.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilteredSellers(allSellers);
    }
  }, [searchTerm, allSellers]);

  useEffect(() => {
    if (companySearchTerm) {
      setFilteredCompanies(
        allCompanies.filter((company) =>
          company.name.toLowerCase().includes(companySearchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilteredCompanies(allCompanies);
    }
  }, [companySearchTerm, allCompanies]);

  const openExportModal = (id) => {
    setIsExportModalOpen(true);
  };
  const openSellersExportModal = (id) => {
    setIsSellersExportModalOpen(true);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-grow p-6">
        <Link
          to="/inicio/rutas"
          className="cursor-pointer text-sm font-medium leading-4"
        >
          <div className="mb-4 flex items-center">
            <img
              src={ChevronLeftIcon}
              alt="arrow left"
              className="-ml-1 h-4 w-4"
            />
            Volver
          </div>
        </Link>
        <div className="flex justify-between">
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            Nombre de ruta
          </h1>
          <SearchInput placeholder="Buscar..." />
        </div>
        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(MAP_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === MAP_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Mapa
            </h2>
            <h2
              onClick={() => setActiveTab(SELLERS_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === SELLERS_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Vendedores
            </h2>
            <h2
              onClick={() => setActiveTab(COMPANIES_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === COMPANIES_TAB ? "bg-white" : "bg-gray"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Empresas
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            {activeTab === COMPANIES_TAB && (
              <div className="flex space-x-4">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                  onClick={() => openExportModal()}
                />
              </div>
            )}
            {(activeTab === MAP_TAB || activeTab === COMPANIES_TAB) && (
              <div className="flex space-x-4">
                <Button
                  text="Agregar empresa"
                  icon={PlusIcon}
                  onClick={() => openModal()}
                />
              </div>
            )}

            {activeTab === SELLERS_TAB && (
              <div className="flex space-x-4">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                  onClick={() => openSellersExportModal()}
                />

                <Button
                  text="Agregar vendedor"
                  icon={PlusIcon}
                  onClick={() => openSellersModal()}
                />
              </div>
            )}
          </div>
        </div>
        {activeTab === MAP_TAB && (
          <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Nombre
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Zona
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Empresas
                  </th>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Vendedores
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
                </tr>
              </thead>
              <tbody>
                <RouteMapDetailsRow
                  name="nombre de ruta"
                  zone="zona de la ruta"
                  companies="214"
                  sellers="35"
                  state="Activo"
                />
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
        )}
        {activeTab === SELLERS_TAB && (
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
                {filteredSellers.map((seller) => (
                  <RouteSellerDetailsRow
                    key={seller.id}
                    name={seller.name}
                    contact={"email"}
                    state="Activo"
                    deleteIconSrc={deleteIcon}
                    onDeleteClick={() => openConfirmDeleteModal()}
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
        )}
        {activeTab === COMPANIES_TAB && (
          <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Nombre
                  </th>

                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Dirección
                  </th>

                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Próx. visita
                  </th>
                  <th className="flex gap-4 p-2 text-left text-md font-semibold leading-[1.125rem]">
                    <div className="flex w-full gap-2">
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
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Notas
                  </th>
                  <th className="p-2 text-md font-semibold leading-[1.125rem]">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {companiesResponse.map((companie, index) => (
                  <RouteCompanieDetailsRow
                    key={index}
                    name={companie.name}
                    direction={companie.address}
                    nextVisits={formatDate(companie.nextVisit)}
                    state={"activo"}
                    notes={"ver notas"}
                    deleteIconSrc={deleteIcon}
                    onDeleteClick={() => openConfirmDeleteModal(companie.id)}
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
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        )}
      </div>
      <ReusableModal
        isOpen={isSellersExportModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-5">
          <a href={`${BASE_URL}/${getSellersExcel}`} download target="_blank">
            <Button
              text="Descargar archivo Excel"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>
        </div>
        <Button
          text="Descargar archivo PDF"
          icon={DownloadIcon}
          color={"cancel"}
          shadow="shadow-blur"
          iconPosition={"left"}
        />
      </ReusableModal>
      <ReusableModal
        isOpen={isExportModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-5">
          <a href={`${BASE_URL}/${getClientsExcel}`} download target="_blank">
            <Button
              text="Descargar archivo Excel"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>
        </div>
        <Button
          text="Descargar archivo PDF"
          icon={DownloadIcon}
          color={"cancel"}
          shadow="shadow-blur"
          iconPosition={"left"}
        />
      </ReusableModal>
      <ReusableModal
        isOpen={isSellersModalOpen}
        onClose={closeModal}
        title="Agregar vendedor/es a Ruta 1"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <div className="space-y-2">
          {assignedSellers.length > 0 && (
            <p className="text-sm font-light leading-[1rem] text-black_b">
              Vendedores asignados
            </p>
          )}
          {assignedSellers.map((seller) => (
            <Button
              key={seller.id}
              text={seller.name}
              icon={closeIcon}
              color={"selected"}
              width="w-full"
              onClick={() => handleRemoveSeller(seller)}
            />
          ))}
        </div>
        <div>
          <p className="mb-2 text-sm font-light leading-[1rem] text-black_b">
            Agregar vendedores
          </p>
          <SearchInput
            placeholder="Buscar..."
            border="border"
            rounded="rounded-[0.375rem]"
            visibility="block"
            onSearch={handleSearch}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="mt-2 space-y-2">
            {searchTerm ? (
              availableSellers
                .filter((seller) =>
                  seller.name.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((seller) => (
                  <Button
                    key={seller.id}
                    text={seller.name}
                    color={"cancel"}
                    width="w-full"
                    onClick={() => handleAddSeller(seller)}
                  />
                ))
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </ReusableModal>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Agregar empresa/s a Ruta 1"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <div className="space-y-2">
          {assignedCompanies.length > 0 &&
            assignedCompanies.map((company) => (
              <Button
                key={company.id}
                text={company.name}
                icon={closeIcon}
                color={"selected"}
                width="w-full"
              />
            ))}
        </div>
        <div>
          <p className="mb-2 text-sm font-light leading-[1rem] text-black_b">
            Agregar empresas
          </p>
          <SearchInput
            placeholder="Buscar..."
            border="border"
            rounded="rounded-[0.375rem]"
            visibility="block"
            value={companySearchTerm}
            onChange={handleCompanySearchChange}
          />
          <div className="mt-2 space-y-2">
            {filteredCompanies.map((company) => (
              <Button
                key={company.id}
                text={company.name}
                color={"cancel"}
                width="w-full"
                onClick={() => handleAddCompany(company)}
              />
            ))}
          </div>
        </div>
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

      <ReusableModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={closeConfirmDeleteModal}
        title="Eliminar usuario"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(companyId)}
      >
        Este usuario será eliminado de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};

export default RouteMapDetailsPage;
