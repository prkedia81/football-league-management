"use client";

import { Step, useMultistepForm } from "@/hooks/useMultistepForm";
import { Matches } from "@/model/Match";
import React from "react";
import { FormProvider } from "react-hook-form";

interface Props {
  steps: Step[];
  zodSchema: any;
  match: Matches;
  submitApiEndpoint: string;
  formDefaultValues?: any;
}

function MultiFormSkeleton({
  steps,
  zodSchema,
  match,
  submitApiEndpoint,
  formDefaultValues = {},
}: Props) {
  const { methods, currentStep, prev, next, processForm } = useMultistepForm({
    steps,
    zodSchema,
    match,
    submitApiEndpoint,
    formDefaultValues,
  });

  return (
    <section className="flex flex-col justify-between pt-2 pb-12">
      {/* steps */}
      <nav className="px-4" aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-2 md:space-y-0">
          {steps.map((step, index) => (
            <li key={index} className="md:flex-1">
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
      <div className="px-16">
        <FormProvider {...methods}>
          <form className="py-12" onSubmit={methods.handleSubmit(processForm)}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <h2 className="text-base font-semibold text-gray-900">
                  {steps[currentStep].name}
                </h2>
                <p className="text-sm text-gray-600">
                  {steps[currentStep].subheading}
                </p>
              </div>
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
      </div>
    </section>
  );
}

export default MultiFormSkeleton;
