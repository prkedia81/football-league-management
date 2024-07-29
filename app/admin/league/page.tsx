import PageHeading from "@/components/admin/Heading";
import LeagueTable from "@/components/league/LeagueTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React, { Suspense } from "react";
import LoadingState from "../loading";
import AllPlayerTable from "@/components/league/AllPlayerTable";

export const dynamic = "force-dynamic";

function page() {
  return (
    <>
      <PageHeading heading="League Table" />
      <Suspense fallback={<LoadingState />}>
        <div>
          <Tabs defaultValue="leagueTable" className="w-full">
            <div className="w-full flex flex-row items-center justify-center">
              <TabsList className="bg-gray-100 w-full rounded-none py-2">
                <TabsTrigger className="w-full" value="leagueTable">
                  League Table
                </TabsTrigger>
                <TabsTrigger className="w-full" value="playerList">
                  Player List
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="leagueTable">
              <LeagueTable />
            </TabsContent>
            <TabsContent value="playerList">
              <AllPlayerTable />
            </TabsContent>
          </Tabs>
        </div>
      </Suspense>
    </>
  );
}

export default page;
