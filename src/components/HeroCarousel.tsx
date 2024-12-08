import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { fetchTrending, getImageUrl } from '../services/api';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function HeroCarousel() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const data = await fetchTrending('movie', 'week');
        setMovies(data.results.slice(0, 5));
      } catch (error) {
        console.error('Error loading carousel:', error);
      }
    };
    loadTrending();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [movies.length]);

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? movies.length - 1 : prev - 1;
      }
      return (prev + 1) % movies.length;
    });
  };

  if (!movies.length) return null;

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
          <img
            src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-4xl font-bold mb-4">{movie.title}</h2>
            <p className="text-lg max-w-2xl mb-4 line-clamp-3">{movie.overview}</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center">
                <span className="text-yellow-400 mr-1">⭐</span>
                {movie.vote_average.toFixed(1)}
              </span>
              <span>•</span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() => navigate('prev')}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={() => navigate('next')}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
}