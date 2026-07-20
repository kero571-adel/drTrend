import type { Product } from "@/types";

// ─── Shared Config ────────────────────────────────────────────────────────────
const SCRUB_FABRIC =
  "Made from premium imported Angelica fabric — the finest quality available on the market. Fade-resistant and colorfast wash after wash, with a four-way stretch that moves with you for all-day comfort and effortless freedom of motion. Machine wash cold. Tumble dry low. Do not bleach. Iron on low heat.";
const COAT_FABRIC =
  "Crafted from premium gabardine fabric with a water-repellent, tear-resistant finish, engineered to stand up to a doctor's toughest shifts — including splashes and spills. Machine wash cold. Tumble dry low. Do not bleach.";

const STANDARD_SIZES = ["M", "L", "XL", "XXL"];

// ─── Color Definitions ────────────────────────────────────────────────────────
const NAVY = { name: "Surgical Navy", hex: "#1B3A6B" };
const LIGHT_BLUE = { name: "Light Blue", hex: "#A6D5FF" };
const OLIVE = { name: "Olive Green", hex: "#4A5C3F" };
const BLACK = { name: "Classic Black", hex: "#111111" };
const WHITE = { name: "Pure White", hex: "#F8F8F8" };
const BURGUNDY = { name: "Burgundy", hex: "#6E1423" };
// =============================================================================
//  THE ESSENTIAL DENTAL COAT – Unisex
// =============================================================================

const DENTAL_COAT_FEATURES = [
  "Modern hip-length design",
  "Tailored slim-fit silhouette",
  "Classic notched lapel collar",
  "Three practical pockets (one chest, two lower)",
  "Back vent for unrestricted movement",
  "Premium wrinkle-resistant gabardine fabric",
];

const DENTAL_COAT_LONG =
  "Designed specifically for modern dental professionals, The Essential Dental Coat delivers a clean, contemporary look without sacrificing comfort. Its shorter hip-length silhouette allows unrestricted movement throughout busy clinical days while maintaining a sharp professional appearance. Crafted from premium gabardine fabric with a durable water-repellent finish, it resists wrinkles, splashes, and daily wear, making it an ideal choice for dentists who demand both style and performance.";

// ─── Helper: placeholder image until real ones are added ──────────────────────
const img = (seed: string) => seed;

// =============================================================================
//  THE ELEGANCE WRAP SET  –  Women
// =============================================================================
const WRAP_FEATURES = [
  "Wrap-style top with self-tie belt",
  "Wide-leg, relaxed trousers",
  "Four-way stretch fabric",
  "Side seam pockets",
  "Wrinkle-resistant finish",
];
const WRAP_LONG =
  "Designed for the modern female medical professional, The Elegance Wrap Set combines style with function. The wrap-front top offers a flattering silhouette while the wide-leg trousers provide all-day comfort during demanding shifts, crafted from premium Angelica fabric that keeps its color and shape wash after wash.";

// =============================================================================
//  THE ATHLETE PRO SET  –  Men
// =============================================================================
const ATHLETE_FEATURES = [
  "Mandarin collar with contrast piping",
  "Raglan sleeves for full range of motion",
  "Chest patch pocket",
  "Tapered pants with cargo side pockets",
  "Moisture-wicking technology",
];
const ATHLETE_LONG =
  "Built for performance, The Athlete Pro Set features a sport-inspired design with contrast white piping detail. The mandarin collar top pairs seamlessly with tapered trousers, delivering a sharp, modern look throughout the longest shifts — made from premium Angelica fabric that resists fading and moves with every step.";

// =============================================================================
//  THE CLASSIC SCRUB SET  –  Unisex
// =============================================================================
const CLASSIC_FEATURES = [
  "V-neck with ribbed stripe collar detail",
  "Two front patch pockets",
  "Straight-leg pants with elastic drawstring",
  "Side slits for easy movement",
  "Double-stitched seams for durability",
];
const CLASSIC_LONG =
  "A wardrobe essential for every medical professional. The Classic Scrub Set features a clean V-neck top with a distinctive ribbed collar stripe and straight-leg pants. Unisex sizing ensures a great fit for everyone, all cut from premium Angelica fabric prized for its lasting color and comfortable stretch.";

// =============================================================================
//  THE FLARE TREND SET  –  Women
// =============================================================================
const FLARE_FEATURES = [
  "Flattering V-neck top with a relaxed, easy fit",
  "Short sleeves for full freedom of movement",
  "Twin front patch pockets",
  "High-waisted, flared bootcut trousers",
  "Elasticated back waistband for a secure, flattering fit",
  "The silhouette everyone's talking about",
];
const FLARE_LONG =
  "Meet the scrub set everyone's scrolling to find — The Flare Trend Set. Designed for the woman who refuses to choose between style and function, it pairs an effortlessly chic V-neck top with dramatically flared, high-waisted trousers that skim the floor with every step. It's the look every young professional is asking for, made from premium imported Angelica fabric with just the right amount of stretch, so you look as sharp on hour twelve as you did on hour one.";

// =============================================================================
//  THE ESSENTIAL WHITE COAT  –  Unisex
// =============================================================================
const COAT_FEATURES = [
  "Classic knee-length cut",
  "Three front button closure",
  "Two lower patch pockets + one chest pocket",
  "Notched lapel collar",
  "Water-repellent, wrinkle-resistant fabric",
];
const COAT_LONG =
  "The Essential White Coat is the ultimate symbol of medical professionalism. Crafted from a premium gabardine blend with a water-repellent finish, it shields against everyday spills and splashes while offering a clean, authoritative look that stays comfortable across extended wear.";

// =============================================================================
//  PRODUCTS ARRAY
// =============================================================================
export const products: Product[] = [
  // ── ELEGANCE WRAP SET ─────────────────────────────────────────────────────

  {
    id: "wrap-navy",
    name: "The Elegance Wrap Set – Surgical Navy",
    slug: "elegance-wrap-set-navy",
    category: "sets",
    gender: "women",
    price: 1099,
    description:
      "Wrap-style scrub set with wide-leg trousers. Effortlessly elegant for every shift.",
    longDescription: WRAP_LONG,
    features: WRAP_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...NAVY,
        images: [
          img("/productImage/The Elegance Wrap Set/Surgical Navy_shoot1.png"),
          img("/productImage/The Elegance Wrap Set/Surgical Navy_shoot2.png"),
          img("/productImage/The Elegance Wrap Set/surgical Navy_shoot 3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Elegance Wrap Set/surgical Navy_shoot1.png"),
      img("/productImage/The Elegance Wrap Set/surgical Navy_shoot2.png"),
      img("/productImage/The Elegance Wrap Set/surgical Navy_shoot 3.png"),
    ],
    isBestSeller: false,
    isNewArrival: false,
    stock: 30,
    createdAt: "2026-06-10",
  },
  {
    id: "wrap-light-blue",
    name: "The Elegance Wrap Set – Light Blue",
    slug: "elegance-wrap-set-light-blue",
    category: "sets",
    gender: "women",
    price: 1099,
    description:
      "Wrap-style scrub set with wide-leg trousers. Effortlessly elegant for every shift.",
    longDescription: WRAP_LONG,
    features: WRAP_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...LIGHT_BLUE,
        images: [
          img("/productImage/The Elegance Wrap Set/Light Blue_Shoot1.png"),
          img("/productImage/The Elegance Wrap Set/Light Blue_Shoot2.png"),
          img("/productImage/The Elegance Wrap Set/Light Blue_Shoot 3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Elegance Wrap Set/Light Blue_Shoot1.png"),
      img("/productImage/The Elegance Wrap Set/Light Blue_Shoot2.png"),
      img("/productImage/The Elegance Wrap Set/Light Blue_Shoot 3.png"),
    ],
    isBestSeller: true,
    isNewArrival: false,
    stock: 30,
    createdAt: "2026-06-10",
  },
  {
    id: "wrap-olive",
    name: "The Elegance Wrap Set – Olive Green",
    slug: "elegance-wrap-set-olive",
    category: "sets",
    gender: "women",
    price: 1099,
    description:
      "Wrap-style scrub set with wide-leg trousers. Effortlessly elegant for every shift.",
    longDescription: WRAP_LONG,
    features: WRAP_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...OLIVE,
        images: [
          img("/productImage/The Elegance Wrap Set/Olive Green_shoot 1.png"),
          img("/productImage/The Elegance Wrap Set/Olive Green_shoot 2.png"),
          img("/productImage/The Elegance Wrap Set/Olive Green_shoot 3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Elegance Wrap Set/Olive Green_shoot 1.png"),
      img("/productImage/The Elegance Wrap Set/Olive Green_shoot 2.png"),
      img("/productImage/The Elegance Wrap Set/Olive Green_shoot 3.png"),
    ],
    isBestSeller: false,
    isNewArrival: false,
    stock: 30,
    createdAt: "2026-06-10",
  },
  {
    id: "wrap-black",
    name: "The Elegance Wrap Set – Classic Black",
    slug: "elegance-wrap-set-black",
    category: "sets",
    gender: "women",
    price: 1099,
    description:
      "Wrap-style scrub set with wide-leg trousers. Effortlessly elegant for every shift.",
    longDescription: WRAP_LONG,
    features: WRAP_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...BLACK,
        images: [
          img("/productImage/The Elegance Wrap Set/Classic Black_shoot1.png"),
          img("/productImage/The Elegance Wrap Set/black_shoot 2.png"),
          img("/productImage/The Elegance Wrap Set/black_shoot 3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Elegance Wrap Set/Classic Black_shoot1.png"),
      img("/productImage/The Elegance Wrap Set/black_shoot 2.png"),
      img("/productImage/The Elegance Wrap Set/black_shoot 3.png"),
    ],
    isBestSeller: false,
    isNewArrival: false,
    stock: 30,
    createdAt: "2026-06-10",
  },

  // ── ATHLETE PRO SET ───────────────────────────────────────────────────────

  {
    id: "athlete-navy",
    name: "The Athlete Pro Set – Surgical Navy",
    slug: "athlete-pro-set-navy",
    category: "sets",
    gender: "men",
    price: 1049,
    description:
      "Sport-inspired scrub set with mandarin collar and contrast piping. Built for performance.",
    longDescription: ATHLETE_LONG,
    features: ATHLETE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...NAVY,
        images: [
          img("/productImage/The Athlete Pro Set/Surgical Navy1.png"),
          img("/productImage/The Athlete Pro Set/Surgical Navy_shoot2.png"),
          img("/productImage/The Athlete Pro Set/Surgical Navy_shoot3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Athlete Pro Set/Surgical Navy1.png"),
      img("/productImage/The Athlete Pro Set/Surgical Navy_shoot2.png"),
      img("/productImage/The Athlete Pro Set/Surgical Navy_shoot3.png"),
    ],
    isBestSeller: false,
    isNewArrival: false,
    stock: 30,
    createdAt: "2026-06-10",
  },
  {
    id: "athlete-light-blue",
    name: "The Athlete Pro Set – Light Blue",
    slug: "athlete-pro-set-light-blue",
    category: "sets",
    gender: "men",
    price: 1049,
    description:
      "Sport-inspired scrub set with mandarin collar and contrast piping. Built for performance.",
    longDescription: ATHLETE_LONG,
    features: ATHLETE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...LIGHT_BLUE,
        images: [
          img("/productImage/The Athlete Pro Set/Light Blue_shoot1.png"),
          img("/productImage/The Athlete Pro Set/Light Blue_shoot2.png"),
          img("/productImage/The Athlete Pro Set/Light Blue_shoot 3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Athlete Pro Set/Light Blue_shoot1.png"),
      img("/productImage/The Athlete Pro Set/Light Blue_shoot2.png"),
      img("/productImage/The Athlete Pro Set/Light Blue_shoot 3.png"),
    ],
    isBestSeller: false,
    isNewArrival: false,
    stock: 30,
    createdAt: "2026-06-10",
  },
  {
    id: "athlete-olive",
    name: "The Athlete Pro Set – Olive Green",
    slug: "athlete-pro-set-olive",
    category: "sets",
    gender: "men",
    price: 1049,
    description:
      "Sport-inspired scrub set with mandarin collar and contrast piping. Built for performance.",
    longDescription: ATHLETE_LONG,
    features: ATHLETE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...OLIVE,
        images: [
          img("/productImage/The Athlete Pro Set/Olive Green_shoot1.png"),
          img("/productImage/The Athlete Pro Set/Olive Green_shoot2.png"),
          img("/productImage/The Athlete Pro Set/Olive Green_3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Athlete Pro Set/Olive Green_shoot1.png"),
      img("/productImage/The Athlete Pro Set/Olive Green_shoot2.png"),
      img("/productImage/The Athlete Pro Set/Olive Green_3.png"),
    ],
    isBestSeller: false,
    isNewArrival: false,
    stock: 30,
    createdAt: "2026-06-10",
  },
  {
    id: "athlete-black",
    name: "The Athlete Pro Set – Classic Black",
    slug: "athlete-pro-set-black",
    category: "sets",
    gender: "men",
    price: 1049,
    description:
      "Sport-inspired scrub set with mandarin collar and contrast piping. Built for performance.",
    longDescription: ATHLETE_LONG,
    features: ATHLETE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...BLACK,
        images: [
          img("/productImage/The Athlete Pro Set/Classic Black_1.png"),
          img("/productImage/The Athlete Pro Set/Classic Black_shoot2.png"),
          img("/productImage/The Athlete Pro Set/Classic Black_3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Athlete Pro Set/Classic Black_1.png"),
      img("/productImage/The Athlete Pro Set/Classic Black_shoot2.png"),
      img("/productImage/The Athlete Pro Set/Classic Black_3.png"),
    ],
    isBestSeller: true,
    isNewArrival: false,
    stock: 30,
    createdAt: "2026-06-10",
  },
  {
    id: "athlete-burgundy",
    name: "The Athlete Pro Set – Burgundy",
    slug: "athlete-pro-set-burgundy",
    category: "sets",
    gender: "men",
    price: 1049,
    description:
      "Sport-inspired scrub set with mandarin collar and contrast piping. Built for performance.",
    longDescription: ATHLETE_LONG,
    features: ATHLETE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...BURGUNDY,
        images: [
          img("/productImage/The Athlete Pro Set/burgandy_shoot1.png"),
          img("/productImage/The Athlete Pro Set/burgandy_shoot2.png"),
          img("/productImage/The Athlete Pro Set/burgandy_shoot3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Athlete Pro Set/burgandy_shoot1.png"),
      img("/productImage/The Athlete Pro Set/burgandy_shoot2.png"),
      img("/productImage/The Athlete Pro Set/burgandy_shoot3.png"),
    ],
    isBestSeller: false,
    isNewArrival: true,
    stock: 30,
    createdAt: "2026-07-15",
  },

  // ── CLASSIC SCRUB SET ─────────────────────────────────────────────────────

  {
    id: "classic-navy",
    name: "The Classic Scrub Set – Surgical Navy",
    slug: "classic-scrub-set-navy",
    category: "sets",
    gender: "unisex",
    price: 999,
    description:
      "Timeless V-neck scrub set with ribbed stripe collar. A wardrobe staple.",
    longDescription: CLASSIC_LONG,
    features: CLASSIC_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...NAVY,
        images: [
          img("/productImage/The Classic Scrub Set/Surgical Navy_shoot1.png"),
          img("/productImage/The Classic Scrub Set/Surgical Navy_shoot2.png"),
          img("/productImage/The Classic Scrub Set/Surgical Navy_shoot3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Classic Scrub Set/Surgical Navy_shoot1.png"),
      img("/productImage/The Classic Scrub Set/Surgical Navy_shoot2.png"),
      img("/productImage/The Classic Scrub Set/Surgical Navy_shoot3.png"),
    ],
    isBestSeller: true,
    isNewArrival: false,
    stock: 40,
    createdAt: "2026-06-10",
  },
  {
    id: "classic-light-blue",
    name: "The Classic Scrub Set – Light Blue",
    slug: "classic-scrub-set-light-blue",
    category: "sets",
    gender: "unisex",
    price: 999,
    description:
      "Timeless V-neck scrub set with ribbed stripe collar. A wardrobe staple.",
    longDescription: CLASSIC_LONG,
    features: CLASSIC_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...LIGHT_BLUE,
        images: [
          img("/productImage/The Classic Scrub Set/Light Blue_shoot1.png"),
          img("/productImage/The Classic Scrub Set/Light Blue_shoot2.png"),
          img("/productImage/The Classic Scrub Set/Light Blue_shoot3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Classic Scrub Set/Light Blue_shoot1.png"),
      img("/productImage/The Classic Scrub Set/Light Blue_shoot2.png"),
      img("/productImage/The Classic Scrub Set/Light Blue_shoot3.png"),
    ],
    isBestSeller: false,
    isNewArrival: false,
    stock: 40,
    createdAt: "2026-06-10",
  },
  {
    id: "classic-olive",
    name: "The Classic Scrub Set – Olive Green",
    slug: "classic-scrub-set-olive",
    category: "sets",
    gender: "unisex",
    price: 999,
    description:
      "Timeless V-neck scrub set with ribbed stripe collar. A wardrobe staple.",
    longDescription: CLASSIC_LONG,
    features: CLASSIC_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...OLIVE,
        images: [
          img("/productImage/The Classic Scrub Set/Olive Green_shoot1.png"),
          img("/productImage/The Classic Scrub Set/Olive Green_shoot2.png"),
          img("/productImage/The Classic Scrub Set/Olive Green_shoot3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Classic Scrub Set/Olive Green_shoot1.png"),
      img("/productImage/The Classic Scrub Set/Olive Green_shoot2.png"),
      img("/productImage/The Classic Scrub Set/Olive Green_shoot3.png"),
    ],
    isBestSeller: true,
    isNewArrival: false,
    stock: 40,
    createdAt: "2026-06-10",
  },
  {
    id: "classic-black",
    name: "The Classic Scrub Set – Classic Black",
    slug: "classic-scrub-set-black",
    category: "sets",
    gender: "unisex",
    price: 999,
    description:
      "Timeless V-neck scrub set with ribbed stripe collar. A wardrobe staple.",
    longDescription: CLASSIC_LONG,
    features: CLASSIC_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...BLACK,
        images: [
          img("/productImage/The Classic Scrub Set/Classic Black_shoot1.png"),
          img("/productImage/The Classic Scrub Set/Classic Black_shoot2.png"),
          img("/productImage/The Classic Scrub Set/Classic Black_shoot3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Classic Scrub Set/Classic Black_shoot1.png"),
      img("/productImage/The Classic Scrub Set/Classic Black_shoot2.png"),
      img("/productImage/The Classic Scrub Set/Classic Black_shoot3.png"),
    ],
    isBestSeller: false,
    isNewArrival: false,
    stock: 40,
    createdAt: "2026-06-10",
  },
  {
    id: "classic-burgundy",
    name: "The Classic Scrub Set – Burgundy",
    slug: "classic-scrub-set-burgundy",
    category: "sets",
    gender: "unisex",
    price: 999,
    description:
      "Timeless V-neck scrub set with ribbed stripe collar. A wardrobe staple.",
    longDescription: CLASSIC_LONG,
    features: CLASSIC_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...BURGUNDY,
        images: [
          img("/productImage/The Classic Scrub Set/burgandy_shoot1.png"),
          img("/productImage/The Classic Scrub Set/burgandy_shoot2.png"),
          img("/productImage/The Classic Scrub Set/burgandy_shoot3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Classic Scrub Set/burgandy_shoot1.png"),
      img("/productImage/The Classic Scrub Set/burgandy_shoot2.png"),
      img("/productImage/The Classic Scrub Set/burgandy_shoot3.png"),
    ],
    isBestSeller: false,
    isNewArrival: true,
    stock: 40,
    createdAt: "2026-07-15",
  },

  // ── THE FLARE TREND SET ───────────────────────────────────────────────────

  {
    id: "flare-light-blue",
    name: "The Flare Trend Set – Light Blue",
    slug: "flare-trend-set-light-blue",
    category: "sets",
    gender: "women",
    price: 1149,
    description:
      "The viral flared-pants scrub set everyone's talking about. Chic V-neck top, high-waisted flare trousers.",
    longDescription: FLARE_LONG,
    features: FLARE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...LIGHT_BLUE,
        images: [
          img("/productImage/The Flare Trend Set/Light Blue_shoot1.png"),
          img("/productImage/The Flare Trend Set/Light Blue_shoot2.png"),
          img("/productImage/The Flare Trend Set/Light Blue_shoot3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Flare Trend Set/Light Blue_shoot1.png"),
      img("/productImage/The Flare Trend Set/Light Blue_shoot2.png"),
      img("/productImage/The Flare Trend Set/Light Blue_shoot3.png"),
    ],
    isBestSeller: false,
    isNewArrival: true,
    stock: 30,
    createdAt: "2026-07-15",
  },
  {
    id: "flare-navy",
    name: "The Flare Trend Set – Surgical Navy",
    slug: "flare-trend-set-navy",
    category: "sets",
    gender: "women",
    price: 1149,
    description:
      "The viral flared-pants scrub set everyone's talking about. Chic V-neck top, high-waisted flare trousers.",
    longDescription: FLARE_LONG,
    features: FLARE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...NAVY,
        images: [
          img("/productImage/The Flare Trend Set/Surgical Navy_shoot1.png"),
          img("/productImage/The Flare Trend Set/Surgical Navy_shoot2.jpg"),
          img("/productImage/The Flare Trend Set/Surgical Navy_shoot3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Flare Trend Set/Surgical Navy_shoot1.png"),
      img("/productImage/The Flare Trend Set/Surgical Navy_shoot2.jpg"),
      img("/productImage/The Flare Trend Set/Surgical Navy_shoot3.png"),
    ],
    isBestSeller: false,
    isNewArrival: true,
    stock: 30,
    createdAt: "2026-07-15",
  },
  {
    id: "flare-olive",
    name: "The Flare Trend Set – Olive Green",
    slug: "flare-trend-set-olive",
    category: "sets",
    gender: "women",
    price: 1149,
    description:
      "The viral flared-pants scrub set everyone's talking about. Chic V-neck top, high-waisted flare trousers.",
    longDescription: FLARE_LONG,
    features: FLARE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...OLIVE,
        images: [
          img("/productImage/The Flare Trend Set/Olive Green_shoot1.png"),
          img("/productImage/The Flare Trend Set/Olive Green_shoot2.png"),
          img("/productImage/The Flare Trend Set/Olive Green_shoot3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Flare Trend Set/Olive Green_shoot1.png"),
      img("/productImage/The Flare Trend Set/Olive Green_shoot2.png"),
      img("/productImage/The Flare Trend Set/Olive Green_shoot3.png"),
    ],
    isBestSeller: false,
    isNewArrival: true,
    stock: 30,
    createdAt: "2026-07-15",
  },
  {
    id: "flare-black",
    name: "The Flare Trend Set – Classic Black",
    slug: "flare-trend-set-black",
    category: "sets",
    gender: "women",
    price: 1149,
    description:
      "The viral flared-pants scrub set everyone's talking about. Chic V-neck top, high-waisted flare trousers.",
    longDescription: FLARE_LONG,
    features: FLARE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...BLACK,
        images: [
          img("/productImage/The Flare Trend Set/Classic Black_shoot1.png"),
          img("/productImage/The Flare Trend Set/Classic Black_shoot2.png"),
          img("/productImage/The Flare Trend Set/Classic Black_shoot3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Flare Trend Set/Classic Black_shoot1.png"),
      img("/productImage/The Flare Trend Set/Classic Black_shoot2.png"),
      img("/productImage/The Flare Trend Set/Classic Black_shoot3.png"),
    ],
    isBestSeller: false,
    isNewArrival: true,
    stock: 30,
    createdAt: "2026-07-15",
  },
  {
    id: "flare-burgundy",
    name: "The Flare Trend Set – Burgundy",
    slug: "flare-trend-set-burgundy",
    category: "sets",
    gender: "women",
    price: 1149,
    description:
      "The viral flared-pants scrub set everyone's talking about. Chic V-neck top, high-waisted flare trousers.",
    longDescription: FLARE_LONG,
    features: FLARE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...BURGUNDY,
        images: [
          img("/productImage/The Flare Trend Set/burgandy_shoot1.png"),
          img("/productImage/The Flare Trend Set/burgandy_shoot2.png"),
          img("/productImage/The Flare Trend Set/burgandy_shoot3.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Flare Trend Set/burgandy_shoot1.png"),
      img("/productImage/The Flare Trend Set/burgandy_shoot2.png"),
      img("/productImage/The Flare Trend Set/burgandy_shoot3.png"),
    ],
    isBestSeller: false,
    isNewArrival: true,
    stock: 30,
    createdAt: "2026-07-15",
  },

  // ── THE ESSENTIAL WHITE COAT ──────────────────────────────────────────────

  {
    id: "white-coat",
    name: "The Essential White Coat",
    slug: "essential-white-coat",
    category: "tops",
    gender: "unisex",
    price: 599,
    description:
      "Classic knee-length white coat. Timeless, professional, and built to last.",
    longDescription: COAT_LONG,
    features: COAT_FEATURES,
    fabricAndCare: COAT_FABRIC,
    colors: [
      {
        ...WHITE,
        images: [
          img("/productImage/coat/font coat.png"),
          img("/productImage/coat/back coat.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/coat/font coat.png"),
      img("/productImage/coat/back coat.png"),
    ],
    isBestSeller: true,
    isNewArrival: false,
    stock: 50,
    createdAt: "2026-06-10",
  },

  // ── THE dentist  WHITE COAT ──────────────────────────────────────────────

  {
    id: "dentist-coat",
    name: "The dentist Dental Coat",
    slug: "dentist-dental-coat",
    category: "tops",
    gender: "unisex",
    price: 599,

    description:
      "Modern hip-length dental coat designed for comfort, mobility, and a clean professional appearance.",

    longDescription: DENTAL_COAT_LONG,

    features: DENTAL_COAT_FEATURES,

    fabricAndCare: COAT_FABRIC,

    colors: [
      {
        ...WHITE,
        images: [
          img("/productImage/dentist is coat/front coat.jpeg"),
          img("/productImage/dentist is coat/back coat.jpeg"),
        ],
      },
    ],

    sizes: STANDARD_SIZES,

    images: [img("/productImage/dentist is coat/front coat.jpeg")],

    isBestSeller: true,
    isNewArrival: true,
    stock: 50,
    createdAt: "2026-07-17",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getBestSellers = () => products.filter((p) => p.isBestSeller);

export const getNewArrivals = () => products.filter((p) => p.isNewArrival);

export const getProductsByGender = (gender: "men" | "women" | "unisex") =>
  products.filter((p) => p.gender === gender);
