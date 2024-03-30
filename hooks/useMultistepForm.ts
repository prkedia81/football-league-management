import { ReactElement, useState } from "react";
import { useFormContext } from "react-hook-form";

export function useMultistepForm(steps: ReactElement[]) {
  const { trigger } = useFormContext();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  async function next(fields: string[]) {
    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
