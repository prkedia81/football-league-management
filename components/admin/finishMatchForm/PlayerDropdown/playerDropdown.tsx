'use client'
import { useState, ReactNode } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PlayerDropdownProps {
 players: { id: number; name: string }[];
 children: ReactNode;
 onChange: (...event: any[]) => void;
}

const PlayersDropdown = ({ players, children }: PlayerDropdownProps) => {
 const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

 const handleSelectChange = (value: string) => {
    setSelectedPlayer(value);
 };

 return (
    <div>
      <Select onChange={handleSelectChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a player" value={selectedPlayer} />
        </SelectTrigger>
        <SelectContent>
          {players.map((player) => (
            <SelectItem key={player.id} value={player.name}>
              {player.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {children}
    </div>
 );
};

export default PlayersDropdown;