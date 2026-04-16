import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-20 px-6" style={{ backgroundColor: "#FFFEF5" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-medium">Холбоо барих</p>
          <h2 className="section-title">Бидэнтэй холбогдох</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Асуулт, санал хүсэлт байвал бидэнтэй холбогдоорой. Ажлын өдрүүдэд 24 цагийн дотор хариулна.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  label: "Утас",
                  value: "+976 8976-4650",
                  sub: "Мягмар–Бүтэнсайн 10:00–20:00",
                },
                {
                  icon: Mail,
                  label: "И-мэйл",
                  value: "togosxonurnaa@gmail.com",
                  sub: "24 цагийн дотор хариулна",
                },
                {
                  icon: MapPin,
                  label: "Хаяг",
                  value: "Central Mall, 2 давхар",
                  sub: "Дэлгүүрт биечлэн ирж болно",
                },
                {
                  icon: Clock,
                  label: "Цагийн хуваарь",
                  value: "Мягмар–Бүтэнсайн: 10:00–20:00",
                  sub: "",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 tracking-widest uppercase mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
                Сошиал медиа
              </p>
              <div className="flex gap-3">
                {["Facebook", "Instagram"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="px-4 py-2 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-black hover:text-black transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                  <Send className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Амжилттай илгээлээ!</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Удахгүй холбогдох болно.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 tracking-wide uppercase mb-2">
                    Нэр
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Таны нэр"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 tracking-wide uppercase mb-2">
                    Утасны дугаар
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+976 XXXX-XXXX"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 tracking-wide uppercase mb-2">
                    Мессеж
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Асуулт, санал хүсэлтээ бичнэ үү..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all resize-none"
                  />
                </div>
                <button type="submit" className="w-full btn-dark py-3.5 flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Илгээх
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
