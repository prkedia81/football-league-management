import { cn } from "@/lib/utils";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TimePicker from "../TimePicker";

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

const TimePickerField = ({
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
            name="time"
            control={control}
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <TimePicker onChange={onChange} value={value} />
            )}
          />
          {errors[props.name] && (
            <span className="text-red-600 text-sm mt-0.5">
              {errorMessage ?? "This field is required"}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default TimePickerField;
