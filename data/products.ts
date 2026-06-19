import type { Product } from "@/types";

// ─── Shared Config ────────────────────────────────────────────────────────────
const SCRUB_FABRIC =
  "72% polyester, 21% rayon, 7% spandex. Machine wash cold. Tumble dry low. Do not bleach. Iron on low heat.";
const COAT_FABRIC =
  "65% polyester, 30% cotton, 5% spandex. Machine wash cold. Tumble dry low. Do not bleach.";

const STANDARD_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

// ─── Color Definitions ────────────────────────────────────────────────────────
const NAVY = { name: "Surgical Navy", hex: "#1B3A6B" };
const LIGHT_BLUE = { name: "Light Blue", hex: "#A6D5FF" };
const OLIVE = { name: "Olive Green", hex: "#4A5C3F" };
const BLACK = { name: "Classic Black", hex: "#111111" };
const WHITE = { name: "Pure White", hex: "#F8F8F8" };

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
  "Designed for the modern female medical professional, The Elegance Wrap Set combines style with function. The wrap-front top offers a flattering silhouette while the wide-leg trousers provide all-day comfort during demanding shifts.";

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
  "Built for performance, The Athlete Pro Set features a sport-inspired design with contrast white piping detail. The mandarin collar top pairs seamlessly with tapered trousers, delivering a sharp, modern look throughout the longest shifts.";

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
  "A wardrobe essential for every medical professional. The Classic Scrub Set features a clean V-neck top with a distinctive ribbed collar stripe and straight-leg pants. Unisex sizing ensures a great fit for everyone.";

// =============================================================================
//  THE ESSENTIAL WHITE COAT  –  Unisex
// =============================================================================
const COAT_FEATURES = [
  "Classic knee-length cut",
  "Three front button closure",
  "Two lower patch pockets + one chest pocket",
  "Notched lapel collar",
  "Wrinkle-resistant, easy-care fabric",
];
const COAT_LONG =
  "The Essential White Coat is the ultimate symbol of medical professionalism. Crafted from a premium poly-cotton blend, it offers a clean, authoritative look while staying comfortable across extended wear.";

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
    price: 1200,
    description:
      "Wrap-style scrub set with wide-leg trousers. Effortlessly elegant for every shift.",
    longDescription: WRAP_LONG,
    features: WRAP_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...NAVY,
        images: [
          img(
            "/productImage/The Elegance Wrap Set/ChatGPT Image 8 يونيو 2026، 02_39_39 م.png"
          ),
          img(
            "/productImage/The Elegance Wrap Set/ChatGPT Image 8 يونيو 2026، 02_39_39 م.png"
          ),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img(
        "/productImage/The Elegance Wrap Set/ChatGPT Image 8 يونيو 2026، 02_39_39 م.png"
      ),
      img(
        "/productImage/The Elegance Wrap Set/ChatGPT Image 8 يونيو 2026، 02_39_39 م.png"
      ),
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
    price: 1200,
    description:
      "Wrap-style scrub set with wide-leg trousers. Effortlessly elegant for every shift.",
    longDescription: WRAP_LONG,
    features: WRAP_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...LIGHT_BLUE,
        images: [
          img(
            "/productImage/The Elegance Wrap Set/Max_a_Edit_the_image_and_k (3).png"
          ),
          img(
            "/productImage/The Elegance Wrap Set/Max_a_Edit_the_image_and_k (3).png"
          ),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img(
        "/productImage/The Elegance Wrap Set/Max_a_Edit_the_image_and_k (3).png"
      ),
      img(
        "/productImage/The Elegance Wrap Set/Max_a_Edit_the_image_and_k (3).png"
      ),
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
    price: 1200,
    description:
      "Wrap-style scrub set with wide-leg trousers. Effortlessly elegant for every shift.",
    longDescription: WRAP_LONG,
    features: WRAP_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...OLIVE,
        images: [
          img(
            "/productImage/The Elegance Wrap Set/Max_a_Edit_the_image_and_k (4).png"
          ),
          img(
            "/productImage/The Elegance Wrap Set/Max_a_Edit_the_image_and_k (4).png"
          ),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img(
        "/productImage/The Elegance Wrap Set/Max_a_Edit_the_image_and_k (4).png"
      ),
      img(
        "/productImage/The Elegance Wrap Set/Max_a_Edit_the_image_and_k (4).png"
      ),
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
    price: 1200,
    description:
      "Wrap-style scrub set with wide-leg trousers. Effortlessly elegant for every shift.",
    longDescription: WRAP_LONG,
    features: WRAP_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...BLACK,
        images: [
          img(
            "/productImage/The Elegance Wrap Set/Max_a_Edit_the_image_and_k (5).png"
          ),
          img(
            "/productImage/The Elegance Wrap Set/Max_a_Edit_the_image_and_k (5).png"
          ),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img(
        "/productImage/The Elegance Wrap Set/Max_a_Edit_the_image_and_k (5).png"
      ),
      img(
        "/productImage/The Elegance Wrap Set/Max_a_Edit_the_image_and_k (5).png"
      ),
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
    price: 1350,
    description:
      "Sport-inspired scrub set with mandarin collar and contrast piping. Built for performance.",
    longDescription: ATHLETE_LONG,
    features: ATHLETE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...NAVY,
        images: [
          img(
            "/productImage/The Athlete Pro Set/Max_a_غير_لون_السكراب_للكح.png"
          ),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Athlete Pro Set/Max_a_غير_لون_السكراب_للكح.png"),
      img("/productImage/The Athlete Pro Set/Max_a_غير_لون_السكراب_للكح.png"),
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
    price: 1350,
    description:
      "Sport-inspired scrub set with mandarin collar and contrast piping. Built for performance.",
    longDescription: ATHLETE_LONG,
    features: ATHLETE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...LIGHT_BLUE,
        images: [
          img(
            "/productImage/The Athlete Pro Set/Max_a_Edit_the_image_and_k (1).png"
          ),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img(
        "/productImage/The Athlete Pro Set/Max_a_Edit_the_image_and_k (1).png"
      ),
      img(
        "/productImage/The Athlete Pro Set/Max_a_Edit_the_image_and_k (1).png"
      ),
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
    price: 1350,
    description:
      "Sport-inspired scrub set with mandarin collar and contrast piping. Built for performance.",
    longDescription: ATHLETE_LONG,
    features: ATHLETE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...OLIVE,
        images: [
          img("/productImage/The Athlete Pro Set/Max_a_خلى_لونه_أولف_جرين.png"),
          img("athlete-olive-2"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Athlete Pro Set/Max_a_خلى_لونه_أولف_جرين.png"),
      img("athlete-olive-2"),
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
    price: 1350,
    description:
      "Sport-inspired scrub set with mandarin collar and contrast piping. Built for performance.",
    longDescription: ATHLETE_LONG,
    features: ATHLETE_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...BLACK,
        images: [
          img(
            "/productImage/The Athlete Pro Set/ChatGPT Image 8 يونيو 2026، 03_58_49 م.png"
          ),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img(
        "/productImage/The Athlete Pro Set/ChatGPT Image 8 يونيو 2026، 03_58_49 م.png"
      ),
      img(
        "/productImage/The Athlete Pro Set/ChatGPT Image 8 يونيو 2026، 04_22_26 م.png"
      ),
    ],
    isBestSeller: true,
    isNewArrival: false,
    stock: 30,
    createdAt: "2026-06-10",
  },

  // ── CLASSIC SCRUB SET ─────────────────────────────────────────────────────

  {
    id: "classic-navy",
    name: "The Classic Scrub Set – Surgical Navy",
    slug: "classic-scrub-set-navy",
    category: "sets",
    gender: "unisex",
    price: 1100,
    description:
      "Timeless V-neck scrub set with ribbed stripe collar. A wardrobe staple.",
    longDescription: CLASSIC_LONG,
    features: CLASSIC_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...NAVY,
        images: [
          img(
            "/productImage/The Classic Scrub Set/Max_a_خلى_المودل_ده_يقف_وق.png"
          ),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img("/productImage/The Classic Scrub Set/Max_a_خلى_المودل_ده_يقف_وق.png"),
      img(
        "/productImage/The Classic Scrub Set/gpt-image-2 (medium)_b_خليه_بدقن_وبشرته_اب.png"
      ),
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
    price: 1100,
    description:
      "Timeless V-neck scrub set with ribbed stripe collar. A wardrobe staple.",
    longDescription: CLASSIC_LONG,
    features: CLASSIC_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...LIGHT_BLUE,
        images: [
          img(
            "/productImage/The Classic Scrub Set/Max_a_Edit_the_image_and_k (2).png"
          ),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [
      img(
        "/productImage/The Classic Scrub Set/Max_a_Edit_the_image_and_k (2).png"
      ),
      img(
        "/productImage/The Classic Scrub Set/Max_a_Edit_the_image_and_k (2).png"
      ),
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
    price: 1100,
    description:
      "Timeless V-neck scrub set with ribbed stripe collar. A wardrobe staple.",
    longDescription: CLASSIC_LONG,
    features: CLASSIC_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...OLIVE,
        images: [
          img(
            "/productImage/The Classic Scrub Set/Max_a_Edit_the_image_and_k.png"
          ),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [],
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
    price: 1100,
    description:
      "Timeless V-neck scrub set with ribbed stripe collar. A wardrobe staple.",
    longDescription: CLASSIC_LONG,
    features: CLASSIC_FEATURES,
    fabricAndCare: SCRUB_FABRIC,
    colors: [
      {
        ...BLACK,
        images: [
          img("/productImage/The Classic Scrub Set/Max_a_غير_وقفه_المودل.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [],
    isBestSeller: false,
    isNewArrival: false,
    stock: 40,
    createdAt: "2026-06-10",
  },

  // ── THE ESSENTIAL WHITE COAT ──────────────────────────────────────────────

  {
    id: "white-coat",
    name: "The Essential White Coat",
    slug: "essential-white-coat",
    category: "tops",
    gender: "unisex",
    price: 950,
    description:
      "Classic knee-length white coat. Timeless, professional, and built to last.",
    longDescription: COAT_LONG,
    features: COAT_FEATURES,
    fabricAndCare: COAT_FABRIC,
    colors: [
      {
        ...WHITE,
        images: [
          img("/productImage/ChatGPT Image 19 يونيو 2026، 01_48_28 م.png"),
        ],
      },
    ],
    sizes: STANDARD_SIZES,
    images: [],
    isBestSeller: true,
    isNewArrival: false,
    stock: 50,
    createdAt: "2026-06-10",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getBestSellers = () =>
  products.filter((p) => p.isBestSeller);

export const getNewArrivals = () => products.filter((p) => p.isNewArrival);

export const getProductsByGender = (gender: "men" | "women" | "unisex") =>
  products.filter((p) => p.gender === gender);
