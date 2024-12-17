import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserRow from "../components/UserRow.jsx";
import TableRole from "../components/tables/TableRole.jsx";
import Button from "../components/buttons/Button.jsx";
import ReusableModal from "../components/modals/ReusableModal.jsx";
import Pagination from "../components/Pagination.jsx";
import Input from "../components/inputs/Input.jsx";
import { Select, SelectItem } from "@nextui-org/select";
import { Checkbox } from "@nextui-org/react";
import SearchInput from "../components/inputs/SearchInput.jsx";
import PlusIcon from "../assets/icons/plus.svg";
import DownloadIcon from "../assets/icons/download.svg";
import useUsers from "../hooks/users/use.users.js";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import usePutUsers from "../hooks/users/usePutUsers.js";
import { useForm } from "react-hook-form";
import useRoles from "../hooks/roles/use.roles.js";
import useDeleteUsers from "../hooks/users/useDeleteUsers.js";
import { permisos } from "../utils/permisons";
import { BASE_URL } from "../utils/Constants.js";
import SellersPage from "./SellersPage.jsx";
import { getUsersExcel, getUsersPdf } from "../services/user/user.routes.js";
import BackButton from "../components/buttons/BackButton.jsx";
import FilterSelect from "../components/filters/FilterSelect.jsx";
import useUsersSellers from "../hooks/users/useUsersSellers.js";
import notFoundImg from "../assets/images/notFound.svg";
import SaveImg from "../assets/img/save.svg";
import deleteImg from "../assets/img/deleted.svg";
import { isMatch } from "lodash";
const USER_TAB = "users";
const SELLERS_TAB = "sellers";
const ROLES_TAB = "roles";
const UsersPage = () => {
  const { changedUser } = usePutUsers();
  const [userId, setUserId] = useState(null);
  const {
    usersResponse,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    role,
    search: searchUsers,
    itemsPerPage,
    setModified,
    setSearch,
    setIsActive,
    setRole,
    downloadFile,
  } = useUsers();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    setError,
    watch,
  } = useForm();
  const {
    userSellerResponse,
    setItemsPerPage: setItemsPerPageSellers,
    totalPage: totalPageSellers,
    total: totalSellers,
    setPage: setPageSellers,
    page: pageSellers,
    itemsPerPage: itemsPerPageSellers,
    search: searchSellers,
    setModified: setModifiedSellers,
    setIsActive: setIsActiveSellers,
    setSearch: setSearchSellers,
  } = useUsersSellers();
  const { RolesResponse } = useRoles();
  const { deleteUser } = useDeleteUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isExportSellersModalOpen, setIsExportSellersModalOpen] =
    useState(false);
  const [isConfirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [checkSelected, setCheckSelected] = useState("existente");
  const roleOptions = RolesResponse?.map((role) => role.name) || [];
  const [dataEdit, setDataEdit] = useState(null);

  const handleDownloadExcel1 = () => {
    const url = `${BASE_URL}/${getUsersExcel}?isSeller=false${searchUsers ? `&search=${searchUsers}` : ""}${role ? `&role=${role}` : ""}`;
    downloadFile(url, `Usuarios.xlsx`);
  };

  const handleDownloadPdf1 = () => {
    const url = `${BASE_URL}/${getUsersPdf}?isSeller=false${searchUsers ? `&search=${searchUsers}` : ""}${role ? `&role=${role}` : ""}`;

    downloadFile(url, `Usuarios.pdf`);
  };
  const handleDownloadExcel2 = () => {
    const url = `${BASE_URL}/${getUsersExcel}?isSeller=true${searchUsers ? `&search=${searchUsers}` : ""}${role ? `&role=${role}` : ""}`;
    downloadFile(url, `Vendedores.xlsx`);
  };

  const handleDownloadPdf2 = () => {
    const url = `${BASE_URL}/${getUsersPdf}?isSeller=true${searchUsers ? `&search=${searchUsers}` : ""}${role ? `&role=${role}` : ""}`;

    downloadFile(url, `Vendedores.pdf`);
  };
  const openModal = (id) => {
    const userToEdit = usersResponse.find((user) => user.id === id);
    if (userToEdit) {
      setDataEdit(userToEdit);
      setValue("fullName", userToEdit.userInfo.fullName);
      setValue("email", userToEdit.email);
      setValue("ci", userToEdit.userInfo.ci);
      setValue("phone", userToEdit.userInfo.phone);
      setValue("role", userToEdit?.role?.id || "");
      setValue("state", userToEdit.isActive ? "Activo" : "Inactivo");
    }
    setIsModalOpen(true);
    setUserId(id);
  };
  const openExportModal = () => {
    setIsExportModalOpen(true);
  };
  const openExportSellersModal = () => {
    setIsExportSellersModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsExportModalOpen(false);
    setIsExportSellersModalOpen(false);
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
    setUserId(id);
    setConfirmDeleteModalOpen(true);
  };
  const closeConfirmDeleteModal = () => setConfirmDeleteModalOpen(false);
  const handleConfirmDelete = (setModified) => {
    deleteUser(userId, setModified);
    closeConfirmDeleteModal();
    setConfirmDelete(true);
  };
  const handleCancelClick = () => {
    const data = watch();
    const dataNew = {
      userInfo: { ci: data.ci, phone: data.phone, fullName: data.fullName },
      email: data.email,
      role: { id: data.role },
      isActive: data.state === "Activo" ? true : false,
    };
    const hasChanges = !isMatch(dataEdit, dataNew);

    if (hasChanges) {
      openConfirmCancelModal();
    } else {
      closeModal();
    }
  };
  const handleConfirmCancel = () => {
    closeConfirmCancelModal();
    closeModal();
  };
  const handleUserCreation = async (userData) => {
    try {
      const newUser = await changedUser(userData, userId, setModified);
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
    const { fullName, ci, phone, email, role, nameRole, permissions, state } =
      data;
    switch (checkSelected) {
      case "existente":
        handleUserCreation({
          email,
          userInfo: {
            fullName,
            ci,
            phone,
          },
          role: { id: role },
          isActive: state === "Activo" ? true : false,
        });
        break;
      default:
        handleUserCreation({
          email,
          fullName: {
            fullName,
            ci,
            phone,
          },
          isActive: state === "Activo" ? true : false,
          role: {
            name: nameRole,
            permissions: [...permissions, "USER_ADMIN"],
          },
        });
    }
    clearErrors();
    clearErrors("state");
    setError("state", { type: "manual", message: "Error message" });
  };
  const handleRoleFilterChange = (value) => {
    const rolselect = RolesResponse.filter((rol) => rol.name === value);
    if (rolselect.length > 0) {
      setRole(rolselect[0].id);
    } else {
      setRole(null);
    }
  };

  const navegacionActive = (tabActive) => {
    switch (tabActive) {
      case "users":
        return "users";
      case "sellers":
        return "sellers";
      case "roles":
        return "roles";

      default:
        return "users";
    }
  };

  const [activeTab, setActiveTab] = useState(
    navegacionActive(sessionStorage.getItem("activeTab")),
  );

  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
    if (activeTab === SELLERS_TAB || activeTab === ROLES_TAB) {
      setRole(null);
      setIsActive(null);
    }
    if (activeTab === USER_TAB) {
      setIsActiveSellers(null);
    }
  }, [activeTab]);

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between">
      <div className="flex flex-grow flex-col p-6">
        <div className="w-[4rem]">
          <BackButton route="/inicio" />
        </div>
        <div className="flex justify-between">
          <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
            Personal
          </h1>
        </div>
        <div className="flex items-center">
          <div className="flex">
            <h2
              onClick={() => setActiveTab(USER_TAB)}
              className={`min-w-40 cursor-pointer rounded-t-lg ${activeTab === USER_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Usuarios
            </h2>
            <h2
              onClick={() => setActiveTab(SELLERS_TAB)}
              className={`min-w-40 cursor-pointer rounded-t-lg ${activeTab === SELLERS_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Vendedores
            </h2>
            <h2
              onClick={() => setActiveTab(ROLES_TAB)}
              className={`${activeTab === ROLES_TAB ? "bg-white text-black_b" : "bg-gray text-black_m"} min-w-40 cursor-pointer rounded-t-lg p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Roles
            </h2>
          </div>
          <div className="flex h-8 w-full items-center justify-end gap-[0.875rem] rounded p-2">
            {activeTab === USER_TAB && (
              <div className="flex space-x-4">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                  onClick={() => openExportModal()}
                />
                <Link to={"agregar-usuario"}>
                  <Button text="Nuevo Usuario" icon={PlusIcon} />
                </Link>
              </div>
            )}
            {activeTab === SELLERS_TAB && (
              <div className="flex space-x-4">
                <Button
                  text="Exportar lista"
                  icon={DownloadIcon}
                  color={"cancel"}
                  onClick={() => openExportSellersModal()}
                />
                <Link to={"agregar-vendedor"}>
                  <Button text="Nuevo Vendedor" icon={PlusIcon} />
                </Link>
              </div>
            )}
            {activeTab === ROLES_TAB && (
              <Link to="agregar-rol">
                <Button text="Nuevo Rol" icon={PlusIcon} />
              </Link>
            )}
          </div>
        </div>
        {activeTab === USER_TAB && (
          <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
            <div>
              <div className="flex justify-end">
                {activeTab === USER_TAB && (
                  <SearchInput placeholder="Buscar..." onChange={setSearch} />
                )}
              </div>
              <table className="mt-2 w-full">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                      Nombre Completo
                    </th>
                    <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                      Email
                    </th>
                    <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                      <div className="flex flex-col items-center gap-2">
                        <FilterSelect
                          options={roleOptions}
                          placeholder="Rol"
                          onChange={handleRoleFilterChange}
                        />
                      </div>
                    </th>

                    <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                      Acción
                    </th>
                  </tr>
                </thead>
                {usersResponse.length === 0 ? (
                  <tr className="">
                    <td colSpan="5" className="p-4 text-center">
                      <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                        Tu búsqueda no arrojó resultados. !Prueba algo
                        distinto!. <br /> Puedes encontrar a los usuarios
                        creados aquí.
                      </p>
                      <img
                        src={notFoundImg}
                        alt="Tabla vacía"
                        className="mx-auto"
                      />
                    </td>
                  </tr>
                ) : (
                  <tbody>
                    {usersResponse.map((user, index) => (
                      <UserRow
                        state={user.isActive}
                        key={index}
                        fullName={`${user.userInfo.fullName} `}
                        email={user.email}
                        role={user?.role?.name}
                        editIconSrc={editIcon}
                        deleteIconSrc={deleteIcon}
                        onEditClick={() => {
                          openModal(user.id);
                        }}
                        onDeleteClick={() => openConfirmDeleteModal(user.id)}
                      />
                    ))}
                  </tbody>
                )}
              </table>
            </div>
            <div
              className={
                usersResponse.length === 0
                  ? "hidden"
                  : `flex justify-center p-6`
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
        )}
        {activeTab === SELLERS_TAB && (
          <SellersPage
            openConfirmDeleteModal={openConfirmDeleteModal}
            setSearchSellers={setSearchSellers}
            userSellerResponse={userSellerResponse}
            setItemsPerPage={setItemsPerPageSellers}
            totalPage={totalPageSellers}
            total={totalSellers}
            setPage={setPageSellers}
            page={pageSellers}
            itemsPerPage={itemsPerPageSellers}
            setModified={setModifiedSellers}
            setIsActive={setIsActiveSellers}
          />
        )}
        {activeTab === ROLES_TAB && <TableRole />}
      </div>
      <ReusableModal
        isOpen={isModalOpen}
        onClose={handleCancelClick}
        title="Editar Usuario"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={handleCancelClick}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={"Nombre Completo"}
            placeholder={"Escribe el nombre completo del usuario..."}
            {...register("fullName", {
              required: "Este campo es obligatorio",
            })}
            errorApi={errors.fullName}
            msjError={errors.fullName ? errors.fullName.message : ""}
          />
          <Input
            label={"CI"}
            placeholder={"123456789"}
            {...register("ci", {
              required: "Este campo es obligatorio",
            })}
            errorApi={errors.ci}
            msjError={errors.ci ? errors.ci.message : ""}
          />
          <Input
            label={"Teléfono de contacto"}
            placeholder={"123456789"}
            {...register("phone", {
              required: "Este campo es obligatorio",
            })}
            errorApi={errors.phone}
            msjError={errors.phone ? errors.phone.message : ""}
          />
          <Input
            placeholder={"Escribe tu correo"}
            label={"Dirección de correo"}
            {...register("email", {
              required: {
                value: true,
                message: "Campo obligatorio",
              },
              pattern: {
                value:
                  /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                message: "Formato de email incorrecto",
              },
            })}
            errorApi={errors.email}
            msjError={errors.email ? errors.email.message : ""}
          />
          <div>
            <label htmlFor="selectState">Estado</label>
            <Select
              className="rounded-lg border"
              id="selectState"
              {...register("state", {
                required: "Debes seleccionar un estado",
              })}
              onSelectionChange={(value) => {
                setValue("state", value);
              }}
            >
              <SelectItem key={"Activo"}>Activo</SelectItem>
              <SelectItem key={"Inactivo"}>Inactivo</SelectItem>
            </Select>
          </div>
          <div className="">
            <Checkbox
              defaultSelected={checkSelected === "existente"}
              isSelected={checkSelected === "existente"}
              onClick={() => setCheckSelected("existente")}
              radius="full"
              className="mt-2 font-light"
              size="sm"
            >
              Asignar rol existente
            </Checkbox>
            <Select
              className="rounded-lg border"
              isDisabled={checkSelected === "nuevo"}
              {...register("role", {
                required:
                  checkSelected === "existente"
                    ? "Debes seleccionar un rol"
                    : false,
              })}
              onSelectionChange={(value) => setValue("role", value)}
            >
              {RolesResponse &&
                RolesResponse.map((rol) => (
                  <SelectItem key={rol.id}>{rol.name}</SelectItem>
                ))}
            </Select>
            <Checkbox
              radius="full"
              isSelected={checkSelected === "nuevo"}
              onClick={() => setCheckSelected("nuevo")}
              className="mt-2 font-light"
              size="sm"
            >
              Asignar nuevo rol
            </Checkbox>
            <Input
              disabled={checkSelected === "existente"}
              placeholder={"Escribe el nombre del rol..."}
              {...register("nameRole", {
                required:
                  checkSelected === "nuevo"
                    ? "Debes ingresar el nombre del rol"
                    : false,
              })}
              errorApi={errors.nameRole}
              msjError={errors.nameRole ? errors.nameRole.message : ""}
            />
            <Select
              isDisabled={checkSelected === "existente"}
              placeholder="Permisos"
              selectionMode="multiple"
              className="max-w rounded-lg border font-roboto font-medium"
              {...register("permissions", {
                required:
                  checkSelected === "nuevo" ? "Debes asignar permisos" : false,
              })}
              onSelectionChange={(values) => setValue("permissions", values)}
            >
              {permisos.map((permiso) => (
                <SelectItem key={permiso.key}>{permiso.label}</SelectItem>
              ))}
            </Select>
            {errors.permissions && errors.permissions.message ? (
              <span className="font-roboto text-xs text-red_e">
                {errors.permissions.message}
              </span>
            ) : (
              " "
            )}
          </div>
        </form>
      </ReusableModal>
      <ReusableModal
        isOpen={isExportModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["back", "accept"]}
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
        isOpen={isExportSellersModalOpen}
        onClose={closeModal}
        title="Exportar lista"
        variant="confirmation"
        buttons={["back", "accept"]}
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
        <div className="flex h-[14rem] flex-col items-center justify-center">
          <img src={SaveImg} alt="save" />
          <p className="font-roboto text-sm font-light text-black">
            Los cambios fueron guardados correctamente.
          </p>
        </div>
      </ReusableModal>
      <ReusableModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={closeConfirmDeleteModal}
        title="Eliminar usuario"
        variant="confirmation"
        buttons={["back", "accept"]}
        onAccept={() => handleConfirmDelete(setModified)}
      >
        Este usuario será eliminado de forma permanente. ¿Desea continuar?
      </ReusableModal>
      {/*modal para elementos eliminados*/}
      <ReusableModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Usuario eliminado"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setConfirmDelete(false)}
      >
        <div className="flex h-[14rem] flex-col items-center justify-center">
          <img src={deleteImg} alt="delete" />
          <p className="font-roboto text-sm font-light text-black">
            El usuario fue eliminado correctamente.
          </p>
        </div>
      </ReusableModal>
    </div>
  );
};

export default UsersPage;
