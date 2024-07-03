import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import { Matches } from "@/model/Match";
import { getAllMatches } from "@/services/matches";
import { Suspense } from "react";
import LoadingState from "../../loading";
import DisplayMatchesComponent from "@/components/admin/DisplayMatchesComponent";

export const dynamic = "force-dynamic";

async function page() {
  const matches = JSON.parse(
    JSON.stringify(await getAllMatches())
  ) as Matches[];

  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <PageHeading heading="Match Sequence" />
      </Suspense>
      <Suspense fallback={<LoadingState />}>
        {matches.length === 0 && (
          <EmptyState
            text="No matches added, click here to add fixtures"
            link={"/admin/match/add-fixtures"}
          />
        )}
        <DisplayMatchesComponent matches={matches} isAdmin={false} />
        {/* <div className="my-8 w-full mx-4 flex flex-row flex-wrap gap-8">
          {matches.map((match, i) => (
            <MatchCard key={i} {...match} />
          ))}
        </div> */}
      </Suspense>
    </>
  );
}

export default page;
