import { Movie } from '../../types/movie';
import { PlayIcon, HeartIcon, ShareIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { getImageUrl } from '../../services/api';
import { useWatchlist } from '../../contexts/WatchlistContext';
import { useAuth } from '../../contexts/AuthContext';

interface MovieActionsProps {
  movie: Movie;
}

export default function MovieActions({ movie }: MovieActionsProps) {
  const { currentUser } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const isSaved = isInWatchlist(movie.id);

  const handleWatchlistToggle = () => {
    if (!currentUser) {
      alert('Please sign in to add movies to your watchlist');
      return;
    }
    
    if (isSaved) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: movie.title,
        text: movie.overview,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm">
      <button
        className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors text-lg font-medium"
      >
        <PlayIcon className="h-6 w-6" />
        <span>Watch Now</span>
      </button>

      <button
        onClick={handleWatchlistToggle}
        className="p-3 hover:bg-gray-700/50 rounded-xl transition-colors"
        title={isSaved ? 'Remove from watchlist' : 'Add to watchlist'}
      >
        {isSaved ? (
          <HeartSolidIcon className="h-6 w-6 text-red-500" />
        ) : (
          <HeartIcon className="h-6 w-6" />
        )}
      </button>

      <button
        onClick={handleShare}
        className="p-3 hover:bg-gray-700/50 rounded-xl transition-colors"
        title="Share"
      >
        <ShareIcon className="h-6 w-6" />
      </button>

      <button 
        className="p-3 hover:bg-gray-700/50 rounded-xl transition-colors"
        title="More information"
      >
        <InformationCircleIcon className="h-6 w-6" />
      </button>

      {movie.watch_providers?.results?.US && (
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-sm text-gray-400">Available on:</span>
          <div className="flex items-center gap-2">
            {movie.watch_providers.results.US.flatrate?.map((provider) => (
              <img
                key={provider.provider_id}
                src={getImageUrl(provider.logo_path, 'original')}
                alt={provider.provider_name}
                className="h-8 w-8 rounded-lg"
                title={provider.provider_name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}