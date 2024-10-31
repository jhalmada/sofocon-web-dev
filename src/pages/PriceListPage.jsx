import { useForm } from "react-hook-form";
import Pagination from "../components/Pagination";
import PriceListRow from "../components/PriceListRow";
import editIcon from "../assets/icons/pencil-square.svg";
import deleteIcon from "../assets/icons/trash3.svg";

const PriceListPage = ({
  priceListResponse,
  setItemsPerPage,
  page,
  totalPage,
  setPage,
  itemsPerPage,
  total,
}) => {
  //estados
  //hooks

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
                // onEditClick={() => {
                //   openModal(price.id);
                // }}
                // onDeleteClick={() => openConfirmDeleteModal(price.id)}
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
          itemPerPage={itemsPerPage}
          total={total}
        />
      </div>
      {/**modal para editar */}
    </div>
  );
};

export default PriceListPage;
