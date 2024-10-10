import React from "react";
import SellerRow from "../components/SellerRow";
import Pagination from "../components/Pagination";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import useUsersSellers from "../hooks/users/useUsersSellers";

const SellersPage = () => {
  //estados
  //hooks
  const {
    userSellerResponse,
    setItemsPerPage,
    totalPage,
    setPage,
    page,
    itemsPerPage,
  } = useUsersSellers();
  //funciones
  console.log(userSellerResponse.result);
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
              state={"Activo"}
              info={"Ver más"}
              editIconSrc={editIcon}
              deleteIconSrc={deleteIcon}
              //   onEditClick={() => {
              //     openModal(user.id);
              //   }}
              //   onDeleteClick={() => openConfirmDeleteModal(user.id)}
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
  );
};

export default SellersPage;
