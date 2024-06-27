import AddElement from "@/components/admin/AddElement";
import { createBulkNewVenue, createNewVenue } from "@/services/venues";
import AddSingleVenue from "./AddSingleVenue";

export interface AddVenueInput {
  name: string;
  regId: string;
  email: string;
}

export interface VenueListUpload extends AddVenueInput {
  srNum: number;
}

const page = () => {
  const cellNames = ["srNum", "name", "regId", "email"];

  const handleUpload = async (data: VenueListUpload[]) => {
    "use server";
    const response = await createBulkNewVenue(data);
    return response;
  };

  const handleSingleUpload = async (data: AddVenueInput) => {
    "use server";
    const response = await createNewVenue(data);
    return response;
  };

  const bulkSuccessFailModal = {
    modalSuccessHeading: "All venues added",
    modalSuccessBody: "All venues uploaded via the excel file have been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin/venues",
    modalFailHeading: "There was some error",
    modalFailBody:
      "The Venue List could not be added. Please make sure you added them in the format that was provided and try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin/venues",
  };

  const singleSuccessFailModal = {
    modalSuccessHeading: "Venue added",
    modalSuccessBody: "The venue has been added.",
    modalSuccessButtonText: "Go to home",
    modalSuccessButtonLink: "/admin/venues",
    modalFailHeading: "There was some error",
    modalFailBody: "The venue could not be added. Please try again.",
    modalFailButtonText: "Try Again",
    modalFailButtonLink: "/admin/venues",
  };

  return (
    <>
      <AddElement
        pageHeading="Add Venues"
        uploadZoneText="Upload file with all venues (.xls, .xlsx)"
        addSingleElementForm={
          <AddSingleVenue
            handleAddFn={handleSingleUpload}
            {...singleSuccessFailModal}
          />
        }
        uploadTableCaption="A list of added venues."
        uploadButtonText="Upload venues in the league"
        handleUploadFn={handleUpload}
        cellNames={cellNames}
        {...bulkSuccessFailModal}
      />
    </>
  );
};

export default page;
