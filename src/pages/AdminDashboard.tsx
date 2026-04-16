import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, DollarSign, Users, Package } from "lucide-react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import RecentOrders from "../components/RecentOrders";

const initialStats = [
  { title: "Нийт борлуулалт", value: "₮12,450,000", trend: 12, icon: DollarSign, color: "text-blue-600" },
  { title: "Захиалгууд", value: "148", trend: 8, icon: ShoppingBag, color: "text-purple-600" },
  { title: "Хэрэглэгчид", value: "1,024", trend: 5, icon: Users, color: "text-green-600" },
  { title: "Бараа", value: "36", trend: -2, icon: Package, color: "text-orange-500" },
];

const initialOrders = [
  { id: "#0012", customer: "Б. Мөнхзул", date: "2024-04-15", amount: "₮320,000", status: "Хүргэгдсэн", color: "bg-green-50 text-green-700" },
  { id: "#0011", customer: "Д. Энхтуяа", date: "2024-04-14", amount: "₮195,000", status: "Хүлээгдэж буй", color: "bg-yellow-50 text-yellow-700" },
  { id: "#0010", customer: "Г. Батбаяр", date: "2024-04-13", amount: "₮480,000", status: "Хүргэлтэд", color: "bg-blue-50 text-blue-700" },
  { id: "#0009", customer: "О. Сарнай", date: "2024-04-12", amount: "₮260,000", status: "Хүргэгдсэн", color: "bg-green-50 text-green-700" },
  { id: "#0008", customer: "Н. Төгөлдөр", date: "2024-04-11", amount: "₮145,000", status: "Цуцлагдсан", color: "bg-red-50 text-red-700" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(initialStats);
  const [orders, setOrders] = useState(initialOrders);

  const handleStatEdit = (index: number, newValue: string) => {
    setStats((prev) =>
      prev.map((s, i) => (i === index ? { ...s, value: newValue } : s))
    );
  };

  const handleDeleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar onLogout={handleLogout} />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Хянах самбар</h1>
              <p className="text-sm text-gray-500">Сайн байна уу! Misheel Jewelry</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">2024 оны 4-р сар</span>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold">
                А
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <StatCard
                key={i}
                {...stat}
                onEdit={(val) => handleStatEdit(i, val)}
              />
            ))}
          </div>

          {/* Chart */}
          <SalesChart />

          {/* Recent Orders */}
          <RecentOrders orders={orders} onDelete={handleDeleteOrder} />
        </div>
      </main>
    </div>
  );
}
