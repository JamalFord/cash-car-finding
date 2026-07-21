const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for local cross-origin frontend communication
app.use(cors());

// Map ZIP codes to Craigslist subdomains (same as app.js logic)
function getCraigslistDomain(zip) {
  if (!zip) return "atlanta";
  
  const zipInt = parseInt(zip.trim());
  if (isNaN(zipInt)) return "atlanta";
  
  if (zipInt >= 30000 && zipInt <= 31999) {
    if (zipInt >= 30800 && zipInt <= 30999) return "augusta";
    if (zipInt >= 31800 && zipInt <= 31999) return "columbusga";
    if (zipInt >= 31200 && zipInt <= 31299) return "macon";
    if (zipInt >= 31400 && zipInt <= 31499) return "savannah";
    if (zipInt >= 31600 && zipInt <= 31699) return "valdosta";
    if (zipInt >= 31500 && zipInt <= 31599) return "brunswick";
    if (zipInt >= 30100 && zipInt <= 30199) return "northga";
    if (zipInt >= 30600 && zipInt <= 30699) return "athens";
    return "atlanta";
  }
  
  if (zipInt >= 35000 && zipInt <= 36999) {
    if (zipInt >= 35000 && zipInt <= 35299) return "bham";
    if (zipInt >= 36600 && zipInt <= 36699) return "mobile";
    if (zipInt >= 36100 && zipInt <= 36199) return "montgomery";
    if (zipInt >= 35400 && zipInt <= 35499) return "tuscaloosa";
    return "huntsville";
  }

  if (zipInt >= 32000 && zipInt <= 34999) {
    if (zipInt >= 32200 && zipInt <= 32299) return "jacksonville";
    if (zipInt >= 32800 && zipInt <= 32899) return "orlando";
    if (zipInt >= 33100 && zipInt <= 33399) return "miami";
    if (zipInt >= 33600 && zipInt <= 33699) return "tampa";
    if (zipInt >= 32300 && zipInt <= 32399) return "tallahassee";
    return "gainesville";
  }

  if (zipInt >= 27000 && zipInt <= 28999) {
    if (zipInt >= 28200 && zipInt <= 28299) return "charlotte";
    if (zipInt >= 27500 && zipInt <= 27799) return "raleigh";
    return "asheville";
  }

  if (zipInt >= 10000 && zipInt <= 11999) return "newyork";
  if (zipInt >= 90000 && zipInt <= 93000) return "losangeles";
  if (zipInt >= 60000 && zipInt <= 60800) return "chicago";
  
  return "atlanta";
}

// Status check endpoint
app.get('/status', (req, res) => {
  res.json({ status: "active" });
});

// Scraping endpoint for Craigslist
app.get('/scrape', async (req, res) => {
  const { zip, radius, min, max, clean, owner, avoid } = req.query;

  const clDomain = getCraigslistDomain(zip);
  const clCategory = owner === 'true' ? 'cto' : 'cta';
  
  // Build clean keywords search query
  let exclusions = [];
  if (clean === 'true') {
    exclusions.push("-rebuilt", "-salvage", "-parts", "-junk");
  }
  if (avoid === 'true') {
    exclusions.push("-mechanic", "-project", "-blown", "-slipping", "-knocks", "-rust", "-overheating", "-needs");
  }
  
  const queryStr = `cars ${exclusions.join(" ")}`.trim();
  
  // Construct Craigslist search URL
  const targetUrl = `https://${clDomain}.craigslist.org/search/${clCategory}?min_price=${min}&max_price=${max}&search_distance=${radius}&postal=${zip}&query=${encodeURIComponent(queryStr)}`;
  
  console.log(`[SCRAPER] Requesting Craigslist URL: ${targetUrl}`);

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 10000 // 10 second timeout
    });

    const $ = cheerio.load(response.data);
    const listings = [];

    // Craigslist supports several layouts. We handle selectors for new and old layouts.
    // Selector 1: Modern search results grid elements (.cl-search-result)
    // Selector 2: Classic list items (.result-row)
    const items = $('.cl-search-result, .result-row, li.result-card');
    
    items.each((idx, element) => {
      // Limit to 40 results to prevent flooding
      if (listings.length >= 40) return false;

      const el = $(element);
      
      // Select Title
      let title = el.find('.titlestring, .result-title, .result-heading a').first().text().trim();
      
      // Select Price
      let price = el.find('.priceinfo, .result-price, .price').first().text().trim();
      
      // Select Link
      let link = el.find('a.result-title, a.result-heading, a.posting-title, .titlestring').first().attr('href');
      if (!link) {
        link = el.find('a').first().attr('href');
      }

      // Format link to absolute path if it is relative
      if (link && link.startsWith('/')) {
        link = `https://${clDomain}.craigslist.org${link}`;
      }

      // Only push valid listings
      if (title && price) {
        listings.push({ title, price, link: link || '#' });
      }
    });

    console.log(`[SCRAPER] Successfully parsed ${listings.length} listings.`);
    res.json(listings);

  } catch (error) {
    console.error(`[SCRAPER ERROR] Error fetching Craigslist listings:`, error.message);
    res.status(500).json({ error: "Failed to fetch listings", message: error.message });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`   CASH CAR FINDER - SCRAPING PROXY ACTIVE`);
  console.log(`   Local Server URL: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
