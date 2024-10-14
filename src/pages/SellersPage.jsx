import React, { useState } from "react";
import SellerRow from "../components/SellerRow";
import Pagination from "../components/Pagination";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import useUsersSellers from "../hooks/users/useUsersSellers";
import { set, useForm } from "react-hook-form";
import { permisos } from "../utils/permisons";
import { Select, SelectItem } from "@nextui-org/select";
import { Checkbox } from "@nextui-org/react";
import ReusableModal from "../components/modals/ReusableModal";
import useRoles from "../hooks/roles/use.roles";
import Input from "../components/inputs/Input";
import { tr } from "framer-motion/client";
import useSellerRoutes from "../hooks/sellerRoutes/useSellerRoutes";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";

const SellersPage = ({ openConfirmDeleteModal }) => {
  //estados
  const [checkSelected, setCheckSelected] = useState("existente");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const options = ["Activo", "Inactivo"];
  //hooks
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    userSellerResponse,
    setItemsPerPage,
    totalPage,
    setPage,
    page,
    itemsPerPage,
  } = useUsersSellers();
  const { RolesResponse } = useRoles();

  const { sellerRoutesResponse, setSearch } = useSellerRoutes();
  //funciones
  const onSubmit = (data) => {
    console.log(data);
  };
  //funcion para editar
  const openModal = (id) => {
    const userToEdit = userSellerResponse?.result.find(
      (user) => user.id === id,
    );
    if (userToEdit) {
      setValue("phone", userToEdit.userInfo.phone);
      setValue("ci", userToEdit.userInfo.ci);
      setValue("fullName", userToEdit.userInfo.fullName);
      setValue("email", userToEdit.email);
      setValue("role", userToEdit?.role?.id || "");
      setValue("state", userToEdit.isActive ? "Activo" : "Inactivo");
    }
    setIsModalOpen(true);
    setUserId(id);
  };

  //funcion para transformar los Arrays
  const transformData = (array) => {
    return array.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  };
  return (
    <div className="overflow-auto rounded-tr-lg bg-white p-5 shadow-t">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Nombre Completo
            </th>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Contacto
            </th>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Ruta
            </th>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Estado
            </th>
            <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
              Mas info
            </th>
            <th className="p-2 text-md font-semibold leading-[1.125rem]">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {userSellerResponse?.result?.map((user, index) => (
            <SellerRow
              key={index}
              fullName={`${user.userInfo.fullName} `}
              email={user.email}
              route={"Ruta"}
              info={"Ver más"}
              editIconSrc={editIcon}
              deleteIconSrc={deleteIcon}
              onEditClick={() => {
                openModal(user.id);
              }}
              onDeleteClick={() => openConfirmDeleteModal(user.id)}
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
      {/**modal para editar */}
      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Usuario"
        onSubmit={handleSubmit(onSubmit)}
        buttons={["cancel", "save"]}
        handleCancelClick={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
            label={"Telefono"}
            placeholder={"Escribe tu numero telefónico."}
            {...register("phone", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[0-9]+$/, // Acepta solo números
                message: "Solo se permiten números",
              },
              minLength: {
                value: 15,
                message: "El número debe tener al menos 15 dígitos",
              },
              maxLength: {
                value: 15,
                message: "El número no puede tener más de 15 dígitos",
              },
            })}
            errorApi={errors.phone}
            msjError={errors.phone ? errors.phone.message : ""}
          />
          <Input
            label={"CI"}
            placeholder={"Escribe tu numero de CI."}
            {...register("ci", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[0-9]+$/, // Acepta solo números
                message: "Solo se permiten números",
              },
              minLength: {
                value: 8,
                message: "El número debe tener al menos 8 dígitos",
              },
              maxLength: {
                value: 8,
                message: "El número no puede tener más de 8 dígitos",
              },
            })}
            errorApi={errors.ci}
            msjError={errors.ci ? errors.ci.message : ""}
          />
          <div>
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
          </div>
          <div className="mt-2">
            <Select
              labelPlacement="outside"
              label="Estado"
              placeholder="Seleccione un estado"
              className="mt-2 rounded-lg border"
              {...register("state", {
                required:
                  "Este campo es obligatorio, por favor seleccione un rol",
              })}
              onSelectionChange={(value) => setValue("state", value)}
            >
              {options.map((option) => (
                <SelectItem key={option}>{option}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="relative">
            <NextAutoComplete
              label2={"Rutas Asignadas"}
              array={transformData(sellerRoutesResponse || []) || []}
              name={"route"}
              label={"Asignar Ruta"}
              setValue={setValue}
              onChange={setSearch}
            />
            <p>{errors.vendedores && errors.vendedores.message}</p>
          </div>
          <div className="mt-2">
            <Select
              labelPlacement="outside"
              label="Rol"
              className="mt-2 rounded-lg border"
              {...register("role", {
                required:
                  "Este campo es obligatorio, por favor seleccione un rol",
              })}
              onSelectionChange={(value) => setValue("role", value)}
            >
              {RolesResponse &&
                RolesResponse.map((rol) => (
                  <SelectItem key={rol.id}>{rol.name}</SelectItem>
                ))}
            </Select>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default SellersPage;
