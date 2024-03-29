import AddElement from "@/components/admin/AddElement";
import AddSingleMatch from "@/app/admin/match/add-fixtures/AddSingleMatch";

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
    console.log(data);
  };

  const handleSingleUpload = async (data: AddMatchInputs) => {
    "use server";
    console.log(data);
  };

  return (
    <>
      <AddElement
        pageHeading="Add Match Fixtures"
        uploadZoneText="Upload file with match fixtures (.xls, .xlsx)"
        addSingleElementForm={
          <AddSingleMatch handleAddFn={handleSingleUpload} />
        }
        uploadTableCaption="A list of the match fixtures."
        uploadButtonText="Upload Match Fixtures"
        handleUploadFn={handleFixtureUpload}
        cellNames={cellNames}
      />
    </>
  );
};

export default page;
