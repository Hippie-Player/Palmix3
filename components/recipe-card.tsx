"use client"

import { GlassIcon } from "@/components/glass-icon"

export default function RecipeCard({ recipe, color, onClick }) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-center mb-3">
        <GlassIcon color={color} className="h-20 w-20" />
      </div>
      <h3 className="font-medium text-center">{recipe.name}</h3>
      <div className="flex justify-center mt-2">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={color}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-sm">{recipe.rating}</span>
        </div>
      </div>
    </div>
  )
}
