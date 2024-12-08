import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';
import { fetchTVShows } from '../services/api';
import { Movie } from '../types/movie';

export default function TVShows() {
  const [shows, setShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');

  useEffect(() => {
    const loadShows = async () => {
      try {
        setLoading(true);
        const data = await fetchTVShows(currentPage, selectedGenre, selectedProvider);
        setShows(data.results);
        setTotalPages(Math.min(data.total_pages, 500));
      } catch (err) {
        setError('Failed to fetch TV shows');
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, [currentPage, selectedGenre, selectedProvider]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Popular TV Shows</h1>

      <FilterBar
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {shows.map((show) => (
          <MovieCard
            key={show.id}
            id={show.id}
            title={show.name || show.title}
            posterPath={show.poster_path}
            rating={show.vote_average}
            releaseDate={show.first_air_date || show.release_date}
            highQuality={true}
            isTV={true}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}