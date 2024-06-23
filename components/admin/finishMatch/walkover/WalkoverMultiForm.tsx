"use client";

import { WalkoverMatchSchema } from "@/lib/finishMatchSchema";
import { Teams } from "@/model/Team";
import Officials from "../normalMatch/Officials";
import WalkOverReason from "./WalkOverReason";
import PointDeduction from "./PointDeduction";
import WalkoverWinner from "./WalkoverWinner";
import { Matches } from "@/model/Match";
import MultiFormSkeleton from "../MultiFormSkeleton";
import SuccessComponent from "../SuccessComponent";

interface Props {
  match: Matches;
  team1: Teams;
  team2: Teams;
}

export default function WalkoverForm({ match, team1, team2 }: Props) {
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
      id: "Step 5",
      name: "",
      subheading: "",
      fields: [],
      component: (
        <SuccessComponent
          successText="Match Finished"
          successSubtext="Match finished in walkover."
        />
      ),
    },
  ];

  return (
    <MultiFormSkeleton
      zodSchema={WalkoverMatchSchema}
      steps={steps}
      submitApiEndpoint="/api/admin/walkover-match"
      match={match}
    />
  );
}
