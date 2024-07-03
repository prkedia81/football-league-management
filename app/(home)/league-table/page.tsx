import PageHeading from "@/components/admin/Heading";
import React from "react";
import LeagueTable from "../_components/LeagueTable";

export const dynamic = "force-dynamic";

function page() {
  return (
    <>
      <PageHeading heading="League Table" />
      <LeagueTable />
    </>
  );
}

export default page;
