import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { Product } from "./ProductCard";

export interface CartItem extends Product {
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void;
}

export default function CartModal({ isOpen, onClose, cart, onRemove, onUpdateQty }: CartModalProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 150000;
  const remaining = freeShippingThreshold - total;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
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
                <h2 className="text-lg font-bold text-gray-900">Миний сагс</h2>
                {cart.length > 0 && (
                  <span className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cart.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Free shipping banner */}
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

            {/* Cart items */}
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
                  <button onClick={onClose} className="btn-dark mt-2">
                    Дэлгүүр үзэх
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 py-4 border-b border-gray-100 last:border-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg bg-gray-50 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gold tracking-wide">{item.material}</p>
                      <p className="text-sm font-semibold text-gray-900 truncate mt-0.5">
                        {item.name}
                      </p>
                      <p className="text-sm font-bold text-gray-900 mt-1">
                        ₮{item.price.toLocaleString()}
                      </p>

                      {/* Qty controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-600 hover:border-black transition-colors text-lg font-light"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-600 hover:border-black transition-colors text-lg font-light"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-1.5 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors self-start"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer: total & checkout */}
            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Нийт дүн</span>
                  <span className="text-lg font-bold text-gray-900">
                    ₮{total.toLocaleString()}
                  </span>
                </div>
                {total >= freeShippingThreshold && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Хүргэлт</span>
                    <span className="text-green-600 font-medium">Үнэгүй</span>
                  </div>
                )}
                <button className="w-full btn-dark py-4 text-base">
                  Захиалга хийх
                </button>
                <button
                  onClick={onClose}
                  className="w-full text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Дэлгүүр үргэлжлүүлэх
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
