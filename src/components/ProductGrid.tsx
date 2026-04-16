import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { SlidersHorizontal } from "lucide-react";
import ProductCard, { Product } from "./ProductCard";
import { loadProducts } from "../data/products";
import { loadCategories, Category } from "../data/categories";


const sortOptions = [
  { value: "default", label: "Үндсэн" },
  { value: "price-asc", label: "Үнэ: Бага → Их" },
  { value: "price-desc", label: "Үнэ: Их → Бага" },
  { value: "new", label: "Шинэ эхэндээ" },
];

interface ProductGridProps {
  addToCart: (product: Product) => void;
}

export default function ProductGrid({ addToCart }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(loadProducts);
  const [categories, setCategories] = useState<Category[]>(() => [
    { key: "all", label: "Бүгд" },
    ...loadCategories(),
  ]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(500000);
  const [sort, setSort] = useState("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleProducts = () => setProducts(loadProducts());
    const handleCategories = () => setCategories([{ key: "all", label: "Бүгд" }, ...loadCategories()]);
    window.addEventListener("productsUpdated", handleProducts);
    window.addEventListener("categoriesUpdated", handleCategories);
    return () => {
      window.removeEventListener("productsUpdated", handleProducts);
      window.removeEventListener("categoriesUpdated", handleCategories);
    };
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: products.length };
    categories.slice(1).forEach((cat) => {
      c[cat.key] = products.filter((p) => p.category === cat.key).length;
    });
    return c;
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const catMatch = activeCategory === "all" || p.category === activeCategory;
      const priceMatch = p.price <= maxPrice;
      return catMatch && priceMatch;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "new") list = [...list].sort((a) => (a.isNew ? -1 : 1));
    return list;
  }, [activeCategory, maxPrice, sort]);

  return (
    <section id="shop" className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Дэлгүүр</h2>
          <div className="w-12 h-0.5 bg-gold mt-2" />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat.key
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {cat.label} ({counts[cat.key]})
            </motion.button>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 space-y-8">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-500">
                Шүүлтүүр
              </p>

              {/* Price range */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-600 tracking-wide uppercase">
                  Хамгийн их үнэ
                </p>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-gold cursor-pointer"
                />
                <p className="text-sm font-semibold text-gray-800">
                  {maxPrice.toLocaleString()}₮
                </p>
              </div>

              {/* Sort */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-600 tracking-wide uppercase">
                  Эрэмбэлэх
                </p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-gold"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Main grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle */}
            <div className="flex items-center justify-between mb-5 lg:hidden">
              <p className="text-sm text-gray-500">{filtered.length} бараа олдлоо</p>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-2 text-sm font-medium border border-gray-200 rounded-lg px-3 py-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Шүүлтүүр
              </button>
            </div>

            {/* Mobile sidebar */}
            {sidebarOpen && (
              <div className="lg:hidden bg-gray-50 rounded-xl p-5 mb-6 space-y-5">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Хамгийн их үнэ
                  </p>
                  <input
                    type="range"
                    min={10000}
                    max={500000}
                    step={5000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-gold"
                  />
                  <p className="text-sm font-semibold">{maxPrice.toLocaleString()}₮</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Эрэмбэлэх
                  </p>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                  >
                    {sortOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <p className="hidden lg:block text-sm text-gray-400 mb-5">
              {filtered.length} бараа олдлоо
            </p>

            <motion.div
              key={activeCategory + maxPrice + sort}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5"
            >
              {filtered.length > 0 ? (
                filtered.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))
              ) : (
                <div className="col-span-3 py-20 text-center text-gray-400 text-sm">
                  Бараа олдсонгүй
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
