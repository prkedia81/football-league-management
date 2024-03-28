interface Props {
  params: { matchId: string };
}

export default function page({ params: { matchId } }: Props) {
  // TODO: Do a long multi-form submission for the user
  return <p>Finish match logic HERE: {matchId}</p>;
}
