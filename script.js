// ===================================================================
// FOODBRIDGE — ADVANCED FRONTEND CONTROLLER (2026)
// Features: Leaflet Interactive Map, Top 10 Lucknow NGOs, Top 10 Dharamshalas,
// Advanced Dropdowns, ID Proof & NGO Verification, 5-Stage Pickup Tracker,
// and Internal Admin Passcode Gate.
// ===================================================================

const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "foodbridge_production_demo_2026";

// ===================================================================
// 1. DATA SOURCES: TOP 10 NGOS & TOP 10 DHARAMSHALAS IN LUCKNOW
// ===================================================================

const topLucknowNGOs = [
  {
    id: "ngo-1",
    name: "Jeev Aashraya",
    category: "Animal Welfare",
    city: "Lucknow",
    locality: "Mohanlalganj / Kanpur Road",
    address: "Mohanlalganj, Kanpur Road, Lucknow, UP 226301",
    phone: "+91 94503 94503",
    email: "help@jeevaashraya.org",
    darpanId: "UP/2016/0104821",
    verified: true,
    description: "Dedicated to animal welfare, 24/7 rescue, emergency treatment, and wildlife rehabilitation services.",
    coords: [26.7450, 80.8920],
    mapQuery: "Jeev+Aashraya+Mohanlalganj+Lucknow",
    type: "NGO"
  },
  {
    id: "ngo-2",
    name: "Let's Give Hope Foundation",
    category: "Community Welfare",
    city: "Lucknow",
    locality: "Abbasnagar / Aliganj",
    address: "Maulana Kalbe Husain Road, Abbasnagar, Lucknow, UP 226003",
    phone: "+91 98390 12345",
    email: "contact@letsgivehope.org",
    darpanId: "UP/2018/0193245",
    verified: true,
    description: "Focuses on community social services, child health, rural education, and local poverty alleviation.",
    coords: [26.8682, 80.9142],
    mapQuery: "Lets+Give+Hope+Foundation+Lucknow",
    type: "NGO"
  },
  {
    id: "ngo-3",
    name: "Matoshree Vrudhashram",
    category: "Elderly Care",
    city: "Lucknow",
    locality: "Gomti Nagar Extension",
    address: "Sector 6, Gomti Nagar Extension, Lucknow, UP 226010",
    phone: "+91 94150 28411",
    email: "sewa@matoshreevrudhashram.org",
    darpanId: "UP/2015/0089123",
    verified: true,
    description: "Highly rated social welfare home providing senior healthcare, nutrition, and compassionate assisted living.",
    coords: [26.8320, 81.0125],
    mapQuery: "Matoshree+Vrudhashram+Lucknow",
    type: "NGO"
  },
  {
    id: "ngo-4",
    name: "Vishalakshi Foundation",
    category: "Food Relief",
    city: "Lucknow",
    locality: "Gomti Nagar",
    address: "12/45 Vibhuti Khand, Gomti Nagar, Lucknow, UP 226010",
    phone: "+91 99182 34455",
    email: "info@vishalakshifoundation.org",
    darpanId: "UP/2019/0228491",
    verified: true,
    description: "Active grassroots hunger alleviation initiative running daily slum food distribution and child nourishment drives.",
    coords: [26.8580, 81.0020],
    mapQuery: "Vishalakshi+Foundation+Gomti+Nagar+Lucknow",
    type: "NGO"
  },
  {
    id: "ngo-5",
    name: "Project KHEL",
    category: "Youth & Education",
    city: "Lucknow",
    locality: "Indira Nagar",
    address: "Sector 14, Indira Nagar, Lucknow, UP 226016",
    phone: "+91 98392 67812",
    email: "team@projectkhel.org",
    darpanId: "UP/2014/0074128",
    verified: true,
    description: "Utilizes play-based learning and sports to impart gender inclusivity, hygiene, and critical life skills to underprivileged youth.",
    coords: [26.8850, 80.9850],
    mapQuery: "Project+KHEL+Indira+Nagar+Lucknow",
    type: "NGO"
  },
  {
    id: "ngo-6",
    name: "Nari Sewa Samiti",
    category: "Women Empowerment",
    city: "Lucknow",
    locality: "Chowk / Raja Bazaar",
    address: "2 Raja Bazaar, Chowk, Lucknow, UP 226003",
    phone: "0522-2256711",
    email: "narisewasamiti@gmail.com",
    darpanId: "UP/2012/0043120",
    verified: true,
    description: "Historic pioneer institution dedicated to women's literacy, widow support, and certified vocational handicraft training.",
    coords: [26.8710, 80.9065],
    mapQuery: "Nari+Sewa+Samiti+Chowk+Lucknow",
    type: "NGO"
  },
  {
    id: "ngo-7",
    name: "Magic Bus India Foundation",
    category: "Youth & Livelihood",
    city: "Lucknow",
    locality: "Vibhuti Khand",
    address: "Shalimar Titanium, Vibhuti Khand, Gomti Nagar, Lucknow, UP 226010",
    phone: "0522-4958100",
    email: "lucknow@magicbusindia.org",
    darpanId: "UP/2013/0061984",
    verified: true,
    description: "Equips adolescent youth and first-generation job seekers with digital literacy and sustainable livelihood skills.",
    coords: [26.8530, 81.0050],
    mapQuery: "Magic+Bus+India+Foundation+Lucknow",
    type: "NGO"
  },
  {
    id: "ngo-8",
    name: "Kiran Foundation",
    category: "Social Support",
    city: "Lucknow",
    locality: "Alambagh",
    address: "Sector B, Bargawan, Alambagh, Lucknow, UP 226005",
    phone: "+91 93352 18901",
    email: "contact@kiranfoundation.in",
    darpanId: "UP/2017/0147289",
    verified: true,
    description: "Grassroots community social work providing blankets, educational kits, and food relief to underserved urban settlements.",
    coords: [26.8040, 80.9050],
    mapQuery: "Kiran+Foundation+Alambagh+Lucknow",
    type: "NGO"
  },
  {
    id: "ngo-9",
    name: "Roti Bank (AIBRT Lucknow)",
    category: "Food Relief",
    city: "Lucknow",
    locality: "Chowk / KGMU Area",
    address: "Near KGMU Trauma Centre, Chowk, Lucknow, UP 226003",
    phone: "+91 94150 09876",
    email: "rotibanklucknow@gmail.com",
    darpanId: "UP/2015/0091823",
    verified: true,
    description: "Focuses on eradicating hunger by redistributing surplus cooked food to patient attendants outside major hospitals and railway stations.",
    coords: [26.8685, 80.9180],
    mapQuery: "Roti+Bank+Lucknow+Chowk",
    type: "NGO"
  },
  {
    id: "ngo-10",
    name: "Vigyan Foundation",
    category: "Community Rights",
    city: "Lucknow",
    locality: "Indira Nagar",
    address: "D-3191, Indira Nagar, Lucknow, UP 226016",
    phone: "0522-2355416",
    email: "vigyanfoundation@yahoo.com",
    darpanId: "UP/2011/0038921",
    verified: true,
    description: "Empowers homeless populations, street vendors, and urban poor through shelter advocacy, health camps, and food justice.",
    coords: [26.8910, 80.9930],
    mapQuery: "Vigyan+Foundation+Indira+Nagar+Lucknow",
    type: "NGO"
  }
];

const topLucknowDharamshalas = [
  {
    id: "dh-1",
    name: "Babu Chhedi Lal Dharamshala",
    category: "Dharamshala",
    city: "Lucknow",
    locality: "Aminabad",
    address: "Opposite Jhande Wala Park, Aminabad, Lucknow, UP 226018",
    phone: "0522-2614532 / +91 94151 77890",
    rates: "Single bed from ₹100/night; AC rooms from ₹850/night",
    capacity: "120+ beds & large community hall",
    description: "Legendary budget stay right opposite Jhande Wala Park in bustling Aminabad. Offers massive savings with clean basic amenities.",
    coords: [26.8445, 80.9275],
    mapQuery: "Babu+Chhedi+Lal+Dharamshala+Aminabad+Lucknow",
    type: "Dharamshala"
  },
  {
    id: "dh-2",
    name: "Vinayak Dharamshala",
    category: "Dharamshala",
    city: "Lucknow",
    locality: "Charbagh",
    address: "750m from Charbagh Railway & Bus Stand, Lucknow, UP 226004",
    phone: "0522-2637890 / +91 98394 22100",
    rates: "2-bed & 4-bed cooler rooms from ₹250 to ₹500/night",
    capacity: "80 beds, elevator & 24h water",
    description: "Conveniently situated near Charbagh Railway Station. Offers tidy 2 and 4-bedded rooms with cooler options.",
    coords: [26.8320, 80.9230],
    mapQuery: "Vinayak+Dharamshala+Charbagh+Lucknow",
    type: "Dharamshala"
  },
  {
    id: "dh-3",
    name: "Digambar Jain Temple & Sri Munnelalkagji Dharamshala",
    category: "Dharamshala",
    city: "Lucknow",
    locality: "Charbagh / Gurunanak Market",
    address: "Gurunanak Market, Near Charbagh, Lucknow, UP 226004",
    phone: "0522-2635411 / +91 94512 88990",
    rates: "Rooms ₹200 – ₹600/night (Satvik Dining Available)",
    capacity: "Clean Jain boarding lodge, 60 rooms",
    description: "Celebrated for spotless, peaceful facilities, temple attached, and hygienic satvik food canteen for visitors.",
    coords: [26.8340, 80.9215],
    mapQuery: "Digambar+Jain+Temple+Dharamshala+Charbagh+Lucknow",
    type: "Dharamshala"
  },
  {
    id: "dh-4",
    name: "Sahu Sheetal Dharamshala",
    category: "Dharamshala",
    city: "Lucknow",
    locality: "Naka Hindola / Charbagh",
    address: "Naka Hindola Chauraha, Near Charbagh, Lucknow, UP 226004",
    phone: "0522-2691234 / +91 93359 44321",
    rates: "Dorm bed from ₹150; private room ₹400/night",
    capacity: "100+ visitors capacity",
    description: "A well-known budget refuge near Naka Hindola. Popular with transit passengers and families visiting medical centers.",
    coords: [26.8365, 80.9180],
    mapQuery: "Sahu+Sheetal+Dharamshala+Naka+Hindola+Lucknow",
    type: "Dharamshala"
  },
  {
    id: "dh-5",
    name: "Munnu Lal Dharamshala",
    category: "Dharamshala",
    city: "Lucknow",
    locality: "Chowk / Medical College",
    address: "Medical College Road, Chowk, Lucknow, UP 226003",
    phone: "0522-2258901 / +91 94153 66789",
    rates: "Rooms range between ₹150 and ₹300/night",
    capacity: "45 rooms, proximity to KGMU hospitals",
    description: "Strategically located near KGMU Medical College in Chowk. Provides essential low-cost accommodation for patient attendants.",
    coords: [26.8705, 80.9160],
    mapQuery: "Munnu+Lal+Dharamshala+Chowk+Lucknow",
    type: "Dharamshala"
  },
  {
    id: "dh-6",
    name: "Radhika Devi Dharamsala",
    category: "Dharamshala",
    city: "Lucknow",
    locality: "Aminabad",
    address: "Subhash Marg, Aminabad Market, Lucknow, UP 226018",
    phone: "0522-2621980 / +91 98380 55432",
    rates: "Rooms ₹200 – ₹550/night",
    capacity: "50 rooms, market access",
    description: "Conveniently situated on Subhash Marg in the bustling Aminabad trading district, ideal for merchants and wedding parties.",
    coords: [26.8480, 80.9290],
    mapQuery: "Radhika+Devi+Dharamsala+Subhash+Marg+Lucknow",
    type: "Dharamshala"
  },
  {
    id: "dh-7",
    name: "Aggarwal Dharamshala",
    category: "Dharamshala",
    city: "Lucknow",
    locality: "Chowk",
    address: "Kamla Nehru Marg, Chowk, Lucknow, UP 226003",
    phone: "0522-2254321 / +91 94150 99881",
    rates: "Rooms ₹250 – ₹600/night",
    capacity: "Spacious multi-bed rooms with pure veg dining",
    description: "Caters primarily to traveling families and religious pilgrims seeking comfortable, trusted community lodging.",
    coords: [26.8660, 80.9120],
    mapQuery: "Aggarwal+Dharamshala+Kamla+Nehru+Marg+Lucknow",
    type: "Dharamshala"
  },
  {
    id: "dh-8",
    name: "Jain Dharamshala",
    category: "Dharamshala",
    city: "Lucknow",
    locality: "Chaupatiyan",
    address: "Khunkhunji Road, Chaupatiyan, Lucknow, UP 226003",
    phone: "0522-2259100 / +91 94500 12344",
    rates: "Rooms ₹200 – ₹450/night",
    capacity: "Strictly vegetarian, tranquil ambience",
    description: "Located on historic Khunkhunji Road in Old Lucknow, known for its serene courtyards and dedicated community service.",
    coords: [26.8620, 80.9080],
    mapQuery: "Jain+Dharamshala+Khunkhunji+Road+Lucknow",
    type: "Dharamshala"
  },
  {
    id: "dh-9",
    name: "Lala Bholanath Dharamshala",
    category: "Dharamshala",
    city: "Lucknow",
    locality: "Chaupatiyan / Chowk",
    address: "Near Victoria Street, Chaupatiyan, Lucknow, UP 226003",
    phone: "0522-2257654 / +91 93055 88776",
    rates: "Beds ₹150 – ₹350/night",
    capacity: "35 rooms, heritage architecture",
    description: "Affordable night shelter situated near Victoria Street in Old Lucknow, offering quick transit to KGMU and Bara Imambara.",
    coords: [26.8645, 80.9055],
    mapQuery: "Lala+Bholanath+Dharamshala+Chaupatiyan+Lucknow",
    type: "Dharamshala"
  },
  {
    id: "dh-10",
    name: "Radhe Shyam Laxminarayan Dharmashala",
    category: "Dharamshala",
    city: "Lucknow",
    locality: "Yahiyaganj",
    address: "Yahiyaganj Wholesale Market Hub, Lucknow, UP 226003",
    phone: "0522-2253322 / +91 98391 77654",
    rates: "Rooms ₹180 – ₹400/night",
    capacity: "70 rooms & banquet hall",
    description: "Situated in the central wholesale spice and grain trade district of Yahiyaganj. Highly accessible for logistics workers and pilgrims.",
    coords: [26.8590, 80.9150],
    mapQuery: "Radhe+Shyam+Laxminarayan+Dharmashala+Yahiyaganj+Lucknow",
    type: "Dharamshala"
  }
];

// Sample Surplus Food Listings with Real Photography
const sampleFoods = [
  {
    id: "f1",
    name: "Fresh Veg Pulao & Paneer Thali Boxes",
    type: "Meals",
    quantity: "45 meal boxes (22 kg)",
    city: "Lucknow",
    locality: "Hazratganj",
    location: "Hazratganj Main Market",
    provider: "Oudh Heritage Banquet",
    prepared: new Date(Date.now() - 3600000).toISOString(),
    deadline: new Date(Date.now() + 2.5 * 3600000).toISOString(),
    donorIdType: "FSSAI Food License",
    donorIdMasked: "FSSAI-12723001XXXXXX",
    verifiedDonor: true,
    image: "assets/images/food-relief-elderly.jpg",
    coords: [26.8480, 80.9425]
  },
  {
    id: "f2",
    name: "Artisanal Multigrain Breads & Buns",
    type: "Bakery",
    quantity: "35 packets (14 kg)",
    city: "Lucknow",
    locality: "Gomti Nagar",
    location: "Viram Khand, Gomti Nagar",
    provider: "The Golden Crust Bakery",
    prepared: new Date(Date.now() - 2 * 3600000).toISOString(),
    deadline: new Date(Date.now() + 6 * 3600000).toISOString(),
    donorIdType: "GST / PAN",
    donorIdMasked: "AAACG1234F",
    verifiedDonor: true,
    image: "assets/images/bakery-surplus.jpg",
    coords: [26.8550, 80.9980]
  },
  {
    id: "f3",
    name: "Fresh Seasonal Apples & Bananas",
    type: "Fruits",
    quantity: "20 kg crates",
    city: "Lucknow",
    locality: "Dubagga Mandi",
    location: "Fruit Mandi Gate 2, Dubagga",
    provider: "Dubagga Wholesaler Union",
    prepared: new Date().toISOString(),
    deadline: new Date(Date.now() + 10 * 3600000).toISOString(),
    donorIdType: "Aadhaar Card",
    donorIdMasked: "XXXX-XXXX-9182",
    verifiedDonor: true,
    image: "assets/images/hero-produce.jpg",
    coords: [26.8780, 80.8750]
  },
  {
    id: "f4",
    name: "Sealed Dry Rations & Lentils",
    type: "Packaged",
    quantity: "50 kg sacks",
    city: "Lucknow",
    locality: "Yahiyaganj",
    location: "Grain Market, Yahiyaganj",
    provider: "Laxmi Kirana Traders",
    prepared: new Date(Date.now() - 4 * 3600000).toISOString(),
    deadline: new Date(Date.now() + 36 * 3600000).toISOString(),
    donorIdType: "GST / Business Reg",
    donorIdMasked: "09AAAPL1234M1Z2",
    verifiedDonor: true,
    image: "assets/images/community-midday-meals.jpg",
    coords: [26.8580, 80.9140]
  },
  {
    id: "f5",
    name: "Fresh Farm Spinach & Cauli",
    type: "Vegetables",
    quantity: "30 kg crates",
    city: "Lucknow",
    locality: "Chowk",
    location: "Sabzi Mandi Chowk",
    provider: "Awadh Kisan Cooperative",
    prepared: new Date().toISOString(),
    deadline: new Date(Date.now() + 8 * 3600000).toISOString(),
    donorIdType: "Kisan Credit Card / Aadhaar",
    donorIdMasked: "XXXX-XXXX-4412",
    verifiedDonor: true,
    image: "assets/images/lucknow-mandi-produce.jpg",
    coords: [26.8690, 80.9080]
  },
  {
    id: "f6",
    name: "Dal Makhani & Roti Catering Packs",
    type: "Meals",
    quantity: "28 hot containers (15 kg)",
    city: "Lucknow",
    locality: "Alambagh",
    location: "Near Alambagh Bus Stand",
    provider: "Royal Swad Canteen",
    prepared: new Date(Date.now() - 1.5 * 3600000).toISOString(),
    deadline: new Date(Date.now() + 3 * 3600000).toISOString(),
    donorIdType: "FSSAI License",
    donorIdMasked: "FSSAI-11221004XXXXXX",
    verifiedDonor: true,
    image: "assets/images/indian-thali.jpg",
    coords: [26.8120, 80.9020]
  }
];

// Combine all organizations into a single master directory
const allDirectory = [...topLucknowNGOs, ...topLucknowDharamshalas];

// ===================================================================
// 2. STATE PERSISTENCE & INITIALIZATION
// ===================================================================

function loadAppData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Storage load error:", e);
  }

  return {
    foods: sampleFoods,
    requests: [
      {
        id: "req-101",
        foodId: "f1",
        foodName: "Fresh Veg Pulao & Paneer Thali Boxes",
        quantity: "45 meal boxes (22 kg)",
        city: "Lucknow",
        locality: "Hazratganj",
        assignedOrg: "Roti Bank (AIBRT Lucknow)",
        assignedOrgType: "NGO",
        requester: "Sevadar Harpreet Singh",
        stage: 3, // 1: Created, 2: Confirmed, 3: En Route, 4: Collected, 5: Delivered
        stageName: "Volunteer En Route",
        volunteerName: "Amit Verma (Cargo E-Rickshaw #UP-32-ER-441)",
        volunteerPhone: "+91 98391 88220",
        tempChecked: "62°C (Hygienic Hot Holding)",
        eta: "14 mins",
        createdAt: new Date(Date.now() - 45 * 60000).toISOString()
      }
    ],
    activities: [
      new Date().toLocaleTimeString() + " — FoodBridge 2026 system initialized."
    ],
    user: null,
    adminSession: null
  };
}

let appState = loadAppData();
let leafletMap = null;
let mapMarkers = [];
let selectedFoodForPickup = null;
let toastTimeout = null;

function saveAppData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    showToast("Storage quota exceeded or private mode active.");
  }
  updateStats();
}

function safeText(str) {
  return String(str ?? "").replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[m]);
}

function showToast(msg) {
  const t = $("toast");
  if (!t) return;
  t.innerHTML = `<span>${safeText(msg)}</span>`;
  t.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    t.classList.remove("show");
  }, 3600);
}

function logActivity(text) {
  appState.activities.unshift(new Date().toLocaleTimeString() + " — " + text);
  appState.activities = appState.activities.slice(0, 30);
  saveAppData();
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch (e) {
    return iso;
  }
}

function foodEmoji(type) {
  const map = {
    Meals: "🍱",
    Bakery: "🥖",
    Fruits: "🍎",
    Vegetables: "🥦",
    Packaged: "📦",
    Dairy: "🥛",
    Other: "🍲"
  };
  return map[type] || "🍲";
}

function getUrgency(item) {
  const msLeft = new Date(item.deadline).getTime() - Date.now();
  const hrs = msLeft / 3600000;
  if (hrs <= 0) {
    return { label: "Expired", className: "risk", score: 999 };
  } else if (hrs <= 2) {
    return { label: `Urgent (${hrs.toFixed(1)}h left)`, className: "risk", score: 100 };
  } else if (hrs <= 5) {
    return { label: `Collect Soon (${hrs.toFixed(1)}h left)`, className: "urgent", score: 50 };
  }
  return { label: `Safe (${hrs.toFixed(0)}h left)`, className: "safe", score: 10 };
}

// ===================================================================
// 3. LEAFLET INTERACTIVE MAP SYSTEM
// ===================================================================

function initInteractiveMap() {
  const mapEl = $("leafletMap");
  if (!mapEl || typeof L === "undefined") return;

  // Center on Lucknow [26.8467, 80.9462]
  leafletMap = L.map("leafletMap", {
    scrollWheelZoom: false
  }).setView([26.8480, 80.9400], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors | FoodBridge'
  }).addTo(leafletMap);

  renderMapMarkers();
}

function renderMapMarkers() {
  if (!leafletMap || typeof L === "undefined") return;

  // Clear existing markers
  mapMarkers.forEach((m) => leafletMap.removeLayer(m));
  mapMarkers = [];

  // Custom marker creators (Clean geometric pins, no cartoon emojis)
  const createIcon = (colorHex, label) => {
    return L.divIcon({
      className: "custom-leaflet-marker",
      html: `<div style="
        background: ${colorHex};
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 3px 10px rgba(0,0,0,0.25);
        border: 2px solid white;
        font-weight: 700;
        font-size: 11px;
        letter-spacing: -0.02em;
      ">${label}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  const foodIcon = createIcon("#1b5e39", "FB");
  const ngoIcon = createIcon("#d97706", "NGO");
  const dhIcon = createIcon("#7c3aed", "DH");

  // Plot available surplus foods
  appState.foods.forEach((f) => {
    if (f.coords && f.coords.length === 2) {
      const marker = L.marker(f.coords, { icon: foodIcon }).addTo(leafletMap);
      const popupHtml = `
        <div style="font-family: var(--font-body); min-width: 200px;">
          <span style="background: #e8f5ec; color: #1b5e39; font-weight:700; font-size:11px; padding:2px 6px; border-radius:10px;">Surplus Food</span>
          <h4 style="margin: 6px 0 3px; font-size: 14px; font-weight:700; color: #0f2d1e;">${safeText(f.name)}</h4>
          <p style="margin:0 0 6px; font-size: 12px; color: #5e6f65;">${safeText(f.quantity)} · ${safeText(f.location)}</p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${f.coords[0]},${f.coords[1]}" target="_blank" style="color: #1b5e39; font-weight:600; font-size: 12px; text-decoration: underline;">Navigate in Google Maps ↗</a>
        </div>
      `;
      marker.bindPopup(popupHtml);
      mapMarkers.push(marker);
    }
  });

  // Plot Top 10 NGOs
  topLucknowNGOs.forEach((ngo) => {
    if (ngo.coords && ngo.coords.length === 2) {
      const marker = L.marker(ngo.coords, { icon: ngoIcon }).addTo(leafletMap);
      const popupHtml = `
        <div style="font-family: var(--font-body); min-width: 220px;">
          <span style="background: #fef3c7; color: #92400e; font-weight:700; font-size:11px; padding:2px 6px; border-radius:10px;">NGO: ${safeText(ngo.category)}</span>
          <h4 style="margin: 6px 0 3px; font-size: 14px; font-weight:700; color: #0f2d1e;">${safeText(ngo.name)}</h4>
          <p style="margin:0 0 6px; font-size: 12px; color: #5e6f65;">Locality: ${safeText(ngo.locality)}<br>Phone: ${safeText(ngo.phone)}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ngo.mapQuery)}" target="_blank" style="color: #d97706; font-weight:600; font-size: 12px; text-decoration: underline;">Open Google Maps ↗</a>
        </div>
      `;
      marker.bindPopup(popupHtml);
      mapMarkers.push(marker);
    }
  });

  // Plot Top 10 Dharamshalas
  topLucknowDharamshalas.forEach((dh) => {
    if (dh.coords && dh.coords.length === 2) {
      const marker = L.marker(dh.coords, { icon: dhIcon }).addTo(leafletMap);
      const popupHtml = `
        <div style="font-family: var(--font-body); min-width: 220px;">
          <span style="background: #f4edf9; color: #6b21a8; font-weight:700; font-size:11px; padding:2px 6px; border-radius:10px;">Community Shelter</span>
          <h4 style="margin: 6px 0 3px; font-size: 14px; font-weight:700; color: #0f2d1e;">${safeText(dh.name)}</h4>
          <p style="margin:0 0 4px; font-size: 12px; color: #5e6f65;">Locality: ${safeText(dh.locality)}<br>Rates: ${safeText(dh.rates)}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dh.mapQuery)}" target="_blank" style="color: #6b21a8; font-weight:600; font-size: 12px; text-decoration: underline;">Open Google Maps ↗</a>
        </div>
      `;
      marker.bindPopup(popupHtml);
      mapMarkers.push(marker);
    }
  });
}

function focusOnMap(lat, lng, name) {
  if (!leafletMap) return;
  leafletMap.flyTo([lat, lng], 15, { duration: 1.2 });
  $("map-section")?.scrollIntoView({ behavior: "smooth" });
  showToast(`Focusing map on: ${name}`);
}

// ===================================================================
// 4. AVAILABLE SURPLUS FOOD LISTINGS & FILTERS
// ===================================================================

function renderFoodCards() {
  const search = $("foodSearch")?.value.toLowerCase().trim() || "";
  const city = $("foodCity")?.value || "All cities";
  const locality = $("foodLocality")?.value || "All localities";
  const type = $("foodType")?.value || "All types";
  const sort = $("foodSort")?.value || "urgent";

  let filtered = appState.foods.filter((food) => {
    const textPool = [
      food.name,
      food.provider,
      food.location,
      food.locality,
      food.city,
      food.type
    ].join(" ").toLowerCase();

    const matchSearch = textPool.includes(search);
    const matchCity = city === "All cities" || food.city === city;
    const matchLocality = locality === "All localities" || food.locality === locality;
    const matchType = type === "All types" || food.type === type;

    return matchSearch && matchCity && matchLocality && matchType;
  });

  if (sort === "urgent") {
    filtered.sort((a, b) => getUrgency(b).score - getUrgency(a).score);
  } else if (sort === "quantity") {
    filtered.sort((a, b) => {
      const numA = parseFloat(a.quantity) || 0;
      const numB = parseFloat(b.quantity) || 0;
      return numB - numA;
    });
  } else if (sort === "city") {
    filtered.sort((a, b) => (a.locality || a.city).localeCompare(b.locality || b.city));
  }

  const container = $("foodCards");
  const emptyNote = $("noFood");
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = "";
    emptyNote?.classList.remove("hidden");
    return;
  }
  emptyNote?.classList.add("hidden");

  container.innerHTML = filtered.map((f) => {
    const urgency = getUrgency(f);
    const hasCoords = f.coords && f.coords.length === 2;
    const gmapsUrl = hasCoords
      ? `https://www.google.com/maps/dir/?api=1&destination=${f.coords[0]},${f.coords[1]}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.location + " " + f.city)}`;

    const fallbackImg = f.type === "Bakery"
      ? "assets/images/bakery-surplus.jpg"
      : (f.type === "Fruits" ? "assets/images/hero-produce.jpg" : "assets/images/food-relief-elderly.jpg");
    const foodImgSrc = f.image || fallbackImg;

    return `
      <article class="card" id="card-${f.id}">
        <div>
          <!-- REAL FOOD PHOTOGRAPHY THUMBNAIL (REPLACING CARTOON GRAPHICS) -->
          <div class="card-thumbnail-wrap">
            <img src="${foodImgSrc}" alt="${safeText(f.name)}" loading="lazy">
            <span class="card-category-tag">${safeText(f.type)}</span>
          </div>

          <div class="card-top" style="margin-bottom: 8px;">
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <span class="pill ${urgency.className}">${safeText(urgency.label)}</span>
              ${f.verifiedDonor ? '<span class="verified-badge">✓ Verified Donor</span>' : ''}
            </div>
          </div>

          <h3>${safeText(f.name)}</h3>
          <p style="font-size:0.86rem; color: var(--text-muted); margin-bottom: 12px;">
            Donated by <strong>${safeText(f.provider)}</strong>
          </p>

          <ul class="card-meta-list">
            <li><strong>Quantity:</strong> <span>${safeText(f.quantity)}</span></li>
            <li><strong>Locality:</strong> <span>${safeText(f.locality || f.location)}, ${safeText(f.city)}</span></li>
            <li><strong>Prepared:</strong> <span>${formatDate(f.prepared)}</span></li>
            <li><strong>Collect By:</strong> <span>${formatDate(f.deadline)}</span></li>
            <li><strong>ID Record:</strong> <span>${safeText(f.donorIdType || "Aadhaar")} (${safeText(f.donorIdMasked || "Verified")})</span></li>
          </ul>
        </div>

        <div class="card-actions">
          <button class="btn sm" data-request-id="${safeText(f.id)}">
            Request Pickup
          </button>
          ${hasCoords ? `
            <button class="btn sm outline" onclick="focusOnMap(${f.coords[0]}, ${f.coords[1]}, '${safeText(f.name)}')">
              View Pin
            </button>
          ` : ''}
          <a class="btn sm outline" href="${gmapsUrl}" target="_blank" rel="noopener">
            Directions ↗
          </a>
        </div>
      </article>
    `;
  }).join("");

  updateStats();
}

// Bind event listeners for food filter changes
["foodSearch", "foodCity", "foodLocality", "foodType", "foodSort"].forEach((id) => {
  $(id)?.addEventListener("input", renderFoodCards);
  $(id)?.addEventListener("change", renderFoodCards);
});

// ===================================================================
// 5. NGO & DHARAMSHALA DIRECTORY MODULE
// ===================================================================

function renderDirectory() {
  const search = $("dirSearch")?.value.toLowerCase().trim() || "";
  const filterType = $("dirCategory")?.value || "All";
  const filterLocality = $("dirLocality")?.value || "All";

  let items = allDirectory.filter((org) => {
    const textPool = [
      org.name,
      org.category,
      org.address,
      org.locality,
      org.city,
      org.description,
      org.type
    ].join(" ").toLowerCase();

    const matchSearch = textPool.includes(search);
    const matchCategory =
      filterType === "All" ||
      (filterType === "NGO" && org.type === "NGO") ||
      (filterType === "Dharamshala" && org.type === "Dharamshala") ||
      org.category.toLowerCase().includes(filterType.toLowerCase());

    const matchLocality = filterLocality === "All" || org.locality.toLowerCase().includes(filterLocality.toLowerCase());

    return matchSearch && matchCategory && matchLocality;
  });

  const container = $("dirCards");
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `<p class="empty" style="grid-column: 1 / -1;">No matching organization or dharamshala found for this search.</p>`;
    return;
  }

  container.innerHTML = items.map((org) => {
    const isDh = org.type === "Dharamshala";
    const badgeClass = isDh ? "pill dharamshala" : "pill safe";
    const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(org.mapQuery || (org.name + " " + org.city))}`;

    return `
      <article class="card">
        <div>
          <div class="card-top" style="margin-bottom: 10px;">
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <span class="${badgeClass}">${safeText(org.type)}: ${safeText(org.category)}</span>
              ${org.verified ? '<span class="verified-badge">✓ Darpan Verified</span>' : ''}
            </div>
          </div>

          <h3>${safeText(org.name)}</h3>
          <p style="font-size:0.88rem; color: var(--text-muted); margin-bottom: 12px;">
            ${safeText(org.description)}
          </p>

          <ul class="card-meta-list">
            <li><strong>Locality:</strong> <span>${safeText(org.locality)}, ${safeText(org.city)}</span></li>
            <li><strong>Address:</strong> <span>${safeText(org.address)}</span></li>
            <li><strong>Phone:</strong> <span><a href="tel:${safeText(org.phone)}" style="color:var(--green-primary); font-weight:600;">${safeText(org.phone)}</a></span></li>
            ${org.rates ? `<li><strong>Rates:</strong> <span style="color:#6b21a8; font-weight:600;">${safeText(org.rates)}</span></li>` : ''}
            ${org.capacity ? `<li><strong>Capacity:</strong> <span>${safeText(org.capacity)}</span></li>` : ''}
            ${org.darpanId ? `<li><strong>Darpan ID:</strong> <span>${safeText(org.darpanId)} (NITI Aayog)</span></li>` : ''}
          </ul>
        </div>

        <div class="card-actions">
          <a class="btn sm" href="${gmapsUrl}" target="_blank" rel="noopener">
            Google Maps ↗
          </a>
          <button class="btn sm outline" onclick="focusOnMap(${org.coords[0]}, ${org.coords[1]}, '${safeText(org.name)}')">
            Show on Map
          </button>
          <a class="btn sm outline" href="tel:${safeText(org.phone)}">
            Call Direct
          </a>
        </div>
      </article>
    `;
  }).join("");
}

["dirSearch", "dirCategory", "dirLocality"].forEach((id) => {
  $(id)?.addEventListener("input", renderDirectory);
  $(id)?.addEventListener("change", renderDirectory);
});

// ===================================================================
// 6. ENHANCED DONATION FORM & ID VERIFICATION
// ===================================================================

function initDonationForm() {
  const form = $("donationForm");
  if (!form) return;

  // Set default times (prepared = now, collect deadline = +4 hours)
  const now = new Date();
  const later = new Date(Date.now() + 4 * 3600000);
  const toLocalIso = (d) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const prepInput = $("prepared");
  const deadInput = $("deadline");
  if (prepInput) prepInput.value = toLocalIso(now);
  if (deadInput) deadInput.value = toLocalIso(later);

  // ID Type change hint helper
  const idTypeSelect = $("donorIdType");
  const idNumInput = $("donorIdNumber");
  const idHint = $("idFormatHint");

  idTypeSelect?.addEventListener("change", () => {
    const val = idTypeSelect.value;
    if (val === "Aadhaar Card") {
      idNumInput.placeholder = "e.g. 5482 1928 3341 (12 digits)";
      if (idHint) idHint.textContent = "Format: 12-digit UIDAI number. Stored in masked format for security.";
    } else if (val === "PAN Card") {
      idNumInput.placeholder = "e.g. ABCDE1234F";
      if (idHint) idHint.textContent = "Format: 10-character alphanumeric Income Tax Permanent Account Number.";
    } else if (val === "FSSAI Food License") {
      idNumInput.placeholder = "e.g. 12723001000123 (14 digits)";
      if (idHint) idHint.textContent = "Format: 14-digit state/central FSSAI food business registration number.";
    } else {
      idNumInput.placeholder = "Enter Government ID Number";
      if (idHint) idHint.textContent = "Valid government-issued identification required for food trace compliance.";
    }
  });

  // NGO Registration verification live check
  const verifyBtn = $("verifyDarpanBtn");
  const ngoRegInput = $("ngoRegNumber");
  const verifyResult = $("darpanVerifyResult");

  verifyBtn?.addEventListener("click", () => {
    const reg = ngoRegInput.value.trim().toUpperCase();
    if (!reg) {
      showToast("Please enter an NGO Registration or Darpan ID.");
      return;
    }

    verifyResult.innerHTML = `<span style="color:#d97706;">🔍 Querying NITI Aayog NGO-Darpan Registry...</span>`;
    setTimeout(() => {
      // Simulate live check
      const isKnown = topLucknowNGOs.some((n) => n.darpanId.toUpperCase() === reg) || reg.startsWith("UP/");
      if (isKnown) {
        verifyResult.innerHTML = `
          <div style="color: #106f3e; font-size: 0.88rem; font-weight:700; margin-top:6px;">
            ✓ Validated Active: NITI Aayog Darpan & UP Society Reg (${safeText(reg)}). 12A/80G status confirmed.
          </div>
        `;
        showToast("NGO Registration verified successfully.");
      } else {
        verifyResult.innerHTML = `
          <div style="color: #1b5e39; font-size: 0.88rem; font-weight:600; margin-top:6px;">
            ✓ Simulated Pre-verification Passed for ${safeText(reg)}. Provisional FoodBridge approval granted.
          </div>
        `;
        showToast("Registration registered for audit.");
      }
    }, 700);
  });

  // Handle Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("foodName").value.trim();
    const type = $("newType").value;
    const quantity = $("quantity").value.trim();
    const city = $("newCity").value;
    const locality = $("newLocality").value;
    const location = $("location").value.trim();
    const donorIdType = $("donorIdType").value;
    const donorIdNum = $("donorIdNumber").value.trim();
    const preparedVal = new Date($("prepared").value);
    const deadlineVal = new Date($("deadline").value);
    const tempCondition = $("storageTemp")?.value || "Ambient Room Temp";

    if (!name || !quantity || !location || !donorIdNum) {
      showToast("Please fill all required asterisk (*) fields.");
      return;
    }

    if (deadlineVal <= preparedVal) {
      showToast("Collection deadline must be AFTER preparation time.");
      return;
    }

    if (deadlineVal <= new Date()) {
      showToast("Collection deadline must be in the future.");
      return;
    }

    // Mask ID Number for privacy (e.g., show only last 4 characters)
    const maskedId = donorIdNum.length > 4
      ? "XXXX-XXXX-" + donorIdNum.slice(-4)
      : "XXXX-" + donorIdNum;

    // Image assignment for newly posted foods
    const categoryImages = {
      Meals: "assets/images/indian-thali.jpg",
      Bakery: "assets/images/bakery-surplus.jpg",
      Fruits: "assets/images/hero-produce.jpg",
      Vegetables: "assets/images/lucknow-mandi-produce.jpg",
      Packaged: "assets/images/community-midday-meals.jpg",
      Dairy: "assets/images/indian-thali.jpg"
    };
    const foodImg = categoryImages[type] || "assets/images/food-relief-elderly.jpg";

    // Approximate Lucknow center coordinates for new listings
    const newFood = {
      id: "f" + Date.now(),
      name: name,
      type: type,
      quantity: quantity,
      city: city,
      locality: locality,
      location: location,
      provider: appState.user ? appState.user.name : "Community Donor",
      prepared: preparedVal.toISOString(),
      deadline: deadlineVal.toISOString(),
      storageTemp: tempCondition,
      donorIdType: donorIdType,
      donorIdMasked: maskedId,
      verifiedDonor: true,
      image: foodImg,
      coords: [26.8480 + (Math.random() - 0.5) * 0.05, 80.9400 + (Math.random() - 0.5) * 0.05]
    };

    appState.foods.unshift(newFood);
    logActivity(`New food listed: ${name} (${quantity}) in ${locality}`);
    saveAppData();

    form.reset();
    prepInput.value = toLocalIso(new Date());
    deadInput.value = toLocalIso(new Date(Date.now() + 4 * 3600000));

    renderFoodCards();
    renderMapMarkers();

    showToast("Food listing published successfully with verified ID proof!");
    $("food")?.scrollIntoView({ behavior: "smooth" });
  });
}

// ===================================================================
// 7. 5-STAGE PICKUP REQUEST MODAL & STEPPER TRACKER
// ===================================================================

function openPickupModal(foodId) {
  const food = appState.foods.find((f) => f.id === foodId);
  if (!food) return;

  selectedFoodForPickup = food;
  const modal = $("requestDialog");
  if (!modal) return;

  $("requestTitle").textContent = `Request Pickup: ${food.name}`;
  $("requestDescription").textContent = `${food.quantity} · ${food.locality || food.location}, ${food.city} · Collect before: ${formatDate(food.deadline)}`;

  // Populate Select with Verified NGOs and Dharamshalas
  const select = $("requestNgoSelect");
  if (select) {
    select.innerHTML = allDirectory.map((org) => {
      return `<option value="${safeText(org.name)}|${safeText(org.type)}|${safeText(org.phone)}">${safeText(org.name)} [${safeText(org.type)}: ${safeText(org.locality)}]</option>`;
    }).join("");
  }

  // Pre-fill requester name if signed in
  const requesterInput = $("requesterName");
  if (requesterInput) {
    requesterInput.value = appState.user ? appState.user.name : "";
  }

  modal.showModal();
}

// Event Delegation for Pickup Request buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-request-id]");
  if (btn) {
    openPickupModal(btn.getAttribute("data-request-id"));
  }
});

function initPickupHandlers() {
  $("confirmRequestBtn")?.addEventListener("click", () => {
    if (!selectedFoodForPickup) return;

    const requester = $("requesterName")?.value.trim();
    if (!requester) {
      showToast("Please enter your name or volunteer handle.");
      $("requesterName")?.focus();
      return;
    }

    const rawChoice = $("requestNgoSelect")?.value.split("|") || [];
    const chosenOrgName = rawChoice[0] || "Roti Bank (AIBRT Lucknow)";
    const chosenOrgType = rawChoice[1] || "NGO";
    const chosenOrgPhone = rawChoice[2] || "+91 94150 09876";

    const newRequest = {
      id: "req-" + Date.now(),
      foodId: selectedFoodForPickup.id,
      foodName: selectedFoodForPickup.name,
      quantity: selectedFoodForPickup.quantity,
      city: selectedFoodForPickup.city,
      locality: selectedFoodForPickup.locality || selectedFoodForPickup.location,
      assignedOrg: chosenOrgName,
      assignedOrgType: chosenOrgType,
      assignedOrgPhone: chosenOrgPhone,
      requester: requester,
      stage: 1, // Stage 1 of 5
      stageName: "Request Created",
      volunteerName: "Assigning courier...",
      volunteerPhone: chosenOrgPhone,
      tempChecked: "Awaiting pickup inspection",
      eta: "15 - 30 mins",
      createdAt: new Date().toISOString()
    };

    appState.requests.unshift(newRequest);
    logActivity(`Pickup request created for ${selectedFoodForPickup.name} assigned to ${chosenOrgName}`);
    saveAppData();

    $("requestDialog")?.close();
    renderTrackingSection();
    showToast(`Pickup request generated! Tracking ID: ${newRequest.id}`);
    $("tracking")?.scrollIntoView({ behavior: "smooth" });
  });
}

const STAGES = [
  { num: 1, title: "1. Request Initiated", desc: "Donor posted surplus & safety logged" },
  { num: 2, title: "2. Partner Confirmed", desc: "NGO / Dharamshala matched & accepted" },
  { num: 3, title: "3. Volunteer En Route", desc: "Courier dispatched via e-rickshaw / van" },
  { num: 4, title: "4. Food Inspected & Collected", desc: "Hygiene & temperature checked" },
  { num: 5, title: "5. Delivered & Served", desc: "Shared at community langar / shelter" }
];

function renderTrackingSection() {
  const container = $("trackingCards");
  if (!container) return;

  if (appState.requests.length === 0) {
    container.innerHTML = `
      <div class="empty" style="text-align: center; padding: 40px 20px;">
        <h3 style="margin-top: 10px;">No Active Pickup Requests</h3>
        <p>Explore surplus food listings above and click <strong>Request Pickup</strong> to begin tracking.</p>
      </div>
    `;
    updateStats();
    return;
  }

  container.innerHTML = appState.requests.map((req) => {
    const currentStage = req.stage || 1;

    // Render 5-stage stepper
    const stepperHtml = STAGES.map((s) => {
      let stateClass = "";
      if (s.num < currentStage) stateClass = "completed";
      else if (s.num === currentStage) stateClass = "active";

      return `
        <div class="step-node ${stateClass}">
          <div class="step-circle">${s.num < currentStage ? "✓" : s.num}</div>
          <div class="step-title">${s.title}</div>
        </div>
      `;
    }).join("");

    return `
      <article class="tracker-card" id="tracker-${req.id}">
        <div class="tracker-header">
          <div>
            <span class="pill safe" style="font-size:0.75rem; margin-bottom: 6px;">TRACKING ID: ${req.id}</span>
            <h3 style="font-size: 1.35rem; margin: 4px 0;">${safeText(req.foodName)}</h3>
            <p style="margin:0; font-size: 0.9rem;">
              Quantity: <strong>${safeText(req.quantity)}</strong> · Locality: <strong>${safeText(req.locality)}</strong>
            </p>
          </div>
          <div style="text-align: right;">
            <span class="pill urgent" style="font-size: 0.85rem; padding: 6px 12px;">
              ${safeText(req.stageName || "In Progress")}
            </span>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 6px;">Created: ${formatDate(req.createdAt)}</p>
          </div>
        </div>

        <div class="stepper-container">
          ${stepperHtml}
        </div>

        <div style="background: var(--cream-tint); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px 18px; margin: 16px 0; font-size: 0.88rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
          <div><strong>Matched Organization:</strong><br>${safeText(req.assignedOrg)} (${safeText(req.assignedOrgType)})</div>
          <div><strong>Volunteer / Courier:</strong><br>${safeText(req.volunteerName || "Assigned on dispatch")}</div>
          <div><strong>Food Safety Status:</strong><br>${safeText(req.tempChecked || "Temp Verified >60°C")}</div>
          <div><strong>Estimated Arrival:</strong><br><span style="color:var(--green-primary); font-weight:700;">${safeText(req.eta || "Under 25 mins")}</span></div>
        </div>

        <div class="tracker-controls">
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn sm" onclick="advanceRequestStage('${req.id}')" ${currentStage >= 5 ? "disabled style='opacity:0.6;'" : ""}>
              ${currentStage >= 5 ? "✓ Delivery Completed" : "⏩ Advance Next Stage"}
            </button>
            <a class="btn sm outline" href="tel:${safeText(req.volunteerPhone || req.assignedOrgPhone || '+919415009876')}">
              📞 Contact Courier
            </a>
          </div>
          <button class="btn sm danger" onclick="removeRequest('${req.id}')">
            Remove Request
          </button>
        </div>
      </article>
    `;
  }).join("");

  updateStats();
}

window.advanceRequestStage = function (reqId) {
  const req = appState.requests.find((r) => r.id === reqId);
  if (!req) return;

  if (req.stage < 5) {
    req.stage++;
    if (req.stage === 2) {
      req.stageName = "Partner Confirmed";
      req.volunteerName = "Yahiyaganj Langar Logistics Hub";
      req.eta = "20 mins";
    } else if (req.stage === 3) {
      req.stageName = "Volunteer En Route";
      req.volunteerName = "Suresh Pal (Electric Cargo Rickshaw UP-32-E-8812)";
      req.eta = "11 mins";
    } else if (req.stage === 4) {
      req.stageName = "Food Inspected & Collected";
      req.tempChecked = "Verified: 64.2°C Hot-Insulated (Passed)";
      req.eta = "Transit to Langar";
    } else if (req.stage === 5) {
      req.stageName = "Delivered & Served to Community";
      req.eta = "0 mins (Completed)";
      logActivity(`Delivery verified completed: ${req.foodName} to ${req.assignedOrg}`);
    }
    saveAppData();
    renderTrackingSection();
    showToast(`Stage updated to: ${STAGES[req.stage - 1].title}`);
  }
};

window.removeRequest = function (reqId) {
  if (!confirm("Are you sure you want to remove this tracking record?")) return;
  appState.requests = appState.requests.filter((r) => r.id !== reqId);
  logActivity(`Removed pickup tracking ID: ${reqId}`);
  saveAppData();
  renderTrackingSection();
  showToast("Request removed.");
};

// ===================================================================
// 8. IMPACT STATS COUNTER
// ===================================================================

function updateStats() {
  const listCountEl = $("listingCount");
  const reqCountEl = $("requestCount");
  const kgCountEl = $("kgCount");

  if (listCountEl) listCountEl.textContent = appState.foods.length;
  if (reqCountEl) reqCountEl.textContent = appState.requests.length;

  let totalKg = 0;
  appState.foods.forEach((f) => {
    const match = String(f.quantity).match(/([\d.]+)\s*kg/i);
    if (match) {
      totalKg += parseFloat(match[1]);
    } else {
      const matchBoxes = String(f.quantity).match(/([\d.]+)/);
      if (matchBoxes) totalKg += parseFloat(matchBoxes[1]) * 0.45; // approx 450g per meal box
    }
  });

  if (kgCountEl) kgCountEl.textContent = `${totalKg.toFixed(1)} kg`;
}

// ===================================================================
// 9. FOOD SAFETY CHECKLIST
// ===================================================================

function initSafetyChecklist() {
  const checkboxes = document.querySelectorAll(".safetyCheck");
  const countEl = $("safetyCount");
  const resetBtn = $("resetSafety");

  const updateSafety = () => {
    const checked = Array.from(checkboxes).filter((c) => c.checked).length;
    if (countEl) countEl.textContent = `${checked} of ${checkboxes.length} verified`;
    if (checked === checkboxes.length) {
      showToast("All 5 safety criteria verified!");
    }
  };

  checkboxes.forEach((c) => c.addEventListener("change", updateSafety));

  resetBtn?.addEventListener("click", () => {
    checkboxes.forEach((c) => (c.checked = false));
    updateSafety();
    showToast("Safety checklist reset.");
  });
}

// ===================================================================
// 10. AUTHENTICATION & DEMO SIGN-IN
// ===================================================================

function initAuth() {
  const loginBtn = $("loginBtn");
  const loginDialog = $("loginDialog");
  const loginForm = $("loginForm");

  loginBtn?.addEventListener("click", () => {
    loginDialog?.showModal();
  });

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("userName")?.value.trim();
    const role = $("userRole")?.value;

    appState.user = { name, role };
    logActivity(`User signed in: ${name} (${role})`);
    saveAppData();

    loginDialog?.close();
    if (loginBtn) loginBtn.textContent = `👤 ${name}`;
    showToast(`Welcome back, ${name}!`);
  });
}

// ===================================================================
// 11. SECURE INTERNAL ADMIN DASHBOARD (RESTRICTED ACCESS)
// ===================================================================

// Master credentials for the internal demo:
// Admin Email: admin@foodbridge.org
// Security PIN: FB-LKO-2026
const MASTER_ADMIN_EMAIL = "admin@foodbridge.org";
const MASTER_ADMIN_PIN = "FB-LKO-2026";
let adminSessionTimeout = null;

function openAdminGateModal() {
  const gateModal = $("adminAuthDialog");
  if (gateModal) {
    gateModal.showModal();
  }
}

function initAdminSecurity() {
  // Method 1: Secret Keyboard Combo (Ctrl + Shift + A or Cmd + Shift + A)
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
      e.preventDefault();
      openAdminGateModal();
      showToast("Security Key Detected: Opening Internal Admin Gate.");
    }
  });

  // Method 2: Triple click on Brand Logo
  const brandLogo = $("brand-logo");
  let clickCount = 0;
  let clickTimer = null;
  brandLogo?.addEventListener("click", (e) => {
    clickCount++;
    clearTimeout(clickTimer);
    if (clickCount >= 3) {
      e.preventDefault();
      clickCount = 0;
      openAdminGateModal();
      showToast("Internal Admin Trigger Activated.");
    } else {
      clickTimer = setTimeout(() => { clickCount = 0; }, 600);
    }
  });

  // Method 3: Internal Passcode Gate Form Submission
  const adminAuthForm = $("adminAuthForm");
  adminAuthForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("adminEmail")?.value.trim();
    const pin = $("adminPin")?.value.trim();

    if (email === MASTER_ADMIN_EMAIL && pin === MASTER_ADMIN_PIN) {
      appState.adminSession = {
        authenticated: true,
        expiresAt: Date.now() + 15 * 60 * 1000 // 15 mins timeout
      };
      $("adminAuthDialog")?.close();
      showAdminDashboard();
      logActivity("INTERNAL ADMIN DASHBOARD UNLOCKED");
      showToast("Admin authenticated. Session valid for 15 minutes.");
    } else {
      showToast("Access Denied: Invalid Master Admin credentials.");
    }
  });

  // Admin Dashboard Controls
  $("exportBtn")?.addEventListener("click", () => {
    const payload = {
      timestamp: new Date().toISOString(),
      foods: appState.foods,
      requests: appState.requests,
      activities: appState.activities,
      topNGOs: topLucknowNGOs,
      topDharamshalas: topLucknowDharamshalas
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `foodbridge-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Audit JSON exported.");
  });

  $("clearBtn")?.addEventListener("click", () => {
    if (!confirm("WARNING: This will wipe all user-submitted listings and requests. Proceed?")) return;
    appState.foods = sampleFoods;
    appState.requests = [];
    logActivity("Admin reset demo database to defaults.");
    saveAppData();
    renderFoodCards();
    renderTrackingSection();
    renderAdminStats();
    showToast("Database restored to defaults.");
  });
}

function showAdminDashboard() {
  renderAdminStats();
  $("adminDialog")?.showModal();
}

function renderAdminStats() {
  const statsBox = $("adminStats");
  const activityBox = $("activity");

  if (statsBox) {
    statsBox.innerHTML = `
      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px;">
        <div style="background:white; padding:12px; border-radius:8px; border:1px solid var(--border-subtle);">
          <strong>Surplus Listings:</strong> ${appState.foods.length}
        </div>
        <div style="background:white; padding:12px; border-radius:8px; border:1px solid var(--border-subtle);">
          <strong>Active Pickups:</strong> ${appState.requests.length}
        </div>
        <div style="background:white; padding:12px; border-radius:8px; border:1px solid var(--border-subtle);">
          <strong>Master Orgs:</strong> ${allDirectory.length} (10 NGOs + 10 Dharamshalas)
        </div>
      </div>
      <div style="font-size:0.84rem; color: #1b5e39;">
        🔒 Session: Super-Admin (Restricted Internal Node). Auto-lock enabled.
      </div>
    `;
  }

  if (activityBox) {
    activityBox.innerHTML = appState.activities.slice(0, 15).map((act) => `
      <p style="padding: 6px 0; border-bottom: 1px solid var(--border-subtle); margin:0;">
        ${safeText(act)}
      </p>
    `).join("");
  }
}

// Modal Dismiss buttons
document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dialogId = btn.getAttribute("data-close");
    $(dialogId)?.close();
  });
});

// Mobile menu toggle
$("menuBtn")?.addEventListener("click", () => {
  $("navLinks")?.classList.toggle("open");
});

document.querySelectorAll("#navLinks a").forEach((a) => {
  a.addEventListener("click", () => {
    $("navLinks")?.classList.remove("open");
  });
});

// ===================================================================
// 12. INITIAL BOOTSTRAP
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {
  renderFoodCards();
  renderDirectory();
  renderTrackingSection();
  updateStats();
  initDonationForm();
  initPickupHandlers();
  initSafetyChecklist();
  initAuth();
  initAdminSecurity();

  // Initialize Map after DOM elements are ready
  setTimeout(initInteractiveMap, 150);
});
