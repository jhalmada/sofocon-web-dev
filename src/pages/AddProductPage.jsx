import { Link, useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import Input from "../components/inputs/Input";
import uploadIcon from "../assets/icons/arrow-blue.svg";
import Button from "../components/buttons/Button";
import arrowRigthIcon from "../assets/icons/arrow-right.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAddProducts from "../hooks/products/useAddProducts";
import AutoCompleteArray from "../components/autocomplete/AutoCompleteArray";
import ReusableModal from "../components/modals/ReusableModal";
import { Select, SelectItem } from "@nextui-org/select";
import { MEDIDA, TYPE_PRODUCTS } from "../utils/Constants";
import useGetPriceList from "../hooks/priceList/useGetPriceList";
import { Checkbox } from "@nextui-org/react";

const AddProductPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [FileAccept, setFileAccept] = useState(false);
  const [isToRecharge, setIsToRecharge] = useState(false);
  const [modalValidationProduct, setModalValidationProduct] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { postAddProducts } = useAddProducts();
  const { priceListResponse } = useGetPriceList();

  const { id } = useParams();

  const validateInput = (array) => {
    const result = array.find((product) => product.value === "");
    return result ? false : true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        setFileAccept(true);
        e.target.value = "";
        return;
      }
      setFile(file);
      setFileName(file.name);
      setError("file", { message: "" });
    }
  };

  const deleteFile = () => {
    setFile(null);
    setFileName("");
    setValue("file", null);
  };

  const onSubmit = async (data) => {
    const { list } = data;
    const respuesta = validateInput(list);
    if (!respuesta) {
      setModalValidationProduct(true);
      return;
    }
    const formData = new FormData();
    formData.append("category", id);
    formData.append("type", data.type);
    formData.append("unit", data.unit);
    formData.append("stock", data.stock);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("amount", data.amount);
    formData.append("isToRecharge", isToRecharge.toString());
    if (file) {
      formData.append("file", file);
    }
    formData.append(
      "list",
      JSON.stringify(
        list.map((objt) => ({ list: objt.id, price: objt.value })),
      ),
    );
    const response = await postAddProducts(formData);
    if (response) {
      setSaveConfirmationModalOpen(true);
    }
  };

  const handleAccept = () => {
    setSaveConfirmationModalOpen(false);
    navigate("..");
  };

  const handleSelectionChange = (e, name) => {
    setValue(name, e);
    clearErrors(name);
  };

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col p-6">
        <div className="w-[4rem]">
          <Link to=".." className="text-sm font-medium leading-4">
            <div className="mb-4 flex items-center">
              <img
                src={ChevronLeftIcon}
                alt="arrow left"
                className="-ml-1 h-4 w-4"
              />
              Volver
            </div>
          </Link>
        </div>

        <h1 className="pb-6 text-xl font-medium leading-6 text-black_m">
          Inventario
        </h1>

        <div className="flex max-h-[57px] items-center justify-between">
          <div className="flex">
            <h2
              className={`min-w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Nuevo Producto
            </h2>
          </div>
        </div>

        <div className="rounded-tr-lg bg-white px-7 pb-3 pt-7">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder={"Escribir..."}
              label={"Nombre"}
              {...register("name", {
                required: {
                  value: true,
                  message: "Campo obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres.",
                },
                minLength: {
                  value: 3,
                  message: "El nombre debe contener al menos 3 caracteres.",
                },
              })}
              msjError={errors.name ? errors.name.message : ""}
            />
            <Input
              placeholder="Escribir..."
              label="Descripcion"
              type="text"
              {...register("description", {
                maxLength: {
                  value: 50,
                  message: "la descripcion no puede exceder los 50 caracteres.",
                },
                minLength: {
                  value: 2,
                  message:
                    "la descripcion debe contener al menos 2 caracteres.",
                },
              })}
              msjError={errors.description ? errors.description.message : ""}
            />
            <div className="flex w-full flex-wrap justify-between gap-2">
              <div className="w-[32%] min-w-[17.6875rem]">
                <label
                  className={`${errors.status ? "text-red_e" : "text-gray-700"} mt-[0.15rem] block text-sm font-medium`}
                >
                  Tipo:
                </label>
                <Select
                  placeholder="Seleccionar tipo"
                  className={`rounded-lg border ${errors.type ? "border-red_e text-red_e" : ""} `}
                  {...register("type")}
                  onChange={(e) =>
                    handleSelectionChange(e.target.value, "type")
                  }
                >
                  {TYPE_PRODUCTS.map((tipo) => (
                    <SelectItem key={tipo}>{tipo}</SelectItem>
                  ))}
                </Select>
                <p className="mt-1 font-roboto text-xs text-red_e">
                  {errors.type ? errors.type.message : ""}
                </p>
              </div>
              <div className="w-[32%] min-w-[17.6875rem]">
                <Input
                  type="number"
                  placeholder="Escribir..."
                  label="Capacidad"
                  {...register("amount", {
                    required: {
                      value: true,
                      message: "Campo obligatorio",
                    },
                    maxLength: {
                      value: 10,
                      message: "el campo no puede exceder los 10 caracteres.",
                    },
                    minLength: {
                      value: 1,
                      message: "el campo debe contener al menos 1 caracteres.",
                    },
                  })}
                  msjError={errors.amount ? errors.amount.message : ""}
                />
              </div>

              <div className="w-[32%] min-w-[17.6875rem]">
                <label
                  className={`${errors.unit ? "text-red_e" : "text-gray-700"} mt-[0.15rem] block text-sm`}
                >
                  Unidad de medida:
                </label>
                <Select
                  placeholder="Seleccionar tipo"
                  className={`rounded-lg border ${errors.unit ? "border-red_e text-red_e" : ""} `}
                  {...register("unit", { required: "Campo obligatorio" })}
                  onChange={(e) =>
                    handleSelectionChange(e.target.value, "unit")
                  }
                >
                  {MEDIDA.map((tipo) => (
                    <SelectItem key={tipo}>{tipo}</SelectItem>
                  ))}
                </Select>
                <p className="mt-1 font-roboto text-xs text-red_e">
                  {errors.unit ? errors.unit.message : ""}
                </p>
              </div>
            </div>

            <Input
              placeholder="1234"
              label="Stock"
              type="number"
              {...register("stock", {
                required: {
                  value: true,
                  message: "Campo obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "el campo no puede exceder los 50 caracteres.",
                },
                minLength: {
                  value: 1,
                  message: "el campo debe contener al menos 1 caracteres.",
                },
              })}
              msjError={errors.stock ? errors.stock.message : ""}
            />
            <AutoCompleteArray
              label={"Lista de precios"}
              array={priceListResponse.map((list) => ({
                id: list.id,
                name: list.name,
              }))}
              setValue={setValue}
              name={"list"}
              register={register}
            />

            <div className="mt-4 min-w-40 max-w-60">
              <p
                className={`font-roboto font-light ${errors?.file?.message ? "text-red_e" : "text-black"} mb-1 text-sm`}
              >
                Agregar imagen
              </p>
              <input
                className="hidden"
                id="file"
                type="file"
                accept=".png, .jpg, .jpeg"
                {...register("file")}
                onChange={handleFileChange}
                disabled={fileName.length > 0}
              />
              <label htmlFor="file" className="flex items-center gap-4">
                <div
                  className={`flex h-11 ${fileName.length === 0 && "cursor-pointer"} items-center gap-2 rounded-lg border border-blue-400 p-1`}
                >
                  {" "}
                  <img src={uploadIcon} alt="iconUploads" className="h-5 w-5" />
                  <p className="text-blue-400">{`${fileName.length > 0 ? "Imagen cargada" : "Cargar imagen"} `}</p>
                </div>
              </label>
              <p
                className={`font-roboto text-sm ${errors?.file?.message ? "text-red_e" : "text-black"} mt-1`}
              >
                {fileName.length > 0 && (
                  <>
                    {fileName}
                    {"  "}
                    <label
                      className="cursor-pointer"
                      onClick={() => deleteFile()}
                    >
                      X
                    </label>
                  </>
                )}
              </p>
              {errors.file && (
                <p className="font-roboto text-xs text-red_e">
                  {errors?.file?.message}
                </p>
              )}

              <Checkbox
                className="mt-3"
                onChange={() => setIsToRecharge(!isToRecharge)}
              >
                Producto de recarga
              </Checkbox>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                color="save"
                icon={arrowRigthIcon}
                text={"GUARDAR"}
                width="w-8.75rem"
              />
            </div>
          </form>
          <ReusableModal
            isOpen={isSaveConfirmationModalOpen}
            onClose={() => setSaveConfirmationModalOpen(false)}
            title="Producto Agregado"
            variant="confirmation"
            buttons={["accept"]}
            onAccept={() => handleAccept()}
          >
            El producto fue agregado exitosamente.
          </ReusableModal>
          {/*modal para los archivos */}
          <ReusableModal
            isOpen={FileAccept}
            onClose={() => setFileAccept(false)}
            title="Formato de archivo incorrecto"
            variant="confirmation"
            buttons={["accept"]}
            onAccept={() => setFileAccept(false)}
          >
            Solo se aceptan archivos PNG o JPG.
          </ReusableModal>
          <ReusableModal
            isOpen={modalValidationProduct}
            onClose={() => setModalValidationProduct(false)}
            title="Faltan Precios"
            variant="confirmation"
            buttons={["accept"]}
            onAccept={() => setModalValidationProduct(false)}
          >
            Porfavor ingresa el precio al producto en las listas seleccionadas.
          </ReusableModal>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
