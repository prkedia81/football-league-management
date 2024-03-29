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

  return (
    <>
      <AddElement
        pageHeading="Add Teams"
        uploadZoneText="Upload file with team data (.xls, .xlsx)"
        addSingleElementForm={<AddSingleTeam />}
        uploadTableCaption="A list of the teams."
        uploadButtonText="Upload Teams"
        handleUploadFn={handleUpload}
        cellNames={cellNames}
      />
    </>
  );
};

export default page;
