import Custom404 from "@/app/(home)/500";
import SuccessComponent from "@/components/admin/finishMatch/SuccessComponent";
import { cancelMatch } from "@/services/matches";

interface Props {
  params: { matchId: string };
}

export default async function page({ params: { matchId } }: Props) {
  const cancel = await cancelMatch(matchId);

  if (!cancel) return <Custom404 />;
  return (
    <>
      <SuccessComponent
        successText="Match Cancelled"
        successSubtext="Match Cancelled with 0-0 score"
      />
    </>
  );
}
