import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Pagination from '../components/Pagination';
import { searchMovies } from '../services/api';
import { Movie } from '../types/movie';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(query, currentPage);
        
        // Filter out items without title/name and poster_path
        const filteredResults = data.results
          .filter((item: any) => 
            (item.title || item.name) && 
            item.poster_path &&
            (item.media_type === 'movie' || item.media_type === 'tv')
          )
          .map((item: any) => ({
            id: item.id,
            title: item.title || item.name,
            poster_path: item.poster_path,
            vote_average: item.vote_average || 0,
            release_date: item.release_date || item.first_air_date || '',
            isTV: item.media_type === 'tv'
          }));

        setResults(filteredResults);
        setTotalPages(Math.min(data.total_pages, 500));
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to perform search. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <LoadingSpinner />
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <ErrorMessage message={error} />
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        {query ? `Search Results for "${query}"` : 'Search Movies & TV Shows'}
      </h1>
      
      {results.length === 0 ? (
        <p className="text-white text-center text-lg">
          {query ? 'No results found' : 'Enter a search term to find movies and TV shows'}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {results.map((item) => (
              <MovieCard
                key={item.id}
                id={item.id}
                title={item.title}
                posterPath={item.poster_path}
                rating={item.vote_average}
                releaseDate={item.release_date}
                isTV={item.isTV}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}