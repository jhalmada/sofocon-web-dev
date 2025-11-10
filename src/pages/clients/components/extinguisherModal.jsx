/* eslint-disable react/prop-types */
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { AddOrEditExtinguisherModal } from "./addOrEditExtinguisher";
import useGetAllExtinguisher from "../../../hooks/extinguisher/useGetAllExtinguisher";

export const ExtinguisherModal = ({ company, isOpen, onClose }) => {
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const { extinguisherResponse, isLoading, getAllExtinguisher } =
    useGetAllExtinguisher();
  const [newExtinguisher, setNewExtinguisher] = useState({});

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
  const openAddModal = (extinguisher) => {
    setNewExtinguisher({ ...extinguisher, client: company });
    onOpenAdd();
  };
  const closeModal = () => {
    onCloseAdd();
  };

  useEffect(() => {
    getAllExtinguisher({ client: company.id });
  }, [company, getAllExtinguisher]);
  return (
    <>
      {" "}
      <Modal isOpen={isOpen} onOpenChange={onClose} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Extinguidores de {company.name}
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-end">
                  <Button
                    startContent={<i className="fa-solid fa-plus" />}
                    onClick={() => openAddModal({})}
                    radius="full"
                    color="primary"
                  >
                    Agregar nuevo
                  </Button>
                </div>

                <Table
                  isStriped
                  classNames={{
                    base: "max-h-[520px]",
                  }}
                >
                  <TableHeader>
                    <TableColumn key="name">Nombre</TableColumn>
                    <TableColumn key="code">Código</TableColumn>
                    <TableColumn key="serial">Serial</TableColumn>
                    <TableColumn key="unit fabric">UNIT Fabrica</TableColumn>
                    <TableColumn key="unict actual">UNIT actual</TableColumn>
                    <TableColumn key="unit anterior">UNIT anterior</TableColumn>
                    <TableColumn key="ultima visita">Ultima visita</TableColumn>
                    <TableColumn key="proxima visita">
                      Proxima visita
                    </TableColumn>
                    <TableColumn></TableColumn>
                  </TableHeader>
                  <TableBody
                    isLoading={isLoading}
                    items={extinguisherResponse}
                    emptyContent={"No hay extinguidores"}
                    loadingContent={<Spinner label="Cargando..." />}
                  >
                    {(item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>{item.serial}</TableCell>
                        <TableCell>{item.fabricUNIT}</TableCell>
                        <TableCell>{item.numberUNIT}</TableCell>
                        <TableCell>{item.newUNIT}</TableCell>

                        <TableCell>
                          {moment(item.latestVisit).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          <Chip color={setColor(item.nextVisit)}>
                            {moment(item.nextVisit).format("DD/MM/YYYY")}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <div className="gap flex">
                            <Button
                              isIconOnly
                              variant="light"
                              onClick={() => openAddModal(item)}
                            >
                              <i className="fa-regular fa-pen-to-square"></i>
                            </Button>
                            <Button isIconOnly variant="light" color="danger">
                              <i className="fa-regular fa-trash-can"></i>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="full"
                  color="default"
                  variant="bordered"
                  onPress={onClose}
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <AddOrEditExtinguisherModal
        newExtinguisher={newExtinguisher}
        isOpen={isOpenAdd}
        onClose={closeModal}
      />
    </>
  );
};
