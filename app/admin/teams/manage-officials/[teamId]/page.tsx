import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import PlayerTable from "@/components/admin/PlayerTable";
import { getAllOfficialDataFromTeamId } from "@/services/officials";
import { getTeamFromId } from "@/services/teams";

interface Props {
  params: { teamId: string };
}

export default async function page({ params: { teamId } }: Props) {
  const team = await getTeamFromId(teamId);
  const officialsList = await getAllOfficialDataFromTeamId(teamId);

  return (
    <>
      <PageHeading
        heading={team.name + " - " + "Officials List"}
        isPrimaryButton={true}
        primaryButtonLink={
          "/admin/teams/manage-officials/" + teamId + "/add-officials"
        }
        primaryButtonText="Add Officials"
      />
      {officialsList.length === 0 && (
        <EmptyState
          text="No officials added, click here to add officials"
          link={"/admin/teams/manage-officials/" + teamId + "/add-officials"}
        />
      )}
      {officialsList.length !== 0 && (
        <PlayerTable
          data={officialsList}
          caption={"Table of officials in " + team.name}
          isOfficials={true}
        />
      )}
    </>
  );
}
