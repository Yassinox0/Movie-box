const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string, size: string = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export async function fetchTrending(mediaType: 'movie' | 'tv', timeWindow: 'day' | 'week') {
  try {
    const response = await fetch(
      `${API_BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch trending content');
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending content:', error);
    throw error;
  }
}

export async function fetchMovies(page = 1, genre = '', provider = '') {
  try {
    let url = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc&include_adult=false`;
    if (genre) url += `&with_genres=${genre}`;
    if (provider) url += `&with_watch_providers=${provider}&watch_region=US`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export async function fetchTVShows(page = 1, genre = '', provider = '') {
  try {
    let url = `${API_BASE_URL}/discover/tv?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc&include_adult=false`;
    if (genre) url += `&with_genres=${genre}`;
    if (provider) url += `&with_watch_providers=${provider}&watch_region=US`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch TV shows');
    return await response.json();
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    throw error;
  }
}

export async function searchMovies(query: string, page = 1) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
    );
    if (!response.ok) throw new Error('Failed to search movies');
    return await response.json();
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}

export async function fetchMovieDetails(movieId: number, isTV = false) {
  try {
    const mediaType = isTV ? 'tv' : 'movie';
    const response = await fetch(
      `${API_BASE_URL}/${mediaType}/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos,watch/providers`
    );
    if (!response.ok) throw new Error(`Failed to fetch ${mediaType} details`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${isTV ? 'TV show' : 'movie'} details:`, error);
    throw error;
  }
}