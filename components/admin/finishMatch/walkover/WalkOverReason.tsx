import RadioElement from "../normalMatch/RadioElement";
import { useFormContext } from "react-hook-form";

const WalkOverReason = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <RadioElement
        id="informed"
        name="reason"
        value="informed"
        display={
          "The Opponent Team Informed about the Walkover 48 hours before the match"
        }
      />
      <RadioElement
        id="noShow"
        name="reason"
        value="noShow"
        display={"The Opponent Team did not show up for the match"}
      />
      <RadioElement
        id="unruly"
        name="reason"
        value="unruly"
        display="The Opponent team refused to play"
      />
      <RadioElement
        id="othersWalkover"
        name="reason"
        value="othersWalkover"
        display="Others"
      />
      {errors.reason?.message && (
        <p className="mt-0.5 text-sm text-red-600">{"Select one outcome"}</p>
      )}
    </div>
  );
};

export default WalkOverReason;

import React from "react";
