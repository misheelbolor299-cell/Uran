import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <p className="text-xl font-bold tracking-[0.2em] uppercase">URAN</p>
              <p className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium">
                Luxury Jewelry
              </p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Монголын уран дархны гарын авлагаар бүтээсэн тансаг үнэт эдлэлүүд. Чанар, гоо үзэсгэлэн, мөнх байдал.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-widest uppercase text-gray-300">
              Холбоос
            </h4>
            <ul className="space-y-3">
              {["Нүүр", "Дэлгүүр", "Бидний тухай", "Холбоо барих", "Сагс"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-gold transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-widest uppercase text-gray-300">
              Ангилал
            </h4>
            <ul className="space-y-3">
              {["Ээмэг", "Бөгж", "Бугуйвч", "Мөнгөн иж бүрдэл", "Шинэ бараа"].map((cat) => (
                <li key={cat}>
                  <a
                    href="#shop"
                    className="text-sm text-gray-400 hover:text-gold transition-colors duration-200"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-widest uppercase text-gray-300">
              Холбоо барих
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">+976 8976-4650</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">togosxonurnaa@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">Central Mall, 2 давхар</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <div className="text-sm text-gray-400">
                  <p>Мягмар–Бүтэнсайн: 10:00–20:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2025 URAN Luxury Jewelry. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-gold transition-colors">
              Нууцлалын бодлого
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-gold transition-colors">
              Худалдааны нөхцөл
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
