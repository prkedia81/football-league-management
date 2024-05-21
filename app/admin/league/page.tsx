import PageHeading from "@/components/admin/Heading";
import LeagueTable from "@/components/league/LeagueTable";
import React from "react";

function page() {
  return (
    <>
      <PageHeading heading="League Table" />
      <LeagueTable />
    </>
  );
}

export default page;
