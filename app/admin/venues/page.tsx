import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import VenueCard from "@/components/admin/VenueCard";
import { Venues } from "@/model/Venue";
import { getAllVenues } from "@/services/venues";

async function page() {
  // const teams = JSON.parse(JSON.stringify(await getAllTeams())) as Teams[];
  // const venues: any[] = [];
  const venues = JSON.parse(JSON.stringify(await getAllVenues())) as Venues[];

  return (
    <>
      <PageHeading
        heading="League Venues"
        isPrimaryButton={true}
        primaryButtonLink="/admin/venues/add-venues"
        primaryButtonText="Add Venues"
      />
      {venues.length === 0 && (
        <EmptyState
          text="No venues added, click here to add venues"
          link={"/admin/venues/add-venues"}
        />
      )}
      <div className="mt-4 mx-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue, i) => (
          <VenueCard key={i} {...venue} />
        ))}
      </div>
    </>
  );
}

export default page;
