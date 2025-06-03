"use client"

import { useState } from "react"
import { Search, User, Crown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CategoryGrid from "@/components/category-grid"
import RecipeGrid from "@/components/recipe-grid"
import RecipeDetail from "@/components/recipe-detail"
import FusionLab from "@/components/fusion-lab"
import { SharkAnimation } from "@/components/shark-animation"
import { recipeData } from "@/lib/recipe-data"

export interface Ingredient {
  name: string
  amount?: string
  unit?: string
}

export interface Recipe {
  id: string
  name: string
  category: string
  description: string
  ingredients: Ingredient[]
  steps: string[]
  image?: string
  rating?: string
  reviews?: string
  difficulty?: string
  prepTime?: string
  serves?: string
  tips?: string
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [showAnimation, setShowAnimation] = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  // 合并所有饮品
  const allRecipes: Recipe[] = Object.values(recipeData).flat().map((r, idx) => ({
    id: (r.name + '-' + r.category).replace(/\s+/g, '-').toLowerCase(),
    ...r
  }))

  // 全局搜索过滤
  const searchResults = searchTerm.trim()
    ? allRecipes.filter(recipe => {
        const term = searchTerm.toLowerCase()
        return (
          recipe.name.toLowerCase().includes(term) ||
          recipe.description?.toLowerCase().includes(term) ||
          (Array.isArray(recipe.ingredients)
            ? recipe.ingredients.some((ing: any) => {
                if (typeof ing === 'string') return ing.toLowerCase().includes(term)
                if (typeof ing.name === 'string') return ing.name.toLowerCase().includes(term)
                return false
              })
            : false)
        )
      })
    : []

  // 搜索建议点击跳转
  const handleSuggestionClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setShowSuggestions(false)
    setSearchTerm("")
  }

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setShowSteps(false)
  }

  const handleStartMixing = () => {
    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
      setShowSteps(true)
    }, 1000)
  }

  const handleBackClick = () => {
    setSelectedRecipe(null)
    setShowSteps(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center">
              <div className="flex flex-col items-start">
                <span className="text-3xl font-serif font-bold text-white leading-tight tracking-wide" style={{letterSpacing: '1px'}}>Palmix</span>
                <span className="block w-full h-0.5 bg-gray-400 my-1" style={{opacity:0.5}}></span>
                <span className="text-xs font-serif text-gray-300 tracking-widest mt-1" style={{letterSpacing: '2px'}}>FOR DISCERNING MIXOLOGISTS</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <User className="h-4 w-4 mr-2" />
                Log in
              </Button>
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-gray-900">
                <Crown className="h-4 w-4 mr-2" />
                Premium
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="md:hidden text-gray-300 hover:text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-gray-800 py-6 sm:py-8 border-b border-gray-700">
        <div className="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for recipes, ingredients, or techniques..."
              className="pl-12 py-4 sm:py-6 text-base sm:text-lg bg-gray-700 border-gray-600 text-white rounded-xl focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {/* 搜索建议下拉 */}
            {showSuggestions && searchTerm.trim() && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-50 max-h-60 sm:max-h-72 overflow-y-auto w-full text-sm sm:text-base">
                {searchResults.slice(0, 8).map(recipe => (
                  <div
                    key={recipe.id}
                    className="px-3 sm:px-4 py-2 sm:py-3 cursor-pointer hover:bg-gray-700 text-white border-b border-gray-700 last:border-b-0"
                    onMouseDown={() => handleSuggestionClick(recipe)}
                  >
                    <span className="font-semibold">{recipe.name}</span>
                    <span className="ml-2 text-xs text-gray-400">{recipe.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <p
            className="text-center mt-4 text-red-500 font-handwriting text-4xl italic"
            style={{ textShadow: "0 0 8px #ef4444, 0 0 15px rgba(239,68,68,0.6)" }}
          >
            Shake the Palm, Taste the Improvisation
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: "all", label: "All Recipes", color: "border-blue-500" },
              { id: "cocktails", label: "Cocktails", color: "border-red-500" },
              { id: "coffee", label: "Coffee", color: "border-amber-500" },
              { id: "tea", label: "Tea", color: "border-green-500" },
              { id: "mocktails", label: "Mocktails", color: "border-purple-500" },
              { id: "fusion", label: "Fusion Lab", color: "border-pink-500" },
              { id: "photo", label: "Photo Recognition", color: "border-orange-500", link: "/photo-recognition" },
              { id: "profile", label: "My Profile", color: "border-gray-500", link: "/profile" },
            ].map((category) =>
              category.link ? (
                <a
                  key={category.id}
                  href={category.link}
                  className="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
                  style={{ textDecoration: 'none' }}
                >
                  {category.label}
                </a>
              ) : (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? `${category.color} text-white`
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
                    }`}
                  >
                    {category.label}
                  </button>
                )
              )}
            </div>
          </div>
        </nav>
  
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-8">
          {!selectedRecipe ? (
            <>
              {activeCategory === "all" && <CategoryGrid onCategorySelect={setActiveCategory} />}
              {activeCategory === "fusion" && <FusionLab />}
              {activeCategory !== "all" && activeCategory !== "fusion" && (
                <RecipeGrid category={activeCategory} onRecipeClick={handleRecipeClick} searchTerm={searchTerm} />
              )}
            </>
          ) : (
            <div className="max-w-2xl mx-auto">
              <Button variant="ghost" onClick={handleBackClick} className="mb-6 text-gray-400 hover:text-white">
                ← Back to recipes
              </Button>
              <RecipeDetail recipe={selectedRecipe} onStartMixing={handleStartMixing} showSteps={showSteps} />
            </div>
          )}
  
          {showAnimation && <SharkAnimation />}
        </main>
  
        {/* Footer */}
        <footer className="bg-black text-gray-300 mt-12 sm:mt-16">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex flex-col items-start">
                  <span className="text-2xl font-serif font-bold text-white leading-tight tracking-wide" style={{letterSpacing: '1px'}}>Palmix</span>
                  <span className="block w-full h-0.5 bg-gray-400 my-1" style={{opacity:0.5}}></span>
                  <span className="text-xs font-serif text-gray-300 tracking-widest mt-1" style={{letterSpacing: '2px'}}>FOR DISCERNING MIXOLOGISTS</span>
                </div>
                <p className="mt-4 text-gray-400 text-sm">
                  Crafting the perfect drink is an art. We're here to help you master it.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-serif tracking-wide text-white mb-4">Recipes</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      Cocktails
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      Coffee
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      Tea
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      Mocktails
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      Fusion Lab
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-serif tracking-wide text-white mb-4">Community</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      Join & Subscribe
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      Premium
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      Feedback
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      Photo Recognition
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-serif tracking-wide text-white mb-4">Stay Updated</h3>
                <p className="text-gray-400 mb-4 text-sm">Join thousands of fellow mixologists for exclusive recipes and tips</p>
                <div className="flex flex-col space-y-3">
                  <div className="flex">
                    <Input 
                      placeholder="Enter your email" 
                      className="bg-gray-800 border-gray-700 text-white focus:ring-amber-500 focus:border-amber-500" 
                    />
                    <Button className="ml-2 bg-amber-500 hover:bg-amber-600 text-gray-900">
                      Subscribe
                    </Button>
                  </div>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm">© 2025 Palmix. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-gray-500 hover:text-amber-400 text-sm transition-colors">Privacy Policy</a>
                  <a href="#" className="text-gray-500 hover:text-amber-400 text-sm transition-colors">Terms of Service</a>
                  <a href="#" className="text-gray-500 hover:text-amber-400 text-sm transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <div className="w-full bg-black text-center py-2 sm:py-3">
          <span className="text-gray-600 text-xs">Design by Hippie Player Studio </span>
        </div>
      </div>
    )
  }