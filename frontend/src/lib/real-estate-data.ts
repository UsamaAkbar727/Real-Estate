// Centralized content for the Imperial Estates luxury real estate site.

export const IMAGES = {
  heroVilla: "/images/villa_exterior_1.png",
  lahoreSkyline: "/images/skyline.png",
  interior1: "/images/interior_living.png",
  interior2: "/images/interior_kitchen.png",
  interior3: "/images/interior_bedroom.png",
  interior4: "/images/interior_bathroom.png",
  interior5: "/images/interior_theater.png",
  interior6: "/images/interior_gym.png",
};

export const COMPANY = {
  name: "Imperial Estates",
  phone: "+92 42 111 486 775",
  phoneAlt: "+92 300 1234567",
  whatsapp: "923001234567",
  email: "hello@imperialestates.pk",
  address: "Office 14, Main Boulevard, Gulberg III, Lahore, Pakistan",
  hours: "Mon – Sat: 9:00 AM – 8:00 PM",
  founded: 2009,
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=74.3437%2C31.5104%2C74.3737%2C31.5304&layer=mapnik&marker=31.5204%2C74.3587",
};

export type Property = {
  id: number;
  slug: string;
  title: string;
  location: string;
  areaName: string;
  price: string;
  priceValue: number;
  pricePerSqft?: string;
  type: "Sale" | "Rent";
  category: string;
  beds: number;
  baths: number;
  area: string;
  image: string;
  gallery: string[];
  tag?: string;
  featured?: boolean;
  coordinates: { x: number; y: number };
  description: string;
  features: string[];
  agentId: number;
  yearBuilt: number;
  parking?: number;
};

export const properties: Property[] = [
  {
    id: 1,
    slug: "royal-garden-villa",
    title: "Royal Garden Villa",
    location: "DHA Phase 6, Lahore",
    areaName: "DHA Phase 6",
    price: "PKR 8.5 Cr",
    priceValue: 850000000,
    pricePerSqft: "PKR 42,500/sqft",
    type: "Sale",
    category: "Villa",
    beds: 6,
    baths: 7,
    area: "2 Kanal",
    image: "/images/villa_exterior_1.png",
    gallery: [
      "/images/villa_exterior_1.png",
      "/images/interior_living.png",
      "/images/interior_kitchen.png",
      "/images/interior_bedroom.png",
    ],
    tag: "Signature",
    featured: true,
    coordinates: { x: 28, y: 42 },
    description:
      "A masterpiece of contemporary architecture, the Royal Garden Villa spans 2 Kanal of meticulously landscaped grounds in DHA Phase 6. Featuring double-height atriums, imported Italian marble flooring, and a temperature-controlled infinity pool, this residence redefines luxury living in Lahore. The grand foyer opens to formal living and dining spaces, while the private wing houses six en-suite bedrooms with walk-in wardrobes. A separate servant quarter, smart-home automation, and a six-car showroom garage complete this exceptional property.",
    features: [
      "Temperature-controlled infinity pool",
      "Imported Italian marble flooring",
      "Smart-home automation system",
      "Double-height grand atrium",
      "6-car showroom garage",
      "Landscaped Mughal-style gardens",
      "Separate servant quarter",
      "Solar power backup",
      "Home theatre room",
      "Private gym & sauna",
    ],
    agentId: 1,
    yearBuilt: 2022,
    parking: 6,
  },
  {
    id: 2,
    slug: "emerald-sky-penthouse",
    title: "Emerald Sky Penthouse",
    location: "Bahria Town, Lahore",
    areaName: "Bahria Town",
    price: "PKR 6.2 Cr",
    priceValue: 620000000,
    pricePerSqft: "PKR 65,263/sqft",
    type: "Sale",
    category: "Penthouse",
    beds: 4,
    baths: 5,
    area: "9,500 sq.ft",
    image: "/images/interior_bedroom.png",
    gallery: [
      "/images/interior_bedroom.png",
      "/images/interior_bathroom.png",
      "/images/interior_theater.png",
      "/images/interior_gym.png",
    ],
    tag: "New",
    featured: true,
    coordinates: { x: 62, y: 58 },
    description:
      "Crowning the skyline of Bahria Town, the Emerald Sky Penthouse offers 360-degree panoramic views across Lahore. This triplex residence features a private rooftop terrace with plunge pool, floor-to-ceiling German glazing, and a designer chef's kitchen. Four bedroom suites each offer skyline views, while the great room flows seamlessly to an entertainer's terrace. Concierge services, secure parking, and direct elevator access ensure effortless luxury living.",
    features: [
      "Private rooftop terrace with plunge pool",
      "Floor-to-ceiling German glazing",
      "Designer chef's kitchen",
      "Direct private elevator access",
      "360-degree panoramic views",
      "Concierge service included",
      "Smart climate control",
      "Home automation by Crestron",
      "Wine cellar",
      "Private cinema lounge",
    ],
    agentId: 2,
    yearBuilt: 2023,
    parking: 4,
  },
  {
    id: 3,
    slug: "goldcrest-residences",
    title: "Goldcrest Residences",
    location: "Gulberg III, Lahore",
    areaName: "Gulberg",
    price: "PKR 3.8 Cr",
    priceValue: 380000000,
    pricePerSqft: "PKR 90,476/sqft",
    type: "Sale",
    category: "Apartment",
    beds: 3,
    baths: 4,
    area: "4,200 sq.ft",
    image: "/images/villa_exterior_2.png",
    gallery: [
      "/images/villa_exterior_2.png",
      "/images/interior_living.png",
      "/images/interior_theater.png",
    ],
    tag: "Hot Deal",
    featured: true,
    coordinates: { x: 45, y: 30 },
    description:
      "Located in the heart of Gulberg III, Goldcrest Residences combines urban convenience with refined luxury. This 3-bedroom apartment features open-plan living, a modern kitchen with island, and a wraparound balcony overlooking Main Boulevard. Residents enjoy a rooftop pool, fitness centre, and 24/7 concierge — all steps from Lahore's finest dining and shopping.",
    features: [
      "Wraparound balcony with city views",
      "Modern kitchen with breakfast island",
      "Rooftop infinity pool",
      "24/7 concierge & security",
      "Fitness centre & spa",
      "Backup generators",
      "High-speed elevators",
      "Premium fitted appliances",
    ],
    agentId: 4,
    yearBuilt: 2021,
    parking: 2,
  },
  {
    id: 4,
    slug: "the-imperial-manor",
    title: "The Imperial Manor",
    location: "DHA Phase 8, Lahore",
    areaName: "DHA Phase 8",
    price: "PKR 11.2 Cr",
    priceValue: 1120000000,
    pricePerSqft: "PKR 46,667/sqft",
    type: "Sale",
    category: "Villa",
    beds: 7,
    baths: 8,
    area: "3 Kanal",
    image: "/images/villa_exterior_3.png",
    gallery: [
      "/images/villa_exterior_3.png",
      "/images/interior_kitchen.png",
      "/images/interior_bedroom.png",
      "/images/interior_bathroom.png",
    ],
    tag: "Exclusive",
    featured: true,
    coordinates: { x: 70, y: 36 },
    description:
      "The Imperial Manor is the crown jewel of DHA Phase 8 — a 3 Kanal estate designed for those who demand the extraordinary. A sweeping driveway leads to a portico entrance, opening into a palatial great room with 28-foot ceilings. Seven bedroom suites, a formal ballroom, private library, and climate-controlled wine cellar make this a once-in-a-generation offering.",
    features: [
      "28-foot ceilings in great room",
      "Formal ballroom",
      "Private library",
      "Climate-controlled wine cellar",
      "Sweeping driveway with portico",
      "Tennis court",
      "Two swimming pools",
      "Smart-home throughout",
      "Guard house & gatehouse",
      "Generator & solar hybrid",
    ],
    agentId: 1,
    yearBuilt: 2023,
    parking: 8,
  },
  {
    id: 5,
    slug: "lakeside-modern-villa",
    title: "Lakeside Modern Villa",
    location: "Lake City, Lahore",
    areaName: "Lake City",
    price: "PKR 5.4 Cr",
    priceValue: 540000000,
    pricePerSqft: "PKR 54,000/sqft",
    type: "Sale",
    category: "Villa",
    beds: 5,
    baths: 6,
    area: "1 Kanal",
    image: "/images/villa_exterior_1.png",
    gallery: [
      "/images/villa_exterior_1.png",
      "/images/interior_living.png",
      "/images/interior_gym.png",
    ],
    tag: "Waterfront",
    featured: true,
    coordinates: { x: 38, y: 66 },
    description:
      "Fronting the serene waters of Lake City, this modern villa blends clean lines with warm natural materials. Floor-to-ceiling glass frames the lake views from every principal room. An infinity edge pool appears to merge with the lake beyond, while the interior features oak millwork, natural stone, and a sunken conversation pit.",
    features: [
      "Lakefront infinity pool",
      "Floor-to-ceiling glass walls",
      "Oak millwork & natural stone",
      "Sunken conversation pit",
      "Outdoor kitchen & dining",
      "Boat dock access",
      "Rainwater harvesting",
      "Smart lighting scenes",
    ],
    agentId: 3,
    yearBuilt: 2022,
    parking: 4,
  },
  {
    id: 6,
    slug: "skyline-heights-suite",
    title: "Skyline Heights Suite",
    location: "Bahria Orchard, Lahore",
    areaName: "Bahria Orchard",
    price: "PKR 2.1 Cr",
    priceValue: 210000000,
    pricePerSqft: "PKR 75,000/sqft",
    type: "Sale",
    category: "Apartment",
    beds: 3,
    baths: 3,
    area: "2,800 sq.ft",
    image: "/images/skyline.png",
    gallery: [
      "/images/skyline.png",
      "/images/interior_theater.png",
      "/images/interior_bathroom.png",
    ],
    tag: "Investment",
    featured: true,
    coordinates: { x: 54, y: 72 },
    description:
      "An exceptional investment-grade apartment in Bahria Orchard offering strong rental yield. This 3-bedroom suite features an open-plan layout, modern finishes, and access to community amenities including pools, parks, and a clubhouse. Currently tenanted with strong cash flow.",
    features: [
      "Open-plan living & dining",
      "Modern fitted kitchen",
      "Community pool & clubhouse",
      "Gated society with security",
      "Currently tenanted (strong yield)",
      "Backup power",
      "Covered parking",
      "Nearby schools & retail",
    ],
    agentId: 3,
    yearBuilt: 2020,
    parking: 2,
  },
  {
    id: 7,
    slug: "silver-oak-farmhouse",
    title: "Silver Oak Farmhouse",
    location: "Bedian Road, Lahore",
    areaName: "Bedian Road",
    price: "PKR 7.8 Cr",
    priceValue: 780000000,
    type: "Sale",
    category: "Farmhouse",
    beds: 5,
    baths: 6,
    area: "8 Kanal",
    image: "/images/villa_exterior_2.png",
    gallery: [
      "/images/villa_exterior_2.png",
      "/images/interior_bedroom.png",
      "/images/interior_gym.png",
    ],
    tag: "Lifestyle",
    coordinates: { x: 22, y: 54 },
    description:
      "A sprawling 8 Kanal farmhouse retreat along Bedian Road, perfect for weekend escapes or full-time country living. Mature silver oaks frame the property, with a main residence, guest house, staff quarters, and a stable. Organic vegetable gardens, a fruit orchard, and a large swimming pool make this a self-contained paradise.",
    features: [
      "8 Kanal of private grounds",
      "Main residence + guest house",
      "Stable & paddock",
      "Organic vegetable garden",
      "Fruit orchard",
      "Olympic-size swimming pool",
      "Bore well & water filtration",
      "Staff quarters",
    ],
    agentId: 1,
    yearBuilt: 2019,
    parking: 6,
  },
  {
    id: 8,
    slug: "park-view-contemporary",
    title: "Park View Contemporary",
    location: "Park View, Lahore",
    areaName: "Park View",
    price: "PKR 4.2 Cr",
    priceValue: 420000000,
    type: "Sale",
    category: "Villa",
    beds: 5,
    baths: 5,
    area: "1 Kanal",
    image: "/images/villa_exterior_3.png",
    gallery: [
      "/images/villa_exterior_3.png",
      "/images/interior_kitchen.png",
      "/images/interior_theater.png",
    ],
    tag: "Family",
    coordinates: { x: 50, y: 48 },
    description:
      "A contemporary family villa in the sought-after Park View community. Clean lines, abundant natural light, and a flowing open plan make this home ideal for modern family living. The garden features a play area and covered patio, while upstairs bedrooms each have en-suite facilities.",
    features: [
      "Open-plan ground floor",
      "En-suite bedrooms upstairs",
      "Family garden with play area",
      "Covered outdoor patio",
      "Modern fitted kitchen",
      "Gated community amenities",
      "Solar water heating",
    ],
    agentId: 4,
    yearBuilt: 2021,
    parking: 3,
  },
  {
    id: 9,
    slug: "dha-phase-9-prism-plot",
    title: "DHA Phase 9 Prism Plot",
    location: "DHA Phase 9 Prism, Lahore",
    areaName: "DHA Phase 9",
    price: "PKR 1.85 Cr",
    priceValue: 185000000,
    type: "Sale",
    category: "Plot",
    beds: 0,
    baths: 0,
    area: "1 Kanal",
    image: "/images/interior_living.png",
    gallery: [
      "/images/interior_living.png",
    ],
    tag: "Investment",
    coordinates: { x: 76, y: 50 },
    description:
      "A prime 1 Kanal residential plot in the rapidly appreciating DHA Phase 9 Prism block. Possession ready with all utilities available. Excellent investment opportunity with strong short-term appreciation driven by new infrastructure and commercial zones.",
    features: [
      "Possession ready",
      "All utilities available",
      "Corner plot potential",
      "Wide 40-foot frontage",
      "Clear title & transfer letter",
      "Investment-grade appreciation",
    ],
    agentId: 3,
    yearBuilt: 2024,
  },
  {
    id: 10,
    slug: "gulberg-greens-commercial",
    title: "Gulberg Greens Commercial Plaza",
    location: "Gulberg Greens, Lahore",
    areaName: "Gulberg Greens",
    price: "PKR 14.5 Cr",
    priceValue: 1450000000,
    type: "Sale",
    category: "Commercial",
    beds: 0,
    baths: 8,
    area: "4 Kanal",
    image: "/images/interior_kitchen.png",
    gallery: [
      "/images/interior_kitchen.png",
      "/images/interior_bathroom.png",
    ],
    tag: "Commercial",
    coordinates: { x: 42, y: 24 },
    description:
      "A landmark commercial plaza on the Gulberg Greens main boulevard. Four floors of premium office and retail space with basement parking, high-speed elevators, and a striking glass façade. Fully tenanted with strong rental income — an institutional-grade investment.",
    features: [
      "Main boulevard frontage",
      "Four floors of leasable space",
      "Basement parking for 60 cars",
      "High-speed elevators",
      "Fully tenanted",
      "Glass curtain-wall façade",
      "Backup power & HVAC",
      "Institutional-grade asset",
    ],
    agentId: 1,
    yearBuilt: 2022,
    parking: 60,
  },
  {
    id: 11,
    slug: "state-bank-housing-residence",
    title: "State Bank Housing Residence",
    location: "State Bank Housing, Lahore",
    areaName: "State Bank Housing",
    price: "PKR 3.2 Cr",
    priceValue: 320000000,
    type: "Sale",
    category: "Villa",
    beds: 4,
    baths: 4,
    area: "10 Marla",
    image: "/images/interior_bedroom.png",
    gallery: [
      "/images/interior_bedroom.png",
      "/images/interior_living.png",
    ],
    tag: "Value",
    coordinates: { x: 34, y: 44 },
    description:
      "A well-maintained 10 Marla family home in the established State Bank Housing society. Practical layout with four bedrooms, drawing and dining rooms, and a rooftop terrace. Move-in ready with recent renovations to kitchen and bathrooms.",
    features: [
      "Move-in ready condition",
      "Recently renovated kitchen",
      "Rooftop terrace",
      "Drawing & dining rooms",
      "Established community",
      "Nearby schools & markets",
      "Generator backup",
    ],
    agentId: 4,
    yearBuilt: 2016,
    parking: 2,
  },
  {
    id: 12,
    slug: "wapda-town-executive-home",
    title: "Wapda Town Executive Home",
    location: "Wapda Town, Lahore",
    areaName: "Wapda Town",
    price: "PKR 2.65 Cr",
    priceValue: 265000000,
    type: "Sale",
    category: "Villa",
    beds: 4,
    baths: 4,
    area: "1 Kanal",
    image: "/images/interior_bathroom.png",
    gallery: [
      "/images/interior_bathroom.png",
      "/images/interior_kitchen.png",
    ],
    tag: "Family",
    coordinates: { x: 26, y: 60 },
    description:
      "An executive family home in Wapda Town featuring a thoughtful layout, quality finishes, and a mature garden. The ground floor offers formal and family living spaces, while the first floor has four bedrooms including a master suite with dressing room.",
    features: [
      "Formal & family living spaces",
      "Master suite with dressing room",
      "Mature landscaped garden",
      "Quality imported finishes",
      "Double car porch",
      "Central location in Wapda Town",
    ],
    agentId: 2,
    yearBuilt: 2018,
    parking: 2,
  },
];

export const categories = [
  {
    name: "Residential Villas",
    count: 248,
    desc: "Handcrafted luxury homes in gated communities",
    image: "/images/villa_exterior_3.png",
    accent: "royal",
    slug: "villa",
  },
  {
    name: "Luxury Apartments",
    count: 312,
    desc: "Sky-rise living with world-class amenities",
    image: "/images/interior_theater.png",
    accent: "emerald",
    slug: "apartment",
  },
  {
    name: "Penthouses",
    count: 64,
    desc: "Crowning glory of the city skyline",
    image: "/images/interior_gym.png",
    accent: "gold",
    slug: "penthouse",
  },
  {
    name: "Commercial Plazas",
    count: 96,
    desc: "Prime business addresses for enterprises",
    image: "/images/skyline.png",
    accent: "royal",
    slug: "commercial",
  },
  {
    name: "Farmhouses",
    count: 52,
    desc: "Sprawling estates with countryside serenity",
    image: "/images/interior_bathroom.png",
    accent: "emerald",
    slug: "farmhouse",
  },
  {
    name: "Plots & Files",
    count: 580,
    desc: "Build your dream on premium land parcels",
    image: "/images/villa_exterior_1.png",
    accent: "gold",
    slug: "plot",
  },
];

export const investments = [
  {
    title: "DHA Phase 9 Prism",
    type: "Residential Plots",
    roi: "28%",
    horizon: "24 months",
    minInvest: "PKR 1.5 Cr",
    appreciation: "High",
    image: "/images/interior_living.png",
    desc: "Rapidly developing block with new infrastructure and commercial zones driving land value.",
    slug: "dha-phase-9-prism",
  },
  {
    title: "Bahria Town Sky Apartments",
    type: "Pre-Launch Booking",
    roi: "22%",
    horizon: "18 months",
    minInvest: "PKR 80 Lakh",
    appreciation: "Medium",
    image: "/images/villa_exterior_2.png",
    desc: "Pre-launch pricing on high-rise units with flexible installment plans and guaranteed handover.",
    slug: "bahria-sky-apartments",
  },
  {
    title: "Gulberg Greens Commercial",
    type: "Commercial Plots",
    roi: "34%",
    horizon: "36 months",
    minInvest: "PKR 3 Cr",
    appreciation: "Very High",
    image: "/images/interior_kitchen.png",
    desc: "Boulevard-front commercial land in Lahore's fastest-appreciating business district.",
    slug: "gulberg-greens-commercial",
  },
];

export const services = [
  {
    title: "Property Buying",
    desc: "End-to-end acquisition with legal due diligence, negotiation, and seamless handover.",
    icon: "key",
  },
  {
    title: "Property Selling",
    desc: "Cinematic marketing, qualified buyers, and record-breaking sale prices.",
    icon: "tag",
  },
  {
    title: "Investment Advisory",
    desc: "Data-driven portfolio strategy maximizing ROI across Lahore's growth corridors.",
    icon: "trending",
  },
  {
    title: "Property Management",
    desc: "White-glove management, maintenance, and tenant relations for your assets.",
    icon: "shield",
  },
  {
    title: "Legal & Documentation",
    desc: "Complete transfer, registry, and title verification handled by in-house legal experts.",
    icon: "scale",
  },
];

export const whyChooseUs = [
  {
    year: "2009",
    title: "Founded in Lahore",
    desc: "Imperial Estates opens its first office in Gulberg with a vision to redefine luxury real estate.",
  },
  {
    year: "2014",
    title: "Trusted by 1,000+ Families",
    desc: "Crossed a thousand successful transactions across DHA, Bahria, and Lake City.",
  },
  {
    year: "2019",
    title: "Best Agency Award",
    desc: "Recognized as Lahore's #1 luxury real estate firm by the Pakistan Property Council.",
  },
  {
    year: "2024",
    title: "PKR 42 Billion in Sales",
    desc: "Surpassed 42 billion rupees in lifetime sales with a 98% client satisfaction rate.",
  },
];

export const stats = [
  { value: 4200, suffix: "+", label: "Properties Sold" },
  { value: 15, suffix: " yrs", label: "Years of Excellence" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 42, suffix: "B", prefix: "PKR ", label: "Total Sales Value" },
];

export type Agent = {
  id: number;
  slug: string;
  name: string;
  role: string;
  sales: string;
  deals: number;
  image: string;
  phone: string;
  email: string;
  bio: string;
  specialties: string[];
  languages: string[];
  experience: string;
  social: { facebook: string; linkedin: string; instagram: string };
};

export const agents: Agent[] = [
  {
    id: 1,
    slug: "ahmed-raza-khan",
    name: "Ahmed Raza Khan",
    role: "Founder & Senior Advisor",
    sales: "PKR 9.2B sold",
    deals: 640,
    image: "/images/agent_1.png",
    phone: "+92 300 1234567",
    email: "ahmed@imperialestates.pk",
    bio: "With over 18 years in Lahore's luxury real estate market, Ahmed founded Imperial Estates in 2009 with a simple mission: bring transparency and white-glove service to property transactions. Today he is one of Pakistan's most respected advisors, having personally closed over 640 transactions worth more than PKR 9 billion. Ahmed specialises in ultra-luxury estates above PKR 5 crore and institutional-grade commercial portfolios.",
    specialties: ["Ultra-Luxury Villas", "Commercial Portfolios", "NRP Investments", "Estate Acquisitions"],
    languages: ["Urdu", "English", "Punjabi"],
    experience: "18+ Years",
    social: { facebook: "https://facebook.com/imperialestates", linkedin: "https://linkedin.com/in/ahmedrazakhan", instagram: "https://instagram.com/imperialestates" },
  },
  {
    id: 2,
    slug: "sana-malik",
    name: "Sana Malik",
    role: "Head of Luxury Sales",
    sales: "PKR 6.8B sold",
    deals: 412,
    image: "/images/agent_2.png",
    phone: "+92 301 2345678",
    email: "sana@imperialestates.pk",
    bio: "Sana leads our luxury sales division and is renowned for her cinematic property marketing and meticulous client matchmaking. With a background in interior design, she brings a unique eye for a property's potential and has consistently achieved record-breaking sale prices across DHA and Bahria Town.",
    specialties: ["Penthouses", "Designer Villas", "Marketing Strategy", "Staging"],
    languages: ["Urdu", "English"],
    experience: "11 Years",
    social: { facebook: "https://facebook.com/imperialestates", linkedin: "https://linkedin.com/in/ayesha-imran", instagram: "https://instagram.com/imperialestates" },
  },
  {
    id: 3,
    slug: "bilal-ahmed",
    name: "Bilal Ahmed",
    role: "Investment Specialist",
    sales: "PKR 5.1B sold",
    deals: 358,
    image: "/images/agent_1.png",
    phone: "+92 302 3456789",
    email: "bilal@imperialestates.pk",
    bio: "Bilal is our investment advisory lead, combining a finance background with deep market intelligence to build high-performing real estate portfolios. He has guided over 350 clients to collective returns exceeding 28% annually, specialising in pre-launch opportunities and commercial yield plays.",
    specialties: ["Investment Advisory", "Pre-Launch Booking", "ROI Analysis", "Portfolio Strategy"],
    languages: ["Urdu", "English"],
    experience: "9 Years",
    social: { facebook: "https://facebook.com/imperialestates", linkedin: "https://linkedin.com/in/bilaltanveer", instagram: "https://instagram.com/imperialestates" },
  },
  {
    id: 4,
    slug: "ayesha-tariq",
    name: "Ayesha Tariq",
    role: "Client Relations Director",
    sales: "PKR 4.6B sold",
    deals: 305,
    image: "/images/agent_2.png",
    phone: "+92 303 4567890",
    email: "ayesha@imperialestates.pk",
    bio: "Ayesha oversees client relations and post-sale concierge, ensuring every family's journey from first viewing to handover is effortless. Her empathetic approach and attention to detail have earned her a 100% client retention rate and countless referrals.",
    specialties: ["Client Concierge", "Family Relocations", "NRP Support", "Property Management"],
    languages: ["Urdu", "English", "Punjabi"],
    experience: "8 Years",
    social: { facebook: "https://facebook.com/imperialestates", linkedin: "https://linkedin.com/in/sanakhan", instagram: "https://instagram.com/imperialestates" },
  },
];

export const testimonials = [
  {
    name: "Hassan Sheikh",
    role: "Businessman, DHA Phase 7",
    quote:
      "Imperial Estates found our dream villa in under three weeks. The transparency, professionalism, and after-sales support were simply unmatched. They treated our family like royalty.",
    rating: 5,
    image: "/images/agent_1.png",
  },
  {
    name: "Fatima Khan",
    role: "Doctor, Gulberg",
    quote:
      "I invested in two commercial plots through their advisory team. Two years later, the ROI exceeded every projection. These are people who genuinely understand Lahore's market.",
    rating: 5,
    image: "/images/agent_2.png",
  },
  {
    name: "Usman Ghani",
    role: "IT Entrepreneur, Bahria Town",
    quote:
      "From the first viewing to the final paperwork, everything was flawless. Their legal team handled every detail so we could focus on moving in. Truly a five-star experience.",
    rating: 5,
    image: "/images/agent_1.png",
  },
  {
    name: "Maria Yousaf",
    role: "Architect, Lake City",
    quote:
      "As an architect, I'm particular about properties. Imperial Estates showed me homes that matched my exact aesthetic and budget. They elevated the entire buying journey.",
    rating: 5,
    image: "/images/agent_2.png",
  },
];

export const buyProcess = [
  { step: "01", title: "Discovery Consultation", desc: "We understand your lifestyle, budget, and dream location in a complimentary session." },
  { step: "02", title: "Curated Viewings", desc: "Hand-picked, verified properties matched precisely to your criteria." },
  { step: "03", title: "Legal Verification", desc: "Our in-house legal team validates title, ownership, and documentation." },
  { step: "04", title: "Handover & Beyond", desc: "Seamless transfer, registry, and lifetime concierge support." },
];

export const sellProcess = [
  { step: "01", title: "Free Valuation", desc: "A data-backed market valuation of your property within 48 hours." },
  { step: "02", title: "Cinematic Marketing", desc: "Drone videography, 3D tours, and targeted digital campaigns." },
  { step: "03", title: "Qualified Buyers", desc: "We screen and qualify every lead so you only meet serious buyers." },
  { step: "04", title: "Closing & Transfer", desc: "Negotiation, paperwork, and full transfer handled end-to-end." },
];

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  read: string;
  excerpt: string;
  image: string;
  author: string;
  authorImage: string;
  content: { heading: string; body: string[] }[];
};

export const blogs: BlogPost[] = [
  {
    slug: "dha-phase-9-prism-hottest-investment-2024",
    title: "Why DHA Phase 9 Prism Is Lahore's Hottest Investment in 2024",
    category: "Investment",
    date: "Mar 12, 2024",
    read: "6 min read",
    excerpt:
      "Infrastructure booms and new commercial corridors are pushing land prices skyward. Here's what smart investors should know before booking a plot.",
    image: "/images/blog_1.png",
    author: "Bilal Ahmed",
    authorImage: "/images/agent_1.png",
    content: [
      {
        heading: "The Rise of DHA Phase 9 Prism",
        body: [
          "DHA Phase 9 Prism has transformed from a long-term hold into one of Lahore's most dynamic residential blocks. Over the last 18 months, possession of multiple sectors, the completion of the Ring Road interchange, and the announcement of two new commercial zones have created a perfect storm for appreciation.",
          "Prices for 1 Kanal plots have climbed roughly 28% year-on-year, with select facing-the-park plots appreciating even faster. For investors who entered early, the returns have been exceptional — but the window is far from closed.",
        ],
      },
      {
        heading: "What's Driving the Growth",
        body: [
          "Three structural drivers underpin the Phase 9 Prism story. First, infrastructure: the new Ring Road interchange slashes commute times to the airport and DHA Phase 8 to under 15 minutes. Second, commercial development: two new commercial zones are breaking ground, bringing retail and offices into walking distance. Third, supply dynamics: with possession now available across most sectors, the speculative premium is being replaced by genuine end-user demand.",
        ],
      },
      {
        heading: "How to Invest Wisely",
        body: [
          "Not every plot in Phase 9 Prism offers the same upside. Our advisory team recommends prioritising sectors with active possession, corner plots where possible, and proximity to the planned commercial zones. Avoid files in sectors without a clear possession timeline.",
          "For most investors, a 24-month horizon balances appreciation potential with liquidity. Those with a longer view may consider holding for 36–48 months to capture the full impact of the commercial rollout.",
        ],
      },
      {
        heading: "The Bottom Line",
        body: [
          "DHA Phase 9 Prism remains one of the most compelling risk-adjusted opportunities in Lahore real estate today. With infrastructure now in place and demand shifting from speculators to end-users, the fundamentals are stronger than ever. Speak to our advisory team to explore current availability.",
        ],
      },
    ],
  },
  {
    slug: "modern-villa-design-trends-lahore",
    title: "Inside a 2-Kanal Modern Villa: Design Trends Redefining Lahore",
    category: "Lifestyle",
    date: "Feb 28, 2024",
    read: "8 min read",
    excerpt:
      "From double-height atriums to smart-home automation, discover the architectural features today's luxury buyers demand most.",
    image: "/images/interior_living.png",
    author: "Sana Malik",
    authorImage: "/images/agent_2.png",
    content: [
      {
        heading: "The New Language of Luxury",
        body: [
          "Lahore's luxury villa market has matured dramatically over the past five years. Today's discerning buyer is no longer impressed by sheer size alone — they want architecture that tells a story, materials that age gracefully, and technology that disappears into the background.",
          "We tour dozens of new-build villas every month. Here are the design trends we see defining the very best of 2024.",
        ],
      },
      {
        heading: "Double-Height Atriums & Light Wells",
        body: [
          "The single most requested feature in our premium briefs is a double-height entrance atrium. Done well, it creates a moment of architectural theatre the moment you step inside — and floods the home with natural light via clerestory windows or skylights.",
          "Light wells that run through multiple floors are becoming equally popular, particularly in narrow plots where they transform otherwise dark central corridors into luminous vertical galleries.",
        ],
      },
      {
        heading: "Smart Home, Invisible Tech",
        body: [
          "The era of clunky control panels is over. The most sophisticated villas now use Crestron or Control4 systems that learn family routines — adjusting climate, lighting, and shading automatically. Voice control is standard, but the real luxury is that the technology is invisible unless you need it.",
        ],
      },
      {
        heading: "Material Honesty",
        body: [
          "Imported Italian marble remains popular, but we're seeing a shift toward 'material honesty' — natural stone with visible veining, warm oak millwork, and microcement finishes that age beautifully. The goal is a home that looks better in ten years than it does on day one.",
        ],
      },
    ],
  },
  {
    slug: "complete-guide-property-transfer-lahore",
    title: "The Complete Guide to Property Transfer in Lahore",
    category: "Guides",
    date: "Feb 10, 2024",
    read: "10 min read",
    excerpt:
      "Registry, token money, stamp duty — our legal team breaks down every step and cost of transferring property in Punjab.",
    image: "/images/skyline.png",
    author: "Ahmed Raza Khan",
    authorImage: "/images/agent_1.png",
    content: [
      {
        heading: "Why Understanding Transfer Matters",
        body: [
          "Property transfer is the single most important — and most frequently misunderstood — step in any real estate transaction in Lahore. A clean transfer protects your investment for generations; a sloppy one can lead to disputes, lost capital, and years of litigation.",
          "This guide walks through the complete process as it applies in Lahore's major societies, including DHA, Bahria Town, and LDA-approved schemes.",
        ],
      },
      {
        heading: "Step 1: Token Money & Agreement to Sell",
        body: [
          "Once buyer and seller agree on a price, a token payment (typically 5–10% of the sale value) is made alongside an Agreement to Sell on stamp paper. This document locks in the price and timeline. Always have this drafted or reviewed by a qualified property lawyer.",
        ],
      },
      {
        heading: "Step 2: Stamp Duty & Registry",
        body: [
          "Stamp duty in Punjab is currently set at 1% of the property's DC value for urban property, with additional CVT and registration fees bringing the total transfer cost to roughly 3–4% of the DC value. The registry is executed at the relevant sub-registrar's office.",
        ],
      },
      {
        heading: "Step 3: Society Transfer Letter",
        body: [
          "In DHA and Bahria Town, the final step is the society's own transfer process, which includes biometric verification of both parties, clearance of any outstanding society dues, and issuance of a new transfer letter in the buyer's name. This typically takes 2–5 working days.",
        ],
      },
      {
        heading: "Common Pitfalls to Avoid",
        body: [
          "The most common issues we see: unverified title leading to disputes, unpaid society dues surfacing after transfer, and incomplete documentation that delays registry for months. Our in-house legal team handles every transfer end-to-end to ensure none of these issues arise.",
        ],
      },
    ],
  },
];

export const faqs = [
  {
    q: "What areas of Lahore does Imperial Estates cover?",
    a: "We operate across all of Lahore's premier neighborhoods including DHA (Phases 1–9), Bahria Town, Bahria Orchard, Gulberg, Lake City, Park View, and Wapda Town. Our network also extends to Islamabad and Karachi for select luxury listings.",
  },
  {
    q: "Do you charge any fees to buyers?",
    a: "No. Our advisory and property-matching services are completely free for buyers. We are compensated by the seller upon a successful transaction, so you get full representation at no cost.",
  },
  {
    q: "Can you help with property documentation and legal transfer?",
    a: "Absolutely. Our in-house legal team handles every aspect of documentation — from title verification and transfer letters to stamp duty and registry — ensuring a fully compliant, hassle-free process.",
  },
  {
    q: "What is the minimum investment for your advisory services?",
    a: "Our investment advisory is tailored to each client. We work with investments starting from PKR 50 lakh for apartment pre-launches up to multi-billion-rupee portfolio acquisitions.",
  },
  {
    q: "Do you offer property management after purchase?",
    a: "Yes. Our white-glove property management service covers maintenance, tenant sourcing, rent collection, and periodic inspections so your investment stays protected and productive.",
  },
  {
    q: "Can non-resident Pakistanis (NRPs) buy property through you?",
    a: "Certainly. We specialize in NRP transactions with digital viewings, remote documentation via power of attorney, and secure escrow-style payment handling for complete peace of mind.",
  },
];

export const navMenu = [
  {
    label: "Buy",
    href: "/buy",
    columns: [
      { title: "Property Types", links: [{ label: "Villas", href: "/properties?category=Villa" }, { label: "Apartments", href: "/properties?category=Apartment" }, { label: "Penthouses", href: "/properties?category=Penthouse" }, { label: "Farmhouses", href: "/properties?category=Farmhouse" }, { label: "Plots", href: "/properties?category=Plot" }] },
      { title: "Popular Areas", links: [{ label: "DHA Lahore", href: "/properties?area=DHA" }, { label: "Bahria Town", href: "/properties?area=Bahria" }, { label: "Gulberg", href: "/properties?area=Gulberg" }, { label: "Lake City", href: "/properties?area=Lake+City" }, { label: "Wapda Town", href: "/properties?area=Wapda" }] },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    columns: [
      { title: "Our Process", links: [{ label: "Free Valuation", href: "/sell" }, { label: "Marketing", href: "/sell" }, { label: "Qualified Buyers", href: "/sell" }, { label: "Closing", href: "/sell" }] },
      { title: "Resources", links: [{ label: "Pricing Guide", href: "/sell" }, { label: "Home Staging", href: "/sell" }, { label: "Legal Support", href: "/services" }, { label: "Transfer Help", href: "/services" }] },
    ],
  },
  {
    label: "Invest",
    href: "/invest",
    columns: [
      { title: "Opportunities", links: [{ label: "Residential Plots", href: "/invest" }, { label: "Commercial", href: "/invest" }, { label: "Pre-Launch", href: "/invest" }, { label: "Rental Yield", href: "/invest" }] },
      { title: "Advisory", links: [{ label: "Portfolio Review", href: "/invest" }, { label: "ROI Calculator", href: "/invest" }, { label: "Market Reports", href: "/blog" }, { label: "NRP Investing", href: "/invest" }] },
    ],
  },
];

export const directLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Agents", href: "/agents" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
