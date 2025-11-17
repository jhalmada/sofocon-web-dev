/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import puntosvertical from "../assets/icons/three-dots-vertical.svg";
import {
  Button,
  Tooltip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";

import moment from "moment";
import { ExtinguisherModal } from "../pages/clients/components/extinguisherModal";
import ReusableModal from "./modals/ReusableModal";
import useDeleteCompanies from "../hooks/companies/useDeleteCompanies";

import SaveImg from "../assets/img/save.svg";
import deleteImg from "../assets/img/deleted.svg";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import notesIcon from "../assets/icons/sticky-fill.svg";
import sellerIcons from "../assets/icons/sellerIcon.svg";
import listPriceIcon from "../assets/icons/listPriceIcon.svg";
import { EditCompanyModal } from "../pages/clients/components/editCompanyModal";
import NextAutoComplete from "./autocomplete/NextAutocomplete";
import { useForm } from "react-hook-form";
import useUsersSellers from "../hooks/users/useUsersSellers";
import useUserCompany from "../hooks/companies/useUsersCompany";

import { isMatch } from "lodash";
import usePutSellerRoute from "../hooks/sellerRoutes/usePutSellerRoutes";
import usePutCompany from "../hooks/companies/usePutCompanies";
const translateState = (state) => {
  switch (state) {
    case "POTENTIAL":
      return "Potencial";
    case "UNSUBSCRIBED":
      return "De baja";
    case "FRECUENT":
      return "Frecuente";
    case "COMPETENCE":
      return "Competencia";
    default:
      return state;
  }
};

const nextVisit = (extinguisher) => {
  if (extinguisher.length <= 0) return null;
  // Convertimos a fechas y buscamos la mínima
  const fechas = extinguisher.map((item) => new Date(item.nextVisit));
  const menorFecha = new Date(Math.min(...fechas));

  // Filtramos los que tengan esa fecha
  const coincidentes = extinguisher.filter(
    (item) => new Date(item.nextVisit).getTime() === menorFecha.getTime(),
  );

  // Si hay varios con la misma fecha, devolvemos uno solo
  return coincidentes[0].nextVisit;
};

const SellerList = ({ listUsers, setValue2, handleSubmit2, submit }) => {
  const { userSellerResponse, setSearch } = useUsersSellers();
  return (
    <form onSubmit={handleSubmit2(submit)}>
      <NextAutoComplete
        label={"Agregar vendedores"}
        label2={"Vendedores asignados"}
        array={
          userSellerResponse?.result?.map((seller) => ({
            id: seller.id,
            name: seller.userInfo.fullName,
          })) || []
        }
        array2={
          listUsers.map((seller) => ({
            id: seller.id,
            name: seller.userInfo.fullName,
          })) || []
        }
        name={"sellers"}
        setValue={setValue2}
        onChange={setSearch}
      />
    </form>
  );
};

const CompanieRow = ({ isCompeting, companie, updateClientList, route }) => {
  const navigate = useNavigate();

  const { addUsersCompany } = useUserCompany();
  const { deleteCompany } = useDeleteCompanies();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();

  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [listPriceModal, setListPriceModal] = useState(false);
  const [isSellersModalOpen, setIsSellersModalOpen] = useState(false);

  const [listUsers, setListUsers] = useState([]);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);

  const { changedSellerRoute } = usePutSellerRoute();
  const {
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    watch: watch2,
  } = useForm();
  const { changedCompany } = usePutCompany();
  const handleNote = (id) => {
    navigate(`/inicio/empresas/notas/${id}`);
  };
  const setColor = (date) => {
    if (!date) return "danger";

    if (moment(date).diff(moment(), "days") < 0) return "danger";
    if (
      moment(date).diff(moment(), "days") >= 0 &&
      moment(date).diff(moment(), "days") <= 30
    )
      return "warning";
    if (
      moment(date).diff(moment(), "days") > 30 &&
      moment(date).diff(moment(), "days") <= 60
    )
      return "success";

    return "default";
  };

  const handleConfirmDelete = () => {
    if (route) {
      const newArray = companie.clientInRoute.filter(
        (element) => element.id === route,
      );
      const newData = {
        ...companie,
        clientInRoute: [...newArray],
      };
      changedCompany(newData, companie.id, () => updateClientList());
    } else {
      deleteCompany(companie.id);
    }
    setIsDeleteModal(false);
    setConfirmDeleteModalOpen(true);
    updateClientList();
  };
  const onOpenPriceListModal = () => {
    setListPriceModal(true);
  };
  const submit = (data) => {
    const user = data.sellers?.map((seller) => ({ id: seller.id }));

    const datos = addUsersCompany({ user }, companie.id);
    if (datos) {
      setIsSellersModalOpen(false);
      setValue2("sellers");
    }

    setSaveConfirmationModalOpen(true);
  };
  const closeSaveConfirmationModal = () => {
    setSaveConfirmationModalOpen(false);
    updateClientList();

    setIsSellersModalOpen(false);
  };
  const closeConfirmCancelModal = () => {
    setConfirmCancelModalOpen(false);
    updateClientList();
  };
  const openConfirmCancelModal = () => setConfirmCancelModalOpen(true);
  const handleConfirmCancel = () => {
    setValue2("sellers");
    updateClientList();
  };
  const handleCancelSeller = () => {
    const data = watch2();
    const hasChanges = !isMatch(listUsers, data.sellers);
    if (hasChanges) {
      openConfirmCancelModal();
    } else {
      setIsSellersModalOpen(false);
    }
  };
  return (
    <>
      <tr className="border-b border-gray text-center">
        <td
          className="max-w-md py-4 text-start leading-[1.16rem]"
          title={companie?.name}
        >
          <div className="max-w-md">
            <div>
              <b>{companie?.name}</b>
            </div>
            <div className="text-xs" title="Dirección">
              {companie?.address}
              <div title="Departamento - Barrio">
                {companie?.department} - {companie?.neighborhood}
              </div>
            </div>
          </div>
        </td>
        {isCompeting && (
          <td className="max-w-md py-4 text-start leading-[1.16rem]">
            {companie?.competenceName}
          </td>
        )}
        <td className="text-center">
          <Tooltip content="Ver extintores">
            <Button
              size="sm"
              radius="full"
              color={setColor(nextVisit(companie?.extinguisher))}
              onClick={onOpen}
            >
              {nextVisit(companie?.extinguisher)
                ? moment(nextVisit(companie?.extinguisher)).format("DD/MM/YYYY")
                : "Sin fecha"}{" "}
            </Button>
          </Tooltip>
        </td>
        <td className="text-md font-semibold leading-[1.16rem]">
          {translateState(companie?.status)}
        </td>
        <td>
          <div className="flex justify-center gap-4">
            <img
              src={editIcon}
              alt="Edit icon"
              className="h-5 w-5 cursor-pointer"
              onClick={onOpenEdit}
            />
            <img
              src={deleteIcon}
              alt="Delete icon"
              className="h-5 w-5 cursor-pointer"
              onClick={() => setIsDeleteModal(true)}
            />
            <Dropdown>
              <DropdownTrigger>
                <img src={puntosvertical} alt="ss" className="cursor-pointer" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="notes"
                  onClick={() => handleNote(companie.id)}
                >
                  <div className="flex gap-3">
                    <img
                      src={notesIcon}
                      alt="notes icon"
                      className="h-5 w-5 cursor-pointer"
                    />
                    Notas
                  </div>
                </DropdownItem>
                {!isCompeting && !route && (
                  <DropdownItem
                    key="sellers"
                    onClick={() => {
                      setListUsers(companie.user);
                      setIsSellersModalOpen(true);
                    }}
                  >
                    <div className="flex gap-3">
                      <img
                        src={sellerIcons}
                        alt="seller icon"
                        className="h-5 w-5 cursor-pointer"
                      />
                      Vendedores
                    </div>
                  </DropdownItem>
                )}
                {!isCompeting && (
                  <DropdownItem
                    key="listPrice"
                    onClick={() => onOpenPriceListModal()}
                  >
                    <div className="flex gap-3">
                      <img
                        src={listPriceIcon}
                        alt="list price icon"
                        className="h-5 w-5 cursor-pointer"
                      />
                      Lista de precios
                    </div>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </td>
        {isOpen && (
          <ExtinguisherModal
            isOpen={isOpen}
            onClose={onOpenChange}
            company={companie}
          />
        )}
        {isOpenEdit && (
          <EditCompanyModal
            company={companie}
            isOpen={isOpenEdit}
            onClose={onOpenChangeEdit}
            updateClientList={updateClientList}
          />
        )}
      </tr>
      <ReusableModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        title="Eliminar Empresa"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(companie.id)}
      >
        Esta empresa será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
      {/*modal para elementos eliminados*/}
      <ReusableModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setConfirmDeleteModalOpen(false)}
        title="Empresa Eliminada"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setConfirmDeleteModalOpen(false)}
      >
        <div className="flex h-[14rem] flex-col items-center justify-center">
          <img src={deleteImg} alt="delete" />
          <p className="font-roboto text-sm font-light text-black">
            La empresa fue eliminada correctamente.
          </p>
        </div>
      </ReusableModal>
      {/**modal para las listas de precios */}
      {listPriceModal && (
        <ReusableModal
          isOpen={listPriceModal}
          onClose={() => setListPriceModal(false)}
          title="Listas de precios asignadas"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={() => setListPriceModal(false)}
        >
          <div className="space-y-4">
            {companie.list.length > 0
              ? companie.list.map((list, index) => (
                  <p
                    className="mt-0 border-b-2 border-gray text-base"
                    key={index}
                  >
                    {list.name}
                  </p>
                ))
              : "No hay listas de precios asignadas"}
          </div>
        </ReusableModal>
      )}
      {/**modal para las listas de precios */}

      {isSellersModalOpen && (
        <ReusableModal
          isOpen={isSellersModalOpen}
          onClose={handleCancelSeller}
          onSubmit={handleSubmit2(submit)}
          buttons={["cancel", "save"]}
          handleCancelClick={handleCancelSeller}
        >
          <SellerList
            listUsers={listUsers}
            setValue2={setValue2}
            handleSubmit2={handleSubmit2}
            submit={submit}
          />
        </ReusableModal>
      )}
      {isSaveConfirmationModalOpen && (
        <ReusableModal
          isOpen={isSaveConfirmationModalOpen}
          onClose={closeSaveConfirmationModal}
          title="Cambios guardados"
          variant="confirmation"
          buttons={["accept"]}
          onAccept={closeSaveConfirmationModal}
        >
          <div className="flex h-[14rem] flex-col items-center justify-center">
            <img src={SaveImg} alt="save" />
            <p className="font-roboto text-sm font-light text-black">
              Los cambios fueron guardados correctamente.
            </p>
          </div>
        </ReusableModal>
      )}
      {isConfirmCancelModalOpen && (
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
      )}
    </>
  );
};

export default CompanieRow;
