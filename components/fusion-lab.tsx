"use client"

import { useState } from "react"
import { Plus, X, Beaker, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassIcon } from "@/components/glass-icon"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { FusionBeaker } from "@/components/cup-icons"

interface Recipe {
  name: string;
  ingredients: string[];
  steps: string[];
  taste: string;
  difficulty: string;
  time: number;
}

interface Ingredient {
  name: string;
  percentage: number;
}

export default function FusionLab() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", percentage: 50 },
    { name: "", percentage: 50 },
  ])
  const [preferences, setPreferences] = useState("")
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  const fusionExamples = [
    {
      name: "Tropical Sunrise",
      description: "A refreshing blend of mango, coconut milk, and lemon. Perfect for summer mornings.",
      ingredients: [
        { name: "Mango Juice", percent: 40 },
        { name: "Coconut Milk", percent: 40 },
        { name: "Lemon Juice", percent: 20 },
      ],
    },
    {
      name: "Berry Sparkling Tea",
      description: "Strawberry, blueberry, and black tea with sparkling water for extra layers.",
      ingredients: [
        { name: "Strawberry", percent: 25 },
        { name: "Blueberry", percent: 15 },
        { name: "Black Tea", percent: 30 },
        { name: "Sparkling Water", percent: 30 },
      ],
    },
    {
      name: "Oriental Garden",
      description: "Jasmine tea, honey, and green apple for an elegant combination.",
      ingredients: [
        { name: "Jasmine Tea", percent: 50 },
        { name: "Honey", percent: 10 },
        { name: "Green Apple", percent: 40 },
      ],
    },
  ]

  const addIngredient = () => {
    if (ingredients.length < 6) {
      const newPercentage = Math.floor(100 / (ingredients.length + 1))
      const updatedIngredients = ingredients.map((ing) => ({
        ...ing,
        percentage: newPercentage,
      }))
      updatedIngredients.push({ name: "", percentage: newPercentage })
      setIngredients(updatedIngredients)
    }
  }

  const removeIngredient = (index: number) => {
    if (ingredients.length > 2) {
      const newIngredients = ingredients.filter((_, i) => i !== index)
      const newPercentage = Math.floor(100 / newIngredients.length)
      const updatedIngredients = newIngredients.map((ing) => ({
        ...ing,
        percentage: newPercentage,
      }))
      setIngredients(updatedIngredients)
    }
  }

  const handleNameChange = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index].name = value
    setIngredients(newIngredients)
  }

  const handlePercentageChange = (index: number, value: string) => {
    const newValue = Number.parseInt(value) || 0
    if (newValue >= 0 && newValue <= 100) {
      const newIngredients = [...ingredients]
      newIngredients[index].percentage = newValue
      setIngredients(newIngredients)
    }
  }

  const totalPercentage = ingredients.reduce((sum, ing) => sum + ing.percentage, 0)

  const handleGenerate = async () => {
    try {
      setLoading(true)
      const availableIngredients = ingredients
        .filter(ing => ing.name.trim())
        .map(ing => `${ing.name} (${ing.percentage}%)`)

      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences,
          availableIngredients,
        }),
      })

      if (!response.ok) {
        throw new Error('生成配方失败')
      }

      const data = await response.json()
      setRecipe(data)
      setGenerated(true)
      toast.success('配方生成成功！')
    } catch (error) {
      console.error('Error generating recipe:', error)
      toast.error('生成配方时出错，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setGenerated(false)
    setRecipe(null)
    setPreferences("")
    setIngredients([
      { name: "", percentage: 50 },
      { name: "", percentage: 50 },
    ])
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-full">
            <Beaker className="h-14 w-14 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-serif tracking-wide text-white mb-4">Fusion Lab</h2>
        <p className="text-lg text-gray-300">
          Use AI to create unique drink recipes. Enter your preferences and available ingredients, and let AI generate the perfect recipe for you.
        </p>
      </div>
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-10 min-h-[540px] flex flex-col justify-start">
        {!generated ? (
          <>
            <div className="flex justify-center mb-8">
              <GlassIcon color="#FFA500" className="h-12 w-12" />
            </div>
            <div className="mb-6">
              <Textarea
                placeholder="Describe your drink preferences (e.g. refreshing, sweet, fruity, etc.)"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="min-h-[100px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-4 mb-6">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
                  <div className="flex-grow">
                    <Input
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      className="border-0 bg-transparent text-lg font-medium text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={ingredient.percentage}
                      onChange={(e) => handlePercentageChange(index, e.target.value)}
                      className="w-20 text-center bg-gray-800 border-gray-600 text-white"
                    />
                    <span className="text-gray-300 font-medium">%</span>
                  </div>
                  {ingredients.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="outline"
                onClick={addIngredient}
                disabled={ingredients.length >= 6}
                className="flex items-center space-x-2 border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
              >
                <Plus className="h-4 w-4" />
                <span>Add Ingredient</span>
              </Button>
              <div className={`text-lg font-semibold ${totalPercentage === 100 ? "text-green-400" : "text-red-400"}`}>
                Total: {totalPercentage}%
              </div>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={loading || !preferences.trim() || totalPercentage !== 100 || ingredients.some((ing) => !ing.name.trim())}
              className="w-full bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white py-3 text-lg font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Recipe"
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-8">
              <GlassIcon color="#FFA500" className="h-12 w-12" />
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-serif tracking-wide text-white mb-2">{recipe?.name}</h3>
              <p className="text-gray-300">Your unique recipe generated by AI</p>
            </div>
            <div className="mb-8">
              <h4 className="font-semibold text-white mb-4">Ingredients:</h4>
              <div className="space-y-3">
                {recipe?.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-200">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold text-white mb-4">Steps:</h4>
              <div className="space-y-3">
                {recipe?.steps.map((step, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-700 rounded-lg">
                    <span className="text-amber-400 font-medium mr-2">{index + 1}.</span>
                    <span className="text-gray-200">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="font-medium text-amber-400 mb-2">Taste</h4>
                <p className="text-gray-300 text-sm">{recipe?.taste}</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="font-medium text-amber-400 mb-2">Info</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-300">Difficulty: {recipe?.difficulty}</p>
                  <p className="text-gray-300">Time: {recipe?.time} min</p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:text-white"
            >
              Create New Recipe
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
