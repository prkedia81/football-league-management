import React, { useState } from "react";

const TimePicker = ({ initialTime, onChange }) => {
  const [selectedTime, setSelectedTime] = useState(initialTime);

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    onChange(e.target.value);
  };

  return (
    <input
      type="time"
      value={selectedTime}
      onChange={handleTimeChange}
      className="time-picker"
    />
  );
};

export default TimePicker;