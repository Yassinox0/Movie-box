import PROWLARR_CONFIG from '../config/prowlarr';

class ProwlarrService {
  constructor(config) {
    this.baseUrl = `${config.protocol}://${config.baseUrl.replace(/https?:\/\//, '')}`;
    this.apiKey = config.apiKey;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions = {
      headers: {
        'X-Api-Key': this.apiKey,
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch(url, { ...defaultOptions, ...options });
    if (!response.ok) {
      throw new Error(`Prowlarr API error: ${response.status}`);
    }
    return response.json();
  }

  async searchContent(query, options = {}) {
    const params = new URLSearchParams({
      q: query,
      type: options.type || '',
      limit: options.limit || 20,
      offset: options.offset || 0,
      ...options
    });
    return this.makeRequest(`/api/v1/search?${params}`);
  }

  async getIndexers() {
    return this.makeRequest('/api/v1/indexer');
  }

  async testIndexer(indexerId) {
    return this.makeRequest(`/api/v1/indexer/test`, {
      method: 'POST',
      body: JSON.stringify({ id: indexerId })
    });
  }

  async getSearchHistory(options = {}) {
    const params = new URLSearchParams({
      page: options.page || 1,
      pageSize: options.pageSize || 10,
      ...options
    });
    return this.makeRequest(`/api/v1/history?${params}`);
  }

  async downloadRelease(releaseId, indexerId) {
    const params = new URLSearchParams({
      link: releaseId
    });
    return this.makeRequest(`/api/v1/indexer/${indexerId}/download?${params}`);
  }
}

export default new ProwlarrService(PROWLARR_CONFIG);
