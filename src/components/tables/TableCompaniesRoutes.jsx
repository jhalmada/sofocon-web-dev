import CompanieRowinRoute from "../CompanieRowinRoutes";
import Pagination from "../Pagination";
import pageLostImg from "../../assets/images/pageLost.svg";

const TableCompaniesRoutes = ({
  companiesResponse2,
  formatDate,
  setItemsPerPage,
  totalPage,
  page,
  itemsPerPage,
  total,
  setPage,
}) => {
  return (
    <div>
      <div>
        {" "}
        <table className="mt-2 w-full p-4">
          <thead>
            <tr>
              <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                Nombre
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Dirección
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Departamento
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Barrio
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Proxima Visita
              </th>
              <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                Estado
              </th>
            </tr>
          </thead>
          {companiesResponse2.length === 0 ? (
            <tr>
              <td colSpan="8" className="p-4 text-center">
                <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                  Ningún elemento coincide con tu búsqueda, inténtalo de nuevo.{" "}
                  <br /> Puedes encontrar a las empresas creadas aquí.
                </p>
                <img src={pageLostImg} alt="Tabla vacía" className="mx-auto" />
              </td>
            </tr>
          ) : (
            <tbody>
              {companiesResponse2.map((companie, index) => (
                <>
                  <CompanieRowinRoute
                    key={index}
                    id={companie.id}
                    name={companie.name}
                    direction={companie.address}
                    departament={companie.department}
                    neighborhood={companie.neighborhood}
                    sellers={"Vendedores"}
                    nextVisits={
                      companie.nextVisit
                        ? formatDate(companie.nextVisit)
                        : "Sin fecha"
                    }
                    state={companie.status}
                  />
                </>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div
        className={
          companiesResponse2.length === 0 ? "hidden" : `flex justify-center p-6`
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
  );
};

export default TableCompaniesRoutes;
