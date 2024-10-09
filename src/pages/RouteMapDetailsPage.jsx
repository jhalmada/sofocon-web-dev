import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { set, useForm } from "react-hook-form";
import RouteMapDetailsRow from "../components/RouteMapDetailsRow.jsx";
import RouteSellerDetailsRow from "../components/RouteSellerDetailsRow.jsx";
import RouteCompanieDetailsRow from "../components/RouteCompanieDetailsRow.jsx";
import useOneSellerRoutes from "../hooks/sellerRoutes/useOneSellerRoutes.js";
import useUsers from "../hooks/users/use.users.js";
import { u, use } from "framer-motion/client";
import { BASE_URL } from "../utils/Constants.js";
import { getSellersExcel } from "../services/user/user.routes.js";
import { getClientsExcel } from "../services/companies/companies.routes.js";
import useUsersSellers from "../hooks/users/useUsersSellers.js";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete.jsx";
import AddSellerRoute from "./AddSellerRoutePage.jsx";
import AddSellerRoutePage from "./AddSellerRoutePage.jsx";
import AddCompanyRoutePage from "./AddCompanyRoutePage.jsx";

const MAP_TAB = "map";
const SELLERS_TAB = "sellers";
const COMPANIES_TAB = "companies";
const RouteMapDetailsPage = () => {
  //estados
  const [isSellersModalOpen, setIsSellersModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);

  const {
    userSellerResponse,
    setRoute,
    setItemsPerPage,
    page,
    totalPage,
    setPage,
    itemsPerPage,
    setModified,
  } = useUsersSellers();
  const { usersResponse } = useUsers();
  const [companyId, setCompanyId] = useState(null);
  const { id } = useParams();
  const { getOneSellerRoute } = useOneSellerRoutes();
  const [datos, setDatos] = useState(null);

  const { deleteCompany } = useDeleteCompanies();
  const {
    companiesResponse,
    setItemsPerPage: setItemsPerPageCompanies,
    totalPage: totalPageCompanies,
    setPage: setPageCompanies,
    page: pageCompanies,
    itemsPerPage: itemsPerPageCompanies,
    setModified: setModifiedCompanies,
    setRoutes: setRoutesCompanies,
  } = useCompanies();
  console.log(companiesResponse);

  const [activeTab, setActiveTab] = useState(MAP_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSellersExportModalOpen, setIsSellersExportModalOpen] =
    useState(false);

  const oneRute = async (id) => {
    const newdatos = await getOneSellerRoute(id);
    setRoute(id);
    setRoutesCompanies(id);
    setDatos(newdatos);
    console.log(newdatos);
  };

  useEffect(() => {
    oneRute(id);
  }, []);

  {
    /*Vendedores*/
  }
  const [allSellers, setAllSellers] = useState([]);
  const [assignedSellers, setAssignedSellers] = useState([]);
  const [availableSellers, setAvailableSellers] = useState(allSellers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSellers, setFilteredSellers] = useState(allSellers);

  useEffect(() => {
    setAllSellers(usersResponse);
  }, [usersResponse]);

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
    setIsModalOpen(true);
  };

  const openSellersModal = (id) => {
    setIsSellersModalOpen(true);
  };
  console.log(allSellers);
  console.log(usersResponse);

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
    deleteCompany(companyId, setModifiedCompanies);
    closeConfirmDeleteModal();
  };

  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };

  const handleUserCreation = async (userData) => {};

  const onSubmit = (data) => {};
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
        seller.userInfo.fullName.toLowerCase().includes(term.toLowerCase()),
      ),
    );
  };
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = availableSellers.filter((seller) =>
      seller.userInfo.fullName.toLowerCase().includes(term.toLowerCase()),
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
          seller.userInfo.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
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

  //funciones
  const onSubmits = (data) => {
    console.log(data);
  };

  //funciones del modal de añadir vendedor
  //para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsExportModalOpen(false);
    setIsSellersExportModalOpen(false);
    setIsSellersModalOpen(false);
    setConfirmCancelModalOpen(false);
    setSaveConfirmationModalOpen(false);
    setConfirmDeleteModalOpen(false);
  };
  //para el boton de cancelar
  const handleCancelClick = () => openConfirmCancelModal();
  //para la confirmacion de cancelar
  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);
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
                  name={datos?.name || "Nombre de la ruta"}
                  zone={datos?.zone || "zona de la ruta"}
                  companies={datos?.totalClients || "cargando"}
                  sellers={datos?.totalSeller || "cargando"}
                  state="Activo"
                />
                {console.log(datos)}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === SELLERS_TAB && (
          <AddSellerRoutePage
            arraySeller={userSellerResponse.result}
            itemsPerPage={itemsPerPage}
            page={page}
            setItemsPerPage={setItemsPerPage}
            setPage={setPage}
            totalPage={totalPage}
            isSellersModalOpen={isSellersModalOpen}
            closeModal={closeModal}
            handleCancelClick={handleCancelClick}
            setModified={setModified}
            idCompany={id}
          />
        )}
        {activeTab === COMPANIES_TAB && (
          <AddCompanyRoutePage
            page={pageCompanies}
            itemsPerPage={itemsPerPageCompanies}
            setPage={setPageCompanies}
            totalPage={totalPageCompanies}
            setItemsPerPage={setItemsPerPageCompanies}
            arrayCompanies={companiesResponse}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            handleCancelClick={handleCancelClick}
            setModified={setModifiedCompanies}
            idCompany={id}
          />
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
