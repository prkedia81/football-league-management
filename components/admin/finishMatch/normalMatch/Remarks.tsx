import React from "react";
import { useFormContext } from "react-hook-form";

function Remarks() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="remarks"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
        Match Remarks
      </label>
      <textarea
        rows={4}
        {...register("remarks")}
        id="remarks"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        defaultValue={""}
      />
      {errors["remarks"] && (
        <span className="text-red-600 text-sm mt-0.5">
          {(errors["remarks"]?.message as string) || "This field is required"}
        </span>
      )}
    </div>
  );
}

export default Remarks;
