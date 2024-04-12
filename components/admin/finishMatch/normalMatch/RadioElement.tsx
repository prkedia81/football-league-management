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
      className="flex flex-row items-center gap-3 px-4 py-4 border border-black rounded">
      <input type="radio" {...props} {...register("winner")} />
      <label htmlFor={props.id}>{props.display}</label>
    </label>
  );
}

export default RadioElement;
