import { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatEGP } from "../lib/shipping";

type SortKey = "featured" | "price-asc" | "price-desc" | "new";

export default function Shop() {
  const [gender, setGender] = useState<"all" | "men" | "women" | "unisex">(
    "all"
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(200);
  const [priceMax, setPriceMax] = useState(5000);
  const [sort, setSort] = useState<SortKey>("featured");
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  const { addItem } = useCart();
  const { showToast } = useToast();

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const allCategories = ["tops", "bottoms", "sets", "accessories"];

  const toggleCategory = (c: string) =>
    setCategories((p) =>
      p.includes(c) ? p.filter((x) => x !== c) : [...p, c]
    );
  const toggleSize = (s: string) =>
    setSizes((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const clearFilters = () => {
    setGender("all");
    setCategories([]);
    setSizes([]);
    setPriceMin(200);
    setPriceMax(5000);
  };

  const filtered = useMemo(() => {
    let res = products.filter((p) => {
      if (gender !== "all" && p.gender !== gender && p.gender !== "unisex")
        return false;
      if (categories.length > 0 && !categories.includes(p.category))
        return false;
      if (sizes.length > 0 && !sizes.some((s) => p.sizes.includes(s)))
        return false;
      if (p.price < priceMin || p.price > priceMax) return false;
      return true;
    });
    if (sort === "price-asc") res = [...res].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc")
      res = [...res].sort((a, b) => b.price - a.price);
    else if (sort === "new")
      res = [...res].sort(
        (a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0)
      );
    return res;
  }, [gender, categories, sizes, priceMin, priceMax, sort]);

  const perPage = 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const handleAdd = (product: (typeof products)[number]) => {
    const firstColor = product.colors[0];
    const size = product.sizes.find((s) => s === "M") || product.sizes[0];
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      color: firstColor.name,
      colorHex: firstColor.hex,
      size,
      quantity: 1,
      unitPrice: product.price,
      image: firstColor.images[0] || product.images[0] || "",
    });
    showToast(`${product.name} added to cart`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
          Shop All
        </h1>
        <p className="text-gray-500 mt-2">
          Elevate your practice with premium medical apparel.
        </p>
      </div>

      <div className="flex lg:hidden items-center justify-between mb-6">
        <button
          onClick={() => setMobileFilters(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filters
        </button>
        <SortSelect sort={sort} setSort={setSort} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <FilterSidebar
            gender={gender}
            setGender={setGender}
            categories={categories}
            toggleCategory={toggleCategory}
            sizes={sizes}
            toggleSize={toggleSize}
            priceMin={priceMin}
            priceMax={priceMax}
            setPriceMin={setPriceMin}
            setPriceMax={setPriceMax}
            clearFilters={clearFilters}
            allSizes={allSizes}
            allCategories={allCategories}
          />
        </aside>

        {/* Main */}
        <div>
          <div className="hidden lg:flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600">
              Showing {filtered.length} products
            </span>
            <SortSelect sort={sort} setSort={setSort} />
          </div>

          {pageItems.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <p className="text-gray-500">No products match your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-primary font-medium text-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {pageItems.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={() => handleAdd(p)}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
                aria-label="Previous page"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                    page === i + 1
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      {mobileFilters && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setMobileFilters(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg">Filters</h3>
              <button
                onClick={() => setMobileFilters(false)}
                className="text-gray-500 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <FilterSidebar
              gender={gender}
              setGender={setGender}
              categories={categories}
              toggleCategory={toggleCategory}
              sizes={sizes}
              toggleSize={toggleSize}
              priceMin={priceMin}
              priceMax={priceMax}
              setPriceMin={setPriceMin}
              setPriceMax={setPriceMax}
              clearFilters={clearFilters}
              allSizes={allSizes}
              allCategories={allCategories}
            />
            <button
              onClick={() => setMobileFilters(false)}
              className="mt-6 w-full bg-gray-900 text-white font-semibold py-3 rounded-lg"
            >
              Show {filtered.length} products
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4 lg:hidden">
        Showing {filtered.length} products
      </p>
    </div>
  );
}

function SortSelect({
  sort,
  setSort,
}: {
  sort: SortKey;
  setSort: (s: SortKey) => void;
}) {
  return (
    <div className="relative">
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortKey)}
        className="appearance-none bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2 text-sm font-medium focus:outline-none focus:border-primary cursor-pointer"
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="new">New Arrivals</option>
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

interface SidebarProps {
  gender: string;
  setGender: (g: any) => void;
  categories: string[];
  toggleCategory: (c: string) => void;
  sizes: string[];
  toggleSize: (s: string) => void;
  priceMin: number;
  priceMax: number;
  setPriceMin: (n: number) => void;
  setPriceMax: (n: number) => void;
  clearFilters: () => void;
  allSizes: string[];
  allCategories: string[];
}

function FilterSidebar(props: SidebarProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-lg">Filters</h3>
        <button
          onClick={props.clearFilters}
          className="text-primary text-xs font-semibold hover:underline"
        >
          Clear All
        </button>
      </div>

      <FilterSection title="Gender">
        <div className="flex flex-wrap gap-2">
          {(["all", "men", "women", "unisex"] as const).map((g) => (
            <button
              key={g}
              onClick={() => props.setGender(g)}
              className={`px-4 py-1.5 text-xs font-semibold uppercase rounded-full border transition-colors ${
                props.gender === g
                  ? "bg-primary border-primary text-white"
                  : "border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Category">
        <div className="space-y-2">
          {props.allCategories.map((c) => (
            <label
              key={c}
              className="flex items-center gap-3 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                checked={props.categories.includes(c)}
                onChange={() => props.toggleCategory(c)}
                className="w-4 h-4 accent-primary rounded"
              />
              <span className="capitalize">{c}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {props.allSizes.map((s) => (
            <button
              key={s}
              onClick={() => props.toggleSize(s)}
              className={`w-10 h-10 text-xs font-semibold rounded-full border transition-colors ${
                props.sizes.includes(s)
                  ? "bg-primary border-primary text-white"
                  : "border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}
