import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "А.Номин",
    text: "Маш сайн чанартай үнэт эдлэл. Найздаа бэлэглэсэн, тун их баярлалаа гэсэн. Дараагийн удаад ч энд авна!",
    date: "2025 оны 3-р сар",
  },
  {
    name: "Б.Оюун",
    text: "Хурдан хүргэсэн, сав баглаа нь мөн л тансаг байлаа. Бэлэг болгоход маш тохиромжтой.",
    date: "2025 оны 2-р сар",
  },
  {
    name: "Г.Цэцэг",
    text: "925 мөнгөн ээмэг авсан. Арьс мэдрэмжгүй, өнгө нь хувираагүй. Хамгийн найдвартай дэлгүүр!",
    date: "2025 оны 1-р сар",
  },
  {
    name: "Д.Сарнай",
    text: "Үнэ чанар тохирч байна. Ажилдаа зах зүйлийн дараа орсон ч хурдан хүргэлтэй. Дахин авна.",
    date: "2024 оны 12-р сар",
  },
  {
    name: "Е.Мөнхзул",
    text: "Загвар нь маш гоё, хийц нь нарийн. Найзуудаа энд дагуулж ирнэ гэж амласан.",
    date: "2024 оны 11-р сар",
  },
];

export default function Reviews() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-medium">Сэтгэгдэл</p>
          <h2 className="section-title">Хэрэглэгчдийн үнэлгээ</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-gold/30 absolute top-5 right-5" />

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More reviews row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto">
          {reviews.slice(3).map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-gold/30 absolute top-5 right-5" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
