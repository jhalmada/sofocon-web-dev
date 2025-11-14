/* eslint-disable react/prop-types */
import { Select, SelectItem } from "@nextui-org/select";
import Pagination from "../../../components/Pagination";
import useCompanies from "../../../hooks/companies/useCompanies";
import { Button, Chip, DateRangePicker, Input } from "@nextui-org/react";
import moment from "moment";
import CompanieRow from "../../../components/CompanieRow";

import pageLostImg from "../../../assets/images/pageLost.svg";
import { parseDate } from "@internationalized/date";
import FilterSelect from "../../../components/filters/FilterSelect";
import { useEffect } from "react";

const stateOptions = ["Frecuente", "Potencial", "De baja"];

export const CompaniesTable = ({ isCompeting, route, companyModified }) => {
  const {
    companiesResponse,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    setStatus,
    page,
    itemsPerPage,
    setNextVisit,
    setSearch: setSearchCompanies,
    setSearchEndDate,
    setSearchStartDate,
    searchStartDate,
    searchEndDate,
    getAllCompanies,
  } = useCompanies({ competence: isCompeting, route: route });

  const handleVisitFilterChange = (e) => {
    console.log(e);
    setNextVisit(e.target.value);
    setPage(0);
  };

  const setSearchDate = (date) => {
    if (!date) {
      setSearchStartDate("");
      setSearchEndDate("");
      return;
    }
    console.log(
      date,
      moment(date.start).format("YYYY-MM-DD"),
      moment(date.end).format("YYYY-MM-DD"),
    );
    setSearchStartDate(
      moment({
        day: date.start.day,
        month: date.start.month - 1,
        year: date.start.year,
      }).toISOString(),
    );
    setSearchEndDate(
      moment({
        day: date.end.day,
        month: date.end.month - 1,
        year: date.end.year,
      }).toISOString(),
    );
  };

  const handleStateFilterChange = (value) => {
    switch (value) {
      case "Frecuente":
        setStatus("FRECUENT");
        setPage(0);
        break;
      case "Potencial":
        setStatus("POTENTIAL");
        setPage(0);
        break;
      case "De baja":
        setStatus("UNSUBSCRIBED");
        setPage(0);
        break;
      default:
        setStatus("");
        setPage(0);
        break;
    }
  };
  const updateClientList = () => {
    getAllCompanies();
    if (companyModified) companyModified();
  };

  useEffect(() => {
    getAllCompanies();
  }, [route, getAllCompanies]);
  return (
    <>
      <div className="flex flex-grow flex-col justify-between overflow-auto rounded-tr-lg bg-white p-5">
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="w-[30%]">
              <Input
                isClearable
                size="md"
                placeholder="Buscar por nombre, dirección, departamento o barrio"
                startContent={<i className="fa-solid fa-magnifying-glass"></i>}
                onChange={(e) => setSearchCompanies(e.target.value)}
                onClear={() => setSearchCompanies("")}
              />
            </div>

            <div className="flex w-[50%] items-center justify-end gap-2">
              <div className="w-[50%]">
                <Select
                  size="sm"
                  label="Proxima visita"
                  onChange={handleVisitFilterChange}
                >
                  <SelectItem key="0" textValue="Vencidos">
                    <Chip color="danger">Vencidos</Chip>
                  </SelectItem>
                  <SelectItem key="1" textValue="A un mes de vencerse">
                    <Chip color="warning">A un mes de vencerse</Chip>
                  </SelectItem>
                  <SelectItem key="2" textValue="A dos meses de vencerse">
                    <Chip color="success">A dos meses de vencerse</Chip>
                  </SelectItem>
                  <SelectItem
                    key="3"
                    textValue="Más de dos meses para vencerse"
                  >
                    <Chip color="default">Más de dos meses para vencerse</Chip>
                  </SelectItem>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <DateRangePicker
                  showMonthAndYearPickers
                  size="sm"
                  label="Filtrar por fecha"
                  onChange={setSearchDate}
                  value={{
                    start: searchStartDate
                      ? parseDate(moment(searchStartDate).format("YYYY-MM-DD"))
                      : null,
                    end: searchEndDate
                      ? parseDate(moment(searchEndDate).format("YYYY-MM-DD"))
                      : null,
                  }}
                />
                <Button
                  size="sm"
                  variant="light"
                  isIconOnly
                  radius="full"
                  isDisabled={!searchStartDate}
                  onClick={() => setSearchDate(null)}
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </Button>
              </div>
            </div>
          </div>

          <table className="mt-2 w-full">
            <thead>
              <tr>
                <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                  Cliente
                </th>
                {isCompeting && (
                  <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                    Empresa actual
                  </th>
                )}

                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Próxima visita
                </th>
                <th className="p-2 text-left text-md font-semibold leading-[1.125rem]">
                  <div className="flex flex-col items-center gap-2">
                    {!isCompeting ? (
                      <FilterSelect
                        options={stateOptions}
                        placeholder="Tipo"
                        onChange={handleStateFilterChange}
                      />
                    ) : (
                      "Tipo"
                    )}
                  </div>
                </th>
                <th className="p-2 text-center text-md font-semibold leading-[1.125rem]">
                  Acción
                </th>
              </tr>
            </thead>
            {companiesResponse.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4 text-center">
                  <p className="text-md font-semibold leading-[1.3rem] text-black_l">
                    Ningún elemento coincide con tu búsqueda, inténtalo de
                    nuevo. <br /> Puedes encontrar a las empresas creadas aquí.
                  </p>
                  <img
                    src={pageLostImg}
                    alt="Tabla vacía"
                    className="mx-auto"
                  />
                </td>
              </tr>
            ) : (
              <tbody>
                {companiesResponse.map((companie, index) => (
                  <>
                    <CompanieRow
                      isCompeting={isCompeting}
                      key={index}
                      companie={companie}
                      updateClientList={updateClientList}
                      route={route}
                    />
                  </>
                ))}
              </tbody>
            )}
          </table>
        </div>

        <div
          className={
            companiesResponse.length === 0
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
    </>
  );
};
