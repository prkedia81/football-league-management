import { Matches } from "@/model/Match";
import { getTeamFromId } from "./teams";
import { getVenueFromId } from "./venues";
import { dateFormat, timeFormat } from "@/lib/utils";
import sendMail from "@/lib/emailer";
import { getMatchFromId } from "./matches";
import { getPlayerFromId } from "./players";
import { Players } from "@/model/Player";

// TODO: Edit from email, referee email etc
const FROM_EMAIL = "prannaykedia4@gmail.com";
const REFEREE_EMAIL = "timeforstudy5@gmail.com, prannaykedia1@gmail.com";

export async function rescheduleEmail(matchId: string) {
  const match = await getMatchFromId(matchId);
  const team1Id = match.team1.teamId || "";
  const team2Id = match.team2.teamId || "";
  const time = match.time;
  const venueData = match.venue;
  const [team1, team2, venue] = await Promise.all([
    getTeamFromId(team1Id),
    getTeamFromId(team2Id),
    getVenueFromId(venueData.venueId),
  ]);

  const fromEmail = FROM_EMAIL;
  const toEmail =
    team1?.email +
    ", " +
    team2?.email +
    ", " +
    venue?.email +
    ", " +
    REFEREE_EMAIL;

  const sub = `Rescheduled! The match ${team1?.name} v/s ${team2?.name} has been rescheduled.`;

  // TODO: Edit Phone Number
  const body = `The match between ${team1?.name} and ${
    team2?.name
  } has been re-scheduled with the following date, time and location:\n\n
  Date: ${dateFormat(time)}, ${timeFormat(time)}\n
  Location: ${venue?.name}\n\n
  Please reply back to this email for any problems or call at +91 8584011454\n\n

  Regards\n
  IFA (WB)`;

  const email = sendMail(fromEmail, toEmail, sub, body);
}

export async function normalEndMatchEmail(matchId: string) {
  const match = await getMatchFromId(matchId);
  const team1Id = match.team1.teamId || "";
  const team2Id = match.team2.teamId || "";
  const [team1, team2] = await Promise.all([
    getTeamFromId(team1Id),
    getTeamFromId(team2Id),
  ]);

  let yellowCardPromise = [];
  let yellowCardPlayers: Players[] = [];
  if (match.yellowCards) {
    yellowCardPromise = match.yellowCards?.map((id) => getPlayerFromId(id));
    yellowCardPlayers = await Promise.all(yellowCardPromise);
  }

  let redCardPromise = [];
  let redCardPlayers: Players[] = [];
  if (match.redCards) {
    redCardPromise = match.redCards?.map((id) => getPlayerFromId(id));
    redCardPlayers = await Promise.all(redCardPromise);
  }

  const fromEmail = FROM_EMAIL;
  const toEmail = team1?.email + ", " + team2?.email + ", " + REFEREE_EMAIL;

  const sub = `The result for the match - ${team1?.name} v/s ${team2?.name}.`;

  // TODO: Edit Phone number
  const body = `
    Dear Sir/ Ma'am,
    Below is the result for match between ${team1?.name} and ${team2?.name}:\n\n
    ${team1?.name} Score: ${match.team1Score}\n
    ${team2?.name} Score: ${match.team2Score}\n
    Yellow Cards:\n
    ${
      yellowCardPlayers.length !== 0
        ? yellowCardPlayers.map((player) => `- ${player.name}\n`)
        : "No Yellow Cards in the match\n"
    }
    Red Cards:\n
    ${
      redCardPlayers.length !== 0
        ? redCardPlayers.map((player) => `- ${player.name}\n`)
        : "No Red Cards in the match\n"
    }
    \nPlease reply back to this email for any problems or call at +91 8584011454\n\n
  
    Regards\n
    IFA (WB)`;

  const email = sendMail(fromEmail, toEmail, sub, body);
}

export async function walkoverEndMatchEmail(matchId: string) {
  const match = await getMatchFromId(matchId);
  const team1Id = match.team1.teamId || "";
  const team2Id = match.team2.teamId || "";
  const [team1, team2] = await Promise.all([
    getTeamFromId(team1Id),
    getTeamFromId(team2Id),
  ]);

  let yellowCardPromise = [];
  let yellowCardPlayers: Players[] = [];
  if (match.yellowCards) {
    yellowCardPromise = match.yellowCards?.map((id) => getPlayerFromId(id));
    yellowCardPlayers = await Promise.all(yellowCardPromise);
  }

  let redCardPromise = [];
  let redCardPlayers: Players[] = [];
  if (match.redCards) {
    redCardPromise = match.redCards?.map((id) => getPlayerFromId(id));
    redCardPlayers = await Promise.all(redCardPromise);
  }

  const fromEmail = FROM_EMAIL;
  const toEmail = team1?.email + ", " + team2?.email + ", " + REFEREE_EMAIL;

  const sub = `Walkover! The result for the match - ${team1?.name} v/s ${team2?.name}.`;

  // TODO: Edit Phone Number
  const body = `
      Dear Sir/ Ma'am,
      The match ended in a walkover. Below is the result for match between ${
        team1?.name
      } and ${team2?.name}:\n\n
      ${team1?.name} Score: ${match?.team1Score}\n
      ${team2?.name} Score: ${match?.team2Score}\n
      Yellow Cards:\n
      ${
        yellowCardPlayers.length !== 0
          ? yellowCardPlayers.map((player) => `- ${player.name}\n`)
          : "No Yellow Cards in the match\n"
      }
      Red Cards:\n
      ${
        redCardPlayers.length !== 0
          ? redCardPlayers.map((player) => `- ${player.name}\n`)
          : "No Red Cards in the match\n"
      }
      \nPlease reply back to this email for any problems or call at +91 8584011454\n\n
    
      Regards\n
      IFA (WB)`;

  const email = sendMail(fromEmail, toEmail, sub, body);
}
