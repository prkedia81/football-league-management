interface Props {
  params: { matchId: string };
}

export default function page({ params: { matchId } }: Props) {
  return <p>Re-Cancel Logic HERE: {matchId}</p>;
}
