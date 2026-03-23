module.exports = async (req, res) => {
  const API_KEY = process.env.FINNHUB_API_KEY;
  
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      finnhub_configured: !!API_KEY,
      node_env: process.env.NODE_ENV || 'development'
    },
    endpoints: {
      '/api/stock': 'Stock data proxy (Finnhub)',
      '/api/proxy': 'VPS data proxy',
      '/api/health': 'Health check'
    },
    version: '1.0.0',
    features: {
      'crypto_tracking': true,
      'stock_tracking': true,
      'secure_api_key': true,
      'caching': true,
      'fallback_data': true
    }
  };
  
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(health);
};
