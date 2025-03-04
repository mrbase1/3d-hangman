import React from "react";
import { Category, CATEGORIES } from "../types/categories";

interface CategorySelectorProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string | null;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <div className="w-full max-w-4xl mb-8" data-oid="rqzh_n7">
      <h2 className="text-xl font-semibold mb-4 text-center" data-oid="3f3swks">
        Choose a Category
      </h2>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        data-oid="1n_sxqa"
      >
        {CATEGORIES.map((category: Category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`
              p-4 rounded-lg transition-all transform hover:scale-105
              flex flex-col items-center justify-center text-center
              ${
                selectedCategory === category.id
                  ? "bg-indigo-600 ring-2 ring-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }
            `}
            data-oid="agp57bl"
          >
            <span className="text-3xl mb-2" data-oid="coq4wi8">
              {category.icon}
            </span>
            <span className="font-bold" data-oid="1jf6v9p">
              {category.name}
            </span>
            <span className="text-xs text-gray-300 mt-1" data-oid="9imb2g9">
              {category.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
