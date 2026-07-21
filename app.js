// CASH CAR FINDER - CLIENT-SIDE LOGIC

// 1. VEHICLE DATABASES
const RELIABLE_CARS = [
  {
    name: "Toyota Corolla",
    years: "1998-2008",
    summary: "The gold standard of cheap, bulletproof transport. Simple mechanicals and cheap parts.",
    bullets: [
      { type: "pro", text: "Bulletproof 1.8L engine (1ZZ-FE) with timing chain (no belt to snap)" },
      { type: "pro", text: "Insanely durable automatic and manual transmissions" },
      { type: "con", text: "1998-2002 models consume/burn oil due to piston ring design" },
      { type: "note", text: "Check intake manifold gasket if it has a rough cold idle (cheap $10 fix)" }
    ]
  },
  {
    name: "Toyota Camry",
    years: "1997-2006",
    summary: "Slightly larger and more comfortable than the Corolla. Very quiet ride and durable engines.",
    bullets: [
      { type: "pro", text: "2.2L 4-cylinder (5S-FE) and 2.4L (2AZ-FE) are extremely long-lasting" },
      { type: "pro", text: "Comfortable suspension, handles high mileage with ease" },
      { type: "con", text: "2002-2006 2.4L engine can burn oil; cylinder threads can strip on early 2.4L" },
      { type: "note", text: "Check power steering pump and hoses for leaks, very common on Camrys" }
    ]
  },
  {
    name: "Honda Civic",
    years: "1996-2000, 2006-2010",
    summary: "Extremely fuel-efficient, excellent parts availability, and very easy to work on.",
    bullets: [
      { type: "pro", text: "Exceptional gas mileage and large DIY community" },
      { type: "pro", text: "Double-wishbone suspension (1996-2000) makes it very nimble" },
      { type: "con", text: "Avoid 2001-2005 automatic models (notorious head gasket & auto transmission failures)" },
      { type: "note", text: "2006-2009 models had a block cracking recall; check for coolant leaks" }
    ]
  },
  {
    name: "Pontiac Vibe / Toyota Matrix",
    years: "2003-2008",
    summary: "The ultimate cash car cheat code. Under the Pontiac styling is a 100% Toyota Corolla/Matrix.",
    bullets: [
      { type: "pro", text: "Sells for 20-30% less than a Matrix because of the Pontiac badge" },
      { type: "pro", text: "Huge hatchback cargo space, highly practical for moving" },
      { type: "con", text: "The odometer famously freezes at 299,999 miles (check service records for true mileage)" },
      { type: "note", text: "Ensure the 5-speed manual (if equipped) doesn't whine; bearing failure is common" }
    ]
  },
  {
    name: "Scion xB / xA",
    years: "2004-2006",
    summary: "Built by Toyota for younger buyers. Extremely reliable engine wrapped in a highly spacious box.",
    bullets: [
      { type: "pro", text: "Ultra-reliable 1.5L Toyota engine (1NZ-FE) with timing chain" },
      { type: "pro", text: "Tons of legroom and headroom, great for carrying gear" },
      { type: "con", text: "Thin sheet metal means road noise is loud at highway speeds" },
      { type: "note", text: "Check windshield for cracks; the vertical windshield design catches rocks easily" }
    ]
  },
  {
    name: "Ford Crown Victoria / Mercury Grand Marquis",
    years: "1998-2011",
    summary: "Body-on-frame tank. The 4.6L V8 is legendary for taxi and police use. Reaches 300k+ miles easily.",
    bullets: [
      { type: "pro", text: "Heavy duty suspension, comfortable bench seats, and huge trunk" },
      { type: "pro", text: "Parts cost pennies; any local mechanic can fix them in minutes" },
      { type: "con", text: "V8 engine gets poor gas mileage (15 MPG city, 23 MPG highway)" },
      { type: "note", text: "Check plastic intake manifold on 1998-2001 models; they crack and leak coolant" }
    ]
  }
];

const AVOID_CARS = [
  {
    name: "Ford Focus & Fiesta (CVT/Dual-Clutch)",
    years: "2011-2018",
    summary: "The 'PowerShift' automatic transmission is defective. Slips, hesitates, and fails repeatedly.",
    bullets: [
      { type: "con", text: "Extremely high failure rate of the TCM (Transmission Control Module)" },
      { type: "con", text: "Clutches wear out rapidly; repair costs exceed the car's budget" },
      { type: "note", text: "Manual transmission versions of these cars are actually highly reliable and great deals!" }
    ]
  },
  {
    name: "Nissan Altima & Sentra & Versa (CVT)",
    years: "2007-2018",
    summary: "Equipped with Jatco CVTs that suffer catastrophic failures starting as early as 80k miles.",
    bullets: [
      { type: "con", text: "CVT belts shred internally, sending metal shavings through transmission" },
      { type: "con", text: "Replacement cost is $3,500 - $5,000; almost never worth repairing" },
      { type: "note", text: "Manual transmission Nissans are generally safe and cheap." }
    ]
  },
  {
    name: "Chevrolet Cruze",
    years: "2011-2016",
    summary: "A mechanical nightmare. Notorious for constant oil leaks, coolant leaks, and turbo failures.",
    bullets: [
      { type: "con", text: "Fragile plastic coolant housings crack and drain coolant, warping head gaskets" },
      { type: "con", text: "Turbos fail on the 1.4L engine; PCV system fails, blowing out engine seals" },
      { type: "note", text: "Avoid these entirely, even with low miles." }
    ]
  },
  {
    name: "German Luxury (BMW, Audi, Mercedes, VW)",
    years: "1998-2012",
    summary: "There is nothing more expensive than a cheap German car. Maintenance is extremely costly.",
    bullets: [
      { type: "con", text: "Fragile plastic cooling systems, complex electrical modules that drain batteries" },
      { type: "con", text: "Parts are 2-3x more expensive; many mechanics refuse to work on them cheaply" },
      { type: "note", text: "A $1,500 BMW will cost you $3,000 in repairs in the first 6 months." }
    ]
  },
  {
    name: "Subaru with EJ25 Engine",
    years: "1998-2011",
    summary: "2.5L non-turbo engines are notorious for blowing head gaskets, leaking coolant/oil.",
    bullets: [
      { type: "con", text: "Factory single-layer steel head gaskets degrade, leading to external leaks" },
      { type: "con", text: "Requires pulling the engine to replace gaskets ($1,500 - $2,500 job)" },
      { type: "note", text: "Only buy if seller has printed receipts proving head gaskets were replaced with MLS gaskets." }
    ]
  }
];

// 2. PRE-PURCHASE INSPECTION CHECKLIST
const INSPECTION_CHECKLIST = {
  "Paperwork & Title": [
    { title: "Title Status Check", desc: "Is the title physically present? Check that the VIN matches the car dashboard. Ensure it is NOT marked 'Salvage', 'Rebuilt', or 'Flood' unless you are okay with high insurance rates and safety risks." },
    { title: "Lien Check", desc: "Ensure the seller's name matches the title, and the section 'Lienholders' is blank or stamped 'Released'. Do not buy a car with an active bank lien." },
    { title: "Seller Identification", desc: "Ask to see the seller's driver's license. If the name doesn't match the title, they are 'title jumping' (selling a car they never registered, which is illegal and makes registration difficult)." }
  ],
  "Under The Hood (Cold Engine)": [
    { title: "Oil Cap Inspection", desc: "Remove the oil fill cap and look inside. If you see a milky, light-brown residue (like chocolate milkshake), it means coolant is mixing with oil due to a blown head gasket. Walk away immediately." },
    { title: "Engine Oil Dipstick", desc: "Pull the dipstick, wipe it, re-insert and check level and color. Pitch black is normal on old cars, but if it has gold/bronze metallic flakes, the engine bearings are shredding." },
    { title: "Coolant Level & Color", desc: "Look at the coolant overflow tank. It should be green, orange, or pink. If it looks like rusty brown mud, the cooling system is neglected. If oil bubbles are in it, the head gasket is blown." },
    { title: "Belts & Hoses", desc: "Examine radiator hoses. They shouldn't feel rock-hard or mushy. Inspect the serpentine belt for deep cracking or fraying." },
    { title: "Transmission Fluid", desc: "Check transmission dipstick (if equipped). Fluid should be pink/red. If it's dark brown/black and smells burnt, the transmission clutches are slipping." }
  ],
  "Exterior & Frame": [
    { title: "Body Panel Alignment", desc: "Look down the sides of the car. Do the gaps between doors, fenders, and hood align evenly? Uneven gaps indicate the car was in a major crash and repaired poorly." },
    { title: "Rust Audit", desc: "Check under the wheel arches, rocker panels, and floorboards. Surface rust is fine, but structurally rusted frame rails make the car unsafe to drive." },
    { title: "Tire Tread Depth & Wear", desc: "Are tires worn evenly? Uneven wear indicates bad alignment or worn suspension struts. Check the tire date code (4 digits: week/year) - tires older than 6 years are dry-rotted and unsafe." },
    { title: "Fluid Leaks Under Car", desc: "Look on the pavement under the engine bay. Is there green/orange coolant, black oil, or red transmission fluid dripping?" }
  ],
  "Interior & Electronics": [
    { title: "Dashboard Warn Lights", desc: "Turn the key to ON position (without starting). Verify the Check Engine, Airbag, and ABS lights illuminate (proving bulbs aren't removed). Start the engine; all warning lights must turn off." },
    { title: "A/C and Heat Test", desc: "Turn the A/C to max cold and wait. In Atlanta's fall heat, A/C is vital. Verify heat works too (proves cooling system flow)." },
    { title: "Windows & Door Locks", desc: "Test all electric windows and locks. Window motors are expensive to replace." },
    { title: "Steering Wheel Play", desc: "Wiggle the wheel. There should be less than 1 inch of free play before the wheels turn. Sluggish play indicates worn steering rack or tie-rods." }
  ],
  "The Test Drive": [
    { title: "Cold Start Listen", desc: "Have the seller start the engine while you stand near the hood. Listen for loud knocking, metallic clicking, or high-pitched squealing. Watch for blue/black smoke from the tailpipe." },
    { title: "Transmission Shifting", desc: "Drive the car and accelerate. Shifts should be smooth. If the RPMs spike high before the car grabs a gear, or if it clunks hard, the transmission is failing." },
    { title: "Braking Performance", desc: "Do a hard stop. The pedal shouldn't feel spongy, and the steering wheel shouldn't vibrate (vibration means warped brake rotors)." },
    { title: "Suspension Clunks", desc: "Drive over speed bumps or rough pavement. Loud clunking or banging noises indicate worn control arm bushings, ball joints, or struts." }
  ]
};

// 3. REGEX & LOGIC FOR LISTING PARSER
// Excludes cars that are projects or have salvage titles
const DANGER_KEYWORDS = [
  "salvage", "rebuilt", "parts only", "blown engine", "needs transmission", "mechanic special",
  "not running", "parts", "no title", "junk", "ticking", "slipping", "head gasket", "overheating",
  "blown", "scrap", "parts car", "no key"
];

// 4. MAP ZIP CODES TO CRAIGSLIST SUBDOMAINS (GEORGIA/SOUTHEAST FOCUSED)
function getCraigslistDomain(zip) {
  if (!zip) return "atlanta";
  
  // Clean zip code
  const zipInt = parseInt(zip.trim());
  
  if (isNaN(zipInt)) return "atlanta";
  
  // Georgia ZIP ranges: 30000 - 31999
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
  
  // Alabama ranges
  if (zipInt >= 35000 && zipInt <= 36999) {
    if (zipInt >= 35000 && zipInt <= 35299) return "bham";
    if (zipInt >= 36600 && zipInt <= 36699) return "mobile";
    if (zipInt >= 36100 && zipInt <= 36199) return "montgomery";
    if (zipInt >= 35400 && zipInt <= 35499) return "tuscaloosa";
    return "huntsville";
  }

  // Florida ranges
  if (zipInt >= 32000 && zipInt <= 34999) {
    if (zipInt >= 32200 && zipInt <= 32299) return "jacksonville";
    if (zipInt >= 32800 && zipInt <= 32899) return "orlando";
    if (zipInt >= 33100 && zipInt <= 33399) return "miami";
    if (zipInt >= 33600 && zipInt <= 33699) return "tampa";
    if (zipInt >= 32300 && zipInt <= 32399) return "tallahassee";
    return "gainesville";
  }

  // North Carolina ranges
  if (zipInt >= 27000 && zipInt <= 28999) {
    if (zipInt >= 28200 && zipInt <= 28299) return "charlotte";
    if (zipInt >= 27500 && zipInt <= 27799) return "raleigh";
    return "asheville";
  }

  // Fallbacks for major cities
  if (zipInt >= 10000 && zipInt <= 11999) return "newyork";
  if (zipInt >= 90000 && zipInt <= 93000) return "losangeles";
  if (zipInt >= 60000 && zipInt <= 60800) return "chicago";
  
  return "atlanta"; // Default back to Atlanta
}

// 5. APPLICATION INITIALIZATION & STATE
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initCatalogs();
  initChecklist();
  initSearchGenerator();
  initParser();
  initVinAuditor();
  checkLocalScraperStatus();
});

// Tab navigation handler
function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Deactivate all tabs
      tabs.forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      
      // Activate clicked tab
      tab.classList.add("active");
      const contentId = tab.getAttribute("data-tab");
      document.getElementById(contentId).classList.add("active");
    });
  });
}

// Populate Vehicle catalogs
function initCatalogs() {
  const goodList = document.getElementById("good-cars-list");
  const badList = document.getElementById("bad-cars-list");
  
  goodList.innerHTML = RELIABLE_CARS.map(car => renderCatalogCard(car, "good")).join("");
  badList.innerHTML = AVOID_CARS.map(car => renderCatalogCard(car, "bad")).join("");
}

function renderCatalogCard(car, type) {
  const cardClass = type === "good" ? "good-car" : "bad-car";
  
  const bulletsHTML = car.bullets.map(b => {
    let iconClass = "fa-solid fa-circle-question note";
    if (b.type === "pro") iconClass = "fa-solid fa-circle-check pro";
    if (b.type === "con") iconClass = "fa-solid fa-circle-xmark con";
    if (b.type === "note") iconClass = "fa-solid fa-triangle-exclamation note";
    
    return `
      <div class="bullet-item ${b.type}">
        <i class="${iconClass}"></i>
        <span>${b.text}</span>
      </div>
    `;
  }).join("");

  return `
    <div class="vehicle-card ${cardClass}">
      <div class="vehicle-header">
        <span class="vehicle-name">${car.name}</span>
        <span class="vehicle-years">${car.years}</span>
      </div>
      <p class="vehicle-summary">${car.summary}</p>
      <div class="vehicle-bullets">
        ${bulletsHTML}
      </div>
    </div>
  `;
}

// Smart Link Generator UI
function initSearchGenerator() {
  const btnBuild = document.getElementById("btn-build-links");
  
  // Auto-generate links on load
  generateSearchLinks();
  
  btnBuild.addEventListener("click", () => {
    generateSearchLinks();
    fetchRealtimeListings(); // Also trigger live scraping if server is running
  });
}

function generateSearchLinks() {
  const zip = document.getElementById("zipcode").value.trim() || "30303";
  const radius = document.getElementById("radius").value || "50";
  const minPrice = document.getElementById("min-price").value || "800";
  const maxPrice = document.getElementById("max-price").value || "1200";
  
  const cleanTitleOnly = document.getElementById("clean-title").checked;
  const ownerOnly = document.getElementById("owner-only").checked;
  const avoidProjects = document.getElementById("avoid-projects").checked;

  const clDomain = getCraigslistDomain(zip);

  // BUILD QUERIES
  // Inclusion terms
  let inclusionKeywords = "cars";
  
  // Negative keywords to filter out lemons
  let exclusions = [];
  if (cleanTitleOnly) {
    exclusions.push("-rebuilt", "-salvage", "-parts", "-junk");
  }
  if (avoidProjects) {
    exclusions.push("-mechanic", "-project", "-blown", "-slipping", "-knocks", "-rust", "-overheating", "-needs");
  }
  
  let exclusionString = exclusions.join(" ");
  let fullQuery = `${inclusionKeywords} ${exclusionString}`.trim();

  // 1. CRAIGSLIST
  // query formats: cta (cars/trucks all), sso (owner), ssd (dealer)
  const clCategory = ownerOnly ? "cto" : "cta";
  const clUrl = `https://${clDomain}.craigslist.org/search/${clCategory}?min_price=${minPrice}&max_price=${maxPrice}&search_distance=${radius}&postal=${zip}&query=${encodeURIComponent(fullQuery)}`;
  document.getElementById("link-cl").setAttribute("href", clUrl);

  // 2. FACEBOOK MARKETPLACE
  // FB marketplace uses URL path structures
  const fbQuery = cleanTitleOnly ? "clean title cars" : "used cars";
  const fbUrl = `https://www.facebook.com/marketplace/search?query=${encodeURIComponent(fbQuery)}&minPrice=${minPrice}&maxPrice=${maxPrice}&exact=false&radius=${radius}`;
  document.getElementById("link-fb").setAttribute("href", fbUrl);

  // 3. AUTOTEMPEST
  const atTitleStatus = cleanTitleOnly ? "clean" : "any";
  const atUrl = `https://www.autotempest.com/results?zip=${zip}&radius=${radius}&minprice=${minPrice}&maxprice=${maxPrice}&title=${atTitleStatus}`;
  document.getElementById("link-at").setAttribute("href", atUrl);

  // 4. EBAY MOTORS
  // eBay category 6001 is Cars & Trucks
  // LH_ItemCondition=3000 (Used) | 1000 (New) | 2500 (Certified)
  const ebayUrl = `https://www.ebay.com/b/Cars-Trucks/6001?_nkw=${encodeURIComponent(exclusionString)}&_udlo=${minPrice}&_udhi=${maxPrice}&LH_ItemCondition=3000%7C2500`;
  document.getElementById("link-eb").setAttribute("href", ebayUrl);

  // 5. CARGURUS
  const cgUrl = `https://www.cargurus.com/Cars/l-Used-Cars-c30291?zip=${zip}&distance=${radius}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  document.getElementById("link-cg").setAttribute("href", cgUrl);
}

// Copy-Paste listings parser
function initParser() {
  const btnParse = document.getElementById("btn-parse-text");
  const btnClear = document.getElementById("btn-clear-paste");
  const textarea = document.getElementById("paste-input");
  
  btnParse.addEventListener("click", () => {
    const rawText = textarea.value;
    if (!rawText.trim()) {
      alert("Please paste some text first.");
      return;
    }
    parseAndRenderListings(rawText);
  });
  
  btnClear.addEventListener("click", () => {
    textarea.value = "";
    document.getElementById("parsed-listings-list").innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-paste"></i>
        <p style="margin-top: 1rem;">No data parsed yet. Copy and paste some listings on the left to start auditing.</p>
      </div>
    `;
    document.getElementById("parsed-count").textContent = "0 Listings";
  });
}

function parseAndRenderListings(text) {
  const listings = parseListingText(text);
  const resultsContainer = document.getElementById("parsed-listings-list");
  
  document.getElementById("parsed-count").textContent = `${listings.length} Listings`;
  
  if (listings.length === 0) {
    resultsContainer.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <p style="margin-top: 1rem;">Could not parse any listings. Make sure the text contains a price (e.g. $1,200) and year/model info (e.g. 2005 Corolla).</p>
      </div>
    `;
    return;
  }
  
  resultsContainer.innerHTML = listings.map(listing => {
    const audit = auditListing(listing);
    
    const tagsHTML = audit.tags.map(t => `<span class="listing-tag ${t.class}">${t.name}</span>`).join("");
    const dangerClass = audit.severity === "danger" ? "style='border-left: 4px solid var(--color-danger);'" : 
                        audit.severity === "warning" ? "style='border-left: 4px solid var(--color-warning);'" : "";
    
    return `
      <div class="listing-row" ${dangerClass}>
        <div class="listing-info">
          <div class="listing-title-row">
            <span class="listing-title">${listing.title}</span>
            ${tagsHTML}
          </div>
          <div class="listing-meta">
            ${listing.location ? `<span><i class="fa-solid fa-location-dot"></i> ${listing.location}</span>` : ""}
            ${audit.notes ? `<span style="color: ${audit.severity === 'danger' ? 'var(--color-danger)' : 'var(--color-warning)'}"><i class="fa-solid fa-triangle-exclamation"></i> ${audit.notes}</span>` : ""}
          </div>
        </div>
        <div class="listing-price">$${listing.price.toLocaleString()}</div>
      </div>
    `;
  }).join("");
}

function parseListingText(text) {
  // Regex to extract lines that look like listing titles, prices, locations
  // Supports formats like:
  // "2005 Honda Civic LX - $1,200"
  // "$1,200 · 2005 Honda Civic"
  // "2002 Toyota Corolla LE ... $1100"
  // "Atlanta, GA ... $1,200 ... 2005 Honda Civic"
  const lines = text.split(/\n/);
  const parsedListings = [];
  
  let currentListing = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Try to extract price
    const priceMatch = line.match(/\$([0-9,]+)/);
    const yearMatch = line.match(/\b(19[89][0-9]|20[0-2][0-9])\b/);

    if (priceMatch) {
      const price = parseInt(priceMatch[1].replace(/,/g, ""));
      
      // If the line has a price and a year, it's likely a standalone listing line
      if (yearMatch) {
        // Clean title: remove price from title
        let title = line.replace(/\$[0-9,]+/g, "").replace(/·|•/g, "").replace(/\s+/g, " ").trim();
        parsedListings.push({
          title: title,
          price: price,
          location: ""
        });
      } else {
        // Facebook Marketplace copy-paste scenario:
        // Line 1: Title (e.g. "2004 Toyota Camry")
        // Line 2: Price (e.g. "$1,200")
        // Line 3: Location (e.g. "Atlanta, GA")
        // Let's check previous line for Title
        const prevLine = i > 0 ? lines[i-1].trim() : "";
        const nextLine = i < lines.length - 1 ? lines[i+1].trim() : "";
        
        const prevYearMatch = prevLine.match(/\b(19[89][0-9]|20[0-2][0-9])\b/);
        
        if (prevYearMatch && prevLine.length < 100) {
          parsedListings.push({
            title: prevLine,
            price: price,
            location: nextLine.length < 50 && !nextLine.includes("$") ? nextLine : ""
          });
        } else if (nextLine.match(/\b(19[89][0-9]|20[0-2][0-9])\b/) && nextLine.length < 100) {
          // Alternative layout: Price comes first, then Year/Model
          parsedListings.push({
            title: nextLine,
            price: parseInt(priceMatch[1].replace(/,/g, "")),
            location: ""
          });
        }
      }
    }
  }

  // Deduplicate results
  const uniqueListings = [];
  const titles = new Set();
  for (const item of parsedListings) {
    const key = `${item.title}-${item.price}`;
    if (!titles.has(key)) {
      titles.add(key);
      uniqueListings.push(item);
    }
  }
  
  return uniqueListings;
}

function auditListing(listing) {
  const titleLower = listing.title.toLowerCase();
  const result = {
    tags: [],
    severity: "neutral",
    notes: ""
  };
  
  // 1. Scan for red-flag terms
  for (const keyword of DANGER_KEYWORDS) {
    if (titleLower.includes(keyword)) {
      result.severity = "danger";
      result.notes = `Avoid: Contains "${keyword}" flag.`;
      
      if (keyword === "salvage" || keyword === "rebuilt" || keyword === "no title") {
        result.tags.push({ name: "Title Risk", class: "tag-salvage" });
      } else {
        result.tags.push({ name: "Mechanical Lemon", class: "tag-salvage" });
      }
      break;
    }
  }

  // 2. Cross reference with Reliability Catalogs
  let matchedReliable = false;
  let matchedAvoid = false;

  for (const car of RELIABLE_CARS) {
    const carParts = car.name.toLowerCase().split(" "); // e.g. ["toyota", "corolla"]
    const matchesAll = carParts.every(part => titleLower.includes(part));
    if (matchesAll) {
      matchedReliable = true;
      result.tags.push({ name: `${car.name} (Reliable)`, class: "tag-clean" });
      break;
    }
  }

  if (!matchedReliable) {
    for (const car of AVOID_CARS) {
      // Split into parts to match (e.g. "chevrolet cruze" or "nissan altima")
      const carParts = car.name.toLowerCase().replace(/&|\(|\)/g, "").split(" ");
      // Check first two words (e.g. ["chevrolet", "cruze"])
      const matchesAll = carParts.slice(0, 2).every(part => titleLower.includes(part));
      
      if (matchesAll) {
        matchedAvoid = true;
        result.severity = "danger";
        result.notes = `Risk: This model is flagged in our Avoid catalog.`;
        result.tags.push({ name: "Avoid Model", class: "tag-salvage" });
        break;
      }
    }
  }

  if (result.tags.length === 0) {
    result.tags.push({ name: "Unverified Model", class: "tag-rebuilt" });
  }

  return result;
}

// Pre-Purchase Inspection checklist state & updates
let checklistState = {};

function initChecklist() {
  const resetBtn = document.getElementById("btn-reset-checklist");
  
  // Load state from local storage or set empty defaults
  const savedState = localStorage.getItem("cash_car_checklist_state");
  if (savedState) {
    try {
      checklistState = JSON.parse(savedState);
    } catch(e) {
      checklistState = {};
    }
  }
  
  renderChecklistNav();
  renderChecklistSection(Object.keys(INSPECTION_CHECKLIST)[0]);
  updateChecklistProgress();
  
  resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all checklist items?")) {
      checklistState = {};
      saveChecklistState();
      updateChecklistProgress();
      
      // Re-render current view
      const activeNav = document.querySelector(".checklist-nav-btn.active");
      const currentSection = activeNav ? activeNav.getAttribute("data-section") : Object.keys(INSPECTION_CHECKLIST)[0];
      renderChecklistSection(currentSection);
    }
  });
}

function renderChecklistNav() {
  const navContainer = document.getElementById("checklist-nav-menu");
  const categories = Object.keys(INSPECTION_CHECKLIST);
  
  navContainer.innerHTML = categories.map((cat, index) => {
    const activeClass = index === 0 ? "active" : "";
    return `
      <button class="checklist-nav-btn ${activeClass}" data-section="${cat}">
        <span>${cat}</span>
        <span class="badge" id="badge-${cat.replace(/\s+/g, '-')}">0/0</span>
      </button>
    `;
  }).join("");

  // Add click events to buttons
  const navBtns = document.querySelectorAll(".checklist-nav-btn");
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      navBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const cat = btn.getAttribute("data-section");
      renderChecklistSection(cat);
    });
  });
}

function renderChecklistSection(category) {
  const sectionTitle = document.getElementById("checklist-section-title");
  const itemsContainer = document.getElementById("checklist-items-list");
  const items = INSPECTION_CHECKLIST[category];
  
  sectionTitle.textContent = category;
  
  itemsContainer.innerHTML = items.map((item, idx) => {
    const itemKey = `${category}-${idx}`;
    const isChecked = checklistState[itemKey] === true;
    const checkedClass = isChecked ? "checked" : "";
    
    return `
      <div class="checklist-item ${checkedClass}" data-key="${itemKey}">
        <div class="checkbox-custom">
          <i class="fa-solid fa-check"></i>
        </div>
        <div class="checklist-item-content">
          <span class="checklist-item-title">${item.title}</span>
          <span class="checklist-item-desc">${item.desc}</span>
        </div>
      </div>
    `;
  }).join("");

  // Add toggle clicks
  const checkItems = document.querySelectorAll(".checklist-item");
  checkItems.forEach(item => {
    item.addEventListener("click", () => {
      const key = item.getAttribute("data-key");
      checklistState[key] = !checklistState[key];
      
      if (checklistState[key]) {
        item.classList.add("checked");
      } else {
        item.classList.remove("checked");
      }
      
      saveChecklistState();
      updateChecklistProgress();
    });
  });
}

function updateChecklistProgress() {
  const categories = Object.keys(INSPECTION_CHECKLIST);
  let totalItems = 0;
  let checkedItems = 0;
  
  categories.forEach(cat => {
    const items = INSPECTION_CHECKLIST[cat];
    let catChecked = 0;
    
    items.forEach((item, idx) => {
      totalItems++;
      const key = `${cat}-${idx}`;
      if (checklistState[key] === true) {
        checkedItems++;
        catChecked++;
      }
    });
    
    // Update individual nav badge
    const badge = document.getElementById(`badge-${cat.replace(/\s+/g, '-')}`);
    if (badge) {
      badge.textContent = `${catChecked}/${items.length}`;
      if (catChecked === items.length) {
        badge.style.color = "var(--color-success)";
      } else {
        badge.style.color = "var(--text-secondary)";
      }
    }
  });
  
  // Calculate percentage
  const percent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
  
  // Update progress bar UI
  document.getElementById("checklist-progress-bar").style.width = `${percent}%`;
  document.getElementById("checklist-progress-text").textContent = `${percent}% (${checkedItems}/${totalItems} Checked)`;
}

function saveChecklistState() {
  localStorage.setItem("cash_car_checklist_state", JSON.stringify(checklistState));
}

// VIN Safety Recall & Decode Integration (uses free NHTSA API)
function initVinAuditor() {
  const form = document.getElementById("vin-form");
  const vinInput = document.getElementById("vin-input");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const vin = vinInput.value.trim().toUpperCase();
    
    if (vin.length !== 17) {
      alert("A valid VIN must be exactly 17 characters.");
      return;
    }
    
    runVinAudit(vin);
  });
}

async function runVinAudit(vin) {
  const loader = document.getElementById("vin-loader");
  const content = document.getElementById("vin-results-content");
  
  loader.style.display = "block";
  content.innerHTML = ""; // Clear previous results
  
  try {
    // 1. Query NHTSA Decode VIN Values API (JSON CORS-enabled)
    const decodeRes = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`);
    const decodeData = await decodeRes.json();
    
    if (!decodeData.Results || decodeData.Results.length === 0) {
      throw new Error("Could not decode this VIN. Verify the characters.");
    }
    
    const carDetails = decodeData.Results[0];
    const make = carDetails.Make;
    const model = carDetails.Model;
    const year = carDetails.ModelYear;
    const bodyClass = carDetails.BodyClass;
    const displacement = carDetails.DisplacementL;
    
    if (!make || !model || !year) {
      throw new Error("Invalid or incomplete VIN data returned.");
    }

    // 2. Query NHTSA Recalls API (JSON CORS-enabled)
    const recallRes = await fetch(`https://api.nhtsa.gov/recalls/recallsByVehicle?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&modelYear=${year}`);
    const recallData = await recallRes.json();
    
    const recallsList = recallData.results || [];
    
    loader.style.display = "none";
    renderVinResults(year, make, model, bodyClass, displacement, recallsList);
    
  } catch (err) {
    loader.style.display = "none";
    content.innerHTML = `
      <div class="empty-state" style="color: var(--color-danger);">
        <i class="fa-solid fa-circle-exclamation"></i>
        <p style="margin-top: 1rem;">Error: ${err.message}</p>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">Double check the VIN or check your network connection.</p>
      </div>
    `;
  }
}

function renderVinResults(year, make, model, bodyClass, displacement, recalls) {
  const content = document.getElementById("vin-results-content");
  
  let recallsHTML = "";
  if (recalls.length === 0) {
    recallsHTML = `
      <div class="vin-safe-message">
        <i class="fa-solid fa-circle-check"></i>
        <span>No active safety recalls found for this year, make, and model!</span>
      </div>
    `;
  } else {
    recallsHTML = `
      <h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.1rem; color: var(--color-warning);">
        <i class="fa-solid fa-triangle-exclamation"></i> Active Safety Recalls (${recalls.length})
      </h3>
      <div class="recalls-list">
        ${recalls.map(r => `
          <div class="recall-item">
            <span class="recall-campaign">NHTSA Campaign: ${r.NHTSACampaignNumber}</span>
            <p class="recall-desc"><strong>Issue:</strong> ${r.Summary}</p>
            <p class="recall-remedy"><strong>Remedy:</strong> ${r.Remedy}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Check reliability database
  let modelCheckHTML = "";
  const fullName = `${year} ${make} ${model}`.toLowerCase();
  
  let matchFound = false;
  for (const car of RELIABLE_CARS) {
    const makeModelName = car.name.toLowerCase();
    if (fullName.includes(makeModelName)) {
      matchFound = true;
      modelCheckHTML = `
        <div class="vin-safe-message" style="margin-top: 1rem; background-color: var(--color-success-bg); border-color: rgba(16,185,129,0.2); color: var(--color-success)">
          <i class="fa-solid fa-award"></i>
          <span>Database Check: This vehicle matches our "Highly Reliable" list!</span>
        </div>
      `;
      break;
    }
  }

  if (!matchFound) {
    for (const car of AVOID_CARS) {
      const avoidParts = car.name.toLowerCase().replace(/&|\(|\)/g, "").split(" ");
      const matchesAll = avoidParts.slice(0, 2).every(part => fullName.includes(part));
      if (matchesAll) {
        modelCheckHTML = `
          <div class="vin-safe-message" style="margin-top: 1rem; background-color: var(--color-danger-bg); border-color: rgba(239,68,68,0.2); color: var(--color-danger)">
            <i class="fa-solid fa-skull-crossbones"></i>
            <span>Warning: This vehicle matches a flagged "Avoid Model" in our database!</span>
          </div>
        `;
        break;
      }
    }
  }

  content.innerHTML = `
    <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
      <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">${year} ${make} ${model}</h2>
    </div>
    
    <div class="vin-details-grid">
      <div class="vin-detail-item">
        <span class="vin-detail-label">Vehicle Year</span>
        <div class="vin-detail-value">${year || "N/A"}</div>
      </div>
      <div class="vin-detail-item">
        <span class="vin-detail-label">Manufacturer</span>
        <div class="vin-detail-value">${make || "N/A"}</div>
      </div>
      <div class="vin-detail-item">
        <span class="vin-detail-label">Engine Size</span>
        <div class="vin-detail-value">${displacement ? `${displacement}L` : "N/A"}</div>
      </div>
      <div class="vin-detail-item">
        <span class="vin-detail-label">Vehicle Type</span>
        <div class="vin-detail-value">${bodyClass || "Passenger Car"}</div>
      </div>
    </div>
    
    ${modelCheckHTML}
    ${recallsHTML}
  `;
}

// 6. CONNECT TO LOCAL SCRAPING SERVER (server.js)
let isLocalServerConnected = false;

async function checkLocalScraperStatus() {
  const dot = document.getElementById("server-status-dot");
  const text = document.getElementById("server-status-text");
  
  try {
    const res = await fetch("http://localhost:3000/status");
    const data = await res.json();
    
    if (data && data.status === "active") {
      isLocalServerConnected = true;
      dot.className = "status-dot active";
      text.textContent = "Live & Connected";
      text.style.color = "var(--color-success)";
      
      // Auto-trigger listings fetch
      fetchRealtimeListings();
    }
  } catch (e) {
    isLocalServerConnected = false;
    dot.className = "status-dot";
    text.textContent = "Offline (Local Only)";
    text.style.color = "var(--text-muted)";
  }
}

async function fetchRealtimeListings() {
  if (!isLocalServerConnected) return;

  const listingsList = document.getElementById("realtime-listings-list");
  
  const zip = document.getElementById("zipcode").value.trim() || "30303";
  const radius = document.getElementById("radius").value || "50";
  const minPrice = document.getElementById("min-price").value || "800";
  const maxPrice = document.getElementById("max-price").value || "1200";
  
  const cleanTitleOnly = document.getElementById("clean-title").checked;
  const ownerOnly = document.getElementById("owner-only").checked;
  const avoidProjects = document.getElementById("avoid-projects").checked;

  listingsList.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <i class="fa-solid fa-spinner fa-spin" style="font-size: 1.5rem; color: var(--color-accent);"></i>
      <p style="margin-top: 0.5rem; color: var(--text-secondary);">Scraping local listings from Craigslist...</p>
    </div>
  `;

  try {
    const queryParams = new URLSearchParams({
      zip: zip,
      radius: radius,
      min: minPrice,
      max: maxPrice,
      clean: cleanTitleOnly,
      owner: ownerOnly,
      avoid: avoidProjects
    });

    const res = await fetch(`http://localhost:3000/scrape?${queryParams.toString()}`);
    const data = await res.json();

    if (!data || data.length === 0) {
      listingsList.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-magnifying-glass"></i>
          <p style="margin-top: 1rem;">No listings found matching your budget parameters on Craigslist.</p>
        </div>
      `;
      return;
    }

    listingsList.innerHTML = data.map(listing => {
      const audit = auditListing(listing);
      const tagsHTML = audit.tags.map(t => `<span class="listing-tag ${t.class}">${t.name}</span>`).join("");
      const dangerClass = audit.severity === "danger" ? "style='border-left: 4px solid var(--color-danger);'" : 
                          audit.severity === "warning" ? "style='border-left: 4px solid var(--color-warning);'" : "";

      return `
        <div class="listing-row" ${dangerClass}>
          <div class="listing-info">
            <div class="listing-title-row">
              <a href="${listing.link}" target="_blank" class="listing-title">${listing.title}</a>
              ${tagsHTML}
            </div>
            <div class="listing-meta">
              ${audit.notes ? `<span style="color: ${audit.severity === 'danger' ? 'var(--color-danger)' : 'var(--color-warning)'}"><i class="fa-solid fa-triangle-exclamation"></i> ${audit.notes}</span>` : ""}
            </div>
          </div>
          <div class="listing-price">${listing.price}</div>
        </div>
      `;
    }).join("");

  } catch (err) {
    listingsList.innerHTML = `
      <div class="empty-state" style="color: var(--color-danger);">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <p style="margin-top: 0.5rem;">Failed to fetch live listings.</p>
      </div>
    `;
  }
}
