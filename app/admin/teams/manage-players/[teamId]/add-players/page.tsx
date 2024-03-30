import AddElement from "@/components/admin/AddElement";
import AddPlayer from "./AddPlayer";

export interface PlayerUpload {
  srNum: number;
  name: string;
  regId: string;
  position: string;
  jerseyNumber: number;
}
interface Props {
  params: { teamId: string };
}

const page=()=> {
  const cellNames = ["srNum", "name", "regId", "position", "jerseyNumber"];

  const handleUpload = async (data: PlayerUpload[]) => {
    "use server";
    console.log(data);
  };

  const handleSingleUpload = async (data: PlayerUpload) => {
    "use server";
    console.log(data);
    return true;
  };

  const bulkSuccessFailModal = {
    modalSuccessHeading: "All Players added",
    modalSuccessBody:
      "All Players uploaded via the excel file have been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin",
    modalFailHeading: "There was some error",
    modalFailBody:
      "The Squad List could not be added. Please make sure you added them in the format that was provided and try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin",
  };

  const singleSuccessFailModal = {
    modalSuccessHeading: "Player added",
    modalSuccessBody: "The Player has been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin",
    modalFailHeading: "There was some error",
    modalFailBody: "The Player could not be added. Please try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin",
  };


  return (
    <>
    <AddElement
        pageHeading="Add Players"
        uploadZoneText="Upload file with match fixtures (.xls, .xlsx)"
        addSingleElementForm={
          <AddPlayer
            handleAddFn={handleSingleUpload}
            {...singleSuccessFailModal}
          />
        }
        uploadTableCaption="A list of Added Players."
        uploadButtonText="Upload Player in the team"
        handleUploadFn={handleUpload}
        cellNames={cellNames}
        {...bulkSuccessFailModal}
      />
    </>
  );
}
export default page