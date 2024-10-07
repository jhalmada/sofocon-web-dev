import { Controller, useForm } from "react-hook-form";
import MultiAutocomplete from "../components/autocomplete/MultiAutocomplete";

const HomePage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      options: [],
    },
  });

  const onSubmit = (data) => {
    console.log(
      "Selected Options:",
      data.options.map((o) => o.label),
    );
  };

  const options = [
    { id: 1, label: "Vendedor 1wwwwwww" },
    { id: 2, label: "Vendedor 2" },
  ];

  return (
    <div className="min-h-full bg-gray p-6">
      <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">
        Inicio
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="options"
          control={control}
          rules={{
            validate: (value) =>
              value.length > 0 || "Debes seleccionar una opcion",
          }}
          render={({ field }) => (
            <div>
              <MultiAutocomplete
                errors={errors.options}
                placeholder="Selecciona una opción"
                options={options}
                value={field.value}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                onBlur={field.onBlur}
              />
              {errors.options && (
                <span className="font-roboto text-xs text-red_e">
                  {errors.options.message}
                </span>
              )}
            </div>
          )}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="flex justify-between">
        <div className="h-[7.875rem] w-[15.44rem] bg-white"></div>
        <div className="h-[7.875rem] w-[15.44rem] bg-white"></div>
        <div className="h-[7.875rem] w-[15.44rem] bg-white"></div>
        <div className="h-[7.875rem] w-[15.44rem] bg-white"></div>
      </div>
      <div className="mt-10 h-[16rem] bg-white"></div>
    </div>
  );
};

export default HomePage;
