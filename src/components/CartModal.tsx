import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, ShoppingBag, Copy, CheckCircle, ChevronRight } from "lucide-react";
import { Product } from "./ProductCard";
import { saveOrder, generateOrderId } from "../data/orders";

export interface CartItem extends Product {
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void;
  onClearCart?: () => void;
}

const BANK = {
  name: "Хаан Банк",
  account: "5029123456",
  holder: "Уран Жювелри ХХК",
};

type Step = "cart" | "checkout" | "success";

export default function CartModal({ isOpen, onClose, cart, onRemove, onUpdateQty, onClearCart }: CartModalProps) {
  const [step, setStep] = useState<Step>("cart");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ customer: "", phone: "", address: "", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 150000;
  const remaining = freeShippingThreshold - total;

  const handleCopy = () => {
    navigator.clipboard.writeText(BANK.account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.customer.trim()) e.customer = "Нэр оруулна уу";
    if (!form.phone.trim()) e.phone = "Утасны дугаар оруулна уу";
    if (!form.address.trim()) e.address = "Хаяг оруулна уу";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    const order = {
      id: generateOrderId(),
      customer: form.customer,
      phone: form.phone,
      address: form.address,
      note: form.note,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      total,
      status: "Хүлээгдэж буй" as const,
      date: new Date().toLocaleDateString("mn-MN"),
    };
    saveOrder(order);
    onClearCart?.();
    setStep("success");
  };

  const handleClose = () => {
    setStep("cart");
    setForm({ customer: "", phone: "", address: "", note: "" });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-bold text-gray-900">
                  {step === "cart" && "Миний сагс"}
                  {step === "checkout" && "Захиалга хийх"}
                  {step === "success" && "Захиалга амжилттай!"}
                </h2>
                {step === "cart" && cart.length > 0 && (
                  <span className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cart.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {step === "checkout" && (
                  <button onClick={() => setStep("cart")} className="text-sm text-gray-500 hover:text-black transition-colors">
                    ← Буцах
                  </button>
                )}
                <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* ── CART STEP ── */}
            {step === "cart" && (
              <>
                {remaining > 0 && cart.length > 0 && (
                  <div className="mx-6 mt-4 bg-gold/10 border border-gold/20 rounded-lg px-4 py-2.5 text-xs text-gold font-medium">
                    Үнэгүй хүргэлтэд ₮{remaining.toLocaleString()} дутуу байна
                  </div>
                )}
                {remaining <= 0 && cart.length > 0 && (
                  <div className="mx-6 mt-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-xs text-green-700 font-medium">
                    Үнэгүй хүргэлт авах эрх олдлоо!
                  </div>
                )}

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                      <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-gray-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Сагс хоосон байна</p>
                        <p className="text-sm text-gray-500 mt-1">Бүтээгдэхүүн нэмж эхлээрэй</p>
                      </div>
                      <button onClick={handleClose} className="btn-dark mt-2">Дэлгүүр үзэх</button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-50 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gold tracking-wide">{item.material}</p>
                          <p className="text-sm font-semibold text-gray-900 truncate mt-0.5">{item.name}</p>
                          <p className="text-sm font-bold text-gray-900 mt-1">₮{item.price.toLocaleString()}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => onUpdateQty(item.id, item.quantity - 1)} className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-600 hover:border-black transition-colors text-lg font-light">−</button>
                            <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                            <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-600 hover:border-black transition-colors text-lg font-light">+</button>
                          </div>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="p-1.5 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors self-start">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="px-6 py-6 border-t border-gray-100 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Нийт дүн</span>
                      <span className="text-lg font-bold text-gray-900">₮{total.toLocaleString()}</span>
                    </div>
                    {total >= freeShippingThreshold && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Хүргэлт</span>
                        <span className="text-green-600 font-medium">Үнэгүй</span>
                      </div>
                    )}
                    <button onClick={() => setStep("checkout")} className="w-full btn-dark py-4 text-base flex items-center justify-center gap-2">
                      Захиалга хийх <ChevronRight className="w-4 h-4" />
                    </button>
                    <button onClick={handleClose} className="w-full text-sm text-gray-500 hover:text-gray-900 transition-colors">
                      Дэлгүүр үргэлжлүүлэх
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ── CHECKOUT STEP ── */}
            {step === "checkout" && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                  {/* Order summary */}
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Захиалгын дэлгэрэнгүй</p>
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name} × {item.quantity}</span>
                        <span className="font-semibold">₮{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
                      <span>Нийт</span>
                      <span>₮{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Contact form */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Хүлээн авагчийн мэдээлэл</p>
                    {[
                      { label: "Нэр", key: "customer", placeholder: "Таны нэр" },
                      { label: "Утас", key: "phone", placeholder: "8888-8888" },
                      { label: "Хүргэлтийн хаяг", key: "address", placeholder: "Дүүрэг, хороо, байр, тоот" },
                    ].map(({ label, key, placeholder }) => (
                      <div key={key}>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                        <input
                          type="text"
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => { setForm((f) => ({ ...f, [key]: e.target.value })); setErrors((er) => ({ ...er, [key]: "" })); }}
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${errors[key] ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-black"}`}
                        />
                        {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Тэмдэглэл (заавал биш)</label>
                      <textarea
                        placeholder="Захиалгын тэмдэглэл..."
                        value={form.note}
                        onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                        rows={2}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Bank transfer info */}
                  <div className="border border-gold/30 rounded-xl p-4 bg-gold/5 space-y-3">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Төлбөрийн мэдээлэл</p>
                    <p className="text-xs text-gray-500">Захиалгаа баталгаажуулсны дараа доорх дансанд мөнгө шилжүүлнэ үү.</p>
                    <div className="bg-white rounded-lg border border-gray-100 p-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Банк</span>
                        <span className="font-bold text-gray-900">{BANK.name}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Дансны дугаар</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 tracking-wider">{BANK.account}</span>
                          <button onClick={handleCopy} className="p-1 hover:bg-gray-100 rounded transition-colors">
                            {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Хүлээн авагч</span>
                        <span className="font-bold text-gray-900">{BANK.holder}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Дүн</span>
                        <span className="font-bold text-gold text-base">₮{total.toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">* Гүйлгээний утгад таны нэр эсвэл утасны дугаарыг бичнэ үү.</p>
                  </div>
                </div>

                <div className="px-6 py-5 border-t border-gray-100">
                  <button onClick={handlePlaceOrder} className="w-full btn-dark py-4 text-base">
                    Захиалга баталгаажуулах
                  </button>
                </div>
              </>
            )}

            {/* ── SUCCESS STEP ── */}
            {step === "success" && (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-5">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Захиалга амжилттай!</h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Таны захиалга хүлээн авагдлаа. <br />
                    Дансанд мөнгө шилжүүлсний дараа бид баталгаажуулах болно.
                  </p>
                </div>
                <div className="bg-gold/10 rounded-xl p-4 w-full text-left space-y-1.5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Төлбөрийн данс</p>
                  <p className="text-sm"><span className="text-gray-500">Банк:</span> <strong>{BANK.name}</strong></p>
                  <p className="text-sm"><span className="text-gray-500">Данс:</span> <strong className="tracking-wider">{BANK.account}</strong></p>
                  <p className="text-sm"><span className="text-gray-500">Дүн:</span> <strong className="text-gold">₮{total.toLocaleString()}</strong></p>
                </div>
                <button onClick={handleClose} className="w-full btn-dark py-3">
                  Дэлгүүр рүү буцах
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
