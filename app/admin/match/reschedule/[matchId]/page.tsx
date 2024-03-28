interface Props {
  params: { matchId: string };
}

export default function page({ params: { matchId } }: Props) {
  // TODO: From matchId, get match details from the DB
  // Add a form and get match data in a pre-filled form
  // Have date picker and time picker in the form
  // Add a validation on the venue, do check -> In venue, at the date is there any other match
  // QUESTION: What about a match in the morning and one match in the evening
  // OR Overlap in the 90 minutes

  return <p>Re-schedule Logic HERE: {matchId}</p>;
}
