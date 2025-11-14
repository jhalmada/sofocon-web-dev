/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { useForm } from "react-hook-form";
import ReusableModal from "../../../components/modals/ReusableModal";
import { useEffect, useState } from "react";
import usePutCompany from "../../../hooks/companies/usePutCompanies";
import { MapHandler, PlaceAutocomplete } from "../../../hooks/Maps/funtionMaps";
import {
  AdvancedMarker,
  Map,
  Marker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

const coordenadasUruguay = {
  lat: -34.901,
  lng: -56.1698,
};
export const EditCompanyModal = ({
  company,
  isOpen,
  onClose,
  updateClientList,
}) => {
  const [modalMap, setModalMap] = useState(false);
  const [checkSelected, setCheckSelected] = useState("RUT");
  const [competence, setCompetenceEdit] = useState(false);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectManual, setSelectManual] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [direccion, setDireccion] = useState("");
  const { changedCompany } = usePutCompany();
  const { register, handleSubmit, setValue, reset, formState } = useForm();

  const handleCompanyCreation = async (companyData) => {
    try {
      const newCompany = await changedCompany(companyData, company.id);

      if (newCompany) {
        reset();
      } else {
        updateClientList();
        onClose();
      }
    } catch (error) {
      console.error("Error al crear la empresa:", error);
      onClose(true);
    }
  };
  const onSubmit = async (data) => {
    const {
      name,
      department,
      managerName,
      phone,
      status,
      address,
      neighborhood,
      competenceName,
    } = data;
    handleCompanyCreation({
      name,
      department,
      managerName,
      phone,
      status,
      address,
      neighborhood,
      rut: checkSelected === "RUT" ? data.rut : null,
      ci: checkSelected === "CI" ? data.ci : null,
      competenceName: competence ? competenceName : "",
      latitude: !selectManual
        ? selectedPlace?.geometry?.location.lat()
        : selectManual.lat,
      longitude: !selectManual
        ? selectedPlace?.geometry?.location.lng()
        : selectManual.lng,
    });
  };

  useEffect(() => {
    reset(company);
  }, [reset, company]);
  return (
    <>
      <Modal
        size="3xl"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="outside"
        placement="center"
      >
        <ModalContent>
          {() => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  Editar
                </ModalHeader>
                <ModalBody>
                  {" "}
                  <div>
                    <Input
                      isRequired
                      label={"Nombre de la empresa"}
                      placeholder={"Escribe el nombre del local..."}
                      {...register("name", {
                        required: "Este campo es requerido",
                      })}
                      errorApi={formState.errors.name}
                      errorMessage={
                        formState.errors.name
                          ? formState.errors.name.message
                          : ""
                      }
                    />
                  </div>
                  <Input
                    isRequired
                    type={"phone"}
                    label={"Contacto"}
                    placeholder={"Escribe el teléfono del contacto..."}
                    {...register("phone", {
                      minLength: {
                        value: 2,
                        message: "Debe ingresar minimo 2 caracteres.",
                      },
                      maxLength: {
                        value: 15,
                        message: "Ingrese solo los 15 digitos de su número.",
                      },
                    })}
                    errorApi={formState.errors.phone}
                    errorMessage={
                      formState.errors.phone
                        ? formState.errors.phone.message
                        : ""
                    }
                    validate={(value) => {
                      if (value.length < 2)
                        return "Debe ingresar minimo 2 caracteres.";
                      if (value.length > 15)
                        return "Ingrese solo los 15 digitos de su número";
                    }}
                  />
                  <Input
                    isRequired
                    label={"Departamento"}
                    placeholder={"Escribir..."}
                    {...register("department", {
                      required: "Este campo es requerido",
                      minLength: {
                        value: 2,
                        message:
                          "El nombre debe contener al menos 2 caracteres.",
                      },
                      maxLength: {
                        value: 50,
                        message:
                          "El nombre no puede exceder los 50 caracteres.",
                      },
                    })}
                    validate={(value) => {
                      if (value.length < 2)
                        return "El nombre debe contener al menos 2 caracteres.";
                      if (value.length > 50)
                        return "El nombre no puede exceder los 50 caracteres.";
                    }}
                    errorMessage={
                      formState.errors.department
                        ? formState.errors.department.message
                        : ""
                    }
                  />
                  <Input
                    isRequired
                    label={"Barrio"}
                    placeholder={"Escribir..."}
                    {...register("neighborhood", {
                      required: "Este campo es requerido",
                      minLength: {
                        value: 2,
                        message:
                          "El nombre debe contener al menos 2 caracteres.",
                      },
                      maxLength: {
                        value: 50,
                        message:
                          "El nombre no puede exceder los 50 caracteres.",
                      },
                    })}
                    validate={(value) => {
                      if (value.length < 2)
                        return "El nombre debe contener al menos 2 caracteres.";
                      if (value.length > 50)
                        return "El nombre no puede exceder los 50 caracteres.";
                    }}
                    errorMessage={
                      formState.errors.neighborhood
                        ? formState.errors.neighborhood.message
                        : ""
                    }
                  />
                  <div>
                    <Input
                      isRequired
                      label={"Dirección"}
                      placeholder={"Escribir..."}
                      {...register("address", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 2,
                          message:
                            "El nombre debe contener al menos 2 caracteres.",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "El nombre no puede exceder los 50 caracteres.",
                        },
                      })}
                      minLength={2}
                      maxLength={50}
                      errorApi={formState.errors.address}
                      errorMessage={
                        formState.errors.address
                          ? formState.errors.address.message
                          : ""
                      }
                    />
                    <div
                      onClick={() => setModalMap(true)}
                      className="mt-2 flex cursor-pointer items-center"
                    >
                      <i className="fa-solid fa-location-dot"></i>
                      <span className="text-xs leading-[.88rem] underline">
                        Marcar en el mapa
                      </span>
                    </div>
                  </div>
                  <Input
                    label={"Otros datos"}
                    placeholder={"Escribe..."}
                    {...register("managerName")}
                  />
                  <div className="mt-5 flex gap-[.63rem]">
                    <Checkbox
                      defaultSelected={checkSelected === "RUT"}
                      isSelected={checkSelected === "RUT"}
                      onClick={() => setCheckSelected("RUT")}
                      radius="full"
                      className="font-light"
                      size="sm"
                    >
                      Asignar R.U.T.:
                    </Checkbox>
                    <Checkbox
                      isSelected={checkSelected === "CI"}
                      onClick={() => setCheckSelected("CI")}
                      radius="full"
                      className="font-light"
                      size="sm"
                    >
                      Asignar CI:
                    </Checkbox>
                  </div>
                  {checkSelected === "RUT" ? (
                    <Input
                      type={"number"}
                      isSelected={checkSelected === "RUT"}
                      disabled={checkSelected !== "RUT"}
                      placeholder={"Escribe los caracteres del RUT..."}
                      {...register("rut", {
                        required:
                          checkSelected === "RUT" && "Este campo es requerido",
                        minLength: {
                          value: 2,
                          message: "Ingrese minimo 2 digitos.",
                        },
                      })}
                      errorApi={checkSelected === "RUT" && formState.errors.rut}
                      msjError={
                        checkSelected === "RUT" && formState.errors.rut
                          ? formState.errors.rut.message
                          : ""
                      }
                    />
                  ) : (
                    <Input
                      type={"number"}
                      disabled={checkSelected !== "CI"}
                      placeholder={"Escribe los caracteres del CI..."}
                      {...register("ci", {
                        required:
                          checkSelected === "CI" && "Este campo es requerido",
                        minLength: {
                          value: 2,
                          message: "Ingrese minimo 2 digitos.",
                        },
                      })}
                      errorApi={checkSelected === "CI" && formState.errors.ci}
                      msjError={
                        checkSelected === "CI" && formState.errors.ci
                          ? formState.errors.ci.message
                          : ""
                      }
                    />
                  )}
                  <Checkbox
                    defaultSelected={competence}
                    onClick={() => setCompetenceEdit(!competence)}
                    radius="full"
                    className="font-light"
                    size="sm"
                  >
                    Cliente de la competencia
                  </Checkbox>
                  {competence && (
                    <Input
                      disabled={!competence}
                      bg={!competence ? "bg-gray" : "bg-white"}
                      border={!competence ? "none" : "border"}
                      label={"Empresas actual"}
                      placeholder={"Escribe el nombre..."}
                      {...register("competenceName", {
                        required: competence && "Este campo es requerido",
                        minLength: {
                          value: 2,
                          message:
                            "El nombre debe contener al menos 2 caracteres.",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "El nombre no puede exceder los 50 caracteres.",
                        },
                      })}
                      errorApi={formState.errors.competenceName}
                      msjError={
                        formState.errors.competenceName
                          ? formState.errors.competenceName.message
                          : ""
                      }
                    />
                  )}
                  {!competence && (
                    <>
                      <Select
                        isRequired
                        label="Seleccionar tipo de cliente"
                        placeholder="Seleccionar estado"
                        {...register("status", {
                          required: "Este campo es requerido",
                        })}
                        onSelectionChange={(values) =>
                          setValue("status", values)
                        }
                      >
                        <SelectItem key={"FRECUENT"}>Frecuente</SelectItem>
                        <SelectItem key={"POTENTIAL"}>Potencial</SelectItem>
                        <SelectItem key={"UNSUBSCRIBED"}>De Baja</SelectItem>
                      </Select>
                      <p className="mt-1 font-roboto text-xs text-red_e">
                        {formState.errors.status
                          ? formState.errors.status.message
                          : ""}
                      </p>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    radius="full"
                    color="default"
                    variant="bordered"
                    onClick={onClose}
                  >
                    Cerrar
                  </Button>
                  <Button radius="full" color="primary" type="submit">
                    Guardar
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      {/**modal para el mapa */}
      <ReusableModal
        isOpen={modalMap}
        onClose={() => setModalMap(false)}
        title="Marcar ubicacion"
        variant="confirmation"
        buttons={["accept"]}
        onAccept={() => setModalMap(false)}
        width="w-[45.37rem]"
      >
        <div className="flex flex-col">
          <PlaceAutocomplete
            onPlaceSelect={setSelectedPlace}
            value={direccion}
            setSelectManual={setSelectManual}
          />

          <div>
            <Map
              style={{ height: "15rem" }}
              mapId={"8c732c82e4ec29d9"}
              defaultCenter={coordenadasUruguay}
              defaultZoom={5}
              gestureHandling={"greedy"}
              center={selectManual}
              disableDefaultUI={true}
            >
              <Marker
                ref={markerRef}
                draggable={true}
                position={selectManual}
                onDragEnd={(e) => {
                  setSelectManual({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  });
                }}
              />

              <AdvancedMarker
                className={`${!selectManual ? "visible" : "invisible"}`}
                ref={markerRef}
                position={null}
                draggable={true}
                onDragEnd={(e) =>
                  setSelectManual({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  })
                }
              />
            </Map>
            <MapHandler
              place={selectedPlace}
              marker={marker}
              setValue={setValue}
              setDireccion={setDireccion}
            />
          </div>
        </div>
      </ReusableModal>
    </>
  );
};
