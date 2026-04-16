import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  icon: LucideIcon;
  color: string;
  key?: number;
  onEdit?: (newValue: string) => void;
}

export default function StatCard({ title, value, trend, icon: Icon, color, onEdit }: StatCardProps) {
  const isPositive = trend >= 0;
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onEdit?.(tempValue);
    setIsEditing(false);
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="card p-6 flex flex-col gap-4 group relative"
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      </div>

      <div className="relative">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {isEditing ? (
          <div className="mt-1 flex items-center gap-2">
            <input 
              autoFocus
              type="text" 
              value={tempValue} 
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className="text-2xl font-bold text-gray-900 bg-gray-50 border border-blue-500 rounded px-2 py-0.5 w-full focus:outline-none"
            />
          </div>
        ) : (
          <div 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded -ml-1 pl-1 transition-colors"
          >
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}

import { useState } from "react";
