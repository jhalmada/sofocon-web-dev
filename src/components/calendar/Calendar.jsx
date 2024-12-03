import { Controller } from "react-hook-form";
import { I18nProvider } from "@react-aria/i18n";
import { DatePicker } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

const Calendar = ({
  control,
  errors,
  setErrorDataPicker = () => {},
  errorDataPicker = false,
  name,
  label = "",
  forward = true,
  isRequired = true,
}) => {
  const dateValue = today(getLocalTimeZone());
  const dateProps = forward ? { minValue: dateValue } : { maxValue: dateValue };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-light text-black">{label}</label>
      <I18nProvider locale="es-UR">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
              <DatePicker
                defaultValue={dateValue}
                granularity="day"
                {...dateProps}
                className={`${errors[name] ? "text-red_e" : ""} ${errors[name] ? "border-red_e" : ""} rounded-lg border`}
                {...field}
                label={""}
                placeholder="Seleccione una fecha"
                errorMessage={(value) => {
                  if (value.isInvalid) {
                    setErrorDataPicker(true);
                    return "";
                  } else {
                    setErrorDataPicker(false);
                    return "";
                  }
                }}
                locale="es-ES"
              />
            </div>
          )}
          rules={{
            required: isRequired
              ? {
                  value: true,
                  message: "La fecha es obligatoria",
                }
              : false,
          }}
        />
        <p className="font-roboto text-xs text-red_e">
          {errors[name] ? errors[name].message : ""}
        </p>
        <p className="font-roboto text-xs text-red_e">
          {errorDataPicker ? "La fecha expiró" : ""}
        </p>
      </I18nProvider>
    </div>
  );
};

export default Calendar;
