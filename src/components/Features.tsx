import { motion } from "motion/react";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Үнэгүй хүргэлт",
    desc: "150,000₮-аас дээш захиалгад Улаанбаатар хотоор үнэгүй хүргэнэ",
  },
  {
    icon: ShieldCheck,
    title: "Чанарын баталгаа",
    desc: "Бүх бүтээгдэхүүн 925 мөнгөн, алтан бүрэхийн стандартыг хангасан",
  },
  {
    icon: RotateCcw,
    title: "30 хоногийн буцаалт",
    desc: "Хүлээн авснаас хойш 30 хоногийн дотор буцаах боломжтой",
  },
  {
    icon: Headphones,
    title: "Хэрэглэгчийн дэмжлэг",
    desc: "Утас, мессеж, цахим шуудангаар хүссэн үедээ холбогдоорой",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-4 p-6"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                <f.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
