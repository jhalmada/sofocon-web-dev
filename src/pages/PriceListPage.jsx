import { Controller, useForm } from "react-hook-form";
import Pagination from "../components/Pagination";
import PriceListRow from "../components/PriceListRow";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import useDeletePriceList from "../hooks/priceList/useDeletePriceList";
import ReusableModal from "../components/modals/ReusableModal";
import { useEffect, useState } from "react";
import deleteImg from "../assets/img/deleted.png";
import Input from "../components/inputs/Input";
import { Checkbox } from "@nextui-org/react";
import usePutPriceList from "../hooks/priceList/usePutPriceList";
import SaveImg from "../assets/img/save.png";
import listPriceIcon from "../assets/icons/listPriceIcon.svg";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";

import { isMatch } from "lodash";
import useCompanies from "../hooks/companies/useCompanies";

const PriceListPage = ({
  priceListResponse,
  setItemsPerPage,
  page,
  totalPage,
  setPage,
  itemsPerPage,
  total,
  setModified,
  getAllPriceList,
}) => {
  const [deletemodal, setDeleteModal] = useState(false);
  const [clientsModal, setClientsModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [priceListId, setPriceListId] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [isDirect, setIsDirect] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] =
    useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [isAllCompanies, setIsAllCompanies] = useState(false);
  const {
    companiesResponse,
    setSearch: setSearchCompany,
    getAllCompanies,
  } = useCompanies({});
  const {
    control,
    setError,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const { deletePriceList } = useDeletePriceList();

  const { changedPriceList } = usePutPriceList();

  const handleDelete = (priceListId) => {
    setPriceListId(priceListId);
    setDeleteModal(true);
  };

  const acceptDelete = async () => {
    try {
      await deletePriceList(priceListId, setModified);
      setDeleteModal(false);
      setConfirmDelete(true);
    } catch (error) {
      console.error("Error al eliminar la lista: ", error);
    }
  };

  const handleEdit = (priceListId) => {
    const priceList = priceListResponse.find(
      (price) => price.id === priceListId,
    );
    if (priceList) {
      setDataEdit(priceList);
      setValue("name", priceList.name);
      setIsDirect(priceList.isDirect);
    }
    setPriceListId(priceListId);
    setEditModal(true);
  };

  const onOpenClientsModal = (priceListId) => {
    const priceList = priceListResponse.find(
      (price) => price.id === priceListId,
    );
    console.log(priceList);
    if (priceList) {
      setDataEdit(priceList);

      setValue("name", priceList.name);
      setValue("company", priceList.client);
      setIsAllCompanies(priceList.totalClients <= 0 ? true : false);
    }

    getAllCompanies();
    setPriceListId(priceListId);
    setClientsModal(true);
  };

  const onSubmit = async (data) => {
    const { name } = data;
    const PriceData = {
      name,
      isDirect,
    };
    await changedPriceList(PriceData, priceListId, setModified);

    getAllPriceList(page);
    setEditModal(false);
    setConfirmModal(true);
  };

  const cancelEdit = () => {
    const data = watch();
    const newData = { name: data.name, isDirect };

    const hasChanges = !isMatch(dataEdit, newData);
    if (hasChanges) {
      setIsConfirmCancelModalOpen(true);
    } else {
      setEditModal(false);
    }
  };

  const onSubmitClients = async (data) => {
    console.log(data);
    const { company } = data;
    await changedPriceList(
      { client: isAllCompanies ? null : company },
      priceListId,
      setModified,
    );
    getAllPriceList(page);
    setClientsModal(false);
    setConfirmModal(true);
  };
  useEffect(() => {
    getAllPriceList(0);
  }, [getAllPriceList]);

  return (
    <div className="flex h-full w-full flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
      <div className="flex justify-center">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                Nombre
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Empresas
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Productos
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {priceListResponse?.map((price, index) => (
              <PriceListRow
                key={index}
                name={price.name}
                totalClients={price.totalClients}
                totalProducts={price.totalProducts}
                editIconSrc={editIcon}
                deleteIconSrc={deleteIcon}
                listPriceIcon={listPriceIcon}
                id={price.id}
                onClientsClick={() => onOpenClientsModal(price.id)}
                onEditClick={() => {
                  handleEdit(price.id);
                }}
                onDeleteClick={() => handleDelete(price.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className={`flex justify-center p-6`}>
        <Pagination
          pageIndex={setItemsPerPage}
          currentPage={page}
          totalPages={totalPage}
          onPageChange={setPage}
          itemsPerPage={itemsPerPage}
          total={total}
        />
      </div>
      <ReusableModal
        isOpen={clientsModal}
        onClose={() => setClientsModal(false)}
        title="Agregar o quitar empresas"
        onSubmit={handleSubmit(onSubmitClients)}
        buttons={["cancel", "save"]}
        handleCancelClick={() => setClientsModal(false)}
      >
        <form onSubmit={handleSubmit(onSubmitClients)}>
          <Controller
            name="company"
            control={control}
            rules={{
              required: isAllCompanies
                ? false
                : "Debe seleccionar una empresa o todas",
            }}
            render={({ field }) => (
              <NextAutoComplete
                array={companiesResponse.map((company) => ({
                  id: company.id,
                  name: company.name,
                }))}
                label={"Empresas"}
                isDisabled={isAllCompanies}
                setValue={setValue}
                name={field.name}
                label2={"Empresas"}
                control={field}
                array2={watch("company").map((company) => ({
                  id: company.id,
                  name: company.name,
                }))}
                onChange={setSearchCompany}
                setErrors={setError}
                msjError={errors.company?.message}
              />
            )}
          />

          <Checkbox
            onChange={() => setIsAllCompanies(!isAllCompanies)}
            defaultSelected={isAllCompanies}
          >
            <p className="text-sm">Asignar a todas las empresas existente</p>
          </Checkbox>
        </form>
      </ReusableModal>
      {/** modal par eliminar */}
      <ReusableModal
        isOpen={deletemodal}
        onClose={() => setDeleteModal(false)}
        title="Eliminar Lista"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => acceptDelete()}
      >
        Esta lista será eliminada de forma permanente. ¿Desea continuar?
      </ReusableModal>
      {/** modal de confirmación de eliminacion */}
      <ReusableModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Item eliminado"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setConfirmDelete(false)}
      >
        <div className="flex h-[14rem] flex-col items-center justify-center">
          <img src={deleteImg} alt="delete" />
          <p className="font-roboto text-sm font-light text-black">
            El elemento fue eliminado correctamente.
          </p>
        </div>
      </ReusableModal>
      {/*modal para editar*/}
      <ReusableModal
        isOpen={editModal}
        onClose={() => cancelEdit()}
        title="Editar Categoria"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={() => cancelEdit()}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={"Nombre"}
            placeholder={"Escribir..."}
            {...register("name", {
              maxLength: {
                value: 50,
                message: "Este campo no debe exceder los 50 caracteres",
              },
              minLength: {
                value: 3,
                message: "Este campo debe tener al menos 3 caracteres",
              },
            })}
            errorApi={errors.name}
            msjError={errors.name ? errors.name.message : ""}
          />
          <Checkbox
            onChange={() => setIsDirect(!isDirect)}
            defaultSelected={isDirect}
          >
            <p className="text-sm">Lista de precios de venta directa</p>
          </Checkbox>
        </form>
      </ReusableModal>
      {/*modal para cambios guardados*/}
      <ReusableModal
        isOpen={confirmModal}
        onClose={() => setConfirmModal(false)}
        title="Cambios guardados"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setConfirmModal(false)}
      >
        <div className="flex h-[14rem] flex-col items-center justify-center">
          <img src={SaveImg} alt="save" />
          <p className="font-roboto text-sm font-light text-black">
            Los cambios fueron guardados correctamente.
          </p>
        </div>
      </ReusableModal>
      {/*modal para confirmar cancel*/}
      <ReusableModal
        isOpen={isConfirmCancelModalOpen}
        onClose={() => setIsConfirmCancelModalOpen(false)}
        title="Cambios sin guardar"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => {
          setIsConfirmCancelModalOpen(false);
          setEditModal(false);
        }}
      >
        Los cambios realizados no se guardarán. <br /> ¿Desea continuar?
      </ReusableModal>
    </div>
  );
};

export default PriceListPage;
