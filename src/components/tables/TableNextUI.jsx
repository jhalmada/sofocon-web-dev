import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import PaginationNextUI from "../pagination/paginationNextUI";

const TableNextUI = ({ array = [], totalPage, setPage, page }) => {
  return (
    <>
      <Table removeWrapper aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>T. Ventas</TableColumn>
          <TableColumn>Metricas</TableColumn>
        </TableHeader>
        <TableBody>
          {array?.result?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item?.userInfo?.fullName || "Sin nombre"}</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell className="cursor-pointer">ver mas</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationNextUI total={totalPage} setPage={setPage} page={page} />
    </>
  );
};

export default TableNextUI;
