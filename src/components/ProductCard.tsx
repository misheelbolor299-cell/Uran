import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  material: string;
  price: number;
  originalPrice?: number;
  category: "earrings" | "rings" | "bracelets" | "sets";
  stock: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="bg-white border border-gray-100 rounded-lg overflow-hidden group flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isSale && discount > 0 && (
          <span className="absolute top-3 left-3 bg-black text-white text-[11px] font-bold px-2.5 py-1 rounded">
            -{discount}%
          </span>
        )}
        {product.isNew && !product.isSale && (
          <span className="absolute top-3 left-3 bg-gold text-white text-[11px] font-bold px-2.5 py-1 rounded">
            Шинэ
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-1.5">
        <p className="text-[11px] font-semibold text-gold tracking-widest uppercase">
          {product.material}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">{product.name}</h3>

        {/* Price row */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900">
              {product.price.toLocaleString()}₮
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.originalPrice.toLocaleString()}₮
              </span>
            )}
          </div>
          <span className="text-[11px] text-gray-400">{product.stock} үлдсэн</span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => onAddToCart(product)}
          className="mt-3 w-full py-2.5 bg-black text-white text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gold transition-colors duration-200"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Сагсанд нэмэх
        </button>
      </div>
    </motion.div>
  );
}
