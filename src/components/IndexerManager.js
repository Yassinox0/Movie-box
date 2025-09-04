import React, { useState, useEffect } from 'react';
import prowlarrService from '../services/prowlarrService';

const IndexerManager = () => {
  const [indexers, setIndexers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIndexers();
  }, []);

  const loadIndexers = async () => {
    try {
      const indexersData = await prowlarrService.getIndexers();
      setIndexers(indexersData);
    } catch (error) {
      console.error('Error loading indexers:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleIndexer = async (indexerId, enabled) => {
    try {
      // Implémenter la logique pour activer/désactiver un indexeur
      // via l'API PUT /api/v1/indexer/{id}
      await loadIndexers(); // Recharger la liste
    } catch (error) {
      console.error('Error toggling indexer:', error);
    }
  };

  if (loading) return <div>Chargement des indexeurs...</div>;

  return (
    <div>
      <h2>Gestion des Indexeurs</h2>
      {indexers.map((indexer) => (
        <div key={indexer.id} className="indexer-item">
          <h3>{indexer.name}</h3>
          <p>Status: {indexer.enable ? 'Actif' : 'Inactif'}</p>
          <p>Protocole: {indexer.protocol}</p>
          <button onClick={() => toggleIndexer(indexer.id, !indexer.enable)}>
            {indexer.enable ? 'Désactiver' : 'Activer'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default IndexerManager;
