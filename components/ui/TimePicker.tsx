import React, { useState } from "react";

interface Props {
  initialTime: string;
  onChange: any;
}

const TimePicker = ({ initialTime, onChange }: Props) => {
  const [selectedTime, setSelectedTime] = useState(initialTime);

  const handleTimeChange = (e: any) => {
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
