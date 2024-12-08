import { StarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface RatingDisplayProps {
  type: 'imdb' | 'rottenTomatoes';
  rating: number;
  votes: number | null;
}

export default function RatingDisplay({ type, rating, votes }: RatingDisplayProps) {
  const formattedRating = type === 'imdb' ? rating.toFixed(1) : `${Math.round(rating)}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
    >
      <div className="flex items-center gap-1.5">
        {type === 'imdb' ? (
          <StarIcon className="h-6 w-6 text-yellow-400" />
        ) : (
          <span className="text-red-500 font-bold">RT</span>
        )}
        <span className="text-xl font-bold">{formattedRating}</span>
      </div>
      {votes && (
        <span className="text-sm text-gray-400">
          ({votes.toLocaleString()} votes)
        </span>
      )}
    </motion.div>
  );
}