import { useWatchlist } from '../contexts/WatchlistContext';
import { useAuth } from '../contexts/AuthContext';
import MovieCard from '../components/MovieCard';

export default function Watchlist() {
  const { currentUser } = useAuth();
  const { watchlist, removeFromWatchlist } = useWatchlist();

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your watchlist</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="text-white text-center">Your watchlist is empty</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {watchlist.map((item) => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.name || item.title}
              posterPath={item.poster_path}
              rating={item.vote_average}
              releaseDate={item.first_air_date || item.release_date}
              onRemove={() => removeFromWatchlist(item.id)}
              isTV={Boolean(item.first_air_date)}
            />
          ))}
        </div>
      )}
    </div>
  );
}