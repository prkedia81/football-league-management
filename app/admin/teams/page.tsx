import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import TeamCard from "@/components/admin/TeamCard";

function page() {
  // TODO: Get list of Teams from DB Call
  // If DB call empty -> display empty state

  // TODO: In page heading, pass a button to add a button called add-team

  const teamCards = [
    {
      id: "1234",
      name: "East Bengal",
      matchesPlayed: ["123", 23, 234] as string[],
      playersList: ["123", 123, 123] as string[],
    },
    {
      id: "1234",
      name: "East Bengal",
      matchesPlayed: ["123", 23, 234] as string[],
      playersList: ["123", 123, 123] as string[],
    },
  ];

  return (
    <>
      <PageHeading heading="League Teams" />
      <EmptyState
        text="No teams added, click here to add teams"
        link={"/admin/teams/add-teams"}
      />
      <div className="mx-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teamCards.map((team, i) => (
          <TeamCard key={i} {...team} />
        ))}
      </div>
    </>
  );
}

export default page;
