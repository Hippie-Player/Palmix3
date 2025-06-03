"use client"

import {
  CocktailGlass,
  CoffeeCup,
  TeaCup,
  MocktailGlass,
  FusionBeaker,
  SeasonalGlass,
  BeerMugIcon,
} from "@/components/cup-icons"

const categories = [
  {
    id: "cocktails",
    title: "Classic Cocktails",
    subtitle: "Timeless recipes",
    color: "#EF4444",
    bgColor: "bg-gray-800",
    borderColor: "border-red-500",
    textColor: "text-red-400",
    count: "120+ recipes",
  },
  {
    id: "coffee",
    title: "Coffee Creations",
    subtitle: "Artisan brews",
    color: "#F59E0B",
    bgColor: "bg-gray-800",
    borderColor: "border-amber-500",
    textColor: "text-amber-400",
    count: "85+ recipes",
  },
  {
    id: "tea",
    title: "Tea Blends",
    subtitle: "Refined infusions",
    color: "#10B981",
    bgColor: "bg-gray-800",
    borderColor: "border-emerald-500",
    textColor: "text-emerald-400",
    count: "60+ recipes",
  },
  {
    id: "mocktails",
    title: "Mocktails",
    subtitle: "Alcohol-free delights",
    color: "#8B5CF6",
    bgColor: "bg-gray-800",
    borderColor: "border-purple-500",
    textColor: "text-purple-400",
    count: "45+ recipes",
  },
  {
    id: "fusion",
    title: "Fusion Lab",
    subtitle: "Create your own",
    color: "#EC4899",
    bgColor: "bg-gray-800",
    borderColor: "border-pink-500",
    textColor: "text-pink-400",
    count: "Unlimited",
  },
  {
    id: "craftbeer",
    title: "Craft Beer",
    subtitle: "Artisan brews & hops",
    color: "#FBBF24",
    bgColor: "bg-gray-800",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-400",
    count: "30+ beers",
  },
]

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
    case "craftbeer":
      return <BeerMugIcon color={color} className={className} />
    default:
      return null
  }
}

export default function CategoryGrid({ onCategorySelect }) {
  return (
    <div className="space-y-8 relative min-h-[520px]">
      {/* 左侧热带棕榈树/椰子树剪影 */}
      <div className="hidden lg:flex absolute left-0 top-0 bottom-0 z-0 opacity-25 pointer-events-none select-none h-full items-center">
        <svg width="140" height="420" viewBox="0 0 140 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-96">
          {/* 棕榈树主干 */}
          <rect x="60" y="120" width="16" height="180" rx="7" fill="#6B7280" fillOpacity="0.18" />
          {/* 棕榈叶 */}
          <path d="M68 120 Q48 80 10 100" stroke="#6B7280" strokeWidth="4" fill="none" />
          <path d="M68 120 Q88 80 130 100" stroke="#6B7280" strokeWidth="4" fill="none" />
          <path d="M68 120 Q48 110 0 130" stroke="#6B7280" strokeWidth="3" fill="none" />
          <path d="M68 120 Q88 110 140 130" stroke="#6B7280" strokeWidth="3" fill="none" />
          <path d="M68 120 Q68 60 68 40" stroke="#6B7280" strokeWidth="4" fill="none" />
          {/* 椰子 */}
          <circle cx="68" cy="120" r="7" fill="#6B7280" fillOpacity="0.22" />
          {/* 侧面小椰树 */}
          <rect x="20" y="200" width="7" height="60" rx="3" fill="#6B7280" fillOpacity="0.13" />
          <path d="M24 200 Q10 180 2 200" stroke="#6B7280" strokeWidth="2" fill="none" />
          <path d="M24 200 Q38 180 50 200" stroke="#6B7280" strokeWidth="2" fill="none" />
          <circle cx="24" cy="200" r="3" fill="#6B7280" fillOpacity="0.18" />
        </svg>
      </div>
      {/* 右侧热带沙滩+酒杯+贝壳等剪影 */}
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 z-0 opacity-25 pointer-events-none select-none h-full items-center">
        <svg width="150" height="420" viewBox="0 0 150 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-80">
          {/* 沙滩曲线 */}
          <path d="M0 350 Q50 390 150 370 Q100 410 0 400 Z" fill="#FBBF24" fillOpacity="0.10" />
          {/* 酒杯 */}
          <rect x="100" y="220" width="14" height="50" rx="5" fill="#FBBF24" fillOpacity="0.18" />
          <ellipse cx="107" cy="220" rx="15" ry="7" fill="#FBBF24" fillOpacity="0.18" />
          {/* 贝壳 */}
          <path d="M30 380 Q38 360 46 380 Q38 390 30 380" stroke="#FBBF24" strokeWidth="2" fill="#FBBF24" fillOpacity="0.13" />
          {/* 海星 */}
          <polygon points="70,390 73,398 81,398 75,403 77,411 70,407 63,411 65,403 59,398 67,398" fill="#FBBF24" fillOpacity="0.15" />
        </svg>
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-serif tracking-wide text-white mb-4">Discover Perfect Recipes</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          From classic cocktails to innovative fusion creations, explore our curated collection of premium beverage
          recipes crafted by expert mixologists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`${category.bgColor} rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border ${category.borderColor}`}
          >
            <div className="flex items-center justify-between mb-4">
              {getCategoryIcon(category.id, category.color, "h-12 w-12")}
              <span className={`text-sm font-medium ${category.textColor}`}>{category.count}</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
            <p className="text-gray-300">{category.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
