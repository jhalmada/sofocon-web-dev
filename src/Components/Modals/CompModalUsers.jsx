import CompButtonCancel from "../Buttons/CompButtonCancel";
import CompButtonSave from "../Buttons/CompButtonSave";
import CompCheckbox from "../Checkboxs/CompCheckbox";
import CompInput from "../Inputs/CompInput";
import CompInputPass from "../Inputs/CompInputPass";
const CompModalUsers = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative max-h-screen w-[444px] max-w-[444px] overflow-auto rounded-lg bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-7 top-8 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <img
            src="/assets/icons/x-lg.svg"
            alt="Close icon"
            className="h-6 w-6"
          />
        </button>
        <h2 className="mb-8 text-xl font-semibold">Editar Usuario</h2>
        {
          <div className="space-y-6">
            <CompInput
              label={"Nombre completo"}
              placeholder={"Escribe el nombre completo del usuario..."}
            />

            <CompInput
              label={"Correo electrónico"}
              placeholder={"Escribe el email del usuario..."}
            />

            <div>
              <CompInputPass
                label={"Contraseña"}
                placeholder={"Escribe la contraseña..."}
              />
              <p className="-mt-6 text-xs leading-[14px] text-black_b">
                *Este campo debe contener entre 8 y 20 caracteres alfanuméricos{" "}
              </p>
            </div>

            <CompCheckbox text={"Asignar rol existente"} />
            <div className="bg-gray flex items-center justify-between rounded-md px-2 py-1">
              <select className="w-full bg-transparent font-semibold outline-none">
                <option selected disabled>
                  Rol
                </option>

                <option value="Admin">Admin/Gerente</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Taller">Taller</option>
                <option value="Administracion">Administración</option>
              </select>
            </div>
            <CompCheckbox text={"Asignar nuevo rol"} />
            <CompInput placeholder={"Escribe el nombre del rol..."} />
          </div>
        }

        <div className="mt-10 flex justify-between">
          <CompButtonCancel text={"Cancelar"} />
          <CompButtonSave text={"GUARDAR"} />
        </div>
      </div>
    </div>
  );
};

export default CompModalUsers;
