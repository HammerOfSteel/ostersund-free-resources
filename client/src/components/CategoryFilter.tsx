import { Category } from "@/data/resources";
import { X } from "lucide-react";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
          selectedCategory === null
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-secondary/10 text-secondary hover:bg-secondary/20"
        }`}
      >
        Alla
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() =>
            onSelectCategory(
              selectedCategory === category.id ? null : category.id
            )
          }
          className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
            selectedCategory === category.id
              ? "shadow-md"
              : "hover:shadow-sm"
          }`}
          style={{
            backgroundColor:
              selectedCategory === category.id
                ? category.color
                : `${category.color}15`,
            color:
              selectedCategory === category.id ? "#FFFFFF" : category.color,
          }}
        >
          {category.name}
          {selectedCategory === category.id && (
            <X size={16} className="ml-1" />
          )}
        </button>
      ))}
    </div>
  );
}
