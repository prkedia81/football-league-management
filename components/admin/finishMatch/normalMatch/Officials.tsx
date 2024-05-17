import React from "react";
import InputField from "../../formElements/InputField";
import FileUploadZone from "../../formElements/FileUploadZone";
import Remarks from "./Remarks";

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
        label="Assistant Referee 1"
        isRequired={true}
        name="assistantReferee1"
        id="assistantReferee1"
        placeholder="Enter Assistant Referee 1's Name"
      />
      <InputField
        label="Assistant Referee 2"
        isRequired={true}
        name="assistantReferee2"
        id="assistantReferee2"
        placeholder="Enter Assistant Referee 1's Name"
      />
      <InputField
        label="Fourth Referee"
        name="fourthReferee"
        id="fourthReferee"
        placeholder="Enter Fourth Referee's Name"
      />
      <InputField
        label="Match Commissioner"
        name="matchCommissioner"
        id="matchCommissioner"
        placeholder="Enter Match Commissioner's Name"
      />
      <InputField
        label="Referee Assessor"
        name="refereeAssessor"
        id="refereeAssessor"
        placeholder="Enter Referee Assessor's Name"
      />
      <hr />
      <FileUploadZone field="refereeReport" />
      <hr />
      <Remarks />
    </div>
  );
}

export default Officials;
