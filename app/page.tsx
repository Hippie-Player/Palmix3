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
import { getUpdatedRecipeData } from "@/lib/cocktail-recipes"

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

  // 使用更新后的配方数据
  const recipeData = getUpdatedRecipeData()

  // 合并所有饮品
  const allRecipes: Recipe[] = Object.values(recipeData).flat().map((r: any, idx) => {
    // 确保每个配方都有正确的category
    let category = r.category;
    if (r.id && r.id.includes('cocktail')) {
      category = 'cocktails';
    }
    
    return {
      id: r.id || (r.name + '-' + category).replace(/\s+/g, '-').toLowerCase(),
      category: category,
      ...r
    };
  });

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
    // 如果当前在查看具体配方，点击返回会回到类别页面
    if (selectedRecipe) {
      setSelectedRecipe(null)
      setShowSteps(false)
    } 
    // 如果当前在查看类别页面，点击返回会回到主页
    else if (activeCategory !== "all") {
      setActiveCategory("all")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a] text-white">
      {/* 顶部深色导航 */}
      <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between h-auto py-4 px-4">
          <div className="flex items-center">
            <a href="/" className="flex flex-col group mr-8">
              <span className="brand-logo">Palmix</span>
              <span className="brand-tagline opacity-70 group-hover:opacity-100 transition-opacity">FOR DISCERNING MIXOLOGISTS</span>
            </a>
            <nav className="hidden md:flex space-x-2 flex-wrap">
              {[
                { id: "cocktails", label: "Cocktails" },
                { id: "coffee", label: "Coffee" },
                { id: "tea", label: "Tea" },
                { id: "mocktails", label: "Mocktails" },
                { id: "fusion", label: "Fusion Lab" },
                { id: "photo", label: "Photo Recognition", link: "/photo-recognition" },
                { id: "profile", label: "My Profile", link: "/profile" },
              ].map((category) =>
                category.link ? (
                  <a
                    key={category.id}
                    href={category.link}
                    className="text-gray-300 hover:text-amber-400 px-3 py-2 rounded transition-colors"
                  >
                    {category.label}
                  </a>
                ) : (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setSelectedRecipe(null) // 清除选中的配方
                    }}
                    className={`px-3 py-2 rounded transition-colors ${activeCategory === category.id ? "bg-amber-500 text-black" : "text-gray-300 hover:text-amber-400"}`}
                  >
                    {category.label}
                  </button>
                )
              )}
            </nav>
          </div>
          <div className="flex items-center space-x-3 mt-0">
            <Button className="text-gray-300 hover:text-amber-400 transition-colors">
              <User className="h-4 w-4 mr-2" />
              Log in
            </Button>
            <Button className="bg-amber-500 text-black font-bold hover:bg-amber-400 rounded-lg px-4 py-2 shadow-lg transition-colors">
              <Crown className="h-4 w-4 mr-2" />
              Premium
            </Button>
            <Button className="md:hidden text-gray-300 hover:text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* 搜索框部分 */}
      <div className="bg-[#1a1a1a] pt-6 pb-4 border-b border-[#2a2a2a] w-full">
        <div className="max-w-2xl mx-auto px-4">
          <div className="relative w-full">
            <Input
              placeholder="Search for recipes, ingredients, or techniques..."
              className="w-full pl-12 pr-4 py-3 bg-[#212121]/90 text-white border border-[#2a2a2a] rounded-full focus:ring-2 focus:ring-amber-500/30 text-base shadow-lg"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            {showSuggestions && searchTerm.trim() && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-[#212121] border border-[#2a2a2a] rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto w-full text-sm">
                {searchResults.slice(0, 8).map(recipe => (
                  <div
                    key={recipe.id}
                    className="px-4 py-2 cursor-pointer hover:bg-[#2a2a2a] text-white border-b border-[#2a2a2a] last:border-b-0"
                    onMouseDown={() => handleSuggestionClick(recipe)}
                  >
                    <span className="font-semibold">{recipe.name}</span>
                    <span className="ml-2 text-xs text-gray-400">{recipe.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 霓虹灯标语区域 */}
      <div className="bg-[#1a1a1a] py-10 border-b border-[#2a2a2a] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center">
          <h2 className="neon-text text-xl md:text-2xl lg:text-3xl text-center tracking-wider px-2">Shake the Palm, Taste the Improvisation</h2>
        </div>
      </div>
      
      {/* 分类卡片区和主内容区 */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full bg-[#1a1a1a]">
        {/* 返回按钮 - 当不在主页时显示 */}
        {(activeCategory !== "all" || selectedRecipe) && (
          <Button onClick={handleBackClick} className="mb-6 text-gray-400 hover:text-white">
            ← {selectedRecipe ? "Back to recipes" : "Back to categories"}
          </Button>
        )}
        
        {/* 根据当前状态显示不同内容 */}
        {activeCategory === "all" && !selectedRecipe && (
          <CategoryGrid onCategorySelect={setActiveCategory} />
        )}
        
        {activeCategory !== "all" && !selectedRecipe && (
          <div className="mt-4">
            <RecipeGrid category={activeCategory} onRecipeClick={handleRecipeClick} />
          </div>
        )}
        
        {selectedRecipe && (
          <div className="max-w-2xl mx-auto">
            <RecipeDetail recipe={selectedRecipe} onStartMixing={handleStartMixing} showSteps={showSteps} />
          </div>
        )}
        
        {showAnimation && <SharkAnimation />}
      </main>
      
      {/* Footer多列深色风格 */}
      <footer className="bg-[#1a1a1a] text-gray-300 mt-12 border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-serif font-bold text-white mb-2 block">Palmix</span>
            <p className="mt-4 text-gray-400 text-sm">Crafting the perfect drink is an art. We're here to help you master it.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="footer-social"><i className="fab fa-instagram"></i></a>
              <a href="#" className="footer-social"><i className="fab fa-twitter"></i></a>
              <a href="#" className="footer-social"><i className="fab fa-tiktok"></i></a>
              <a href="#" className="footer-social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="footer-social"><i className="fab fa-youtube"></i></a>
              <a href="#" className="footer-social"><i className="fab fa-github"></i></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Home</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Log in</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Join & Subscribe</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Manage cookies</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Palmix Shop</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">About Palmix</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-amber-400 transition-colors">FAQs & How Do I</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Advertising</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Company Info</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact us</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Feedback</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Terms & Conditions</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Cookie Policy</a></li>
            </ul>
            <div className="mt-6 bg-[#212121] rounded-lg p-4 text-center">
              <div className="mb-2"><svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#252525"/><text x="50%" y="54%" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold" dy=".3em">@</text></svg></div>
              <p className="text-gray-200 text-sm mb-2">Join thousands of fellow Discerning Drinkers and receive weekly newsletters.</p>
              <a href="#" className="text-amber-500 hover:text-amber-300 underline transition-colors">Join our community</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-[#2a2a2a] pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <span>© 2025 Palmix. All rights reserved.</span>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-amber-400 transition-colors">GLOBAL</a>
            <a href="#" className="hover:text-amber-400 transition-colors">AUSTRALIA</a>
            <a href="#" className="hover:text-amber-400 transition-colors">BRAZIL</a>
            <a href="#" className="hover:text-amber-400 transition-colors">GREECE</a>
          </div>
        </div>
        <div className="text-center pt-4 pb-6 text-gray-500 text-xs">
          <p>Design by Hippie Player Studio</p>
        </div>
      </footer>
    </div>
  )
}