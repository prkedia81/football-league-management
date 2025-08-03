'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import TeamCard from './TeamCard';
import { Types } from 'mongoose';

interface TeamWithPlayerCount {
  _id?: Types.ObjectId | string;
  name: string;
  matchesPlayed?: string[];
  teamCode: string;
  playerCount: number;
}

interface TeamSearchProps {
  initialTeams: TeamWithPlayerCount[];
}

export default function TeamSearch({ initialTeams }: TeamSearchProps) {
  const [query, setQuery] = useState('');

  const filteredTeams = useMemo(() => { 
    if (!query) {
      return initialTeams;
    }
    return initialTeams.filter((team: TeamWithPlayerCount) => 
      team.name.toLowerCase().includes(query.toLowerCase()) ||
      team.teamCode.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, initialTeams]);

  return (
    <div>
      <div className="max-w-md mx-auto my-4 px-4">
        <Input
          type="search"
          className="w-full py-2 px-4 rounded-md shadow-sm"
          placeholder="Search by Team Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="mt-4 mx-4 justify-center md:justify-normal flex flex-row flex-wrap gap-4">
        {filteredTeams.map((team: TeamWithPlayerCount, i: number) => (
          <TeamCard key={i} {...team} _id={team._id?.toString()} />
        ))}
      </div>
    </div>
  );
}