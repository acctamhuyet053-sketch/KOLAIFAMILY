import React from 'react';
import type { LeaderboardEntry } from '../types';
import LeaderboardItem from './LeaderboardItem';

interface LeaderboardProps {
  data: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center w-full space-y-8">
      <div className="text-center text-blue-900 bg-white/80 backdrop-blur-sm p-4 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wider">TOP APP VIP</h2>
        <h1 className="text-4xl md:text-6xl font-black tracking-wide">FAMILY KOL AI</h1>
      </div>
      <div className="w-full flex flex-col gap-3">
        {data.map((entry) => (
          <LeaderboardItem key={entry.rank} item={entry} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
