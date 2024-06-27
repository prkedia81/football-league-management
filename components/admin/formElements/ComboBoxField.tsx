import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ComboBox, ComboBoxElement } from "../ComboBox";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  errorMessage?: string;
  label: string;
  isRequired?: boolean;
  name: string;
  placeholderText: string;
  disabledText?: string;
  displayItems: ComboBoxElement[];
  disabledText2?: string;
  displayItems2?: ComboBoxElement[];
  defaultValue?: string;
}

const ComboBoxField = ({
  errorMessage,
  label,
  isRequired = false,
  placeholderText,
  displayItems,
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
            name={props.name}
            control={control}
            rules={{ required: isRequired }}
            defaultValue={props.defaultValue || null}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <ComboBox
                onChange={onChange}
                value={value}
                placeholderText={placeholderText}
                disabledText={props.disabledText}
                items={displayItems}
                disabledText2={props.disabledText2}
                items2={props.displayItems2}
              />
            )}
          />
          {errors[props.name] && (
            <span className="text-red-600 text-sm mt-0.5">
              {(errors[props.name]?.message as string) ||
                (errorMessage ?? "This field is required")}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default ComboBoxField;
