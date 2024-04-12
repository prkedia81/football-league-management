import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
} from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  errorMessage?: string;
  isRequired?: boolean;
  name: string;
  newInput: any;
  inputKey: string;
}

const Scorer = ({
  errorMessage,
  isRequired = false,
  name,
  newInput,
  inputKey,
  ...props
}: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: name,
    control,
  });

  console.log(fields);

  return (
    <>
      <div className="mt-1 flex flex-col gap-2 rounded-md ">
        {fields.map((field, index) => (
          <div className="flex flex-col gap-1" key={field.id}>
            <p className="ml-0.5 text-xs text-gray-700">{`${
              inputKey.charAt(0).toUpperCase() + inputKey.slice(1)
            } ${index + 1}`}</p>
            <div className="flex flex-row w-full gap-2">
              <input
                {...props}
                className="shadow-sm form-input focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                type="text"
                {...register(`${name}.${index}.${inputKey}` as const, {
                  required: isRequired,
                })}
              />
            </div>
          </div>
        ))}
      </div>
      {errors[name] && (
        <span className="text-red-600 text-sm mt-0.5">
          {errorMessage ?? "This field is required"}
        </span>
      )}
    </>
  );
};

export default Scorer;
