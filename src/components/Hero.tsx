import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-cream min-h-[90vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#FFFEF5" }}
    >
      {/* Background decorative circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/5 -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/5 translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">
              Тансаг Үнэт Эдлэл
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          >
            Гоо үзэсгэлэн,
            <br />
            <span className="text-gold">мөнх чанар</span>
          </motion.h1>

<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#shop" className="btn-dark flex items-center gap-2">
              Цуглуулга харах
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="btn-outline">
              Холбоо барих
            </a>
          </motion.div>

        </div>

        {/* Right: Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-80 h-80 lg:w-[420px] lg:h-[420px]">
            {/* Main circular image */}
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl">
              <img
                src="/products/585864253_122105173017118584_3933920693595833110_n.jpg"
                alt="Uran Luxury Jewelry"
                className="w-full h-full object-cover object-top"
              />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
