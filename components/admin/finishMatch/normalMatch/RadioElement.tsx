import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  id: string;
  value: string;
  display: string;
}

function RadioElement({ ...props }: Props) {
  const { register } = useFormContext();

  return (
    <label
      htmlFor={props.id}
      className="cursor-pointer flex flex-row items-center gap-3 px-4 py-4 border border-gray-300 rounded">
      <input
        className="cursor-pointer"
        type="radio"
        {...props}
        {...register("winner")}
      />
      <label className="cursor-pointer text-sm" htmlFor={props.id}>
        {props.display}
      </label>
    </label>
  );
}

export default RadioElement;
