import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, X, Check, Eye, Tag, ImagePlus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import { Product } from "../components/ProductCard";
import { loadProducts, saveProducts } from "../data/products";
import { loadOrders, updateOrderStatus, deleteOrder, Order } from "../data/orders";
import { loadCategories, saveCategories, Category } from "../data/categories";
import { ShoppingBag } from "lucide-react";

const TABS = ["ЗАХИАЛГА", "БАРАА", "АНГИЛАЛ", "ТОХИРГОО"];


const STATUS_COLORS: Record<string, string> = {
  "Хүлээгдэж буй": "bg-yellow-100 text-yellow-700",
  "Хүргэлтэд": "bg-blue-100 text-blue-700",
  "Хүргэгдсэн": "bg-green-100 text-green-700",
  "Цуцлагдсан": "bg-red-100 text-red-700",
};

const emptyCategory: Category = { key: "", label: "" };

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  description: "",
  price: 0,
  category: "bracelets",
  stock: 0,
  image: "",
  isNew: false,
  isSale: false,
};


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ЗАХИАЛГА");
  const [products, setProducts] = useState<Product[]>(loadProducts);
  const [orders, setOrders] = useState<Order[]>(loadOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(emptyProduct);
  const [categories, setCategories] = useState<Category[]>(loadCategories);
  const [newCategory, setNewCategory] = useState<Category>(emptyCategory);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  useEffect(() => {
    const handler = () => setOrders(loadOrders());
    window.addEventListener("ordersUpdated", handler);
    return () => window.removeEventListener("ordersUpdated", handler);
  }, []);

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
    deleteOrder(id);
    setOrders(loadOrders());
  };

  const handleStatusChange = (id: string, status: Order["status"]) => {
    updateOrderStatus(id, status);
    setOrders(loadOrders());
  };

  const handleAddCategory = () => {
    if (!newCategory.key.trim() || !newCategory.label.trim()) return;
    const key = newCategory.key.toLowerCase().replace(/\s+/g, "_");
    if (categories.find((c) => c.key === key)) return;
    const updated = [...categories, { key, label: newCategory.label }];
    setCategories(updated);
    saveCategories(updated);
    setNewCategory(emptyCategory);
  };

  const handleDeleteCategory = (key: string) => {
    const updated = categories.filter((c) => c.key !== key);
    setCategories(updated);
    saveCategories(updated);
  };

  const handleSaveCategory = () => {
    if (!editCategory) return;
    const updated = categories.map((c) => (c.key === editCategory.key ? editCategory : c));
    setCategories(updated);
    saveCategories(updated);
    setEditCategory(null);
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
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">{orders.length} захиалга</p>
            </div>
            {orders.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 py-20 text-center">
                <ShoppingBag className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 font-medium">Одоогоор захиалга байхгүй байна</p>
                <p className="text-sm text-gray-300 mt-1">Хэрэглэгчид захиалга хийхэд энд харагдана</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {["ID", "ХЭРЭГЛЭГЧ", "УТАС", "ОГНОО", "ДҮН", "ТӨЛӨВ", "ҮЙЛДЭЛ"].map((h) => (
                          <th key={h} className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-4 text-sm font-bold text-gold">{order.id}</td>
                          <td className="px-5 py-4 text-sm font-medium text-gray-900">{order.customer}</td>
                          <td className="px-5 py-4 text-sm text-gray-500">{order.phone}</td>
                          <td className="px-5 py-4 text-sm text-gray-500">{order.date}</td>
                          <td className="px-5 py-4 text-sm font-bold text-gray-900">₮{order.total.toLocaleString()}</td>
                          <td className="px-5 py-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                              className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer focus:outline-none ${STATUS_COLORS[order.status]}`}
                            >
                              <option value="Хүлээгдэж буй">Хүлээгдэж буй</option>
                              <option value="Хүргэлтэд">Хүргэлтэд</option>
                              <option value="Хүргэгдсэн">Хүргэгдсэн</option>
                              <option value="Цуцлагдсан">Цуцлагдсан</option>
                            </select>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-700 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-1.5 hover:bg-red-50 rounded text-red-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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
                          {product.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{product.description}</p>}
                        </td>
                        <td className="px-5 py-3 text-sm text-gray-600">{categories.find((c) => c.key === product.category)?.label ?? product.category}</td>
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

        {/* ── АНГИЛАЛ ── */}
        {activeTab === "АНГИЛАЛ" && (
          <div className="max-w-xl space-y-6">
            {/* Add new category */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Шинэ ангилал нэмэх
              </h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Нэр (жш: Ээмэг)"
                  value={newCategory.label}
                  onChange={(e) => setNewCategory({ label: e.target.value, key: e.target.value.toLowerCase().replace(/\s+/g, "_") })}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <button
                  onClick={handleAddCategory}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Нэмэх
                </button>
              </div>
            </div>

            {/* Categories list */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <p className="font-bold text-gray-900">Ангилалууд <span className="text-gray-400 font-normal text-sm">({categories.length})</span></p>
              </div>
              {categories.length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-sm">Ангилал байхгүй байна</div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {categories.map((cat) => (
                    <li key={cat.key} className="flex items-center gap-3 px-6 py-4">
                      {editCategory?.key === cat.key ? (
                        <>
                          <input
                            autoFocus
                            type="text"
                            value={editCategory.label}
                            onChange={(e) => setEditCategory({ ...editCategory, label: e.target.value })}
                            onKeyDown={(e) => e.key === "Enter" && handleSaveCategory()}
                            className="flex-1 border border-black rounded-lg px-3 py-1.5 text-sm focus:outline-none"
                          />
                          <button onClick={handleSaveCategory} className="p-1.5 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => setEditCategory(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <X className="w-4 h-4 text-gray-500" />
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">{cat.label}</p>
                            <p className="text-xs text-gray-400 font-mono">{cat.key}</p>
                          </div>
                          <span className="text-xs text-gray-400 mr-2">
                            {products.filter((p) => p.category === cat.key).length} бараа
                          </span>
                          <button onClick={() => setEditCategory({ ...cat })} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-700">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteCategory(cat.key)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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

      {/* ── Order Detail Modal ── */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Захиалгын дэлгэрэнгүй</h3>
                  <p className="text-gold text-sm font-semibold">{selectedOrder.id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-xl p-4">
                  <div><p className="text-xs text-gray-400">Нэр</p><p className="font-semibold text-gray-900">{selectedOrder.customer}</p></div>
                  <div><p className="text-xs text-gray-400">Утас</p><p className="font-semibold text-gray-900">{selectedOrder.phone}</p></div>
                  <div className="col-span-2"><p className="text-xs text-gray-400">Хаяг</p><p className="font-semibold text-gray-900">{selectedOrder.address}</p></div>
                  {selectedOrder.note && <div className="col-span-2"><p className="text-xs text-gray-400">Тэмдэглэл</p><p className="font-semibold text-gray-900">{selectedOrder.note}</p></div>}
                  <div><p className="text-xs text-gray-400">Огноо</p><p className="font-semibold text-gray-900">{selectedOrder.date}</p></div>
                  <div><p className="text-xs text-gray-400">Төлөв</p><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[selectedOrder.status]}`}>{selectedOrder.status}</span></div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Захиалсан бараа</p>
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400">× {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900">₮{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-base pt-1">
                    <span>Нийт</span>
                    <span className="text-gold">₮{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="w-full mt-5 bg-black text-white py-2.5 rounded-xl text-sm font-bold hover:bg-gray-900 transition-colors">
                Хаах
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
  const cats = loadCategories();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange({ ...product, image: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

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
      {/* Image upload */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Зураг</label>
        <label className="block cursor-pointer group">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          {product.image ? (
            <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200 group-hover:border-black transition-colors">
              <img src={product.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-sm font-medium">
                <ImagePlus className="w-5 h-5" /> Зураг солих
              </div>
            </div>
          ) : (
            <div className="w-full h-40 rounded-xl border-2 border-dashed border-gray-200 group-hover:border-black transition-colors flex flex-col items-center justify-center gap-2 text-gray-400 group-hover:text-black">
              <ImagePlus className="w-8 h-8" />
              <span className="text-sm font-medium">Зураг сонгох</span>
              <span className="text-xs">JPG, PNG, WEBP</span>
            </div>
          )}
        </label>
      </div>

      {field("Нэр", "name")}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Тайлбар</label>
        <textarea
          value={product.description ?? ""}
          onChange={(e) => onChange({ ...product, description: e.target.value })}
          placeholder="Барааны тайлбар оруулна уу..."
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors resize-none"
        />
      </div>
      {field("Үнэ (₮)", "price", "number")}
      {field("Хөнгөлөлтийн үнэ (₮)", "originalPrice", "number")}
      {field("Нөөц", "stock", "number")}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Ангилал</label>
        <select
          value={product.category}
          onChange={(e) => onChange({ ...product, category: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
        >
          {cats.map((c) => (
            <option key={c.key} value={c.key}>{c.label}</option>
          ))}
        </select>
      </div>
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
