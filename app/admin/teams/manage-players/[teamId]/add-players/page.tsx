import AddElement from "@/components/admin/AddElement";
import AddSinglePlayer from "./AddSinglePlayer";
import { getTeamFromId } from "@/services/teams";
import { createBulkNewPlayers, createNewPlayer } from "@/services/players";
import Custom404 from "@/app/admin/500";

export interface AddPlayerInputs {
  name: string;
  regId: string;
  position?: string;
  jerseyNumber?: number;
}

export interface PlayerListUpload extends AddPlayerInputs {
  srNum: number;
}

interface Props {
  params: { teamId: string };
}

const page = async ({ params: { teamId } }: Props) => {
  const cellNames = ["srNum", "name", "regId", "position"];

  const team = await getTeamFromId(teamId);
  if (team === null) return <Custom404 />;

  const handleUpload = async (data: PlayerListUpload[]) => {
    "use server";
    const response = await createBulkNewPlayers(data, teamId);
    return response;
  };

  const handleSingleUpload = async (data: AddPlayerInputs) => {
    "use server";
    const response = await createNewPlayer(data, teamId);
    return response;
  };

  const bulkSuccessFailModal = {
    modalSuccessHeading: "All Players added",
    modalSuccessBody:
      "All Players uploaded via the excel file have been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin/teams/manage-players/" + teamId,
    modalFailHeading: "There was some error",
    modalFailBody:
      "The player list could not be added. Please make sure you added them in the format that was provided and try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin/teams/manage-players/" + teamId,
  };

  const singleSuccessFailModal = {
    modalSuccessHeading: "Player added",
    modalSuccessBody: "The Player has been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin/teams/manage-players/" + teamId,
    modalFailHeading: "There was some error",
    modalFailBody: "The player could not be added. Please try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin/teams/manage-players/" + teamId,
  };

  return (
    <>
      <AddElement
        pageHeading={"Add Players - " + team.name}
        uploadZoneText="Upload file with players list (.xls, .xlsx)"
        addSingleElementForm={
          <AddSinglePlayer
            handleAddFn={handleSingleUpload}
            {...singleSuccessFailModal}
          />
        }
        uploadTableCaption="A list of added players."
        uploadButtonText="Upload Player in the team"
        handleUploadFn={handleUpload}
        cellNames={cellNames}
        {...bulkSuccessFailModal}
      />
    </>
  );
};
export default page;
