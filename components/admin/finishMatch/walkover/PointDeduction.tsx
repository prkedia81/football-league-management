import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../../formElements/InputField";

const PointDeduction = () => {
  return (
    <div className="flex flex-col gap-4">
      <InputField
        type="number"
        name="deduction"
        isRequired={true}
        label="Enter the Penalty"
        placeholder="Enter the points that are to be deducted"
        withAddOn={true}
        addOnText="-"
      />
    </div>
  );
};

export default PointDeduction;
