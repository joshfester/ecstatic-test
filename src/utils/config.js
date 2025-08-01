import { loadConfig } from 'c12';
import path from 'path';

// Default configuration values
const defaults = {
  paths: {
    scraped: './scraped',
    scrapedWeb: './scraped/web',
    distParcel: './dist-parcel',
    distJampack: './dist-jampack',
    dist: './dist'
  },
  scrape: {
    depth: 3,
    method: 'httrack',
    timeout: 10,
    sockets: 16
  },
  build: {
    parcel: {
      cache: true,
      minify: true
    }
  },
  optimize: {
    jampack: {
      enabled: true
    }
  },
  deploy: {
    bunny: {
      accessKey: '',
      globalApiKey: '',
      storageZone: '',
      region: '',
      purgeUrl: ''
    }
  },
  logging: {
    level: 'info'
  }
};

let _config = null;

// Load configuration using c12
export async function loadEcstaticConfig() {
  if (_config) return _config;

  const { config } = await loadConfig({
    name: 'ecstatic',
    defaults
  });

  _config = config;
  return config;
}

// Get config synchronously (assumes loadEcstaticConfig was called first)
export function getConfig() {
  if (!_config) {
    throw new Error('Configuration not loaded. Call loadEcstaticConfig() first.');
  }
  return _config;
}

// Validate required deployment configuration
export function validateDeployConfig(config = getConfig()) {
  const { bunny } = config.deploy;
  const required = ['accessKey', 'globalApiKey', 'storageZone', 'purgeUrl'];
  const missing = required.filter(key => !bunny[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required deployment configuration: deploy.bunny.${missing.join(', deploy.bunny.')}`);
  }

  return bunny;
}

// Helper to resolve paths relative to project root
export function resolvePath(relativePath) {
  return path.resolve(process.cwd(), relativePath);
}