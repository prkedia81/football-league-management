import AddElement from "@/components/admin/AddElement";
import AddSingleTeam from "./AddSingleTeam";

export interface TeamListUpload {
  srNum: number;
  name: string;
  regId: string;
  teamCode: string;
  email: string;
}

const page = () => {
  const cellNames = ["srNum", "name", "regId", "teamCode", "email"];

  const handleUpload = async (data: TeamListUpload[]) => {
    "use server";
    console.log(data);
  };

  const handleSingleUpload = async (data: TeamListUpload) => {
    "use server";
    console.log(data);
    return true;
  };

  const bulkSuccessFailModal = {
    modalSuccessHeading: "All Clubs added",
    modalSuccessBody:
      "All Clubs uploaded via the excel file have been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin",
    modalFailHeading: "There was some error",
    modalFailBody:
      "The Club List could not be added. Please make sure you added them in the format that was provided and try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin",
  };

  const singleSuccessFailModal = {
    modalSuccessHeading: "Club added",
    modalSuccessBody: "The Club has been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin",
    modalFailHeading: "There was some error",
    modalFailBody: "The Team could not be added. Please try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin",
  };


  return (
    <>
    <AddElement
        pageHeading="Add Match Fixtures"
        uploadZoneText="Upload file with match fixtures (.xls, .xlsx)"
        addSingleElementForm={
          <AddSingleTeam
            handleAddFn={handleSingleUpload}
            {...singleSuccessFailModal}
          />
        }
        uploadTableCaption="A list of Added Clubs."
        uploadButtonText="Upload Clubs in the league"
        handleUploadFn={handleUpload}
        cellNames={cellNames}
        {...bulkSuccessFailModal}
      />
    </>
  );
};

export default page;
