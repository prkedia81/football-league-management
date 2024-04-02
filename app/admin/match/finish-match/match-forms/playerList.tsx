'use client'
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";

// Define the list of people
interface Person {
 playerID: number;
 name: string;
 selected: boolean;
}

// Main component
export function playerList() {
 // Initialize state for the people array
 const [people, setPeople] = useState<Person[]>([
    { playerID: 1, name: "John Doe", selected: false },
    { playerID: 2, name: "Jane Smith", selected: false },
    { playerID: 3, name: "Bob Johnson", selected: false },
 ]);

 // Function to handle the checkbox change
 const handleCheckboxChange = (id: number) => {
    setPeople(
      people.map((person) =>
        person.playerID === id ? { ...person, selected: !person.selected } : person
      )
    );
 };

 // Function to render the list of people with checkboxes
 const renderPeople = () => {
    return people.map((person) => (
      <div key={person.playerID} className="flex items-center space-x-2">
        <Checkbox
          id={`person-${person.playerID}`}
          checked={person.selected}
          onChange={() => handleCheckboxChange(person.playerID)}
        />
        <label
          htmlFor={`person-${person.playerID}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {person.name}
        </label>
      </div>
    ))
 }

 return (
 <>
 {renderPeople()}
 </>
 )
}