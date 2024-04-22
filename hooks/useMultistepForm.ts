import { NormalMatchFormSchema } from "@/lib/finishMatchSchema";
import { ReactElement, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

type Inputs = z.infer<typeof NormalMatchFormSchema>;

interface Step {
  id: string;
  name: string;
  subheading: string;
  fields: string[];
  component: ReactElement;
}

export function useMultistepForm(steps: Step[]) {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const methods = useForm<Inputs>({
    resolver: zodResolver(NormalMatchFormSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    methods.reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await methods.trigger(fields as FieldName[], {
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
