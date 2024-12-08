import { Video } from '../../types/movie';

interface MovieTrailerProps {
  videos?: {
    results: Video[];
  };
}

export default function MovieTrailer({ videos }: MovieTrailerProps) {
  if (!videos?.results?.length) return null;

  // Find the official trailer, or use the first video
  const trailer = videos.results.find(
    video => 
      video.type === 'Trailer' && 
      video.site === 'YouTube' &&
      (video.official || videos.results.length === 1)
  ) || videos.results[0];

  if (!trailer) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Trailer</h2>
      <div className="relative pb-[56.25%] overflow-hidden rounded-xl">
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&rel=0`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </section>
  );
}
