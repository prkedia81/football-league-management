import React from "react";

function Remarks() {
  return (
    <textarea
      rows={4}
      name="remarks"
      id="remarks"
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      defaultValue={""}
    />
  );
}

export default Remarks;
