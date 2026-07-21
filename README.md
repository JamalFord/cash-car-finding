# Cash Car Finder

A premium, interactive web application built with **HTML, CSS, and Vanilla JavaScript** to help you find a reliable "cash car" (cheap used commuter) on a budget, specifically customized for finding a solid ride for the upcoming fall semester.

This app is designed to bypass the anti-scraping measures of major classified sites by combining **deep link generation filters**, a **CORS-free local scraper proxy**, and a **copy-paste list analyzer**, ensuring you can find good cars and spot lemons immediately.

---

## Features

- **Smart Search Launchpad**: Input your budget limits (e.g. $800 - $1,200), ZIP code, and radius. Instantly generate highly optimized deep links for **Craigslist, Facebook Marketplace, AutoTempest, eBay Motors, and CarGurus**.
- **Negative Keyword Filter**: Pre-populates searches with negative keywords (like `-salvage`, `-rebuilt`, `-mechanic`, `-blown`, `-slipping`) to automatically screen out lemon vehicles at the source.
- **Copy-Paste Aggregator**: Open Craigslist or Facebook Marketplace in a tab, copy the page results (`Ctrl+A` then `Ctrl+C`), and paste it directly into the webapp. The app will immediately extract the cars, prices, locations, audit their titles, and display them in a clean dashboard.
- **Reliability Guide**:
  - **Best Bargain Commuters**: Curated database of the most bulletproof cheap cars (e.g., Toyota Corolla/Camry, Pontiac Vibe, Scion xB, Crown Victoria), their ideal years, pros, and what to inspect.
  - **Money Pits & Lemons (Avoid)**: Highlights cars to avoid at all costs (e.g., Ford Focus/Fiesta PowerShift automatics, Nissan CVTs, cheap German luxury, Chevrolet Cruze) and explains why.
- **Interactive Pre-Purchase Inspection (PPI) Checklist**: A step-by-step interactive inspection checklist (Paperwork, Under the Hood, Exterior/Frame, Interior, Test Drive) to open on your phone when standing in front of the car. Saves progress to local storage.
- **NHTSA VIN Recall Auditor**: Paste a vehicle's 17-digit VIN to query the official U.S. government database for exact manufacturer specifications and check for active safety recalls.

---

## How to Run Locally

### 1. Pure Static Mode (No Installation)
Since the app is built using client-side vanilla code, you can run the core features immediately:
1. Double-click the `index.html` file to open it directly in any browser.
2. Build search links, paste listings, read the reliability catalog, use the inspection checklist, and search VIN recalls.

### 2. Live Scraper Mode (Craigslist Real-time Aggregation)
To fetch live Craigslist listings directly into your local dashboard:
1. Open your terminal in this repository.
2. Install the lightweight dependencies:
   ```bash
   npm install
   ```
3. Start the local scraping proxy server:
   ```bash
   node server.js
   ```
4. Open `index.html` in your browser. The status indicator in the top-right will turn green (Live & Connected). Clicking "Update Search Links" will now automatically scrape and load Craigslist listings in real-time.

---

## Built With

- **HTML5 & Vanilla CSS**: Premium dark-mode responsive layouts with glassmorphic cards and micro-animations.
- **JavaScript (ES6+)**: Custom DOM state rendering, local storage integration, text parsing regexes, and NHTSA REST API client.
- **Node.js, Express, Axios, Cheerio**: Scraping proxy server.
