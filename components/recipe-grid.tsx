"use client"

import { Star } from "lucide-react"
import {
  CocktailGlass,
  CoffeeCup,
  TeaCup,
  MocktailGlass,
  FusionBeaker,
  SeasonalGlass,
} from "@/components/cup-icons"
import { getUpdatedRecipeData } from "@/lib/cocktail-recipes"
import type { Recipe, Ingredient } from "@/app/page"

interface RecipeGridProps {
  category: string
  onRecipeClick: (recipe: Recipe) => void
  searchTerm?: string
}

function getCategoryIcon(id: string, color: string, className: string) {
  switch (id) {
    case "cocktails":
      return <CocktailGlass color={color} className={className} />
    case "coffee":
      return <CoffeeCup color={color} className={className} />
    case "tea":
      return <TeaCup color={color} className={className} />
    case "mocktails":
      return <MocktailGlass color={color} className={className} />
    case "fusion":
      return <FusionBeaker color={color} className={className} />
    case "seasonal":
      return <SeasonalGlass color={color} className={className} />
    default:
      return null
  }
}

export default function RecipeGrid({ category, onRecipeClick, searchTerm = "" }: RecipeGridProps) {
  // 使用更新后的配方数据
  const recipeData = getUpdatedRecipeData()
  
  // 为每个recipe自动补id和确保category正确
  const recipes: Recipe[] = ((recipeData as Record<string, any[]>)[category] || []).map((r: any, idx) => ({
    id: r.id || (r.name + '-' + r.category).replace(/\s+/g, '-').toLowerCase(),
    category: category, // 确保category正确设置为当前显示的类别
    ...r
  }))

  // 搜索过滤逻辑
  const filteredRecipes = searchTerm.trim()
    ? recipes.filter((recipe: Recipe) => {
        const term = searchTerm.toLowerCase()
        return (
          recipe.name.toLowerCase().includes(term) ||
          recipe.description?.toLowerCase().includes(term) ||
          (Array.isArray(recipe.ingredients)
            ? recipe.ingredients.some((ing: Ingredient | string) => {
                if (typeof ing === 'string') return ing.toLowerCase().includes(term)
                if (typeof ing.name === 'string') return ing.name.toLowerCase().includes(term)
                return false
              })
            : false)
        )
      })
    : recipes

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      cocktails: "#EF4444",
      coffee: "#F59E0B",
      tea: "#10B981",
      mocktails: "#8B5CF6",
      fusion: "#EC4899",
      seasonal: "#06B6D4",
    }
    return colors[cat] || "#6B7280"
  }

  console.log(`Rendering ${category} recipes:`, filteredRecipes.length)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif tracking-wide text-white capitalize">{category} Collection</h2>
        <span className="text-gray-400">{filteredRecipes.length} recipes</span>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredRecipes.map((recipe: Recipe, index: number) => (
          <div
            key={recipe.id || index}
            onClick={() => onRecipeClick(recipe)}
            className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex justify-center mb-4">
              {getCategoryIcon(category, getCategoryColor(category), "h-16 w-16")}
            </div>

            <h3 className="font-semibold text-white text-center mb-2">{recipe.name}</h3>

            <p className="text-sm text-gray-300 text-center mb-3 line-clamp-2">{recipe.description}</p>

            <div className="flex items-center justify-center space-x-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-gray-200">{recipe.rating}</span>
              <span className="text-xs text-gray-400">({recipe.reviews})</span>
            </div>

            <div className="mt-3 text-center">
              <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                {recipe.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
