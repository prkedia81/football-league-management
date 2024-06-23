import { cn } from "@/lib/utils";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "../DatePicker";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  errorMessage?: string;
  label: string;
  isRequired?: boolean;
  name: string;
}

const DatePickerField = ({
  errorMessage,
  label,
  isRequired = false,
  ...props
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="sm:grid sm:grid-cols-5 sm:gap-1 sm:items-start">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <div className="mt-1 flex-col gap-1 sm:mt-0 sm:col-span-4">
          <Controller
            name="date"
            control={control}
            defaultValue={null}
            rules={{ required: isRequired }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker onChange={onChange} value={value} />
            )}
          />
          {errors[props.name] && (
            <span className="block text-red-600 text-sm mt-0.5">
              {(errors[props.name]?.message as string) ||
                (errorMessage ?? "The date is required")}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default DatePickerField;
