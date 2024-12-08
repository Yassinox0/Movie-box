import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useWatchlist } from '../contexts/WatchlistContext';
import { getImageUrl } from '../services/api';
import MovieModal from './MovieDetails/MovieModal';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  releaseDate: string;
  highQuality?: boolean;
  onRemove?: () => void;
  isTV?: boolean;
}

export default function MovieCard({ 
  id, 
  title, 
  posterPath, 
  rating, 
  releaseDate, 
  highQuality = false, 
  onRemove,
  isTV = false 
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const imageSize = highQuality ? 'original' : 'w500';
  const isFavorite = isInWatchlist(id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      alert('Please sign in to add movies to your watchlist');
      return;
    }
    if (isFavorite) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist({
        id,
        title,
        name: isTV ? title : undefined,
        poster_path: posterPath,
        vote_average: rating,
        release_date: !isTV ? releaseDate : undefined,
        first_air_date: isTV ? releaseDate : undefined
      });
    }
  };

  return (
    <>
      <div
        className="relative group cursor-pointer transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <div className={`relative overflow-hidden rounded-lg transform transition-transform duration-300 ${isHovered ? 'scale-105 shadow-xl' : ''}`}>
          <img 
            src={getImageUrl(posterPath, imageSize)}
            alt={title}
            className="w-full h-[400px] object-cover transition-transform duration-300"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{title}</h3>
              <div className="flex items-center justify-between text-gray-200 text-sm">
                <div className="flex items-center gap-2">
                  <span className="flex items-center">
                    <span className="text-yellow-400">⭐</span> 
                    <span className="ml-1">{rating.toFixed(1)}</span>
                  </span>
                  <span>•</span>
                  <span>{isTV ? new Date(releaseDate).getFullYear() : new Date(releaseDate).getFullYear()}</span>
                </div>
                <button
                  onClick={toggleFavorite}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-6 w-6" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MovieModal
        movieId={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isTV={isTV}
      />
    </>
  );
}