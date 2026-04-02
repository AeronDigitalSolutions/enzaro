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

type CatalogItem = {
  name: string;
  slug: string;
  inspiredBy: string;
  gender: "male" | "female";
};

const catalog: CatalogItem[] = [
  { name: "Ultra Male", slug: "ultra-male", inspiredBy: "JPG Ultra Male", gender: "male" },
  { name: "Ombre Nomadic", slug: "ombre-nomadic", inspiredBy: "LV Ombre Nomade", gender: "male" },
  { name: "Savage", slug: "savage", inspiredBy: "Dior Sauvage", gender: "male" },
  { name: "Savage Elixir", slug: "savage-elixir", inspiredBy: "Dior Sauvage Elixir", gender: "male" },
  { name: "Rasa & Lust", slug: "rasa-and-lust", inspiredBy: "Rasasi Hawas", gender: "male" },
  { name: "M Wanted", slug: "m-wanted", inspiredBy: "Azzaro Most Wanted", gender: "male" },
  { name: "Aventuss", slug: "aventuss", inspiredBy: "Creed Aventus", gender: "male" },
  { name: "7 CR", slug: "7-cr", inspiredBy: "CR7", gender: "male" },
  { name: "C.K.1", slug: "ck-1", inspiredBy: "CK One", gender: "male" },
  { name: "Vikings", slug: "vikings", inspiredBy: "Creed Viking", gender: "male" },
  { name: "Chrome", slug: "chrome", inspiredBy: "Azzaro Chrome", gender: "male" },
  { name: "Dylan Blue", slug: "dylan-blue", inspiredBy: "Versace Dylan Blue", gender: "male" },
  { name: "Blue de Luv", slug: "blue-de-luv", inspiredBy: "Bleu de Chanel", gender: "male" },
  { name: "Ocean Water", slug: "ocean-water", inspiredBy: "Davidoff Cool Water", gender: "male" },
  { name: "Powerful With You", slug: "powerful-with-you", inspiredBy: "Stronger With You", gender: "male" },
  { name: "Invictuss", slug: "invictuss", inspiredBy: "Paco Rabanne Invictus", gender: "male" },
  { name: "Million & Love", slug: "million-and-love", inspiredBy: "Paco Rabanne 1 Million", gender: "male" },
  { name: "H.E.R", slug: "her", inspiredBy: "Burberry Her", gender: "female" },
  { name: "Light Crystal", slug: "light-crystal", inspiredBy: "Versace Bright Crystal", gender: "female" },
  { name: "Dark Opium", slug: "dark-opium", inspiredBy: "YSL Black Opium", gender: "female" },
  { name: "Bombshells", slug: "bombshells", inspiredBy: "Victoria's Secret Bombshell", gender: "female" },
  { name: "Floral", slug: "floral", inspiredBy: "Gucci Flora", gender: "female" },
  { name: "I'ADORE", slug: "iadore", inspiredBy: "Dior J'adore", gender: "female" },
  { name: "Good Girls", slug: "good-girls", inspiredBy: "Carolina Herrera Good Girl", gender: "female" },
];

const imagePool = [
  "/images/products/savage-elixir.jpeg",
  "/images/products/ocean-water.jpeg",
  "/images/products/vikings.jpeg",
  "/images/products/chrome.jpeg",
  "/images/products/7-cr.jpeg",
  "/images/products/million-and-love.jpeg",
  "/images/products/her.jpeg",
  "/images/products/dark-opium.jpeg",
  "/images/products/product-1.jpeg",
  "/images/products/product-2.jpeg",
  "/images/products/product-3.jpeg",
  "/images/products/product-4.jpeg",
  "/images/products/product-5.jpeg",
  "/images/products/product-6.jpeg",
  "/images/products/product-7.jpeg",
  "/images/products/product-8.jpeg",
  "/images/products/product-9.jpeg",
  "/images/products/product-10.jpeg",
  "/images/products/product-11.jpeg",
  "/images/products/rasa-and-lust.jpeg",
  "/images/products/product-13.jpeg",
  "/images/products/floral.jpeg",
  "/images/products/product-15.jpeg",
  "/images/products/product-16.jpeg",
  "/images/products/product-17.jpeg",
  "/images/products/blue-de-luv.jpeg",
  "/images/products/product-19.jpeg",
  "/images/products/m-wanted.jpeg",
  "/images/products/product-21.jpeg",
  "/images/products/good-girls.jpeg",
  "/images/products/product-23.jpeg",
  "/images/products/powerful-with-you.jpeg",
  "/images/products/product-25.jpeg",
  "/images/products/bombshells.jpeg",
  "/images/products/product-27.jpeg",
  "/images/products/product-28.jpeg",
  "/images/products/product-29.jpeg",
  "/images/products/ck-1.jpeg",
  "/images/products/product-31.jpeg",
  "/images/products/product-32.jpeg",
];

const primaryImageBySlug: Record<string, string> = {
  "7-cr": "/images/products/7-cr.jpeg",
  "blue-de-luv": "/images/products/blue-de-luv.jpeg",
  bombshells: "/images/products/bombshells.jpeg",
  chrome: "/images/products/chrome.jpeg",
  "ck-1": "/images/products/ck-1.jpeg",
  "dark-opium": "/images/products/dark-opium.jpeg",
  floral: "/images/products/floral.jpeg",
  "good-girls": "/images/products/good-girls.jpeg",
  her: "/images/products/her.jpeg",
  "m-wanted": "/images/products/m-wanted.jpeg",
  "million-and-love": "/images/products/million-and-love.jpeg",
  "ocean-water": "/images/products/ocean-water.jpeg",
  "powerful-with-you": "/images/products/powerful-with-you.jpeg",
  "rasa-and-lust": "/images/products/rasa-and-lust.jpeg",
  "savage-elixir": "/images/products/savage-elixir.jpeg",
  vikings: "/images/products/vikings.jpeg",
};

const maleNotes: ProductNote[] = [
  { stage: "Top Notes", value: "Bergamot", symbol: "BER" },
  { stage: "Middle Notes", value: "Lavender", symbol: "LAV" },
  { stage: "Base Notes", value: "Amberwood", symbol: "AMB" },
];

const femaleNotes: ProductNote[] = [
  { stage: "Top Notes", value: "Pear Blossom", symbol: "PEA" },
  { stage: "Middle Notes", value: "Jasmine", symbol: "JAS" },
  { stage: "Base Notes", value: "Vanilla Musk", symbol: "VAN" },
];

const maleSpecs: ProductSpec[] = [
  { label: "Concentration", value: "Eau de Parfum" },
  { label: "Longevity", value: "8-12 Hours" },
  { label: "Projection", value: "Moderate to Strong" },
  { label: "Occasion", value: "Daily / Evening" },
];

const femaleSpecs: ProductSpec[] = [
  { label: "Concentration", value: "Eau de Parfum" },
  { label: "Longevity", value: "7-11 Hours" },
  { label: "Projection", value: "Soft to Moderate" },
  { label: "Occasion", value: "Daily / Date Night" },
];

function createAccordion(name: string, inspiredBy: string): ProductAccordion[] {
  return [
    {
      title: "Feeling & Occasion",
      content: `${name} is built for confident day-to-evening wear with a premium signature trail.`,
      open: true,
    },
    {
      title: "Behind The Perfume",
      content: `This creation is inspired by ${inspiredBy}, reimagined in ENZARO style for Indian climate and wearability.`,
    },
    {
      title: "How To Use",
      content: "Spray 3-5 times on pulse points and clothing from 6-8 inches for best projection.",
    },
  ];
}

export const defaultProducts: ProductSeed[] = catalog.map((item, index) => {
  const image = primaryImageBySlug[item.slug] || imagePool[index % imagePool.length];
  const gallery = [
    image,
    imagePool[(index + 7) % imagePool.length],
    imagePool[(index + 14) % imagePool.length],
  ];
  const female = item.gender === "female";
  const score = (4.4 + (index % 5) * 0.1).toFixed(1);

  return {
    displayId: String(index + 1),
    slug: item.slug,
    name: item.name,
    subtitle: "50ML",
    price: 1699,
    mrp: 2600,
    image,
    gallery,
    description: `${item.name} inspired by ${item.inspiredBy}. Crafted for premium performance with smooth projection and long-lasting character.`,
    notes: female ? femaleNotes : maleNotes,
    tags: female ? ["Women", "EDP", "Signature"] : ["Men", "EDP", "Signature"],
    reviewScore: score,
    reviewCount: 120 + index * 9,
    couponText: "Unlock a special checkout price with code ENZARO10",
    specs: female ? femaleSpecs : maleSpecs,
    accordion: createAccordion(item.name, item.inspiredBy),
    isBestSeller: index < 8,
    isNewArrival: index >= 16,
  };
});
