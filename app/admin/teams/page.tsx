import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import TeamCard from "@/components/admin/TeamCard";
import { Teams } from "@/model/Team";
import connectMongo from "@/services/mongoConnect";
import TeamClass from "@/services/teams";

async function page() {
  const teamClass = new TeamClass();
  const teams = JSON.parse(
    JSON.stringify(await teamClass.getAllTeams())
  ) as Teams[];

  return (
    <>
      <PageHeading
        heading="League Teams"
        isPrimaryButton={true}
        primaryButtonLink="/admin/teams/add-teams"
        primaryButtonText="Add teams"
      />
      {!teams && (
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
    </>
  );
}

export default page;
