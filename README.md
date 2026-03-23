# Apex Meridian Terminal

A sophisticated investment dashboard tracking trading bots across Polymarket (APEX) and OKX (MERIDIAN), with live crypto and stock market data.

**🔗 Live Demo:** [Deploy to Vercel](#deployment)

---

## 🎯 Features

### Dashboard
- 📊 **Real-time Portfolio Tracking** — Total value, P&L, buying power
- 🤖 **Bot Status Monitoring** — APEX (Polymarket) & MERIDIAN (OKX) live status
- 📈 **Interactive Chart** — Scrubbing history with touch support (1D/1W/1M/ALL)
- 💾 **Position Management** — Grouped positions, entry prices, P&L tracking

### Market Data
- 🪙 **Crypto Prices** — BTC, ETH, SOL, XRP, DOGE (Binance, 15s refresh)
- 📈 **Stock Tracking** — ORCL, MSFT, GOOGL, TSLA (Finnhub, 30s refresh)
- 🏷️ **Visual Badges** — Distinguish crypto from stocks at a glance

### Backend
- 🔒 **Secure API Proxies** — Keys stored server-side only
- ⚡ **Smart Caching** — 60s cache with stale-while-revalidate
- 📡 **Error Recovery** — Falls back to cached data if API fails
- 🏥 **Health Checks** — `/api/health` endpoint for monitoring

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│        Frontend (index.html)             │
│  - React-less vanilla JS                 │
│  - Dark theme, mobile-optimized          │
│  - 4 tabs: Portfolio, Positions,         │
│    Trades, Markets                       │
└────────────┬────────────────────────────┘
             │
      ┌──────┴─────────────────┐
      │                        │
      ▼                        ▼
┌──────────────┐        ┌──────────────┐
│ /api/proxy   │        │  /api/stock  │
│ (VPS data)   │        │  (Finnhub)   │
└──────────────┘        └──────────────┘
      │                        │
      ▼                        ▼
┌──────────────┐        ┌──────────────┐
│  VPS Server  │        │ Finnhub API  │
│46.225.12.120 │        │ (stock data) │
└──────────────┘        └──────────────┘
```

**Frontend → Vercel Serverless Functions → External APIs**
- All API keys stored on Vercel, never exposed
- Automatic caching and error recovery
- CORS headers properly configured

---

## 🚀 Quick Start

### Local Development

```bash
# Install Vercel CLI
npm install -g vercel

# Create .env.local with your API key
echo "FINNHUB_API_KEY=your_key_here" > .env.local

# Run locally
vercel dev

# Open http://localhost:3000
```

### Production Deployment

```bash
# 1. Setup GitHub repo
git remote add origin <your-repo>
git push -u origin master

# 2. Deploy to Vercel
vercel --prod

# 3. Set environment variable
# Go to Vercel Dashboard → Project Settings → Environment Variables
# Add: FINNHUB_API_KEY=your_key_here

# 4. Verify
curl https://your-project.vercel.app/api/health
```

---

## 📦 File Structure

```
apex-meridian-terminal/
├── index.html              # Main dashboard (frontend)
├── data.json               # Portfolio data snapshot
├── history.json            # Historical portfolio values
├── api/
│   ├── proxy.js            # VPS data proxy
│   ├── stock.js            # Finnhub stock API proxy
│   └── health.js           # Health check endpoint
├── vercel.json            # Deployment config
├── .env.local             # Local dev secrets (git-ignored)
├── .env.example           # Env template
├── deploy.sh              # Deployment helper script
├── DEPLOYMENT.md          # Deployment guide
├── CONTROLS_GUIDE.md      # User controls documentation
└── README.md              # This file
```

---

## 🔌 API Endpoints

### `/api/health`
Health check and feature status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-23T12:34:56.789Z",
  "environment": {
    "finnhub_configured": true,
    "node_env": "production"
  },
  "features": {
    "crypto_tracking": true,
    "stock_tracking": true,
    "secure_api_key": true,
    "caching": true,
    "fallback_data": true
  }
}
```

### `/api/stock?ticker=ORCL`
Get stock price from Finnhub.

**Parameters:**
- `ticker` (string, required) — Stock symbol (ORCL, MSFT, GOOGL, TSLA, etc.)

**Response:**
```json
{
  "c": 123.45,
  "dp": 2.50,
  "h": 124.00,
  "l": 122.00,
  "o": 120.00,
  "t": 1679587200
}
```

Where:
- `c` = current price
- `dp` = daily percent change
- `h` = high
- `l` = low
- `o` = open
- `t` = timestamp

### `/api/proxy?path=/api/overview`
Proxy to VPS for portfolio data.

---

## 🔐 Security

### ✅ What's Secure
- ✅ API keys **stored on Vercel** (server-side only)
- ✅ Frontend **cannot access** API keys
- ✅ `.env` files **in .gitignore**
- ✅ CORS **restricted properly**
- ✅ **HTTPS-only** in production
- ✅ **No hardcoded secrets** in code

### 🔑 Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `FINNHUB_API_KEY` | Finnhub authentication token | Yes |
| `NODE_ENV` | Environment mode | No (auto-set) |

**Setting in Vercel:**
1. Project → Settings → Environment Variables
2. Add `FINNHUB_API_KEY` with your key
3. Redeploy: `vercel --prod`

---

## ⚡ Performance Optimization

### Caching Strategy
- **60-second cache** for stock prices
- **Stale-while-revalidate** — returns cached value if API fails
- **Automatic invalidation** after TTL
- **Fallback data** — uses previous response if server error

### Code Optimization
- **Minified vanilla JS** — No framework overhead
- **CSS-in-HTML** — Single critical file
- **Lazy loading** — Charts only render when needed
- **Touch-optimized** — Reduced layout thrashing

### Network
- **CORS optimized** — Minimal headers
- **Compression** — Vercel handles gzip
- **CDN delivery** — Global edge caching
- **HTTP/2** — Multiplexed requests

---

## 🧪 Testing

### Local Testing
```bash
# Start dev server
vercel dev

# Test endpoints
curl http://localhost:3000/api/health
curl http://localhost:3000/api/stock?ticker=ORCL

# Test dashboard
open http://localhost:3000
```

### Production Testing
```bash
# Check deployment
curl https://your-project.vercel.app/api/health

# Monitor logs
vercel logs your-project

# Check errors
vercel logs your-project --error
```

---

## 📊 Monitoring

### Vercel Dashboard
- Visit [Vercel Dashboard](https://vercel.com/dashboard)
- Select your project
- **Analytics** — Traffic, response times, errors
- **Logs** — Real-time function logs
- **Deployments** — History and status

### Health Endpoint
```bash
# Monitor service health
while true; do
  curl -s https://your-project.vercel.app/api/health | jq .status
  sleep 30
done
```

---

## 🛠️ Customization

### Add More Stocks
Edit `index.html` and update:

```javascript
const STOCKS=['ORCL','MSFT','GOOGL','TSLA','AMZN','NVDA'];
const STOCK_NAMES={
  ORCL: ['ORCL', 'Oracle'],
  MSFT: ['MSFT', 'Microsoft'],
  // ... add more
};
```

### Change Refresh Rates
```javascript
// Crypto: 15 seconds
setInterval(fetchCrypto, 15000);

// Stocks: 30 seconds
setInterval(fetchStocks, 30000);

// Portfolio: 60 seconds
setInterval(loadData, 60000);
```

### Modify Colors
Edit CSS variables:
```css
:root {
  --bg: #1E1F23;
  --green: #00C805;
  --red: #FF5000;
  /* ... customize */
}
```

---

## 🚨 Troubleshooting

### Stock prices show "—"
1. Check Finnhub API key: `vercel env list`
2. Verify key is set: `vercel env pull`
3. Check logs: `vercel logs`

### CORS errors in browser
1. Ensure `/api/stock` endpoint has CORS headers
2. Check `vercel.json` rewrite rules
3. Verify API is responding: `curl /api/stock?ticker=ORCL`

### High latency
1. Check Finnhub uptime: https://status.finnhub.io
2. Review Vercel Analytics for slowness
3. Verify regional deployment

---

## 📝 License

This project is proprietary. All rights reserved.

---

## 🤝 Support

For issues or questions:
1. Check logs: `vercel logs`
2. Review DEPLOYMENT.md guide
3. Verify environment variables are set
4. Test health endpoint: `/api/health`

---

## 🎯 Roadmap

- [ ] Historical stock charts
- [ ] Price alerts & notifications
- [ ] Export data (CSV/PDF)
- [ ] Multi-exchange support
- [ ] Advanced order types
- [ ] ML-based predictions

---

**Built with ❤️ using Vanilla JS + Vercel Serverless**
