import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import TeamCard from "@/components/admin/TeamCard";
import { Teams } from "@/model/Team";
import { getAllTeams } from "@/services/teams";
import { Suspense } from "react";
import LoadingState from "../loading";

export const dynamic = "force-dynamic";

async function page() {
  const teams = JSON.parse(JSON.stringify(await getAllTeams())) as Teams[];

  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <PageHeading
          heading="League Teams"
          isPrimaryButton={true}
          primaryButtonLink="/admin/teams/add-teams"
          primaryButtonText="Add teams"
        />
        {teams.length === 0 && (
          <EmptyState
            text="No teams added, click here to add teams"
            link={"/admin/teams/add-teams"}
          />
        )}
        <div className="mt-4 mx-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, i) => (
            <TeamCard key={i} {...team} />
          ))}
        </div>
      </Suspense>
    </>
  );
}

export default page;
