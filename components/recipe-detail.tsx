"use client"

import { Clock, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CocktailGlass,
  CoffeeCup,
  TeaCup,
  MocktailGlass,
  FusionBeaker,
  SeasonalGlass,
} from "@/components/cup-icons"

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

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    cocktails: "#EF4444",
    coffee: "#F59E0B",
    tea: "#10B981",
    mocktails: "#8B5CF6",
    fusion: "#EC4899",
    seasonal: "#06B6D4",
  }
  return colors[category] || "#6B7280"
}

export default function RecipeDetail({ recipe, onStartMixing, showSteps }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-center">
        {getCategoryIcon(recipe.category, getCategoryColor(recipe.category), "h-20 w-20 mx-auto mb-4")}
        <h1 className="text-3xl font-serif tracking-wide text-white mb-2">{recipe.name}</h1>
        <p className="text-gray-300 mb-4">{recipe.description}</p>

        <div className="flex items-center justify-center space-x-6 text-sm text-gray-300">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {recipe.prepTime}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {recipe.serves}
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
            {recipe.rating}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Ingredients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-200">{ingredient.name}</span>
                <span className="font-medium text-white">
                  {ingredient.amount} {ingredient.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button or Steps */}
        {!showSteps ? (
          <Button
            onClick={onStartMixing}
            className="w-full bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white py-3 text-lg font-medium"
          >
            Start Mixing
          </Button>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Instructions</h2>
            <div className="space-y-4">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-gray-900 rounded-full flex items-center justify-center text-sm font-medium mr-4">
                    {index + 1}
                  </div>
                  <p className="text-gray-300 pt-1">{step}</p>
                </div>
              ))}
            </div>

            {recipe.tips && (
              <div className="mt-6 p-4 bg-gray-700 border border-amber-500/30 rounded-lg">
                <h3 className="font-medium text-amber-400 mb-2">Pro Tips</h3>
                <p className="text-gray-300 text-sm">{recipe.tips}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
