# Apex Meridian Terminal — Controls & Navigation Guide

## Overview
This is your investment dashboard tracking two trading bots and their positions across Polymarket (APEX) and OKX (MERIDIAN) platforms.

---

## 🎮 Main Controls

### Bottom Navigation (4 Tabs)
Located at the bottom of the screen:

1. **Portfolio** (Home icon) — *Default view*
   - Total portfolio value & P&L
   - Buying power available
   - Bot status (online/offline indicators)
   - Current open positions
   - Recent activity log
   - Live crypto prices (BTC, ETH, SOL, XRP, DOGE)
   - Live stock prices (ORCL)

2. **Positions** (List icon)
   - All open positions
   - Positions grouped by asset (e.g., "Bitcoin Range Bets")
   - Click to expand/collapse grouped trades
   - Shows size, entry price, and current P&L %

3. **Trades** (Chart icon)
   - Recent trade history (last 30 trades)
   - Color-coded as BUY (green) or SELL (red)
   - Shows: amount, entry price, trade status, timestamp

4. **Markets** (Globe icon)
   - Crypto market data + stock data
   - Live prices & 24h changes for cryptocurrencies and stocks

---

## 📊 Chart Interactions

### Scrubbing (Mouse/Touch)
**Click & drag across the chart** to:
- Explore historical portfolio values
- See the exact value at any point in time
- Display a crosshair cursor and time label
- Watch the top-bar portfolio value update in real-time

**Release to restore** current portfolio values

### Time Period Buttons
Below the chart:
- **1D** — Last 24 hours
- **1W** — Last 7 days
- **1M** — Last 30 days
- **ALL** — Complete history

*Updates every 5 minutes automatically*

---

## 📍 Reading Position Data

### Position Row Layout
```
[Market Name] [BOT BADGE]
[# shares] · Entry [entry price]        [Value] 
                                        [+X.XX% or -X.XX%]
```

**Example:**
```
Bitcoin Up or Down on February 11?  [APEX]
640.91 shares · Entry 4.4¢           $28.20
                                     +12.50%
```

### Bot Badges
- **APEX** (blue) — Polymarket prediction markets
- **MERIDIAN** (green) — OKX financial derivatives

### Colors
- **Green** — Positive return/gain
- **Red** — Loss or negative metric
- **Gray** — Inactive or neutral

---

## 🤖 Bot Status Indicators

Top of Portfolio tab shows two bots:

```
🟢 APEX · Polymarket          $84.60
🟡 MERIDIAN · OKX             $170.00
```

**Dot Color:**
- **🟢 Green (glowing)** — Bot active within last 2 hours
- **🔘 Gray** — Bot inactive/no recent scan

---

## 💰 Key Metrics Explained

### Top Bar
- **Portfolio Value** — Total across both bots
- **P&L** — Profit/Loss in dollars
- **Change %** — P&L as percentage of cost basis

### Buying Power
- Available cash for new trades
- = Cash balance + Unfilled order reserves

### Position P&L Metrics
- **Entry** — Price you bought at (in ¢ for range bets)
- **Contracts/Shares** — Number of contracts held
- **Value** — Current position size in dollars
- **Change %** — Unrealized percentage return

---

## 🎯 Position Types

### Apex Positions (Polymarket)
Prediction markets on various outcomes:
- *"Bitcoin Up or Down on [DATE]?"*
- *"Will [price] be above $[strike]?"*
- **Side:** YES or NO

### Meridian Positions (OKX)
Financial derivatives with ticker codes:
- **KXBTC** — Bitcoin ranges
- **KXETH** — Ethereum ranges
- **KXRECESSION** — Recession betting
- **KXFED** — Federal Reserve events
- And many others

### Range Bets
Multiple Meridian positions on the same asset are grouped:
- Click to expand and see individual positions
- Shows total exposure and aggregate P&L

---

## 📊 Market Watchlist

### Cryptocurrencies (Binance)
- **BTC** — Bitcoin (updated every 15s)
- **ETH** — Ethereum
- **SOL** — Solana
- **XRP** — XRP
- **DOGE** — Dogecoin

### Stocks
- **ORCL** — Oracle Corporation (updated every 30s)

*See Markets tab for live prices and 24-hour changes*

---

## 🔄 Recent Activity

Shows trade executions in the Portfolio tab:
- **Format:** "Bought/Sold [Market] · $[amount] · [time]"
- **Time:** UTC timezone
- **Last 8 trades** shown on Portfolio, **30 trades** on Trades tab

---

## ⚙️ Trade Status Types

In the Trades tab:

| Status | Meaning |
|--------|---------|
| **PLACED** | ✓ Successfully submitted to exchange |
| **SUBMITTED** | ⏳ Currently processing |
| **DRY** | 🧪 Simulation/test mode (not real) |
| **ERROR** | ❌ Failed to execute |

---

## 💡 Quick Tips

1. **Chart scrubbing is touch-friendly** — Works great on mobile with finger dragging
2. **Time periods persist** — Your selected chart view stays selected when switching tabs
3. **Live prices refresh regularly** — Crypto every 15 seconds, stocks every 30 seconds
4. **Grouping is smart** — Range bets automatically group by asset type
5. **Portfolio updates every 60 seconds** — Data syncs from connected APIs
6. **Time zones** — All timestamps in UTC
7. **Currency** — All values in USD

---

## 🔗 Data Sources

- **Portfolio Data:** Connected via `/data.json` endpoint
- **Historical Data:** Via `/history.json` (updates every 5 min)
- **Crypto Prices:** Live feed from Binance API
- **Stock Prices:** Connected via stock data API
- **Backend API:** Proxies to VPS at `46.225.12.120`

---

## 📱 Mobile Considerations

- **Viewport optimized** for mobile (max-width: 500px)
- **Safe area insets** respected (notch/home indicator)
- **Touch events fully supported** on all interactive elements
- **Colors designed for dark theme** (default)

---

## 🚀 Next Steps

1. **Explore the Portfolio tab** to see your bots' status
2. **Try scrubbing the chart** to see historical performance
3. **Switch time periods** (1D, 1W, 1M, ALL) to see trends
4. **Expand grouped positions** to see individual trades
5. **Check Trades tab** for recent activity
6. **Monitor Markets tab** for crypto and stock price movements

Happy trading! 🎯
