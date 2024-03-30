import PageHeading from "@/components/admin/Heading";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import Match from "@/model/Match";

interface Props {
  params: { matchId: string };
}

export default function page({ params: { matchId } }: Props) {
  // Get match data from matchID
  const match = {
    _id: "ad234",
    team1: {
      teamCode: "A",
      teamId: "1234",
      goalsScored: 0,
      players: [124, 344, 523],
    },
    team2: {
      teamCode: "B",
      teamId: "5678",
      goalsScored: 0,
      players: [2345, 3456, 645],
    },
    team1Score: 0,
    team2Score: 0,
    result: -1,
    time: "1711787741",
    venue: "14hkhk34",
    referee: [],
    refereeReport: "",
    remarks: "string",
  };

  const team1Id = match.team1.teamId;
  const team2Id = match.team2.teamId;

  // Get team names from DB
  const allTeams = [
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

  // Get players list from DB

  // TODO: Do a long multi-form submission for the user
  return (
    <>
      <PageHeading heading="Finish Match" />
      <h1 className="mx-4 mt-4 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl">
        Choose the outcome of the match:
      </h1>
      <div className="flex flex-col gap-4 justify-center w-full p-4">
        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center gap-2">
              <CodeIcon className="h-6 w-6" />
              <div className="text-sm font-bold leading-none">Manual</div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You can manually refresh your data at any time.
            </p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="p-4">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-6 w-6" />
              <div className="text-sm font-bold leading-none">Automatic</div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your data will be automatically refreshed every 5 minutes.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center gap-2">
              <WifiIcon className="h-6 w-6" />
              <div className="text-sm font-bold leading-none">Real-time</div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your data will be updated in real-time as changes occur.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function WifiIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 13a10 10 0 0 1 14 0" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <line x1="12" x2="12.01" y1="20" y2="20" />
    </svg>
  );
}
