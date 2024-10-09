import Pagination from "../components/Pagination";
import RouteCompanieDetailsRow from "../components/RouteCompanieDetailsRow";
import FilterRightIcon from "../assets/icons/filter-right.svg";
import ChevronDownIcon from "../assets/icons/chevron-down.svg";
import deleteIcon from "../assets/icons/trash3.svg";

const AddCompanyRoutePage = ({
  setItemsPerPage,
  setPage,
  page,
  totalPage,
  itemsPerPage,
  arrayCompanies,
}) => {
  //estados

  //hooks

  //funciones
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  };

  return (
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
          {arrayCompanies.map((companie, index) => (
            <RouteCompanieDetailsRow
              key={index}
              name={companie.name}
              direction={companie.address}
              nextVisits={formatDate(companie.nextVisit)}
              state={companie.status}
              notes={"ver notas"}
              deleteIconSrc={deleteIcon}
              //onDeleteClick={() => openConfirmDeleteModal(companie.id)}
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
  );
};

export default AddCompanyRoutePage;
