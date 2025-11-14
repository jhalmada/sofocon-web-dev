import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/buttons/Button.jsx";
import ReusableModal from "../../components/modals/ReusableModal.jsx";
import PlusIcon from "../../assets/icons/plus.svg";
import ChevronLeftIcon from "../../assets/icons/chevron-left.svg";
import DownloadIcon from "../../assets/icons/download.svg";
import useCompanies from "../../hooks/companies/useCompanies.js";
import { BASE_URL } from "../../utils/Constants.js";
import {
  getClientsExcel,
  getClientsPdf,
} from "../../services/companies/companies.routes.js";
import { CompaniesTable } from "./components/companiesTable.jsx";

const COMPANIE_TAB = "companies";
const COMPETING_TAB = "competing";

const CompaniesPage = () => {
  const { downloadFile, nextVisit, search, status } = useCompanies();

  const navegacionActive = (tabActive) => {
    switch (tabActive) {
      case COMPANIE_TAB:
        return COMPANIE_TAB;
      case COMPETING_TAB:
        return COMPETING_TAB;
      default:
        return COMPANIE_TAB;
    }
  };

  const [activeTab, setActiveTab] = useState(
    navegacionActive(sessionStorage.getItem("activeTab")),
  );
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExportCompetingModalOpen, setIsExportCompetingModalOpen] =
    useState(false);
  useState(false);

  const handleDownloadExcel1 = () => {
    const url = `${BASE_URL}/${getClientsExcel}?competence=false${search ? `&search=${search}` : ""}${nextVisit ? `&nextvisit=${nextVisit}` : ""}${status ? `&status=${status}` : ""}`;
    downloadFile(url, `Empresas.xlsx`);
  };

  const handleDownloadPdf1 = () => {
    const url = `${BASE_URL}/${getClientsPdf}?competence=false${search ? `&search=${search}` : ""}${nextVisit ? `&nextvisit=${nextVisit}` : ""}${status ? `&status=${status}` : ""}`;

    downloadFile(url, `Empresas.pdf`);
  };
  const handleDownloadExcel2 = () => {
    const url = `${BASE_URL}/${getClientsExcel}?competence=true${search ? `&search=${search}` : ""}${nextVisit ? `&nextvisit=${nextVisit}` : ""}${status ? `&status=${status}` : ""}`;
    downloadFile(url, `Empresas competencia.xlsx`);
  };

  const handleDownloadPdf2 = () => {
    const url = `${BASE_URL}/${getClientsPdf}?competence=true${search ? `&search=${search}` : ""}${nextVisit ? `&nextvisit=${nextVisit}` : ""}${status ? `&status=${status}` : ""}`;

    downloadFile(url, `Empresas competencia.pdf`);
  };

  const openExportModal = () => {
    setIsExportModalOpen(true);
  };
  const openExportCompetingModal = () => {
    setIsExportCompetingModalOpen(true);
  };

  const closeModal = () => {
    setIsExportModalOpen(false);
    setIsExportCompetingModalOpen(false);
  };

  const handleConfirmCancel = () => {
    closeModal();
  };
  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
    /*  if (activeTab === COMPETING_TAB) {
      setStatus("");
      setNextVisit(null);
      setCompetence(true);
    } else {
      setCompetence(false);
    } */
  }, [activeTab]);

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
            Empresas
          </h1>
        </div>

        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(COMPANIE_TAB)}
              className={`w-40 cursor-pointer rounded-t-lg ${activeTab === COMPANIE_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Listado
            </h2>
            <h2
              onClick={() => setActiveTab(COMPETING_TAB)}
              className={`${activeTab === COMPETING_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} w-40 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Competencia
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            {activeTab === COMPANIE_TAB && (
              <div className="flex gap-[.6rem]">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                  onClick={() => openExportModal()}
                />
                <Link to={"agregar-empresa"}>
                  <Button text="Nueva Empresa" icon={PlusIcon} />
                </Link>
                <Link to={"/inicio/empresas/agregar-ruta"}>
                  <Button text="Nueva Ruta" color={"save"} icon={PlusIcon} />
                </Link>
              </div>
            )}
            {activeTab === COMPETING_TAB && (
              <div className="flex gap-[.6rem]">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                  onClick={() => openExportCompetingModal()}
                />
                <Link to={"agregar-empresa"}>
                  <Button text="Nueva Empresa" icon={PlusIcon} />
                </Link>
              </div>
            )}
          </div>
        </div>
        {activeTab === COMPANIE_TAB && <CompaniesTable isCompeting={false} />}
        {activeTab === COMPETING_TAB && <CompaniesTable isCompeting={true} />}
      </div>

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
          <Button
            width="min-w-[14rem]"
            text="Descargar archivo Excel"
            icon={DownloadIcon}
            color={"cancel"}
            shadow="shadow-blur"
            iconPosition={"left"}
            onClick={handleDownloadExcel1}
          />

          <Button
            width="min-w-[14rem]"
            text="Descargar archivo PDF"
            icon={DownloadIcon}
            color={"cancel"}
            shadow="shadow-blur"
            iconPosition={"left"}
            onClick={handleDownloadPdf1}
          />
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={isExportCompetingModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={handleConfirmCancel}
      >
        Elige el formato en el que desea descargar el contenido de la lista:
        <div className="mt-4 flex flex-col space-y-4">
          <Button
            width="min-w-[14rem]"
            text="Descargar archivo Excel"
            icon={DownloadIcon}
            color={"cancel"}
            shadow="shadow-blur"
            iconPosition={"left"}
            onClick={handleDownloadExcel2}
          />

          <Button
            width="min-w-[14rem]"
            text="Descargar archivo PDF"
            icon={DownloadIcon}
            color={"cancel"}
            shadow="shadow-blur"
            iconPosition={"left"}
            onClick={handleDownloadPdf2}
          />
        </div>
      </ReusableModal>
    </div>
  );
};

export default CompaniesPage;
