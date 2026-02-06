"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { categories } from "@/lib/species-data"
import { Leaf, TreeDeciduous, Flower2, Pill, Shrub } from "lucide-react"

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const categoryIcons: Record<string, React.ReactNode> = {
  all: <Leaf className="h-4 w-4" />,
  leaves: <Leaf className="h-4 w-4" />,
  flowers: <Flower2 className="h-4 w-4" />,
  herbs: <Leaf className="h-4 w-4" />,
  trees: <TreeDeciduous className="h-4 w-4" />,
  shrubs: <Shrub className="h-4 w-4" />,
  climbers: <Leaf className="h-4 w-4" />,
  medicinal: <Pill className="h-4 w-4" />,
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide pb-2">
      <div className="flex gap-2 min-w-max px-4 sm:px-0 sm:justify-center sm:flex-wrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary/60 text-secondary-foreground hover:bg-secondary"
            )}
          >
            {categoryIcons[category.id]}
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
