const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const agentsData = [
  {
    "id": 1,
    "slug": "ahmed-raza-khan",
    "name": "Ahmed Raza Khan",
    "role": "Founder & Senior Advisor",
    "sales": "PKR 9.2B sold",
    "deals": 640,
    "image": "/images/agent_1.png",
    "phone": "+92 300 1234567",
    "email": "ahmed@imperialestates.pk",
    "bio": "With over 18 years in Lahore's luxury real estate market, Ahmed founded Imperial Estates in 2009 with a simple mission: bring transparency and white-glove service to property transactions. Today he is one of Pakistan's most respected advisors, having personally closed over 640 transactions worth more than PKR 9 billion. Ahmed specialises in ultra-luxury estates above PKR 5 crore and institutional-grade commercial portfolios.",
    "specialties": [
      "Ultra-Luxury Villas",
      "Commercial Portfolios",
      "NRP Investments",
      "Estate Acquisitions"
    ],
    "languages": [
      "Urdu",
      "English",
      "Punjabi"
    ],
    "experience": "18+ Years",
    "social": {
      "facebook": "https://facebook.com/imperialestates",
      "linkedin": "https://linkedin.com/in/ahmedrazakhan",
      "instagram": "https://instagram.com/imperialestates"
    }
  },
  {
    "id": 2,
    "slug": "sana-malik",
    "name": "Sana Malik",
    "role": "Head of Luxury Sales",
    "sales": "PKR 6.8B sold",
    "deals": 412,
    "image": "/images/agent_2.png",
    "phone": "+92 301 2345678",
    "email": "sana@imperialestates.pk",
    "bio": "Sana leads our luxury sales division and is renowned for her cinematic property marketing and meticulous client matchmaking. With a background in interior design, she brings a unique eye for a property's potential and has consistently achieved record-breaking sale prices across DHA and Bahria Town.",
    "specialties": [
      "Penthouses",
      "Designer Villas",
      "Marketing Strategy",
      "Staging"
    ],
    "languages": [
      "Urdu",
      "English"
    ],
    "experience": "11 Years",
    "social": {
      "facebook": "https://facebook.com/imperialestates",
      "linkedin": "https://linkedin.com/in/ayesha-imran",
      "instagram": "https://instagram.com/imperialestates"
    }
  },
  {
    "id": 3,
    "slug": "bilal-ahmed",
    "name": "Bilal Ahmed",
    "role": "Investment Specialist",
    "sales": "PKR 5.1B sold",
    "deals": 358,
    "image": "/images/agent_1.png",
    "phone": "+92 302 3456789",
    "email": "bilal@imperialestates.pk",
    "bio": "Bilal is our investment advisory lead, combining a finance background with deep market intelligence to build high-performing real estate portfolios. He has guided over 350 clients to collective returns exceeding 28% annually, specialising in pre-launch opportunities and commercial yield plays.",
    "specialties": [
      "Investment Advisory",
      "Pre-Launch Booking",
      "ROI Analysis",
      "Portfolio Strategy"
    ],
    "languages": [
      "Urdu",
      "English"
    ],
    "experience": "9 Years",
    "social": {
      "facebook": "https://facebook.com/imperialestates",
      "linkedin": "https://linkedin.com/in/bilaltanveer",
      "instagram": "https://instagram.com/imperialestates"
    }
  },
  {
    "id": 4,
    "slug": "ayesha-tariq",
    "name": "Ayesha Tariq",
    "role": "Client Relations Director",
    "sales": "PKR 4.6B sold",
    "deals": 305,
    "image": "/images/agent_2.png",
    "phone": "+92 303 4567890",
    "email": "ayesha@imperialestates.pk",
    "bio": "Ayesha oversees client relations and post-sale concierge, ensuring every family's journey from first viewing to handover is effortless. Her empathetic approach and attention to detail have earned her a 100% client retention rate and countless referrals.",
    "specialties": [
      "Client Concierge",
      "Family Relocations",
      "NRP Support",
      "Property Management"
    ],
    "languages": [
      "Urdu",
      "English",
      "Punjabi"
    ],
    "experience": "8 Years",
    "social": {
      "facebook": "https://facebook.com/imperialestates",
      "linkedin": "https://linkedin.com/in/sanakhan",
      "instagram": "https://instagram.com/imperialestates"
    }
  }
];
const propertiesData = [
  {
    "id": 1,
    "slug": "royal-garden-villa",
    "title": "Royal Garden Villa",
    "location": "DHA Phase 6, Lahore",
    "areaName": "DHA Phase 6",
    "price": "PKR 8.5 Cr",
    "priceValue": 850000000,
    "pricePerSqft": "PKR 42,500/sqft",
    "type": "Sale",
    "category": "Villa",
    "beds": 6,
    "baths": 7,
    "area": "2 Kanal",
    "image": "/images/villa_exterior_1.png",
    "gallery": [
      "/images/villa_exterior_1.png",
      "/images/interior_living.png",
      "/images/interior_kitchen.png",
      "/images/interior_bedroom.png"
    ],
    "tag": "Signature",
    "featured": true,
    "coordinates": {
      "x": 28,
      "y": 42
    },
    "description": "A masterpiece of contemporary architecture, the Royal Garden Villa spans 2 Kanal of meticulously landscaped grounds in DHA Phase 6. Featuring double-height atriums, imported Italian marble flooring, and a temperature-controlled infinity pool, this residence redefines luxury living in Lahore. The grand foyer opens to formal living and dining spaces, while the private wing houses six en-suite bedrooms with walk-in wardrobes. A separate servant quarter, smart-home automation, and a six-car showroom garage complete this exceptional property.",
    "features": [
      "Temperature-controlled infinity pool",
      "Imported Italian marble flooring",
      "Smart-home automation system",
      "Double-height grand atrium",
      "6-car showroom garage",
      "Landscaped Mughal-style gardens",
      "Separate servant quarter",
      "Solar power backup",
      "Home theatre room",
      "Private gym & sauna"
    ],
    "agentId": 1,
    "yearBuilt": 2022,
    "parking": 6
  },
  {
    "id": 2,
    "slug": "emerald-sky-penthouse",
    "title": "Emerald Sky Penthouse",
    "location": "Bahria Town, Lahore",
    "areaName": "Bahria Town",
    "price": "PKR 6.2 Cr",
    "priceValue": 620000000,
    "pricePerSqft": "PKR 65,263/sqft",
    "type": "Sale",
    "category": "Penthouse",
    "beds": 4,
    "baths": 5,
    "area": "9,500 sq.ft",
    "image": "/images/interior_bedroom.png",
    "gallery": [
      "/images/interior_bedroom.png",
      "/images/interior_bathroom.png",
      "/images/interior_theater.png",
      "/images/interior_gym.png"
    ],
    "tag": "New",
    "featured": true,
    "coordinates": {
      "x": 62,
      "y": 58
    },
    "description": "Crowning the skyline of Bahria Town, the Emerald Sky Penthouse offers 360-degree panoramic views across Lahore. This triplex residence features a private rooftop terrace with plunge pool, floor-to-ceiling German glazing, and a designer chef's kitchen. Four bedroom suites each offer skyline views, while the great room flows seamlessly to an entertainer's terrace. Concierge services, secure parking, and direct elevator access ensure effortless luxury living.",
    "features": [
      "Private rooftop terrace with plunge pool",
      "Floor-to-ceiling German glazing",
      "Designer chef's kitchen",
      "Direct private elevator access",
      "360-degree panoramic views",
      "Concierge service included",
      "Smart climate control",
      "Home automation by Crestron",
      "Wine cellar",
      "Private cinema lounge"
    ],
    "agentId": 2,
    "yearBuilt": 2023,
    "parking": 4
  },
  {
    "id": 3,
    "slug": "goldcrest-residences",
    "title": "Goldcrest Residences",
    "location": "Gulberg III, Lahore",
    "areaName": "Gulberg",
    "price": "PKR 3.8 Cr",
    "priceValue": 380000000,
    "pricePerSqft": "PKR 90,476/sqft",
    "type": "Sale",
    "category": "Apartment",
    "beds": 3,
    "baths": 4,
    "area": "4,200 sq.ft",
    "image": "/images/villa_exterior_2.png",
    "gallery": [
      "/images/villa_exterior_2.png",
      "/images/interior_living.png",
      "/images/interior_theater.png"
    ],
    "tag": "Hot Deal",
    "featured": true,
    "coordinates": {
      "x": 45,
      "y": 30
    },
    "description": "Located in the heart of Gulberg III, Goldcrest Residences combines urban convenience with refined luxury. This 3-bedroom apartment features open-plan living, a modern kitchen with island, and a wraparound balcony overlooking Main Boulevard. Residents enjoy a rooftop pool, fitness centre, and 24/7 concierge — all steps from Lahore's finest dining and shopping.",
    "features": [
      "Wraparound balcony with city views",
      "Modern kitchen with breakfast island",
      "Rooftop infinity pool",
      "24/7 concierge & security",
      "Fitness centre & spa",
      "Backup generators",
      "High-speed elevators",
      "Premium fitted appliances"
    ],
    "agentId": 4,
    "yearBuilt": 2021,
    "parking": 2
  },
  {
    "id": 4,
    "slug": "the-imperial-manor",
    "title": "The Imperial Manor",
    "location": "DHA Phase 8, Lahore",
    "areaName": "DHA Phase 8",
    "price": "PKR 11.2 Cr",
    "priceValue": 1120000000,
    "pricePerSqft": "PKR 46,667/sqft",
    "type": "Sale",
    "category": "Villa",
    "beds": 7,
    "baths": 8,
    "area": "3 Kanal",
    "image": "/images/villa_exterior_3.png",
    "gallery": [
      "/images/villa_exterior_3.png",
      "/images/interior_kitchen.png",
      "/images/interior_bedroom.png",
      "/images/interior_bathroom.png"
    ],
    "tag": "Exclusive",
    "featured": true,
    "coordinates": {
      "x": 70,
      "y": 36
    },
    "description": "The Imperial Manor is the crown jewel of DHA Phase 8 — a 3 Kanal estate designed for those who demand the extraordinary. A sweeping driveway leads to a portico entrance, opening into a palatial great room with 28-foot ceilings. Seven bedroom suites, a formal ballroom, private library, and climate-controlled wine cellar make this a once-in-a-generation offering.",
    "features": [
      "28-foot ceilings in great room",
      "Formal ballroom",
      "Private library",
      "Climate-controlled wine cellar",
      "Sweeping driveway with portico",
      "Tennis court",
      "Two swimming pools",
      "Smart-home throughout",
      "Guard house & gatehouse",
      "Generator & solar hybrid"
    ],
    "agentId": 1,
    "yearBuilt": 2023,
    "parking": 8
  },
  {
    "id": 5,
    "slug": "lakeside-modern-villa",
    "title": "Lakeside Modern Villa",
    "location": "Lake City, Lahore",
    "areaName": "Lake City",
    "price": "PKR 5.4 Cr",
    "priceValue": 540000000,
    "pricePerSqft": "PKR 54,000/sqft",
    "type": "Sale",
    "category": "Villa",
    "beds": 5,
    "baths": 6,
    "area": "1 Kanal",
    "image": "/images/villa_exterior_1.png",
    "gallery": [
      "/images/villa_exterior_1.png",
      "/images/interior_living.png",
      "/images/interior_gym.png"
    ],
    "tag": "Waterfront",
    "featured": true,
    "coordinates": {
      "x": 38,
      "y": 66
    },
    "description": "Fronting the serene waters of Lake City, this modern villa blends clean lines with warm natural materials. Floor-to-ceiling glass frames the lake views from every principal room. An infinity edge pool appears to merge with the lake beyond, while the interior features oak millwork, natural stone, and a sunken conversation pit.",
    "features": [
      "Lakefront infinity pool",
      "Floor-to-ceiling glass walls",
      "Oak millwork & natural stone",
      "Sunken conversation pit",
      "Outdoor kitchen & dining",
      "Boat dock access",
      "Rainwater harvesting",
      "Smart lighting scenes"
    ],
    "agentId": 3,
    "yearBuilt": 2022,
    "parking": 4
  },
  {
    "id": 6,
    "slug": "skyline-heights-suite",
    "title": "Skyline Heights Suite",
    "location": "Bahria Orchard, Lahore",
    "areaName": "Bahria Orchard",
    "price": "PKR 2.1 Cr",
    "priceValue": 210000000,
    "pricePerSqft": "PKR 75,000/sqft",
    "type": "Sale",
    "category": "Apartment",
    "beds": 3,
    "baths": 3,
    "area": "2,800 sq.ft",
    "image": "/images/skyline.png",
    "gallery": [
      "/images/skyline.png",
      "/images/interior_theater.png",
      "/images/interior_bathroom.png"
    ],
    "tag": "Investment",
    "featured": true,
    "coordinates": {
      "x": 54,
      "y": 72
    },
    "description": "An exceptional investment-grade apartment in Bahria Orchard offering strong rental yield. This 3-bedroom suite features an open-plan layout, modern finishes, and access to community amenities including pools, parks, and a clubhouse. Currently tenanted with strong cash flow.",
    "features": [
      "Open-plan living & dining",
      "Modern fitted kitchen",
      "Community pool & clubhouse",
      "Gated society with security",
      "Currently tenanted (strong yield)",
      "Backup power",
      "Covered parking",
      "Nearby schools & retail"
    ],
    "agentId": 3,
    "yearBuilt": 2020,
    "parking": 2
  },
  {
    "id": 7,
    "slug": "silver-oak-farmhouse",
    "title": "Silver Oak Farmhouse",
    "location": "Bedian Road, Lahore",
    "areaName": "Bedian Road",
    "price": "PKR 7.8 Cr",
    "priceValue": 780000000,
    "type": "Sale",
    "category": "Farmhouse",
    "beds": 5,
    "baths": 6,
    "area": "8 Kanal",
    "image": "/images/villa_exterior_2.png",
    "gallery": [
      "/images/villa_exterior_2.png",
      "/images/interior_bedroom.png",
      "/images/interior_gym.png"
    ],
    "tag": "Lifestyle",
    "coordinates": {
      "x": 22,
      "y": 54
    },
    "description": "A sprawling 8 Kanal farmhouse retreat along Bedian Road, perfect for weekend escapes or full-time country living. Mature silver oaks frame the property, with a main residence, guest house, staff quarters, and a stable. Organic vegetable gardens, a fruit orchard, and a large swimming pool make this a self-contained paradise.",
    "features": [
      "8 Kanal of private grounds",
      "Main residence + guest house",
      "Stable & paddock",
      "Organic vegetable garden",
      "Fruit orchard",
      "Olympic-size swimming pool",
      "Bore well & water filtration",
      "Staff quarters"
    ],
    "agentId": 1,
    "yearBuilt": 2019,
    "parking": 6
  },
  {
    "id": 8,
    "slug": "park-view-contemporary",
    "title": "Park View Contemporary",
    "location": "Park View, Lahore",
    "areaName": "Park View",
    "price": "PKR 4.2 Cr",
    "priceValue": 420000000,
    "type": "Sale",
    "category": "Villa",
    "beds": 5,
    "baths": 5,
    "area": "1 Kanal",
    "image": "/images/villa_exterior_3.png",
    "gallery": [
      "/images/villa_exterior_3.png",
      "/images/interior_kitchen.png",
      "/images/interior_theater.png"
    ],
    "tag": "Family",
    "coordinates": {
      "x": 50,
      "y": 48
    },
    "description": "A contemporary family villa in the sought-after Park View community. Clean lines, abundant natural light, and a flowing open plan make this home ideal for modern family living. The garden features a play area and covered patio, while upstairs bedrooms each have en-suite facilities.",
    "features": [
      "Open-plan ground floor",
      "En-suite bedrooms upstairs",
      "Family garden with play area",
      "Covered outdoor patio",
      "Modern fitted kitchen",
      "Gated community amenities",
      "Solar water heating"
    ],
    "agentId": 4,
    "yearBuilt": 2021,
    "parking": 3
  },
  {
    "id": 9,
    "slug": "dha-phase-9-prism-plot",
    "title": "DHA Phase 9 Prism Plot",
    "location": "DHA Phase 9 Prism, Lahore",
    "areaName": "DHA Phase 9",
    "price": "PKR 1.85 Cr",
    "priceValue": 185000000,
    "type": "Sale",
    "category": "Plot",
    "beds": 0,
    "baths": 0,
    "area": "1 Kanal",
    "image": "/images/interior_living.png",
    "gallery": [
      "/images/interior_living.png"
    ],
    "tag": "Investment",
    "coordinates": {
      "x": 76,
      "y": 50
    },
    "description": "A prime 1 Kanal residential plot in the rapidly appreciating DHA Phase 9 Prism block. Possession ready with all utilities available. Excellent investment opportunity with strong short-term appreciation driven by new infrastructure and commercial zones.",
    "features": [
      "Possession ready",
      "All utilities available",
      "Corner plot potential",
      "Wide 40-foot frontage",
      "Clear title & transfer letter",
      "Investment-grade appreciation"
    ],
    "agentId": 3,
    "yearBuilt": 2024
  },
  {
    "id": 10,
    "slug": "gulberg-greens-commercial",
    "title": "Gulberg Greens Commercial Plaza",
    "location": "Gulberg Greens, Lahore",
    "areaName": "Gulberg Greens",
    "price": "PKR 14.5 Cr",
    "priceValue": 1450000000,
    "type": "Sale",
    "category": "Commercial",
    "beds": 0,
    "baths": 8,
    "area": "4 Kanal",
    "image": "/images/interior_kitchen.png",
    "gallery": [
      "/images/interior_kitchen.png",
      "/images/interior_bathroom.png"
    ],
    "tag": "Commercial",
    "coordinates": {
      "x": 42,
      "y": 24
    },
    "description": "A landmark commercial plaza on the Gulberg Greens main boulevard. Four floors of premium office and retail space with basement parking, high-speed elevators, and a striking glass façade. Fully tenanted with strong rental income — an institutional-grade investment.",
    "features": [
      "Main boulevard frontage",
      "Four floors of leasable space",
      "Basement parking for 60 cars",
      "High-speed elevators",
      "Fully tenanted",
      "Glass curtain-wall façade",
      "Backup power & HVAC",
      "Institutional-grade asset"
    ],
    "agentId": 1,
    "yearBuilt": 2022,
    "parking": 60
  },
  {
    "id": 11,
    "slug": "state-bank-housing-residence",
    "title": "State Bank Housing Residence",
    "location": "State Bank Housing, Lahore",
    "areaName": "State Bank Housing",
    "price": "PKR 3.2 Cr",
    "priceValue": 320000000,
    "type": "Sale",
    "category": "Villa",
    "beds": 4,
    "baths": 4,
    "area": "10 Marla",
    "image": "/images/interior_bedroom.png",
    "gallery": [
      "/images/interior_bedroom.png",
      "/images/interior_living.png"
    ],
    "tag": "Value",
    "coordinates": {
      "x": 34,
      "y": 44
    },
    "description": "A well-maintained 10 Marla family home in the established State Bank Housing society. Practical layout with four bedrooms, drawing and dining rooms, and a rooftop terrace. Move-in ready with recent renovations to kitchen and bathrooms.",
    "features": [
      "Move-in ready condition",
      "Recently renovated kitchen",
      "Rooftop terrace",
      "Drawing & dining rooms",
      "Established community",
      "Nearby schools & markets",
      "Generator backup"
    ],
    "agentId": 4,
    "yearBuilt": 2016,
    "parking": 2
  },
  {
    "id": 12,
    "slug": "wapda-town-executive-home",
    "title": "Wapda Town Executive Home",
    "location": "Wapda Town, Lahore",
    "areaName": "Wapda Town",
    "price": "PKR 2.65 Cr",
    "priceValue": 265000000,
    "type": "Sale",
    "category": "Villa",
    "beds": 4,
    "baths": 4,
    "area": "1 Kanal",
    "image": "/images/interior_bathroom.png",
    "gallery": [
      "/images/interior_bathroom.png",
      "/images/interior_kitchen.png"
    ],
    "tag": "Family",
    "coordinates": {
      "x": 26,
      "y": 60
    },
    "description": "An executive family home in Wapda Town featuring a thoughtful layout, quality finishes, and a mature garden. The ground floor offers formal and family living spaces, while the first floor has four bedrooms including a master suite with dressing room.",
    "features": [
      "Formal & family living spaces",
      "Master suite with dressing room",
      "Mature landscaped garden",
      "Quality imported finishes",
      "Double car porch",
      "Central location in Wapda Town"
    ],
    "agentId": 2,
    "yearBuilt": 2018,
    "parking": 2
  }
];

async function main() {
  console.log('Clearing old database records...');
  await prisma.inquiry.deleteMany({});
  await prisma.property.deleteMany({});
  await prisma.agent.deleteMany({});

  console.log('Seeding Agents...');
  for (const agent of agentsData) {
    await prisma.agent.create({
      data: {
        id: agent.id,
        slug: agent.slug,
        name: agent.name,
        role: agent.role,
        bio: agent.bio,
        experience: agent.experience,
        deals: agent.deals,
        sales: agent.sales,
        specialties: agent.specialties.join(','),
        image: agent.image,
        phone: agent.phone,
        email: agent.email,
      }
    });
  }

  console.log('Seeding Properties...');
  for (const prop of propertiesData) {
    await prisma.property.create({
      data: {
        id: prop.id,
        slug: prop.slug,
        title: prop.title,
        location: prop.location,
        areaName: prop.areaName,
        price: prop.price,
        priceValue: prop.priceValue,
        pricePerSqft: prop.pricePerSqft || null,
        type: prop.type,
        category: prop.category,
        beds: prop.beds,
        baths: prop.baths,
        area: prop.area,
        image: prop.image,
        gallery: prop.gallery.join(','),
        tag: prop.tag || null,
        featured: prop.featured || false,
        coordinatesX: prop.coordinates.x,
        coordinatesY: prop.coordinates.y,
        description: prop.description,
        features: prop.features.join(','),
        agentId: prop.agentId,
        yearBuilt: prop.yearBuilt,
        parking: prop.parking || null,
      }
    });
  }

  console.log('Database seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
