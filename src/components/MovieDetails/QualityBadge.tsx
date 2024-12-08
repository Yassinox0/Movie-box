import { motion } from 'framer-motion';

interface QualityBadgeProps {
  quality: string;
  className?: string;
}

export default function QualityBadge({ quality, className = '' }: QualityBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`px-2 py-1 bg-blue-600 rounded text-xs font-semibold text-white shadow-lg ${className}`}
    >
      {quality}
    </motion.div>
  );
}