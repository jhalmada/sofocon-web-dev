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

const busquedas = [
  { name: "Busqueda 1", id: 1 },
  { name: "Busqueda 2", id: 2 },
  { name: "Busqueda 3", id: 3 },
  { name: "Busqueda 4", id: 4 },
];

const AddProductPage = () => {
  //estados
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSaveConfirmationModalOpen, setSaveConfirmationModalOpen] =
    useState(false);
  const [FileAccept, setFileAccept] = useState(false);

  //Hooks
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const { postAddProducts } = useAddProducts();

  const { id } = useParams();

  //Funciones

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

  const onSubmit = async (data) => {
    const { list } = data;
    const formData = new FormData();
    formData.append("category", id);
    formData.append("subProduct", data.subProduct);
    formData.append("unit", data.unit);
    formData.append("stock", data.stock);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("color", data.color);
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

  return (
    <div className="flex min-h-[calc(100vh-4.375rem)] flex-col justify-between bg-gray">
      <div className="flex flex-grow flex-col px-6 pt-6">
        <div className="w-[4rem]">
          <Link to="/inicio/personal" className="text-sm font-medium leading-4">
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
              className={`w-40 cursor-pointer rounded-t-lg bg-white p-4 text-center text-md font-medium leading-6 shadow-t`}
            >
              Nuevo Producto
            </h2>
          </div>
        </div>

        <div className="rounded-tr-lg bg-white px-7 pb-3 pt-7 shadow-t">
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
              {...register("description", {
                required: {
                  value: true,
                  message: "Campo obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "la descripcion no puede exceder los 50 caracteres.",
                },
                minLength: {
                  value: 3,
                  message:
                    "la descripcion debe contener al menos 3 caracteres.",
                },
              })}
              msjError={errors.description ? errors.description.message : ""}
            />
            <div className="flex gap-3">
              <Input
                placeholder="Escribir..."
                label="Subproducto"
                {...register("subProduct", {
                  required: {
                    value: true,
                    message: "Campo obligatorio",
                  },
                  maxLength: {
                    value: 50,
                    message: "el campo no puede exceder los 50 caracteres.",
                  },
                  minLength: {
                    value: 3,
                    message: "el campo debe contener al menos 3 caracteres.",
                  },
                })}
                msjError={errors.subProduct ? errors.subProduct.message : ""}
              />
              <Input
                placeholder="Escribir..."
                label="Color"
                {...register("color", {
                  required: {
                    value: true,
                    message: "Campo obligatorio",
                  },
                  maxLength: {
                    value: 50,
                    message: "el campo no puede exceder los 50 caracteres.",
                  },
                  minLength: {
                    value: 3,
                    message: "el campo debe contener al menos 3 caracteres.",
                  },
                })}
                msjError={errors.color ? errors.color.message : ""}
              />
              <Input
                placeholder="Kg"
                label="Unidad de Medida"
                {...register("unit", {
                  required: {
                    value: true,
                    message: "Campo obligatorio",
                  },
                  maxLength: {
                    value: 5,
                    message: "el campo no puede exceder los 5 caracteres.",
                  },
                  minLength: {
                    value: 1,
                    message: "el campo debe contener al menos 1 caracteres.",
                  },
                })}
                msjError={errors.unit ? errors.unit.message : ""}
              />
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
              array={busquedas}
              setValue={setValue}
              name={"list"}
            />

            <div className="mt-1 min-w-40 max-w-60">
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
                {...register("file", {
                  required: "Este campo es obligatorio",
                })}
                onChange={handleFileChange}
              />
              <label htmlFor="file" className="flex items-center gap-4">
                <div
                  className="flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-blue-400 p-1"
                  onClick={() => setFileName("")}
                >
                  {" "}
                  <img src={uploadIcon} alt="iconUploads" className="h-5 w-5" />
                  <p className="text-blue-400">Cargar imagen</p>
                </div>
                <p
                  className={`font-roboto text-xs ${errors?.file?.message ? "text-red_e" : "text-black"}`}
                >
                  {fileName.length > 0 && fileName}
                </p>
              </label>
              {errors.file && (
                <p className="font-roboto text-xs text-red_e">
                  {errors?.file?.message}
                </p>
              )}
            </div>
            <div className="left-0">
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
            El producto fue agregado Exitosamente.
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
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
