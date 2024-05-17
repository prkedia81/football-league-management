import AddElement from "@/components/admin/AddElement";
import AddSingleOfficial from "./AddSingleOfficial";
import { getTeamFromId } from "@/services/teams";
import {
  createBulkNewOfficials,
  createNewOfficial,
} from "@/services/officials";

export interface AddOfficialInput {
  name: string;
  regId: string;
  position: string;
}

export interface OfficialListUpload extends AddOfficialInput {
  srNum: number;
}

interface Props {
  params: { teamId: string };
}

const page = async ({ params: { teamId } }: Props) => {
  const cellNames = ["srNum", "name", "regId", "position"];

  const team = await getTeamFromId(teamId);

  const handleUpload = async (data: OfficialListUpload[]) => {
    "use server";
    const response = await createBulkNewOfficials(data, teamId);
    return response;
  };

  const handleSingleUpload = async (data: AddOfficialInput) => {
    "use server";
    const response = await createNewOfficial(data, teamId);
    return response;
  };

  const bulkSuccessFailModal = {
    modalSuccessHeading: "All officials added",
    modalSuccessBody:
      "All officials uploaded via the excel file have been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin/teams/manage-officials/" + teamId,
    modalFailHeading: "There was some error",
    modalFailBody:
      "The officials list could not be added. Please make sure you added them in the format that was provided and try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin/teams/manage-officials/" + teamId,
  };

  const singleSuccessFailModal = {
    modalSuccessHeading: "Official added",
    modalSuccessBody: "The Official has been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin/teams/manage-officials/" + teamId,
    modalFailHeading: "There was some error",
    modalFailBody: "The official could not be added. Please try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin/teams/manage-official/" + teamId,
  };

  return (
    <>
      <AddElement
        pageHeading={"Add Official - " + team.name}
        uploadZoneText="Upload file with official list (.xls, .xlsx)"
        addSingleElementForm={
          <AddSingleOfficial
            handleAddFn={handleSingleUpload}
            {...singleSuccessFailModal}
          />
        }
        uploadTableCaption="A list of added officials."
        uploadButtonText="Upload Officials in the team"
        handleUploadFn={handleUpload}
        cellNames={cellNames}
        {...bulkSuccessFailModal}
      />
    </>
  );
};
export default page;
