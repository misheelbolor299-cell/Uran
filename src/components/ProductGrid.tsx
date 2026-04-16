import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { SlidersHorizontal } from "lucide-react";
import ProductCard, { Product } from "./ProductCard";

const products: Product[] = [
  {
    id: 1,
    name: "Цэцэгт Бугуйвч",
    material: "925 Мөнгөн",
    price: 75000,
    category: "bracelets",
    stock: 12,
    image: "/products/661324026_1279691987561437_1944726703057050970_n.jpg",
  },
  {
    id: 2,
    name: "Birthstone Бөгж",
    material: "925 Мөнгөн / Алтан / Розе Алтан",
    price: 89000,
    category: "rings",
    stock: 8,
    image: "/products/661484811_733929583044086_512243370997527100_n.jpg",
    isNew: true,
  },
  {
    id: 3,
    name: "Цэнхэр Чулуутай Зүүлт",
    material: "925 Мөнгөн",
    price: 120000,
    originalPrice: 150000,
    category: "sets",
    stock: 10,
    image: "/products/661714181_1137867058465544_8865963633877082000_n.jpg",
    isSale: true,
  },
  {
    id: 4,
    name: "Зүрх Хавчаартай Бугуйвч",
    material: "925 Мөнгөн",
    price: 65000,
    category: "bracelets",
    stock: 15,
    image: "/products/661765857_914370841412483_7364882697298367285_n.jpg",
  },
  {
    id: 5,
    name: "Ягаан Хурэм Шарм",
    material: "925 Мөнгөн, Ягаан Эмаль",
    price: 45000,
    category: "bracelets",
    stock: 8,
    image: "/products/662646745_1330125642334332_5511399486193593971_n.jpg",
  },
  {
    id: 6,
    name: "Яс + Хурэм Шарм",
    material: "925 Мөнгөн, Ягаан Кристал",
    price: 52000,
    category: "bracelets",
    stock: 6,
    image: "/products/663118106_1582815809687493_6571516453834098408_n.jpg",
    isNew: true,
  },
  {
    id: 7,
    name: "Классик Бугуйвч",
    material: "925 Мөнгөн",
    price: 55000,
    category: "bracelets",
    stock: 20,
    image: "/products/663679916_970300998925855_5551614046255919212_n.jpg",
  },
  {
    id: 8,
    name: "Кристал Хурэм Шарм",
    material: "925 Мөнгөн, Цагаан Кристал",
    price: 48000,
    category: "bracelets",
    stock: 9,
    image: "/products/663705174_26564437846548647_820867141888132728_n.jpg",
    isNew: true,
  },
  {
    id: 9,
    name: "Лотос Зүүлт",
    material: "925 Мөнгөн",
    price: 89000,
    originalPrice: 110000,
    category: "sets",
    stock: 7,
    image: "/products/663803813_3781726198636716_1114358137382158096_n.jpg",
    isSale: true,
  },
  {
    id: 10,
    name: "Цэцэгт Зүрх Бугуйвч",
    material: "925 Мөнгөн",
    price: 72000,
    category: "bracelets",
    stock: 5,
    image: "/products/664064659_1472163314379277_2656775152072297320_n.jpg",
  },
  {
    id: 11,
    name: "Лотос Зүүлт — Нарийн",
    material: "925 Мөнгөн",
    price: 89000,
    category: "sets",
    stock: 7,
    image: "/products/668292123_3097125797163273_7502015431426512956_n.jpg",
  },
  {
    id: 12,
    name: "Мөнгөн Бөмбөгөр Зүүлт",
    material: "925 Мөнгөн",
    price: 95000,
    category: "sets",
    stock: 4,
    image: "/products/668977018_1193976372680199_175288788575609703_n.jpg",
    isNew: true,
  },
  {
    id: 13,
    name: "Тансаг Иж Бүрдэл",
    material: "925 Мөнгөн, Цэнхэр Чулуу",
    price: 250000,
    originalPrice: 320000,
    category: "sets",
    stock: 3,
    image: "/products/585864253_122105173017118584_3933920693595833110_n.jpg",
    isSale: true,
  },
  {
    id: 14,
    name: "Алмааз Иж Бүрдэл",
    material: "925 Мөнгөн",
    price: 320000,
    category: "sets",
    stock: 2,
    image: "/products/586315925_122105159397118584_3561621246097001864_n.jpg",
  },
];

const categories = [
  { key: "all", label: "Бүгд" },
  { key: "earrings", label: "Ээмэг" },
  { key: "rings", label: "Бөгж" },
  { key: "bracelets", label: "Бугуйвч" },
  { key: "sets", label: "Мөнгө Хослол" },
];

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
  const [activeCategory, setActiveCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(500000);
  const [sort, setSort] = useState("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: products.length };
    categories.slice(1).forEach((cat) => {
      c[cat.key] = products.filter((p) => p.category === cat.key).length;
    });
    return c;
  }, []);

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
