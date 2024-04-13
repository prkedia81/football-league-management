import React from "react";
import InputField from "../../formElements/InputField";

function Officials() {
  return (
    <div className="flex flex-col gap-4">
      <InputField
        label="Referee"
        isRequired={true}
        name="referee"
        id="referee"
        placeholder="Enter Referee's Name"
      />
      <InputField
        label="Line Judge"
        name="lineJudge"
        id="lineJudge"
        placeholder="Enter Line Judge's Name"
      />
      <InputField
        label="Umpire"
        name="umpire"
        id="umpire"
        placeholder="Enter Umpire's Name"
      />
      <InputField
        label="Back Judge"
        name="backJudge"
        id="backJudge"
        placeholder="Enter Back Judge's Name"
      />
      <InputField
        label="Side Judge"
        name="sideJudge"
        id="sideJudge"
        placeholder="Enter Side Judge's Name"
      />
      <InputField
        label="Field Judge"
        name="fieldJudge"
        id="fieldJudge"
        placeholder="Enter Field Judge's Name"
      />
      <p>TODO: Add Upload Referee Report</p>
    </div>
  );
}

export default Officials;
