"use client";

import { useState } from "react";

import { NormalMatchFormSchema } from "@/lib/finishMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";
import Winner from "./Winner";
import PlayerSelect from "./PlayerSelect";
import { Teams } from "@/model/Team";
import { Players } from "@/model/Player";
import { Matches } from "@/model/Match";
import GoalsScored from "./GoalsScored";
import YellowCards from "./YellowCards";
import RedCards from "./RedCards";
import Officials from "./Officials";
import Remarks from "./Remarks";
import axios from "axios";

interface Props {
  team1: Teams;
  team2: Teams;
  team1Players: Players[];
  team2Players: Players[];
  match: Matches;
}

export type NormalMatchInputs = z.infer<typeof NormalMatchFormSchema>;

export default function NormalMatchForm({ team1, team2, ...props }: Props) {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const methods = useForm<NormalMatchInputs>({
    resolver: zodResolver(NormalMatchFormSchema),
  });

  const processForm: SubmitHandler<NormalMatchInputs> = async (data) => {
    const resp = await axios.post("/api/normal-match", {
      match: props.match,
      formData: data,
    });
    methods.reset();
  };

  type FieldName = keyof NormalMatchInputs;

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

  const t1Squad = methods.watch("team1players");
  const t2Squad = methods.watch("team2players");

  // console.log(methods.getValues());

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
      name: "Players - " + team1.name,
      subheading: "Choose the complete squad for this team",
      fields: ["team1players"],
      component: (
        <PlayerSelect
          key="team1"
          inputName="team1players"
          playerList={props.team1Players}
        />
      ),
    },
    {
      id: "Step 3",
      name: "Playing XI - " + team1.name,
      subheading: "Choose the playing XI for this team",
      fields: ["team1Starting11"],
      component: (
        <PlayerSelect
          key="team1Starting11"
          inputName="team1Starting11"
          playerList={props.team1Players}
          filterId={t1Squad}
        />
      ),
    },
    {
      id: "Step 4",
      name: "Bench Players - " + team1.name,
      subheading: "Choose the playing on the bench for this team",
      fields: ["team1Bench"],
      component: (
        <PlayerSelect
          key="team1Bench"
          inputName="team1Bench"
          playerList={props.team1Players}
          filterId={t1Squad}
        />
      ),
    },
    {
      id: "Step 5",
      name: "Players - " + team2.name,
      subheading: "Choose the players for this team",
      fields: ["team2players"],
      component: (
        <PlayerSelect
          key="team2players"
          inputName="team2players"
          playerList={props.team2Players}
        />
      ),
    },
    {
      id: "Step 6",
      name: "Playing XI - " + team1.name,
      subheading: "Choose the playing XI for this team",
      fields: ["team2Starting11"],
      component: (
        <PlayerSelect
          key="team2Starting11"
          inputName="team2Starting11"
          playerList={props.team2Players}
          filterId={t2Squad}
        />
      ),
    },
    {
      id: "Step 7",
      name: "Bench Players - " + team1.name,
      subheading: "Choose the playing on the bench for this team",
      fields: ["team2Bench"],
      component: (
        <PlayerSelect
          key="team2Bench"
          inputName="team2Bench"
          playerList={props.team2Players}
          filterId={t2Squad}
        />
      ),
    },
    {
      id: "Step 8",
      name: "Goals - " + team1.name,
      subheading: "Choose goals scored by - " + team1.name,
      fields: ["goalsAgainstTeam2", "scorerAgainstTeam2"],
      component: (
        <GoalsScored
          key="againstTeam2"
          numberName="goalsAgainstTeam2"
          inputName="scorerAgainstTeam2"
          t1Squad={t1Squad}
          t2Squad={t2Squad}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
        />
      ),
    },
    {
      id: "Step 9",
      name: "Goals - " + team2.name,
      subheading: "Choose goals scored by - " + team2.name,
      fields: ["goalsAgainstTeam1", "scorerAgainstTeam1"],
      component: (
        <GoalsScored
          key="againstTeam1"
          numberName="goalsAgainstTeam1"
          inputName="scorerAgainstTeam1"
          t1Squad={t1Squad}
          t2Squad={t2Squad}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
        />
      ),
    },
    {
      id: "Step 10",
      name: "Yellow Cards",
      subheading: "Choose all the yellow cards in the match",
      fields: ["yellowCards"],
      component: (
        <YellowCards
          key="yellowCards"
          t1Squad={t1Squad}
          t2Squad={t2Squad}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
        />
      ),
    },
    {
      id: "Step 11",
      name: "Red Cards",
      subheading: "Choose all the red cards in the match",
      fields: ["redCards"],
      component: (
        <RedCards
          key="redCards"
          t1Squad={t1Squad}
          t2Squad={t2Squad}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
        />
      ),
    },
    {
      id: "Step 12",
      name: "Officials",
      subheading: "Add all officials in the match",
      fields: [
        "referee",
        "lineJudge",
        "umpire",
        "backJudge",
        "sideJudge",
        "fieldJudge",
      ],
      component: <Officials />,
    },
    {
      id: "Step 13",
      name: "Remarks",
      subheading: "Add any remarks for the match",
      fields: ["remarks"],
      component: <Remarks />,
    },
    {
      id: "Step 4",
      name: "Complete",
      subheading: "",
      fields: [],
      component: <h1>Test</h1>,
    },
  ];

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
