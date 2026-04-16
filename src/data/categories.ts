export interface Category {
  key: string;
  label: string;
}

export const defaultCategories: Category[] = [
  { key: "bracelets", label: "Бугуйвч" },
  { key: "rings", label: "Бөгж" },
  { key: "earrings", label: "Ээмэг" },
  { key: "sets", label: "Мөнгө Хослол" },
];

export function loadCategories(): Category[] {
  try {
    const saved = localStorage.getItem("admin_categories");
    return saved ? JSON.parse(saved) : defaultCategories;
  } catch {
    return defaultCategories;
  }
}

export function saveCategories(categories: Category[]): void {
  localStorage.setItem("admin_categories", JSON.stringify(categories));
  window.dispatchEvent(new Event("categoriesUpdated"));
}
