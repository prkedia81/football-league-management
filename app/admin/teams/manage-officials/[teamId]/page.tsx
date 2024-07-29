import Custom404 from "@/app/admin/500";
import LoadingState from "@/app/loading";
import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import PlayerTable from "@/components/admin/PlayerTable";
import { getAllOfficialDataFromTeamId } from "@/services/officials";
import { getTeamFromId } from "@/services/teams";
import { Suspense } from "react";

interface Props {
  params: { teamId: string };
}

export default async function page({ params: { teamId } }: Props) {
  const team = await getTeamFromId(teamId);
  const officialsList = await getAllOfficialDataFromTeamId(teamId);
  if (team === null) return <Custom404 />;

  return (
    <>
      <Suspense fallback={<LoadingState />}>
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
            teamName={team.name}
            data={officialsList}
            caption={"Table of officials in " + team.name}
            isOfficials={true}
          />
        )}
      </Suspense>
    </>
  );
}
