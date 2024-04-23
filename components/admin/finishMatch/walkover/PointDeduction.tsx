import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../../formElements/InputField";

const schema = z.object({
  number: z
    .number()
    .min(0)
    .max(12)
    .refine((value) => value >= 0 && value <= 12, {
      message: "Number must be between 0 and 12",
    }),
});

const PointDeduction: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <div className="flex flex-col gap-4">
      <InputField
        name="deduction"
        isRequired={true}
        label="Enter points to be deducted"
        withAddOn={true}
        addOnText="-"
      />
    </div>
  );
};

export default PointDeduction;
