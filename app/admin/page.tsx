import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import MatchCard from "@/components/admin/MatchCard";
import { Matches } from "@/model/Match";
import { getAllMatches } from "@/services/matches";
import { Suspense } from "react";
import LoadingState from "../loading";

async function page() {
  const matches = JSON.parse(
    JSON.stringify(await getAllMatches())
  ) as Matches[];

  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <PageHeading
          heading="Match Fixtures"
          isPrimaryButton={true}
          primaryButtonLink="/admin/match/add-fixtures"
          primaryButtonText="Add Fixtures"
        />
        {matches.length === 0 && (
          <EmptyState
            text="No matches added, click here to add fixtures"
            link={"/admin/match/add-fixtures"}
          />
        )}
        <div className="my-8 w-full mx-4 flex flex-row flex-wrap gap-8">
          {matches.map((match, i) => (
            <MatchCard key={i} {...match} />
          ))}
        </div>
      </Suspense>
    </>
  );
}

export default page;
