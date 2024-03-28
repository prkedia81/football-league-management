import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import MatchCard from "@/components/admin/MatchCard";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

function page() {
  // TODO: Get list of fixtures from DB Call
  // If DB call empty -> display empty state

  // TODO: In page heading, pass a button to add a button called add-fixture

  const matchCards = [
    {
      id: "1234",
      team1: "East Bengal",
      team2: "Mohun Bagan",
      status: "completed",
      team1Score: 3,
      team2Score: 2,
      location: "Rabindra Sarovar Stadium",
      date: "August 27th, 2024",
      time: "07:00 PM Onwards",
    },
    {
      id: "5678",
      team1: "East Bengal",
      team2: "Mohun Bagan",
      status: "completed",
      team1Score: 2,
      team2Score: 4,
      location: "Rabindra Sarovar Stadium",
      date: "August 27th, 2024",
      time: "07:00 PM Onwards",
    },
    {
      id: "91011",
      team1: "East Bengal",
      team2: "Mohun Bagan",
      status: "unplayed",
      team1Score: 0,
      team2Score: 0,
      location: "Rabindra Sarovar Stadium",
      date: "August 27th, 2024",
      time: "07:00 PM Onwards",
    },
  ];

  return (
    <>
      <PageHeading heading="Match Fixtures" />
      <EmptyState
        text="No matches added, click here to add fixtures"
        link={"/admin/match/add-fixtures"}
      />
      <div className="mx-4 flex flex-row flex-wrap gap-4">
        {matchCards.map((match) => (
          <MatchCard {...match} />
        ))}
      </div>
    </>
  );
}

export default page;
