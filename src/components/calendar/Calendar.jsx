import React from "react";
import { Controller } from "react-hook-form";
import { I18nProvider } from "react-i18next";
import DatePicker from "some-datepicker-library";
import { today, getLocalTimeZone } from "utils";

const Calendar = ({
  control,
  errors,
  setErrorDataPicker,
  errorDataPicker,
  name,
  label = "",
}) => {
  const forward = true;
  const dateValue = today(getLocalTimeZone());
  const dateProps = forward ? { minValue: dateValue } : { maxValue: dateValue };
  return (
    <div className="flex flex-col">
      <label className="text-sm font-light text-black">{label}</label>
      <I18nProvider locale="es-ES">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
              <DatePicker
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
              />
            </div>
          )}
          rules={{
            required: {
              value: true,
              message: "La fecha es obligatoria",
            },
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
