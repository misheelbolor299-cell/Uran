export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: "Хүлээгдэж буй" | "Хүргэлтэд" | "Хүргэгдсэн" | "Цуцлагдсан";
  date: string;
  note?: string;
}

export function loadOrders(): Order[] {
  try {
    const saved = localStorage.getItem("admin_orders");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  const orders = loadOrders();
  orders.unshift(order);
  localStorage.setItem("admin_orders", JSON.stringify(orders));
  window.dispatchEvent(new Event("ordersUpdated"));
}

export function updateOrderStatus(id: string, status: Order["status"]): void {
  const orders = loadOrders();
  const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
  localStorage.setItem("admin_orders", JSON.stringify(updated));
  window.dispatchEvent(new Event("ordersUpdated"));
}

export function deleteOrder(id: string): void {
  const orders = loadOrders();
  localStorage.setItem("admin_orders", JSON.stringify(orders.filter((o) => o.id !== id)));
  window.dispatchEvent(new Event("ordersUpdated"));
}

export function generateOrderId(): string {
  const orders = loadOrders();
  const next = (orders.length > 0 ? parseInt(orders[0].id.replace("#", "")) + 1 : 1001);
  return `#${String(next).padStart(4, "0")}`;
}
