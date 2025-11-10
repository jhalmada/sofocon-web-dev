/* eslint-disable react/prop-types */
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  DatePicker,
} from "@nextui-org/react";
import moment from "moment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useUpdateExtinguisher from "../../../hooks/extinguisher/useUpdateExtinguisher";

export const AddOrEditExtinguisherModal = ({
  newExtinguisher,
  isOpen,
  onClose,
}) => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { updateExtinguisher, isLoading } = useUpdateExtinguisher();
  const onSubmit = async (data) => {
    console.log(data);
    if (newExtinguisher.id) {
      await updateExtinguisher(newExtinguisher.id, data, (response) =>
        console.log(response),
      );
    }
    console.log(data);
    close();
  };
  const close = () => {
    onClose();
    reset();
  };
  useEffect(() => {
    if (newExtinguisher.id) reset(newExtinguisher);
    else
      reset({
        name: "",
        code: "",
        serial: "",
        fabricUNIT: "",
        numberUNIT: "",
      });
  }, [reset, newExtinguisher]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="xl">
      <ModalContent>
        {() => (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                {newExtinguisher.id ? "Editar" : "Agregar"}
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  size="sm"
                  name="name"
                  label="Nombre"
                  {...register("name", { required: true })}
                />
                <Input
                  isRequired
                  size="sm"
                  name="code"
                  label="Código"
                  {...register("code", { required: true })}
                />
                <Input
                  isRequired
                  size="sm"
                  name="serial"
                  label="Serial"
                  {...register("serial", { required: true })}
                />
                <div className="flex gap-2">
                  <Input
                    size="sm"
                    name="fabricUNIT"
                    label="UNIT fabrica"
                    {...register("fabricUNIT")}
                  />
                  <Input
                    size="sm"
                    name="numberUNIT"
                    label="UNIT actual"
                    {...register("numberUNIT")}
                  />
                </div>
                <div className="flex gap-2">
                  <DatePicker
                    label={"Ultima visita"}
                    defaultValue={today(
                      getLocalTimeZone(newExtinguisher?.latestVisit),
                    )}
                    {...register("latestVisit")}
                  />
                  <DatePicker
                    defaultValue={
                      newExtinguisher?.nextVisit
                        ? parseDate(
                            moment(newExtinguisher.nextVisit).format(
                              "YYYY-MM-DD",
                            ),
                          )
                        : today(getLocalTimeZone()).add({ months: 12 })
                    }
                    label={"Proxima visita"}
                    {...register("nextVisit")}
                    minValue={today(getLocalTimeZone())}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="full"
                  color="default"
                  variant="bordered"
                  onPress={close}
                >
                  Cancelar
                </Button>
                <Button
                  radius="full"
                  color="primary"
                  type="submit"
                  isDisabled={!formState.isValid}
                  isLoading={isLoading}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
