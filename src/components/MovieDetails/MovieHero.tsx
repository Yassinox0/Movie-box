import { Movie } from '../../types/movie';
import { getImageUrl } from '../../services/api';
import { StarIcon, ClockIcon, CalendarIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import QualityBadge from './QualityBadge';
import RatingDisplay from './RatingDisplay';
import LanguageSelector from './LanguageSelector';

interface MovieHeroProps {
  movie: Movie;
}

export default function MovieHero({ movie }: MovieHeroProps) {
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const director = movie.credits?.crew?.find(crew => crew.job === 'Director');
  const mainCast = movie.credits?.cast?.slice(0, 3) || [];

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden" aria-label="Movie hero section">
      {/* High-quality backdrop with gradient overlay */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          src={getImageUrl(movie.backdrop_path || '', 'original')}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie poster */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden md:block flex-shrink-0"
            >
              <div className="relative w-64 rounded-lg overflow-hidden shadow-2xl group">
                <img
                  src={getImageUrl(movie.poster_path, 'original')}
                  alt={`${movie.title} poster`}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
                />
                <QualityBadge quality="4K HDR" className="absolute top-2 right-2" />
              </div>
            </motion.div>

            {/* Movie details */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex-1 text-white"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="text-xl text-gray-300 mb-6 italic">"{movie.tagline}"</p>
              )}

              {/* Meta information row */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base">
                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>

                {movie.runtime && (
                  <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
                  <UserGroupIcon className="h-4 w-4 text-gray-400" />
                  <span>PG-13</span>
                </div>

                <LanguageSelector 
                  languages={['English', 'Spanish', 'French']} 
                  subtitles={['English', 'Spanish']}
                />
              </div>

              {/* Ratings */}
              <div className="flex flex-wrap gap-6 mb-8">
                <RatingDisplay
                  type="imdb"
                  rating={movie.vote_average}
                  votes={movie.vote_count}
                />
                <RatingDisplay
                  type="rottenTomatoes"
                  rating={85}
                  votes={null}
                />
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-1.5 bg-gray-800/50 rounded-full text-sm font-medium hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Credits */}
              {director && (
                <p className="text-gray-300 mb-4">
                  Directed by <span className="text-white font-medium hover:text-blue-400 cursor-pointer transition-colors">{director.name}</span>
                </p>
              )}

              {mainCast.length > 0 && (
                <p className="text-gray-300 mb-6">
                  Starring{' '}
                  {mainCast.map((actor, index) => (
                    <span key={actor.id}>
                      <span className="text-white font-medium hover:text-blue-400 cursor-pointer transition-colors">{actor.name}</span>
                      {index < mainCast.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              )}

              {/* Overview */}
              <p className="text-lg leading-relaxed max-w-3xl mb-8 line-clamp-3 hover:line-clamp-none transition-all duration-300">
                {movie.overview}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}