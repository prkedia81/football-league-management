"use client";

import { useState } from "react";
import { WalkoverMatchSchema } from "@/lib/finishMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Teams } from "@/model/Team";
import Officials from "../normalMatch/Officials";
import Remarks from "../normalMatch/Remarks";
import WalkOverReason from "./WalkOverReason";
import PointDeduction from "./PointDeduction";
import WalkoverWinner from "./WalkoverWinner";
import axios from "axios";
import { Matches } from "@/model/Match";

interface Props {
  match: Matches;
  team1: Teams;
  team2: Teams;
}

export type WalkoverMatchInputs = z.infer<typeof WalkoverMatchSchema>;

export default function WalkoverForm({ match, team1, team2 }: Props) {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const methods = useForm<WalkoverMatchInputs>({
    resolver: zodResolver(WalkoverMatchSchema),
  });

  const processForm: SubmitHandler<WalkoverMatchInputs> = async (data) => {
    const resp = await axios.post("/api/walkover-match", {
      match: match,
      formData: data,
    });
    methods.reset();
  };

  type FieldName = keyof WalkoverMatchInputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await methods.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        processForm(methods.getValues());
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

  const steps = [
    {
      id: "Step 1",
      name: "Match Outcome",
      subheading: "Choose the match outcome",
      fields: ["winner"],
      component: (
        <WalkoverWinner team1Name={team1.name} team2Name={team2.name} />
      ),
    },
    {
      id: "Step 2",
      name: "Reasons For Walkover",
      subheading: "Why was there a walkover?",
      fields: ["reason"],
      component: <WalkOverReason />,
    },
    {
      id: "Step 3",
      name: "Select Point Deduction for the losing team",
      subheading:
        "For an Informed Walkover select 0,\nFor a No Show select -2.\nFor an Unruly Behaviour select on the basis of the comitee report",
      fields: ["deduction"],
      component: <PointDeduction />,
    },
    {
      id: "Step 4",
      name: "Officials",
      subheading: "Add all officials in the match",
      fields: [
        "referee",
        "lineJudge",
        "umpire",
        "backJudge",
        "sideJudge",
        "fieldJudge",
        "refereeReport",
      ],
      component: <Officials />,
    },
    {
      id: "Step 5",
      name: "Remarks",
      subheading: "Add any remarks for the match",
      fields: ["remarks"],
      component: <Remarks />,
    },
    {
      id: "Step 6",
      name: "Complete",
      subheading: "",
      fields: [],
      component: <h1>Walkover Completed!</h1>,
    },
  ];

  return (
    <section className="absolute inset-0 flex flex-col justify-between p-24">
      {/* steps */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-xs font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step">
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-xs font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-xs font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <FormProvider {...methods}>
        <form
          className="mt-12 py-12"
          onSubmit={methods.handleSubmit(processForm)}>
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {steps[currentStep].name}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {steps[currentStep].subheading}
            </p>
            {steps[currentStep].component}
          </div>
        </form>
      </FormProvider>

      {/* Navigation */}
      <div className="mt-8 pt-5">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <span className="text-gray-900 text-sm disabled:cursor-not-allowed disabled:opacity-50">
              Previous
            </span>
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded inline-flex items-center bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
            <span className="text-gray-900 text-sm">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
