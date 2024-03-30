import AddElement from "@/components/admin/AddElement";
import AddSingleMatch from "@/app/admin/match/add-fixtures/AddSingleMatch";
import MatchClass from "@/services/matches";

export interface AddMatchInputs {
  team1Id: string;
  team2Id: string;
  date: string;
  time: string;
  location: string;
}

interface MatchFixtureUpload extends AddMatchInputs {
  srNum: number;
}

const page = () => {
  const cellNames = ["srNum", "team1Id", "team2Id", "date", "time", "location"];

  const handleFixtureUpload = async (data: MatchFixtureUpload[]) => {
    "use server";
    const matchClass = new MatchClass();
    const response = await matchClass.createBulkNewMatch(data);
    return response;
  };

  const handleSingleUpload = async (data: AddMatchInputs) => {
    "use server";
    const matchClass = new MatchClass();
    const response = await matchClass.createNewMatch(data);
    return response;
  };

  const bulkSuccessFailModal = {
    modalSuccessHeading: "All match fixtures added",
    modalSuccessBody:
      "All match fixtures uploaded via the excel file have been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin",
    modalFailHeading: "There was some error",
    modalFailBody:
      "The match fixture could not be added. Please make sure you added them in the format that was provided and try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin",
  };

  const singleSuccessFailModal = {
    modalSuccessHeading: "Match fixtures added",
    modalSuccessBody: "The match fixture has been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin",
    modalFailHeading: "There was some error",
    modalFailBody: "The match fixture could not be added. Please try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin",
  };

  return (
    <>
      <AddElement
        pageHeading="Add Match Fixtures"
        uploadZoneText="Upload file with match fixtures (.xls, .xlsx)"
        addSingleElementForm={
          <AddSingleMatch
            handleAddFn={handleSingleUpload}
            {...singleSuccessFailModal}
          />
        }
        uploadTableCaption="A list of the match fixtures."
        uploadButtonText="Upload Match Fixtures"
        handleUploadFn={handleFixtureUpload}
        cellNames={cellNames}
        {...bulkSuccessFailModal}
      />
    </>
  );
};

export default page;
