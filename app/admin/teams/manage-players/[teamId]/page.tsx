interface Props {
  params: { teamId: string };
}

export default function page({ params: { teamId } }: Props) {
  // TODO: Upload Player list in excel, see already uploaded players in table, add single player
  return <p>Finish match logic HERE: {teamId}</p>;
}
