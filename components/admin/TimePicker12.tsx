import React, { useState } from 'react';

interface TimePickerProps {
  value?: string;
  onChange: (time: string) => void;
}

const TimePicker12: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const [selectedTime, setSelectedTime] = useState(value || '12:00 PM');

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const time = event.target.value;
    setSelectedTime(time);
    console.log(time);   //just to check if it's working
  };

  return (
    <div>
      <label htmlFor="time-picker">Time </label>
      <select id="time-picker" value={selectedTime} onChange={handleTimeChange}>
        <option value="12:00 AM">12:00 AM</option>
        <option value="01:00 AM">01:00 AM</option>
        <option value="02:00 AM">02:00 AM</option>
        <option value="03:00 AM">03:00 AM</option>
        <option value="04:00 AM">04:00 AM</option>
        <option value="05:00 AM">05:00 AM</option>
        <option value="06:00 AM">06:00 AM</option>
        <option value="07:00 AM">07:00 AM</option>
        <option value="08:00 AM">08:00 AM</option>
        <option value="09:00 AM">09:00 AM</option>
        <option value="10:00 AM">10:00 AM</option>
        <option value="11:00 AM">11:00 AM</option>
        <option value="12:00 PM">12:00 PM</option>
        <option value="01:00 PM">01:00 PM</option>
        <option value="02:00 PM">02:00 PM</option>
        <option value="03:00 PM">03:00 PM</option>
        <option value="04:00 PM">04:00 PM</option>
        <option value="05:00 PM">05:00 PM</option>
        <option value="06:00 PM">06:00 PM</option>
        <option value="07:00 PM">07:00 PM</option>
        <option value="08:00 PM">08:00 PM</option>
        <option value="09:00 PM">09:00 PM</option>
        <option value="10:00 PM">10:00 PM</option>
        <option value="11:00 PM">11:00 PM</option>
      </select>
    </div>
  );
};

export default TimePicker12;