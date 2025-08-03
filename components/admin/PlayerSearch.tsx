'use client';

import { useState, useMemo, useEffect } from 'react';
import { Players } from '@/model/Player';
import { Teams } from '@/model/Team';
import PlayerTable from './PlayerTable';
import { Input } from '../ui/input';

interface PlayerSearchProps {
  team: Teams;
  initialPlayers: Players[];
}

export default function PlayerSearch({ team, initialPlayers }: PlayerSearchProps) {
  const [query, setQuery] = useState('');

  // The useMemo hook filters the list whenever the query changes.
  const filteredPlayers = useMemo(() => {
    if (!query) {
      return initialPlayers;
    }
    return initialPlayers.filter(player =>
      player.name.toLowerCase().includes(query.toLowerCase()) ||
      (player.regId && player.regId.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, initialPlayers]);

  return (
    <>
      <div className="max-w-md mx-auto my-4 px-4">
        <Input
          type="search"
          className="w-full py-2 px-4 rounded-md shadow-sm"
          placeholder="Search for players Name/ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {filteredPlayers.length > 0 ? (
        <PlayerTable
          teamName={team.name}
          data={filteredPlayers}
          caption={"Table of players in " + team.name}
        />
      ) : (
        <p className='text-center text-gray-500'>No players found.</p>
      )}
    </>
  );
}