import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

function page() {
  // TODO: Get list of fixtures from DB Call
  // If DB call empty -> display empty state
  return (
    <>
      <PageHeading heading="Match Fixtures" />
      <EmptyState
        text="No matches added, click here to add fixtures"
        link={"/admin/add-fixtures"}
      />
    </>
  );
}

export default page;
