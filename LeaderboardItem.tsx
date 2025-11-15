import React from 'react';
import type { LeaderboardEntry } from '../types';

interface LeaderboardItemProps {
  item: LeaderboardEntry;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ item }) => {
  const getRankColors = () => {
    return {
      bgColor: 'bg-yellow-400',
      borderColor: 'border-l-yellow-400',
      textColor: 'text-pink-500',
    };
  };

  const { bgColor, borderColor, textColor } = getRankColors();
  const initial = item.name.charAt(0).toUpperCase();

  return (
    <a 
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg"
      aria-label={`View app ${item.name}, rank ${item.rank}`}
    >
      <div className="flex items-center justify-between gap-2 md:gap-4">
        {/* Rank and Name Bar */}
        <div className="flex-grow flex items-stretch h-14 md:h-16 shadow-lg">
          <div className="relative flex items-center justify-center w-14 md:w-16">
            <div className={`w-full h-full ${bgColor} flex items-center justify-center`}>
              <span className={`font-black text-2xl md:text-3xl ${textColor}`}>{item.rank}</span>
            </div>
            {/* Arrow shape */}
            <div className={`absolute top-0 -right-[0.99rem] h-full w-0 
                             border-t-[1.75rem] md:border-t-[2rem] border-t-transparent 
                             border-b-[1.75rem] md:border-b-[2rem] border-b-transparent 
                             border-l-[1rem] ${borderColor} z-10`}>
            </div>
          </div>
          <div className="flex-1 bg-white flex items-center pl-8">
            <span className="text-pink-500 font-bold text-base md:text-xl uppercase tracking-wider">
              {item.name}
            </span>
          </div>
        </div>

        {/* Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 p-1 bg-white/30 rounded-md flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-sm flex items-center justify-center">
            <span className="text-blue-900 font-black text-3xl md:text-4xl select-none">
              {initial}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default LeaderboardItem;
