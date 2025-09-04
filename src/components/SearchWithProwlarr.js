import React, { useState } from 'react';
import prowlarrService from '../services/prowlarrService';

const SearchWithProwlarr = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const searchResults = await prowlarrService.searchContent(query, {
        type: 'movie',
        limit: 50
      });
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (release) => {
    try {
      await prowlarrService.downloadRelease(release.downloadUrl, release.indexerId);
      alert('Téléchargement lancé !');
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher des films..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Recherche...' : 'Rechercher'}
        </button>
      </form>
      <div className="results">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            <h3>{result.title}</h3>
            <p>Taille: {(result.size / 1024 / 1024).toFixed(2)} MB</p>
            <p>Indexeur: {result.indexer}</p>
            <p>Âge: {result.ageHours?.toFixed(1)} heures</p>
            <button onClick={() => handleDownload(result)}>
              Télécharger
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchWithProwlarr;
