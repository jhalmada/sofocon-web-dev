import { useForm } from "react-hook-form";
import NextAutoComplete from "../components/autocomplete/NextAutocomplete";
import useUsersSellers from "../hooks/users/useUsersSellers";

const HomePage = () => {
  const { userSellerResponse, setSearch } = useUsersSellers();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};
  return (
    <div className="min-h-full bg-gray p-6">
      <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
        Inicio
      </h1>
      <div className="flex justify-between">
        <div className="h-[7.875rem] w-[15.44rem] bg-white"></div>
        <div className="h-[7.875rem] w-[15.44rem] bg-white"></div>
        <div className="h-[7.875rem] w-[15.44rem] bg-white"></div>
        <div className="h-[7.875rem] w-[15.44rem] bg-white"></div>
      </div>
      <div className="mt-10 h-[16rem] bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <NextAutoComplete
            array={userSellerResponse?.result || []}
            name={"vendedores"}
            label={"Agregar Vendedores"}
            setValue={setValue}
            onChange={setSearch}
          />
          <p>{errors.vendedores && errors.vendedores.message}</p>
          <button type="submit" className="mt-8">
            enviar
          </button>
        </form>
      </div>
    </div>
  );
};
export default HomePage;
