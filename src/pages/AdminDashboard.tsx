import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus, X, Check, TrendingUp, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import SalesChart from "../components/SalesChart";
import { Product } from "../components/ProductCard";
import { loadProducts, saveProducts } from "../data/products";
import { DollarSign, ShoppingBag, Users, Package } from "lucide-react";

const TABS = ["ЗАХИАЛГА", "БАРАА", "АНАЛИЗ", "ТОХИРГОО"];

const categoryLabels: Record<string, string> = {
  earrings: "Ээмэг",
  rings: "Бөгж",
  bracelets: "Бугуйвч",
  sets: "Мөнгө Хослол",
};

const initialOrders = [
  { id: "#0012", customer: "Б. Мөнхзул", date: "2024-04-15", amount: "₮320,000", status: "Хүргэгдсэн", statusColor: "bg-green-100 text-green-700" },
  { id: "#0011", customer: "Д. Энхтуяа", date: "2024-04-14", amount: "₮195,000", status: "Хүлээгдэж буй", statusColor: "bg-yellow-100 text-yellow-700" },
  { id: "#0010", customer: "Г. Батбаяр", date: "2024-04-13", amount: "₮480,000", status: "Хүргэлтэд", statusColor: "bg-blue-100 text-blue-700" },
  { id: "#0009", customer: "О. Сарнай", date: "2024-04-12", amount: "₮260,000", status: "Хүргэгдсэн", statusColor: "bg-green-100 text-green-700" },
  { id: "#0008", customer: "Н. Төгөлдөр", date: "2024-04-11", amount: "₮145,000", status: "Цуцлагдсан", statusColor: "bg-red-100 text-red-700" },
];

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  material: "925 Мөнгөн",
  price: 0,
  category: "bracelets",
  stock: 0,
  image: "",
  isNew: false,
  isSale: false,
};

const stats = [
  { title: "Нийт борлуулалт", value: "₮12,450,000", trend: 12, icon: DollarSign, color: "text-gold" },
  { title: "Захиалгууд", value: "148", trend: 8, icon: ShoppingBag, color: "text-blue-600" },
  { title: "Хэрэглэгчид", value: "1,024", trend: 5, icon: Users, color: "text-green-600" },
  { title: "Бараа", value: "36", trend: -2, icon: Package, color: "text-orange-500" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("БАРАА");
  const [products, setProducts] = useState<Product[]>(loadProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(emptyProduct);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  const handleDeleteProduct = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
  };

  const handleSaveEdit = () => {
    if (!editProduct) return;
    const updated = products.map((p) => (p.id === editProduct.id ? editProduct : p));
    setProducts(updated);
    saveProducts(updated);
    setEditProduct(null);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const id = Math.max(...products.map((p) => p.id), 0) + 1;
    const updated = [...products, { ...newProduct, id }];
    setProducts(updated);
    saveProducts(updated);
    setNewProduct(emptyProduct);
    setShowAddModal(false);
  };

  const handleDeleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main site navbar */}
      <Navbar cartCount={0} onCartOpen={() => {}} />

      {/* Admin header */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">АДМИН ПАНЕЛ</h1>
            <p className="text-gold text-sm tracking-widest uppercase mt-0.5">Uran Luxury Jewelry</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gold text-black text-xs font-bold tracking-widest uppercase px-5 py-2.5 hover:bg-gold-light transition-colors"
          >
            НЭВТРЭХ ГАРАХ
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-semibold tracking-widest pb-3 border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-white border-gold"
                  : "text-gray-400 border-transparent hover:text-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── ЗАХИАЛГА ── */}
        {activeTab === "ЗАХИАЛГА" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Захиалгууд</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["ЗАХИАЛГЫН ID", "ХЭРЭГЛЭГЧ", "ОГНОО", "ДҮН", "ТӨЛӨВ", ""].map((h) => (
                      <th key={h} className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 text-sm font-semibold text-gold">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded text-red-400 hover:text-red-600 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── БАРАА ── */}
        {activeTab === "БАРАА" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">{products.length} бараа</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-black text-white text-xs font-bold tracking-widest uppercase px-4 py-2.5 hover:bg-gray-900 transition-colors"
              >
                <Plus className="w-4 h-4" />
                БАРАА НЭМЭХ
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {["ЗУРАГ", "НЭР", "АНГИЛАЛ", "ҮНЭ", "НӨӨЦ", "ҮЙЛДЭЛ"].map((h) => (
                        <th key={h} className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3">
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-gray-100" />
                        </td>
                        <td className="px-5 py-3">
                          <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gold mt-0.5">{product.material}</p>
                        </td>
                        <td className="px-5 py-3 text-sm text-gray-600">{categoryLabels[product.category]}</td>
                        <td className="px-5 py-3">
                          <p className="text-sm font-bold text-gray-900">{product.price.toLocaleString()}₮</p>
                          {product.originalPrice && (
                            <p className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString()}₮</p>
                          )}
                        </td>
                        <td className="px-5 py-3 text-sm text-gray-700 font-medium">{product.stock}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditProduct({ ...product })}
                              className="px-3 py-1.5 bg-black text-white text-xs font-semibold rounded hover:bg-gray-800 transition-colors"
                            >
                              Засах
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded hover:bg-red-100 transition-colors"
                            >
                              Устгах
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── АНАЛИЗ ── */}
        {activeTab === "АНАЛИЗ" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {stats.map((s, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gray-50 ${s.color}`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${s.trend >= 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                      {s.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(s.trend)}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{s.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
                </div>
              ))}
            </div>
            <SalesChart />
          </div>
        )}

        {/* ── ТОХИРГОО ── */}
        {activeTab === "ТОХИРГОО" && (
          <div className="max-w-lg">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h2 className="font-bold text-gray-900 text-lg">Тохиргоо</h2>
              {[
                { label: "Дэлгүүрийн нэр", defaultValue: "Uran Luxury Jewelry" },
                { label: "Утас", defaultValue: "9999-1234" },
                { label: "Имэйл", defaultValue: "info@uranjewelry.mn" },
                { label: "Хаяг", defaultValue: "Улаанбаатар, Сүхбаатар дүүрэг" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    defaultValue={field.defaultValue}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              ))}
              <button className="w-full bg-black text-white py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors rounded-lg">
                ХАДГАЛАХ
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Edit Product Modal ── */}
      <AnimatePresence>
        {editProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 text-lg">Бараа засах</h3>
                <button onClick={() => setEditProduct(null)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <ProductForm product={editProduct} onChange={setEditProduct} />
              <div className="flex gap-3 mt-5">
                <button onClick={() => setEditProduct(null)} className="flex-1 border border-gray-200 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  Болих
                </button>
                <button onClick={handleSaveEdit} className="flex-1 bg-black text-white py-2.5 text-sm font-bold rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> Хадгалах
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Add Product Modal ── */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 text-lg">Шинэ бараа нэмэх</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <ProductForm product={newProduct as Product} onChange={(p) => setNewProduct(p)} />
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowAddModal(false)} className="flex-1 border border-gray-200 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  Болих
                </button>
                <button onClick={handleAddProduct} className="flex-1 bg-black text-white py-2.5 text-sm font-bold rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Нэмэх
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProductFormProps {
  product: Product;
  onChange: (p: Product) => void;
}

function ProductForm({ product, onChange }: ProductFormProps) {
  const field = (label: string, key: keyof Product, type = "text") => (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        value={String(product[key] ?? "")}
        onChange={(e) => onChange({ ...product, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
      />
    </div>
  );

  return (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
      {field("Нэр", "name")}
      {field("Материал", "material")}
      {field("Үнэ (₮)", "price", "number")}
      {field("Хөнгөлөлтийн үнэ (₮)", "originalPrice", "number")}
      {field("Нөөц", "stock", "number")}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Ангилал</label>
        <select
          value={product.category}
          onChange={(e) => onChange({ ...product, category: e.target.value as Product["category"] })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
        >
          <option value="bracelets">Бугуйвч</option>
          <option value="rings">Бөгж</option>
          <option value="earrings">Ээмэг</option>
          <option value="sets">Мөнгө Хослол</option>
        </select>
      </div>
      {field("Зургийн замчлал", "image")}
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={!!product.isNew} onChange={(e) => onChange({ ...product, isNew: e.target.checked })} className="rounded" />
          Шинэ
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={!!product.isSale} onChange={(e) => onChange({ ...product, isSale: e.target.checked })} className="rounded" />
          Хямдрал
        </label>
      </div>
    </div>
  );
}
