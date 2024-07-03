"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ComboBoxElement } from "../../ComboBox";
import ComboBoxField from "../../formElements/ComboBoxField";

interface Props {
  addTextButton: string;
  labelForPlayerSelect: string;
  numberName: string;
  inputName: string;
  placeholder?: string;
  items1: ComboBoxElement[];
  items2?: ComboBoxElement[];
  disabledText: string;
  disabledText2?: string;
}

function NumberPlayerInput({
  addTextButton,
  labelForPlayerSelect,
  numberName,
  inputName,
  placeholder = "",
  items1,
  disabledText,
  ...props
}: Props) {
  const {
    register,
    control,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: inputName,
    control,
  });

  return (
    <div>
      <div className="flex flex-col gap-2">
        <input
          className="form-input rounded focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
          {...register(numberName)}
          placeholder={placeholder}
        />
        <Button
          type="button"
          onClick={() => {
            const numFields = parseInt(getValues(numberName), 10);
            // Clearing the earlier fields and appending new fields
            remove();
            for (let i = 0; i < numFields; i++) {
              append({ id: "" });
            }
          }}>
          {addTextButton}
        </Button>
        {errors[numberName] && (
          <span className="text-red-600 text-sm mt-0.5">
            {(errors[numberName]?.message as string) ||
              "This field is required"}
          </span>
        )}
      </div>
      <div className="mt-5 flex flex-col gap-2 rounded-md ">
        {/* TODO: Uncontrolled to controlled error fix */}
        {fields.map((field, index) => (
          <div className="flex flex-col gap-1 text-sm" key={field.id}>
            <ComboBoxField
              name={`${inputName}.${index}.id`}
              label={`${labelForPlayerSelect} ${index + 1}`}
              isRequired={true}
              placeholderText={"Choose a player"}
              disabledText={disabledText}
              displayItems={items1}
              disabledText2={props.disabledText2}
              displayItems2={props.items2}
            />
            {errors[`${inputName}.${index}.id`] && (
              <span className="text-red-600 text-sm mt-0.5">
                {(errors[`${inputName}.${index}.id`]?.message as string) ||
                  "Select Players"}
              </span>
            )}
          </div>
        ))}
        {errors[inputName] && (
          <span className="text-red-600 text-sm mt-0.5">
            {(errors[inputName]?.message as string) || "Select the players"}
          </span>
        )}
      </div>
    </div>
  );
}

export default NumberPlayerInput;
