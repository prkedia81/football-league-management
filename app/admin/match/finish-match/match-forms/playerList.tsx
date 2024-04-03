'use client'
import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { getAllPlayers } from '@/services/players';

// Define the list of people
interface Person {
  playerID: string; // Changed from number to string, assuming playerID is a string in the backend
  name: string;
  selected: boolean;
}

// Main component
export function PlayerList() {
  // Initialize state for the people array
  const [people, setPeople] = useState<Person[]>([]);

  // Function to fetch player data from the backend
  const fetchPlayerData = async () => {
    try {
      // Fetch player data from the backend
      const players = await getAllPlayers();
      // Map the fetched player data to the Person interface
      const peopleData: Person[] = players.map((player: any) => ({
        playerID: player._id, // Assuming player._id is the unique identifier for players
        name: player.name,
        selected: false // Assuming initially no player is selected
      }));
      // Update the state with the fetched player data
      setPeople(peopleData);
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  // Fetch player data from the backend when the component mounts
  useEffect(() => {
    fetchPlayerData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Function to handle the checkbox change
  const handleCheckboxChange = (id: string) => {
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
    ));
  };

  // Render the list of people
  return <>{renderPeople()}</>;
}
