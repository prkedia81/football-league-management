import Team, { Teams } from "@/model/Team";
import connectMongo from "../lib/mongoConnect";
import { club } from "@/utils/clubs";

export async function leagueTable(data: any[]) {
  await connectMongo();

  // Process input data to update team documents
  await Promise.all(
    data.map(async (item) => {
      if (item.length === 0) return;
      const row = {
        rank: item[0],
        regId: item[1],
        name: item[2],
        teamCode: item[3],
        matches: item[4],
        points: item[5],
        wins: item[6],
        losses: item[7],
        draws: item[8],
        goalDifference: item[9],
        goalsFor: item[10],
        goalsAgainst: item[11],
      };
    })
  );

  // Function to get the league table
  async function getLeagueTable(): Promise<Teams[]> {
    const teams = await Team.find({});

    // Sort teams by rank in descending order to infer rank
    teams.sort((a, b) => (b.points ?? 0) - (a.points ?? 0));

    // Calculate points for each team
    const updatedTeams = await Promise.all(
      teams.map((team) => updateTeamPoints(team._id))
    );

    return updatedTeams;
  }

  return getLeagueTable();
}

/**
 * Calculates and updates the points for a team.
 * @param {string} teamId - The ID of the team to update.
 * @returns {Promise<Team>} - The updated team document.
 */
async function updateTeamPoints(teamId: string): Promise<Teams> {
  try {
    // Find the team by ID
    const team = await getTeamFromId(teamId);
    if (!team) {
      throw new Error("Team not found");
    }

    // Calculate points
    let points = team.matchesWon * 3 + team.matchesDrawn;
    const goalDifference = team.goalScoredFor - team.goalScoredAgainst;

    // Calculate penalty points
    const penMatch = team.penalty || [];
    let penPoints = 0;
    for (let i = 0; i < penMatch.length; i++) {
      penPoints += penMatch[i].number;
    }

    // Deduct penalty points from total points
    points -= penPoints;

    // Update the team's points and other details for table
    team.goalDifference = goalDifference;
    team.points = points;
    await team.save();

    return team;
  } catch (error) {
    console.error("Error updating team points:", error);
    throw error;
  }
}
