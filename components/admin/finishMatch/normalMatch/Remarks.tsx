import React from "react";
import { useFormContext } from "react-hook-form";

function Remarks() {
  const { register } = useFormContext();
  return (
    <textarea
      rows={4}
      {...register("remarks")}
      id="remarks"
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      defaultValue={""}
    />
  );
}

export default Remarks;
