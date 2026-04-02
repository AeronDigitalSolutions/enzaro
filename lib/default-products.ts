export type ProductNote = {
  stage: string;
  value: string;
  symbol: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductAccordion = {
  title: string;
  content: string;
  open?: boolean;
};

export type ProductSeed = {
  displayId: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  mrp: number;
  image: string;
  gallery: string[];
  description: string;
  notes: ProductNote[];
  tags: string[];
  reviewScore: string;
  reviewCount: number;
  couponText: string;
  specs: ProductSpec[];
  accordion: ProductAccordion[];
  isBestSeller: boolean;
  isNewArrival: boolean;
};

export const defaultProducts: ProductSeed[] = [
  {
    displayId: "1",
    slug: "savage-elixir",
    name: "Savage Elixir",
    subtitle: "50ML",
    price: 185,
    mrp: 229,
    image: "/images/products/savage-elixir.jpeg",
    gallery: ["/images/products/savage-elixir.jpeg", "/images/products/product-32.jpeg", "/images/products/product-5.jpeg"],
    description:
      "A deep, mysterious blend of midnight rose and smoky incense crafted for evenings, black-tie moments, and long, confident exits.",
    notes: [
      { stage: "Top Notes", value: "Agarwood", symbol: "OUD" },
      { stage: "Middle Notes", value: "Black Rose", symbol: "ROS" },
      { stage: "Base Notes", value: "Incense", symbol: "INC" },
    ],
    tags: ["Woody", "Evening Wear", "Long Lasting"],
    reviewScore: "4.7",
    reviewCount: 228,
    couponText: "Unlock a special checkout price with code ENZARO10",
    specs: [
      { label: "Concentration", value: "Extrait de Parfum" },
      { label: "Longevity", value: "8-12 Hours" },
      { label: "Projection", value: "Moderate to Strong" },
      { label: "Occasion", value: "Evening / Formal" },
    ],
    accordion: [
      {
        title: "Feeling & Occasion",
        content:
          "Designed for polished nights, this fragrance sits close at first and expands gracefully with warmth. Ideal for elegant dinners, events, and winter evenings.",
        open: true,
      },
      {
        title: "Behind The Perfume",
        content:
          "Blended in small batches using aged woody accords and dark florals to create depth without heaviness.",
      },
      {
        title: "How To Use",
        content:
          "Spray 2-4 times on pulse points. For better hold, apply on moisturized skin and avoid rubbing after spraying.",
      },
    ],
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    displayId: "2",
    slug: "ocean-water",
    name: "Ocean Water",
    subtitle: "50ML",
    price: 210,
    mrp: 260,
    image: "/images/products/ocean-water.jpeg",
    gallery: ["/images/products/ocean-water.jpeg", "/images/products/product-3.jpeg", "/images/products/product-20.jpeg"],
    description:
      "Fresh sea salt meets creamy vanilla and sun-drenched amber. A luxurious everyday signature with clean marine energy.",
    notes: [
      { stage: "Top Notes", value: "Sea Salt", symbol: "SEA" },
      { stage: "Middle Notes", value: "Vanilla", symbol: "VAN" },
      { stage: "Base Notes", value: "Amber", symbol: "AMB" },
    ],
    tags: ["Fresh", "Daily Wear", "Unisex"],
    reviewScore: "4.6",
    reviewCount: 221,
    couponText: "Get it at a special price in checkout using code H2O10",
    specs: [
      { label: "Concentration", value: "Eau de Parfum" },
      { label: "Longevity", value: "7-10 Hours" },
      { label: "Projection", value: "Moderate" },
      { label: "Occasion", value: "Daily / Office" },
    ],
    accordion: [
      { title: "Feeling & Occasion", content: "Crisp and uplifting, Ocean Water is built for warm days, brunches, office wear, and travel.", open: true },
      { title: "Behind The Perfume", content: "Inspired by coastal air and clean skin musk, this blend balances brightness with smooth depth." },
      { title: "How To Use", content: "Spray on collarbone, neck, and wrists for a clean scent trail throughout the day." },
    ],
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    displayId: "3",
    slug: "vikings",
    name: "Vikings",
    subtitle: "50ML",
    price: 165,
    mrp: 210,
    image: "/images/products/vikings.jpeg",
    gallery: ["/images/products/vikings.jpeg", "/images/products/product-4.jpeg", "/images/products/product-27.jpeg"],
    description:
      "Lush roses resting on a bed of rich oud and praline. A modern interpretation of a bold, iconic profile.",
    notes: [
      { stage: "Top Notes", value: "Rose", symbol: "ROS" },
      { stage: "Middle Notes", value: "Oud", symbol: "OUD" },
      { stage: "Base Notes", value: "Praline", symbol: "PRA" },
    ],
    tags: ["Bold", "Date Night", "Statement"],
    reviewScore: "4.5",
    reviewCount: 179,
    couponText: "Bundle any 2 and unlock premium shipping free",
    specs: [
      { label: "Concentration", value: "Eau de Parfum" },
      { label: "Longevity", value: "8-11 Hours" },
      { label: "Projection", value: "Strong" },
      { label: "Occasion", value: "Evening / Party" },
    ],
    accordion: [
      { title: "Feeling & Occasion", content: "A richer profile for evenings and social settings where you want a defined scent identity.", open: true },
      { title: "Behind The Perfume", content: "Composed as a contrast fragrance: floral opening, smoky heart, and sweet-spiced dry down." },
      { title: "How To Use", content: "Use 2 sprays max for indoors, 4 sprays for open-air settings." },
    ],
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    displayId: "4",
    slug: "chrome",
    name: "Chrome",
    subtitle: "50ML",
    price: 150,
    mrp: 189,
    image: "/images/products/chrome.jpeg",
    gallery: ["/images/products/chrome.jpeg", "/images/products/product-7.jpeg", "/images/products/product-22.jpeg"],
    description: "A pristine floral bouquet with jasmine sambac, tuberose, and soft musk. Chic, luminous, and elegant.",
    notes: [
      { stage: "Top Notes", value: "Jasmine Sambac", symbol: "JAS" },
      { stage: "Middle Notes", value: "Tuberose", symbol: "TUB" },
      { stage: "Base Notes", value: "White Musk", symbol: "MUS" },
    ],
    tags: ["Floral", "Elegant", "Soft Trail"],
    reviewScore: "4.4",
    reviewCount: 141,
    couponText: "Flat savings available at checkout for first orders",
    specs: [
      { label: "Concentration", value: "Eau de Parfum" },
      { label: "Longevity", value: "6-9 Hours" },
      { label: "Projection", value: "Soft to Moderate" },
      { label: "Occasion", value: "Daily / Brunch" },
    ],
    accordion: [
      { title: "Feeling & Occasion", content: "Bright and polished for daytime wear, office meetings, and weekend outings.", open: true },
      { title: "Behind The Perfume", content: "Built around white florals with a clean musky backbone for a modern, airy character." },
      { title: "How To Use", content: "Apply to pulse points and hair ends for a soft, all-day trail." },
    ],
    isBestSeller: false,
    isNewArrival: true,
  },
  {
    displayId: "5",
    slug: "7-cr",
    name: "7 CR",
    subtitle: "50ML",
    price: 195,
    mrp: 249,
    image: "/images/products/7-cr.jpeg",
    gallery: ["/images/products/7-cr.jpeg", "/images/products/product-9.jpeg", "/images/products/product-17.jpeg"],
    description: "Glowing amber resin, labdanum, and rich vanilla cast a spell of golden warmth.",
    notes: [
      { stage: "Top Notes", value: "Amber", symbol: "AMB" },
      { stage: "Middle Notes", value: "Labdanum", symbol: "LAB" },
      { stage: "Base Notes", value: "Vanilla Bourbon", symbol: "VAN" },
    ],
    tags: ["Warm", "Comforting", "Winter Favorite"],
    reviewScore: "4.7",
    reviewCount: 196,
    couponText: "Members get additional benefits on this fragrance",
    specs: [
      { label: "Concentration", value: "Extrait de Parfum" },
      { label: "Longevity", value: "9-12 Hours" },
      { label: "Projection", value: "Moderate" },
      { label: "Occasion", value: "Evening / Winter" },
    ],
    accordion: [
      { title: "Feeling & Occasion", content: "Wrapped in amber warmth, this scent is ideal for cozy evenings and colder weather.", open: true },
      { title: "Ingredients", content: "Alcohol denat., parfum, aroma compounds, stabilizers, and approved colorants." },
    ],
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    displayId: "6",
    slug: "million-and-love",
    name: "Million & Love",
    subtitle: "50ML",
    price: 140,
    mrp: 179,
    image: "/images/products/million-and-love.jpeg",
    gallery: ["/images/products/million-and-love.jpeg", "/images/products/product-11.jpeg", "/images/products/product-21.jpeg"],
    description: "Sparkling Italian lemon, neroli, and sea salt evoke mornings on the Mediterranean coast.",
    notes: [
      { stage: "Top Notes", value: "Italian Lemon", symbol: "LEM" },
      { stage: "Middle Notes", value: "Neroli", symbol: "NER" },
      { stage: "Base Notes", value: "Driftwood", symbol: "DRI" },
    ],
    tags: ["Citrus", "Summer", "Vibrant"],
    reviewScore: "4.3",
    reviewCount: 112,
    couponText: "Buy 2 and get exclusive bundle pricing",
    specs: [
      { label: "Concentration", value: "Eau de Parfum" },
      { label: "Longevity", value: "6-8 Hours" },
      { label: "Projection", value: "Moderate" },
      { label: "Occasion", value: "Daily / Summer" },
    ],
    accordion: [
      { title: "Feeling & Occasion", content: "A bright daytime choice with lively citrus and airy depth.", open: true },
      { title: "How To Use", content: "For best summer performance, spray on clothes and pulse points." },
    ],
    isBestSeller: false,
    isNewArrival: true,
  },
  {
    displayId: "7",
    slug: "her",
    name: "H.E.R",
    subtitle: "50ML",
    price: 175,
    mrp: 219,
    image: "/images/products/her.jpeg",
    gallery: ["/images/products/her.jpeg", "/images/products/product-18.jpeg", "/images/products/product-24.jpeg"],
    description: "Sweet berry notes with a modern blush tone and creamy musk that feels effortlessly chic.",
    notes: [
      { stage: "Top Notes", value: "Strawberry", symbol: "BER" },
      { stage: "Middle Notes", value: "Vanilla", symbol: "VAN" },
      { stage: "Base Notes", value: "Musk", symbol: "MUS" },
    ],
    tags: ["Sweet", "Playful", "Feminine"],
    reviewScore: "4.6",
    reviewCount: 203,
    couponText: "Enjoy additional savings with auto-applied member code",
    specs: [
      { label: "Concentration", value: "Eau de Parfum" },
      { label: "Longevity", value: "7-10 Hours" },
      { label: "Projection", value: "Soft to Moderate" },
      { label: "Occasion", value: "Daily / Date" },
    ],
    accordion: [
      { title: "Feeling & Occasion", content: "Romantic and playful for day-to-evening transitions.", open: true },
      { title: "Behind The Perfume", content: "Blends juicy fruit facets with smooth musk for a polished sweet signature." },
    ],
    isBestSeller: false,
    isNewArrival: true,
  },
  {
    displayId: "8",
    slug: "dark-opium",
    name: "Dark Opium",
    subtitle: "50ML",
    price: 160,
    mrp: 205,
    image: "/images/products/dark-opium.jpeg",
    gallery: ["/images/products/dark-opium.jpeg", "/images/products/product-29.jpeg", "/images/products/product-31.jpeg"],
    description: "Intoxicating coffee and white florals with a smooth vanilla base made for high-impact nights.",
    notes: [
      { stage: "Top Notes", value: "Coffee", symbol: "COF" },
      { stage: "Middle Notes", value: "White Flowers", symbol: "FLR" },
      { stage: "Base Notes", value: "Vanilla", symbol: "VAN" },
    ],
    tags: ["Night", "Sensual", "Signature"],
    reviewScore: "4.8",
    reviewCount: 267,
    couponText: "Special launch offer active for a limited time",
    specs: [
      { label: "Concentration", value: "Extrait de Parfum" },
      { label: "Longevity", value: "9-13 Hours" },
      { label: "Projection", value: "Strong" },
      { label: "Occasion", value: "Night / Event" },
    ],
    accordion: [
      { title: "Feeling & Occasion", content: "An addictive evening scent with confident depth and rich texture.", open: true },
      { title: "How To Use", content: "Use 1-3 sprays based on environment; this profile projects strongly." },
    ],
    isBestSeller: false,
    isNewArrival: true,
  },
];

