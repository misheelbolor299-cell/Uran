import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Megaphone, 
  BarChart3, 
  Settings, 
  ChevronRight,
  LogOut
} from "lucide-react";
import { motion } from "motion/react";

const menuItems = [
  { icon: LayoutDashboard, label: "Хянах самбар", active: true },
  { icon: ShoppingBag, label: "Захиалга" },
  { icon: Package, label: "Бараа" },
  { icon: Users, label: "Хэрэглэгч" },
  { icon: Megaphone, label: "Маркетинг" },
  { icon: BarChart3, label: "Статистик" },
  { icon: Settings, label: "Тохиргоо" },
];

interface SidebarProps {
  onLogout?: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside id="sidebar" className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">
          MJ
        </div>
        <span className="text-xl font-bold tracking-tight">Misheel</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ x: 4 }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              item.active 
                ? "bg-blue-50 text-blue-600" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
            {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
          </motion.button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Гарах</span>
        </button>
      </div>
    </aside>
  );
}
