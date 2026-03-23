const https = require('https');

const CACHE = new Map();
const CACHE_TTL = 60000; // 60 seconds

module.exports = async (req, res) => {
  const { ticker } = req.query;
  
  if (!ticker) {
    return res.status(400).json({ error: 'Missing ticker parameter' });
  }
  
  const API_KEY = process.env.FINNHUB_API_KEY;
  if (!API_KEY) {
    console.error('[STOCK_API] Missing FINNHUB_API_KEY environment variable');
    return res.status(500).json({ error: 'API key not configured' });
  }
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=60');
  
  // Check cache first
  const cacheKey = `stock:${ticker}`;
  const cachedData = CACHE.get(cacheKey);
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    console.log(`[STOCK_API] Cache hit for ${ticker}`);
    return res.status(200).json(cachedData.data);
  }
  
  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${API_KEY}`;
    
    console.log(`[STOCK_API] Fetching ${ticker} from Finnhub...`);
    
    const data = await new Promise((resolve, reject) => {
      const request = https.get(url, { timeout: 8000 }, (resp) => {
        if (resp.statusCode !== 200) {
          reject(new Error(`HTTP ${resp.statusCode}`));
          return;
        }
        
        let body = '';
        resp.on('data', chunk => body += chunk);
        resp.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            if (parsed.error) {
              reject(new Error(`Finnhub error: ${parsed.error}`));
            } else {
              resolve(parsed);
            }
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        });
      });
      
      request.on('error', reject);
      request.on('timeout', () => {
        request.destroy();
        reject(new Error('Request timeout (8s)'));
      });
    });
    
    // Cache the successful response
    CACHE.set(cacheKey, { data, timestamp: Date.now() });
    
    console.log(`[STOCK_API] Success: ${ticker} = $${data.c} (${data.dp}%)`);
    res.status(200).json(data);
    
  } catch (error) {
    console.error(`[STOCK_API] Error for ${ticker}:`, error.message);
    
    // Return cached data if available (even if expired)
    if (cachedData) {
      console.log(`[STOCK_API] Using stale cache for ${ticker}`);
      return res.status(200).json({...cachedData.data, _stale: true});
    }
    
    res.status(502).json({ 
      error: 'Failed to fetch stock data',
      ticker,
      detail: error.message,
      timestamp: new Date().toISOString()
    });
  }
};
