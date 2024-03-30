import AddElement from "@/components/admin/AddElement";

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
      <p>Add TEAMS</p>
    </>
  );
};

export default page;
