import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Movie } from '../types/movie';

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | null>(null);

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      // Load watchlist from localStorage for the specific user
      const savedWatchlist = localStorage.getItem(`watchlist_${currentUser.uid}`);
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist));
      }
    } else {
      setWatchlist([]);
    }
  }, [currentUser]);

  const addToWatchlist = (movie: Movie) => {
    if (currentUser) {
      setWatchlist((prev) => {
        const newWatchlist = [...prev, movie];
        localStorage.setItem(`watchlist_${currentUser.uid}`, JSON.stringify(newWatchlist));
        return newWatchlist;
      });
    }
  };

  const removeFromWatchlist = (movieId: number) => {
    if (currentUser) {
      setWatchlist((prev) => {
        const newWatchlist = prev.filter((movie) => movie.id !== movieId);
        localStorage.setItem(`watchlist_${currentUser.uid}`, JSON.stringify(newWatchlist));
        return newWatchlist;
      });
    }
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}