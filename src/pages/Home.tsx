import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import HeroCarousel from '../components/HeroCarousel';
import FilterBar from '../components/FilterBar';
import { fetchTrending, fetchMovies, fetchTVShows } from '../services/api';
import { Movie } from '../types/movie';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingShows, setTrendingShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const [moviesData, showsData] = await Promise.all([
          fetchMovies(1, selectedGenre, selectedProvider),
          fetchTVShows(1, selectedGenre, selectedProvider)
        ]);
        setTrendingMovies(moviesData.results.slice(0, 10));
        setTrendingShows(showsData.results.slice(0, 10));
      } catch (err) {
        setError('Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [selectedGenre, selectedProvider]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-gray-900">
      <HeroCarousel />
      <div className="container mx-auto px-4 py-8">
        <FilterBar
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
        />

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Trending Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {trendingMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
                releaseDate={movie.release_date}
                isTV={false}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Popular TV Shows</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {trendingShows.map((show) => (
              <MovieCard
                key={show.id}
                id={show.id}
                title={show.name || show.title}
                posterPath={show.poster_path}
                rating={show.vote_average}
                releaseDate={show.first_air_date || show.release_date}
                isTV={true}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}