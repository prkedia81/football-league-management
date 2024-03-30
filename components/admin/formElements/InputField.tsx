import { cn } from "@/lib/utils";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  errorMessage?: string;
  label: string;
  isRequired?: boolean;
  name: string;
  withAddOn?: boolean;
  addOnText?: string;
}

const InputField = ({
  errorMessage,
  label,
  isRequired = false,
  withAddOn = false,
  addOnText = "",
  ...props
}: Props) => {
  const {
    register,
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
          <div className="flex flex-row">
            {withAddOn ? (
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                {addOnText}
              </span>
            ) : null}

            <input
              {...props}
              className={cn(
                "form-input focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300",
                withAddOn ? "flex-1 rounded-none rounded-r-md" : "rounded-md"
              )}
              {...register(props.name, { required: isRequired })}
            />
          </div>
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

export default InputField;
