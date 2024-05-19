import Team from "@/model/Team";
import connectMongo from "../lib/mongoConnect";

// Define the structure of the Team document in MongoDB using an interface
interface ITeam {
  regId: string;
  name: string;
  teamCode: string;
  matches: number;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  goalDifference: number;
  goalsFor: number;
  goalsAgainst: number;
}

// Define the structure of the penalty object if applicable
interface IPenalty {
  number: number;
}

// Team model might need to be expanded to include methods and additional properties
interface TeamModel extends ITeam {
  penalties?: IPenalty[];
  save(): Promise<TeamModel>;
}

// Function to update or create team data in the database
export async function leagueTable(data: ITeam[]): Promise<TeamModel[]> {
  await connectMongo();

  // Update each team entry in the database
  const updates = data.map((teamData) => {
    const updateData = {
      ...teamData,
      goalDifference: teamData.goalsFor - teamData.goalsAgainst,
    };
    return Team.findOneAndUpdate({ regId: teamData.regId }, updateData, {
      upsert: true,
      new: true,
    });
  });

  // Wait for all updates to complete
  await Promise.all(updates);

  // Retrieve and return the updated team list sorted by points
  const updatedTeams = await Team.find({}).sort({ points: -1 });
  return updatedTeams;
}

// Function to calculate the points of a team based on wins, draws, and penalties
async function calculateTeamPoints(teamId: string): Promise<number> {
  const team: TeamModel | null = await Team.findById(teamId);
  if (!team) return 0;

  let points = team.wins * 3 + team.draws;
  const penaltyPoints =
    team.penalties?.reduce((acc, penalty) => acc + penalty.number, 0) || 0;
  points -= penaltyPoints;

  return points;
}
