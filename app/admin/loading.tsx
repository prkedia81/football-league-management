import LoadingSpinner from "@/components/LoadingSpinner";
import React from "react";

function LoadingState() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );
}

export default LoadingState;
