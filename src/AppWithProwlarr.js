import React from 'react';
import SearchWithProwlarr from './components/SearchWithProwlarr';
import IndexerManager from './components/IndexerManager';

function App() {
  return (
    <div className="App">
      <h1>MovieApp avec Prowlarr</h1>
      <SearchWithProwlarr />
      <IndexerManager />
    </div>
  );
}

export default App;
