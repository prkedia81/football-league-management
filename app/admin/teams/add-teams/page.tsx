import AddElement from "@/components/admin/AddElement";
import AddSingleTeam from "./AddSingleTeam";
import TeamClass from "@/services/teams";

export interface AddTeamInput {
  name: string;
  regId: string;
  teamCode: string;
  email: string;
}

export interface TeamListUpload extends AddTeamInput {
  srNum: number;
}

const page = () => {
  const cellNames = ["srNum", "name", "regId", "teamCode", "email"];

  const handleUpload = async (data: TeamListUpload[]) => {
    "use server";
    const teamClass = new TeamClass();
    const response = await teamClass.createBulkNewTeam(data);
    return response;
  };

  const handleSingleUpload = async (data: AddTeamInput) => {
    "use server";
    const teamClass = new TeamClass();
    const response = await teamClass.createNewTeam(data);
    return response;
  };

  const bulkSuccessFailModal = {
    modalSuccessHeading: "All Clubs added",
    modalSuccessBody: "All Clubs uploaded via the excel file have been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin/teams",
    modalFailHeading: "There was some error",
    modalFailBody:
      "The Club List could not be added. Please make sure you added them in the format that was provided and try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin/teams",
  };

  const singleSuccessFailModal = {
    modalSuccessHeading: "Club added",
    modalSuccessBody: "The Club has been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin/teams",
    modalFailHeading: "There was some error",
    modalFailBody: "The Team could not be added. Please try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin/teams",
  };

  return (
    <>
      <AddElement
        pageHeading="Add Teams"
        uploadZoneText="Upload file with all teams (.xls, .xlsx)"
        addSingleElementForm={
          <AddSingleTeam
            handleAddFn={handleSingleUpload}
            {...singleSuccessFailModal}
          />
        }
        uploadTableCaption="A list of added clubs."
        uploadButtonText="Upload Clubs in the league"
        handleUploadFn={handleUpload}
        cellNames={cellNames}
        {...bulkSuccessFailModal}
      />
    </>
  );
};

export default page;
