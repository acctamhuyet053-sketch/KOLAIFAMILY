import React, { useEffect, useState } from 'react';
import Leaderboard from './components/Leaderboard';
import type { LeaderboardEntry } from './types';

const BackgroundText = () => (
  <>
    <div className="absolute top-0 left-0 -translate-x-10 -translate-y-12 text-[10rem] font-black text-blue-900 opacity-5 leading-none select-none z-0">
      <p>WINNER</p>
      <p>WINNER</p>
      <p>WINNER</p>
    </div>
    <div className="absolute bottom-0 right-0 translate-x-10 translate-y-12 text-[10rem] font-black text-blue-900 opacity-5 leading-none select-none z-0">
      <p>WINNER</p>
      <p>WINNER</p>
      <p>WINNER</p>
    </div>
  </>
);

const backgroundStyle = {
  backgroundColor: '#38bdf8',
};

const App: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(true);

  useEffect(() => {
    fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: LeaderboardEntry[]) => {
        setLeaderboardData(data);
        
        // Handle redirection logic after data is loaded
        const hash = window.location.hash.substring(1); // remove #
        if (hash) {
          const rankToFind = parseInt(hash, 10);
          if (!isNaN(rankToFind)) {
            const targetApp = data.find(app => app.rank === rankToFind);
            if (targetApp) {
              window.location.href = targetApp.url;
              return; // Stay in redirecting state while browser navigates away
            }
          }
        }
        // If no valid hash, or no matching app, show the leaderboard
        setShouldRedirect(false);
      })
      .catch(error => {
        console.error("Failed to load leaderboard data:", error);
        // Fallback or error display: show the board even if data fails to load
        setShouldRedirect(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (shouldRedirect || isLoading) {
    return (
      <main 
        className="min-h-screen w-full font-sans flex items-center justify-center p-4 relative"
        style={backgroundStyle}
      >
        <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
        <div className="text-center text-white relative z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-wide animate-pulse">FAMILY KOL AI</h1>
          <p className="text-xl md:text-2xl mt-4">Loading App...</p>
        </div>
      </main>
    );
  }


  return (
    <main 
      className="min-h-screen w-full font-sans flex items-center justify-center p-4 relative overflow-hidden"
      style={backgroundStyle}
    >
      <BackgroundText />
      <div className="relative z-10 w-full max-w-5xl">
        <Leaderboard data={leaderboardData} />
      </div>
      <footer className="absolute bottom-4 text-center text-black text-base w-full font-bold">
        APP VIP ĐƯỢC TẠO BỞI HỒNG DUYÊN 🎉
      </footer>
    </main>
  );
}

export default App;