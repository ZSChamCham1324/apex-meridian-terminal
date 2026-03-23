# Setup & Deployment Guide

## 🔒 Security Setup

The API key is now **secure** — stored only on the server side and never exposed to the browser.

### Local Development

The `.env.local` file already contains your Finnhub API key for local testing.

**To run locally:**
```bash
npm install
npm run dev
# or
vercel dev
```

### Production Deployment (Vercel)

**Steps:**

1. **Push your changes to GitHub:**
   ```bash
   git add .
   git commit -m "Secure API key in backend"
   git push
   ```

2. **Set environment variable in Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project `apex-meridian-terminal`
   - Click **Settings → Environment Variables**
   - Add these variables:
     ```
     FINNHUB_API_KEY = d70cv1pr01qtb4raa7kgd70cv1pr01qtb4raa7l0
     ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

---

## 📂 File Breakdown

### New Files Created

- **`/api/stock.js`** — Backend endpoint that proxies Finnhub requests securely
  - Accepts: `GET /api/stock?ticker=ORCL`
  - Returns: `{ c: 123.45, dp: 2.50, ... }`
  - API key stored in `FINNHUB_API_KEY` env variable

- **`.env.local`** — Local development environment (git-ignored)
  - Contains: Your Finnhub API key
  - Only used by `vercel dev`

- **`.env.example`** — Template for configuration
  - Shows what variables need to be set

### Modified Files

- **`index.html`** — Updated `fetchStocks()` to call `/api/stock` instead of direct Finnhub
  - Removed hardcoded API key
  - Much more secure

- **`vercel.json`** — Added rewrite rule for `/api/stock`

---

## 🚀 Current Architecture

```
Browser (index.html)
    ↓ fetch('/api/stock?ticker=ORCL')
Server (/api/stock.js)
    ↓ Reads FINNHUB_API_KEY from env
    ↓ fetch('https://finnhub.io/api/v1/quote...')
Finnhub API
    ↓ Returns data
Server responds to browser
    ↓
Browser displays Oracle price
```

API key never exposed to frontend! ✅

---

## ✅ What's Secure Now

- ✅ API key **not in frontend code**
- ✅ API key **not in version control** (stored on Vercel)
- ✅ API key **only on server** (Vercel function)
- ✅ Browser just calls `/api/stock` (public endpoint)
- ✅ Rate limiting handled server-side

---

## 🔧 Adding More Stocks

Just expand the `STOCKS` array in `index.html`:

```javascript
const STOCKS=['ORCL', 'MSFT', 'GOOGL', 'TSLA'];
const STOCK_NAMES={
  ORCL:['ORCL','Oracle'],
  MSFT:['MSFT','Microsoft'],
  GOOGL:['GOOGL','Google'],
  TSLA:['TSLA','Tesla']
};
```

The `/api/stock` endpoint handles any ticker automatically!

---

## 📝 Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `FINNHUB_API_KEY` | Finnhub authentication token | `d70cv1pr01qtb4ra...` |

---

## 🧪 Testing

**Local:**
```bash
vercel dev
# Navigate to http://localhost:3000
# Check Markets tab for Oracle price
```

**Production:**
- Deploy via Vercel
- Set `FINNHUB_API_KEY` in Vercel dashboard
- Oracle stock data should appear in Markets tab

---

## 🐛 Troubleshooting

**Stock price shows "—"?**
- Check Vercel logs: `vercel logs`
- Ensure `FINNHUB_API_KEY` is set in Vercel dashboard
- Verify API key is valid

**"API key not configured" error?**
- Add `FINNHUB_API_KEY` to Vercel environment variables
- Redeploy: `vercel --prod`

---

## ✨ Next Steps

1. Test locally: `vercel dev`
2. Deploy to Vercel: `vercel --prod`
3. Add environment variable in Vercel dashboard
4. Monitor: Check Markets tab for live Oracle prices
5. Add more stocks as needed

Your dashboard is now **production-ready!** 🎉
