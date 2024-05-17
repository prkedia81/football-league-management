"use client";

import { useState } from "react";

import { NormalMatchFormSchema } from "@/lib/finishMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";
import MatchOutcome from "./MatchOutcome";
import PlayerSelect from "./PlayerSelect";
import { Teams } from "@/model/Team";
import { Players } from "@/model/Player";
import { Matches } from "@/model/Match";
import RedYellowCards from "./RedYellowCards";
import Officials from "./Officials";
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
    const resp = await axios.post("/api/admin/normal-match", {
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

  // const t1Squad = methods.watch("team1players");
  // const t2Squad = methods.watch("team2players");

  // console.log(methods.getValues());

  const steps = [
    {
      id: "Step 1",
      name: "Players - " + team1.name,
      subheading: "Choose the squad for this team",
      fields: [
        "team1Starting11",
        "team1Gk",
        "team1Captain",
        "team1Substitute",
        "team1Reserve",
      ],
      component: (
        <PlayerSelect
          key="team1"
          starting11Field="team1Starting11"
          gkField="team1Gk"
          captainField="team1Captain"
          substituteField="team1Substitute"
          reserveField="team1Reserve"
          playerList={props.team1Players}
        />
      ),
    },
    {
      id: "Step 2",
      name: "Players - " + team2.name,
      subheading: "Choose the squad for this team",
      fields: [
        "team2Starting11",
        "team2Gk",
        "team2Captain",
        "team2Substitute",
        "team2Reserve",
      ],
      component: (
        <PlayerSelect
          key="team2"
          starting11Field="team2Starting11"
          gkField="team2Gk"
          captainField="team2Captain"
          substituteField="team2Substitute"
          reserveField="team2Reserve"
          playerList={props.team2Players}
        />
      ),
    },
    {
      id: "Step 3",
      name: "Match Outcome",
      subheading: "Choose the match outcome",
      fields: [
        "winner",
        "goalsAgainstTeam2",
        "scorerAgainstTeam2",
        "goalsAgainstTeam1",
        "scorerAgainstTeam1",
      ],
      component: (
        <MatchOutcome
          team1Name={team1.name}
          team2Name={team2.name}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
        />
      ),
    },
    {
      id: "Step 4",
      name: "Yellow and Red Cards",
      subheading: "Choose all the yellow and red cards given in the match",
      fields: ["yellowCards", "redCards", "numYellowCards", "numRedCards"],
      component: (
        <RedYellowCards
          key="yellowCards"
          team1Name={team1.name}
          team2Name={team2.name}
          team1Players={props.team1Players}
          team2Players={props.team2Players}
        />
      ),
    },
    {
      id: "Step 5",
      name: "Officials & Remarks",
      subheading: "Add all officials and remarks in the match",
      fields: [
        "referee",
        "assistantReferee1",
        "assistantReferee2",
        "fourthReferee",
        "matchCommissioner",
        "refereeAssessor",
        "refereeReport",
        "remarks",
      ],
      component: <Officials />,
    },

    {
      id: "Step 6",
      name: "Complete",
      subheading: "",
      fields: [],
      component: <h1>Successfully Finished Match!</h1>,
    },
  ];

  console.log(methods.watch());

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
        <div className="">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              className="inline-flex items-center rounded bg-white px-2 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
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
              className="rounded inline-flex items-center bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
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
