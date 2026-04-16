import { Product } from "../components/ProductCard";

export const defaultProducts: Product[] = [
  { id: 1, name: "Цэцэгт Бугуйвч", description: "925 мөнгөн цэцэгт хээтэй нарийн бугуйвч", price: 75000, category: "bracelets", stock: 12, image: "/products/661324026_1279691987561437_1944726703057050970_n.jpg" },
  { id: 2, name: "Birthstone Бөгж", description: "925 мөнгөн, алтан болон розе алтан бүрэхтэй төрсөн өдрийн чулуутай бөгж", price: 89000, category: "rings", stock: 8, image: "/products/661484811_733929583044086_512243370997527100_n.jpg", isNew: true },
  { id: 3, name: "Цэнхэр Чулуутай Зүүлт", description: "925 мөнгөн цэнхэр эрдэнийн чулуутай зүүлт", price: 120000, originalPrice: 150000, category: "sets", stock: 10, image: "/products/661714181_1137867058465544_8865963633877082000_n.jpg", isSale: true },
  { id: 4, name: "Зүрх Хавчаартай Бугуйвч", description: "925 мөнгөн зүрх хэлбэрийн хавчаартай нарийн бугуйвч", price: 65000, category: "bracelets", stock: 15, image: "/products/661765857_914370841412483_7364882697298367285_n.jpg" },
  { id: 5, name: "Ягаан Хурэм Шарм", description: "925 мөнгөн, ягаан эмальтай хурэм шарм бугуйвч", price: 45000, category: "bracelets", stock: 8, image: "/products/662646745_1330125642334332_5511399486193593971_n.jpg" },
  { id: 6, name: "Яс + Хурэм Шарм", description: "925 мөнгөн, ягаан кристалтай шарм бугуйвч", price: 52000, category: "bracelets", stock: 6, image: "/products/663118106_1582815809687493_6571516453834098408_n.jpg", isNew: true },
  { id: 7, name: "Классик Бугуйвч", description: "925 мөнгөн классик загварын бугуйвч", price: 55000, category: "bracelets", stock: 20, image: "/products/663679916_970300998925855_5551614046255919212_n.jpg" },
  { id: 8, name: "Кристал Хурэм Шарм", description: "925 мөнгөн, цагаан кристалтай шарм бугуйвч", price: 48000, category: "bracelets", stock: 9, image: "/products/663705174_26564437846548647_820867141888132728_n.jpg", isNew: true },
  { id: 9, name: "Лотос Зүүлт", description: "925 мөнгөн лотос цэцгийн дизайнтай зүүлт", price: 89000, originalPrice: 110000, category: "sets", stock: 7, image: "/products/663803813_3781726198636716_1114358137382158096_n.jpg", isSale: true },
  { id: 10, name: "Цэцэгт Зүрх Бугуйвч", description: "925 мөнгөн цэцэг, зүрх хосолсон нарийн бугуйвч", price: 72000, category: "bracelets", stock: 5, image: "/products/664064659_1472163314379277_2656775152072297320_n.jpg" },
  { id: 11, name: "Лотос Зүүлт — Нарийн", description: "925 мөнгөн нарийн лотос зүүлт", price: 89000, category: "sets", stock: 7, image: "/products/668292123_3097125797163273_7502015431426512956_n.jpg" },
  { id: 12, name: "Мөнгөн Бөмбөгөр Зүүлт", description: "925 мөнгөн бөмбөгөр дизайнтай зүүлт", price: 95000, category: "sets", stock: 4, image: "/products/668977018_1193976372680199_175288788575609703_n.jpg", isNew: true },
  { id: 13, name: "Тансаг Иж Бүрдэл", description: "925 мөнгөн, цэнхэр эрдэнийн чулуутай иж бүрдэл", price: 250000, originalPrice: 320000, category: "sets", stock: 3, image: "/products/585864253_122105173017118584_3933920693595833110_n.jpg", isSale: true },
  { id: 14, name: "Алмааз Иж Бүрдэл", description: "925 мөнгөн алмааз хээтэй иж бүрдэл", price: 320000, category: "sets", stock: 2, image: "/products/586315925_122105159397118584_3561621246097001864_n.jpg" },
];

export function loadProducts(): Product[] {
  try {
    const saved = localStorage.getItem("admin_products");
    if (saved) {
      // migrate old material field to description
      const parsed = JSON.parse(saved) as Array<Record<string, unknown>>;
      return parsed.map((p) => ({
        ...p,
        description: (p.description as string) ?? (p.material as string) ?? "",
      })) as Product[];
    }
    return defaultProducts;
  } catch {
    return defaultProducts;
  }
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem("admin_products", JSON.stringify(products));
  window.dispatchEvent(new Event("productsUpdated"));
}
