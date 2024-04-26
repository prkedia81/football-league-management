interface Props {
  params: { matchId: string };
}

export default async function page({ params: { matchId } }: Props) {
  return <p>Details: {matchId}</p>;
}
