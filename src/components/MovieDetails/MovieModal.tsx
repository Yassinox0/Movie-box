import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Movie } from '../../types/movie';
import { fetchMovieDetails } from '../../services/api';
import MovieHero from './MovieHero';
import MovieActions from './MovieActions';
import MovieCast from './MovieCast';
import MovieTrailer from './MovieTrailer';
import LoadingSpinner from '../LoadingSpinner';

interface MovieModalProps {
  movieId: number;
  isOpen: boolean;
  onClose: () => void;
  isTV?: boolean;
}

export default function MovieModal({ movieId, isOpen, onClose, isTV = false }: MovieModalProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && movieId) {
      const loadMovie = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await fetchMovieDetails(movieId, isTV);
          setMovie(data);
        } catch (error) {
          setError(`Failed to load ${isTV ? 'TV show' : 'movie'} details`);
        } finally {
          setLoading(false);
        }
      };
      loadMovie();
    }
  }, [movieId, isOpen, isTV]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative bg-gray-900 w-full min-h-screen">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>

            {loading ? (
              <div className="h-screen flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="h-screen flex items-center justify-center text-red-500">
                {error}
              </div>
            ) : movie ? (
              <div>
                <MovieHero movie={movie} />
                
                <div className="container mx-auto px-4 py-8">
                  <MovieActions movie={movie} />
                  {movie.credits?.cast && <MovieCast cast={movie.credits.cast} />}
                  <MovieTrailer videos={movie.videos} />
                </div>
              </div>
            ) : null}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}