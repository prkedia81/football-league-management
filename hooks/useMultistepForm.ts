import { ReactElement, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Matches } from "@/model/Match";

export interface Step {
  id: string;
  name: string;
  subheading: string;
  fields: string[];
  component: ReactElement;
}

interface Props {
  steps: Step[];
  zodSchema: any;
  match: Matches;
  submitApiEndpoint: string;
}

export function useMultistepForm({
  steps,
  zodSchema,
  match,
  submitApiEndpoint,
}: Props) {
  type Inputs = z.infer<typeof zodSchema>;

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const methods = useForm<Inputs>({
    resolver: zodResolver(zodSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const resp = await axios.post(submitApiEndpoint, {
      match: match,
      formData: data,
    });
    methods.reset();
  };

  // type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await methods.trigger(fields, {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await methods.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return { methods, previousStep, currentStep, processForm, next, prev };
}
