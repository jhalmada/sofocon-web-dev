import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/buttons/Button.jsx";
import ReusableModal from "../components/modals/ReusableModal.jsx";
import SearchInput from "../components/inputs/SearchInput.jsx";
import PlusIcon from "../assets/icons/plus.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import DownloadIcon from "../assets/icons/download.svg";
import useCompanies from "../hooks/companies/useCompanies.js";
import useDeleteCompanies from "../hooks/companies/useDeleteCompanies.js";
import { useForm } from "react-hook-form";
import useOneSellerRoutes from "../hooks/sellerRoutes/useOneSellerRoutes.js";
import { BASE_URL } from "../utils/Constants.js";
import {
  getClientsExcel,
  getClientsPdf,
} from "../services/companies/companies.routes.js";
import { getUsersExcel, getUsersPdf } from "../services/user/user.routes.js";
import useGetProducts from "../hooks/products/useGetProducts.js";
import ProductsInListPricePage from "./ProductsInListPricePage.jsx";
import CompanyInListPricePage from "./CompanyInListPricePage.jsx";

const PRODUCTS_TAB = "sellers";
const COMPANIES_TAB = "companies";
const ListPriceDetailsPage = () => {
  const { id, name } = useParams();
  //estados
  const [isSellersModalOpen, setIsSellersModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const {
    productsResponse,
    setList,
    setItemsPerPage,
    page,
    totalPage,
    total,
    setPage,
    itemsPerPage,
    setModified,
    setSearch,
  } = useGetProducts(id);

  const [companyId, setCompanyId] = useState(null);

  const { getOneSellerRoute } = useOneSellerRoutes();
  const [datos, setDatos] = useState(null);

  const { deleteCompany } = useDeleteCompanies();
  const {
    companiesResponse,
    setItemsPerPage: setItemsPerPageCompanies,
    totalPage: totalPageCompanies,
    total: totalCompanies,
    setPage: setPageCompanies,
    page: pageCompanies,
    itemsPerPage: itemsPerPageCompanies,
    setModified: setModifiedCompanies,
    setSearch: setCompanySearch,
    setStatus,
    setList: setListCompanies,
  } = useCompanies(id);

  const [activeTab, setActiveTab] = useState(PRODUCTS_TAB);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSellersExportModalOpen, setIsSellersExportModalOpen] =
    useState(false);

  const openModal = (id) => {
    setIsModalOpen(true);
  };

  const openSellersModal = (id) => {
    setIsSellersModalOpen(true);
  };

  const closeConfirmCancelModal = () => setConfirmCancelModalOpen(false);
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
    closeModal();
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

  const openExportModal = (id) => {
    setIsExportModalOpen(true);
  };
  const openSellersExportModal = (id) => {
    setIsSellersExportModalOpen(true);
  };

  //funciones

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
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between">
      <div className="flex flex-grow flex-col px-6 pt-6">
        <div className="w-[4rem]">
          <Link to=".." className="text-sm font-medium leading-4">
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
        {/* <div className="flex justify-between">
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            {name || "Nombre de la ruta"}
          </h1>
          {activeTab === PRODUCTS_TAB && (
            <SearchInput placeholder="Buscar..." onChange={setSearch} />
          )}
          {activeTab === COMPANIES_TAB && (
            <SearchInput placeholder="Buscar..." onChange={setCompanySearch} />
          )}
        </div> */}
        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(PRODUCTS_TAB)}
              className={`min-w-40 cursor-pointer rounded-t-lg ${activeTab === PRODUCTS_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Productos
            </h2>
            {companiesResponse.length > 0 && (
              <h2
                onClick={() => setActiveTab(COMPANIES_TAB)}
                className={`min-w-40 cursor-pointer rounded-t-lg ${activeTab === COMPANIES_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
              >
                Empresas
              </h2>
            )}
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            {activeTab === COMPANIES_TAB && (
              <div className="flex space-x-4">
                <Button
                  text="Agregar empresa"
                  icon={PlusIcon}
                  onClick={() => openModal()}
                />
              </div>
            )}

            {activeTab === PRODUCTS_TAB && (
              <div className="flex space-x-4">
                <Button
                  text="Agregar Producto"
                  icon={PlusIcon}
                  onClick={() => openSellersModal()}
                />
              </div>
            )}
          </div>
        </div>
        {activeTab === PRODUCTS_TAB && (
          <ProductsInListPricePage
            arraySeller={productsResponse}
            itemsPerPage={itemsPerPage}
            page={page}
            setItemsPerPage={setItemsPerPage}
            setPage={setPage}
            totalPage={totalPage}
            total={total}
            isSellersModalOpen={isSellersModalOpen}
            closeModal={closeModal}
            isConfirmDeleteModalOpen={isConfirmDeleteModalOpen}
            closeConfirmDeleteModal={closeConfirmDeleteModal}
            handleCancelClick={handleCancelClick}
            setModified={setModified}
            idCompany={id}
            nameCompany={datos?.name}
          />
        )}
        {activeTab === COMPANIES_TAB && (
          <CompanyInListPricePage
            page={pageCompanies}
            itemsPerPage={itemsPerPageCompanies}
            setPage={setPageCompanies}
            totalPage={totalPageCompanies}
            total={totalCompanies}
            setItemsPerPage={setItemsPerPageCompanies}
            arrayCompanies={companiesResponse}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            handleCancelClick={handleCancelClick}
            setModified={setModifiedCompanies}
            idCompany={id}
            nameCompany={datos?.name}
            setStatus={setStatus}
          />
        )}
      </div>

      {/* Vendedores */}

      <ReusableModal
        isOpen={isSellersExportModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-4 flex flex-col space-y-4">
          <a
            href={`${BASE_URL}/${getUsersExcel}?isSeller=true&route=${id}`}
            download
            target="_blank"
          >
            <Button
              width="min-w-[14rem]"
              text="Descargar archivo Excel"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>

          <a
            href={`${BASE_URL}/${getUsersPdf}/?isSeller=true&route=${id}`}
            download
            target="_blank"
          >
            <Button
              width="min-w-[14rem]"
              text="Descargar archivo PDF"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>
        </div>
      </ReusableModal>

      {/* Empresas */}

      <ReusableModal
        isOpen={isExportModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-4 flex flex-col space-y-4">
          <a
            href={`${BASE_URL}/${getClientsExcel}/?route=${id}`}
            download
            target="_blank"
          >
            <Button
              width="min-w-[14rem]"
              text="Descargar archivo Excel"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>

          <a
            href={`${BASE_URL}/${getClientsPdf}/?route=${id}`}
            download
            target="_blank"
          >
            <Button
              width="min-w-[14rem]"
              text="Descargar archivo PDF"
              icon={DownloadIcon}
              color={"cancel"}
              shadow="shadow-blur"
              iconPosition={"left"}
            />
          </a>
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
        Este producto sera eliminado de forma permanente. ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};

export default ListPriceDetailsPage;
