"use client";

import { useState } from "react";

import { NormalMatchFormSchema } from "@/lib/finishMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";
import Winner from "./normalMatch/Winner";
import PlayerSelect from "./normalMatch/PlayerSelect";
import { Teams } from "@/model/Team";
import EmptyState from "../EmptyState";
import { Players } from "@/model/Player";
import { Matches } from "@/model/Match";
import GoalsScored from "./normalMatch/GoalsScored";
import YellowCards from "./normalMatch/YellowCards";
import RedCards from "./normalMatch/RedCards";

interface Props {
  team1: Teams;
  team2: Teams;
  team1Players: Players[];
  team2Players: Players[];
  match: Matches;
}

type Inputs = z.infer<typeof NormalMatchFormSchema>;

export default function NormalMatchForm({ team1, team2, ...props }: Props) {
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

  const t1Squad = methods.watch("team1players");
  const t2Squad = methods.watch("team2players");

  console.log(methods.getValues());

  const steps = [
    {
      id: "Step 1",
      name: "Match Outcome",
      subheading: "Choose the match outcome",
      fields: ["winner"],
      component: <Winner team1Name={team1.name} team2Name={team2.name} />,
    },
    {
      id: "Step 2",
      name: "Player List - " + team1.name,
      subheading: "Choose the players for this team",
      fields: ["team1players"],
      component: (
        <PlayerSelect
          inputName="team1players"
          playerList={props.team1Players}
        />
      ),
    },
    {
      id: "Step 3",
      name: "Player List - " + team2.name,
      subheading: "Choose the players for this team",
      fields: ["team2players"],
      component: (
        <PlayerSelect
          inputName="team2players"
          playerList={props.team2Players}
        />
      ),
    },
    {
      id: "Step 5",
      name: "Goals Scored Against - " + team1.name,
      subheading: "Choose goals scored against - " + team1.name,
      fields: ["goalsAgainstTeam1", "scorerAgainstTeam1"],
      component: (
        <GoalsScored
          numberName="scorerAgainstTeam1"
          inputName="goalsAgainstTeam1"
          t1Squad={t1Squad}
          t2Squad={t2Squad}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
        />
      ),
    },
    {
      id: "Step 6",
      name: "Goals Scored Against - " + team2.name,
      subheading: "Choose goals scored against - " + team2.name,
      fields: ["goalsAgainstTeam2", "scorerAgainstTeam2"],
      component: (
        <GoalsScored
          numberName="scorerAgainstTeam2"
          inputName="goalsAgainstTeam2"
          t1Squad={t1Squad}
          t2Squad={t2Squad}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
        />
      ),
    },
    {
      id: "Step 7",
      name: "Yellow Cards ",
      subheading: "Choose all the yellow cards in the match",
      fields: ["yellowCards"],
      component: (
        <YellowCards
          t1Squad={t1Squad}
          t2Squad={t2Squad}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
        />
      ),
    },
    {
      id: "Step 8",
      name: "Red Cards ",
      subheading: "Choose all the red cards in the match",
      fields: ["redCards"],
      component: (
        <RedCards
          t1Squad={t1Squad}
          t2Squad={t2Squad}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
        />
      ),
    },
    {
      id: "Step 4",
      name: "Complete",
      subheading: "",
      component: <h1>Test</h1>,
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
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step">
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
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
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50">
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
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50">
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
