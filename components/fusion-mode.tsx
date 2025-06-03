"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassIcon } from "@/components/glass-icon"
import { Plus, X } from "lucide-react"

export default function FusionMode() {
  const [ingredients, setIngredients] = useState([
    { name: "", percentage: 50 },
    { name: "", percentage: 50 },
  ])
  const [generated, setGenerated] = useState(false)

  const addIngredient = () => {
    if (ingredients.length < 4) {
      const newPercentage = Math.floor(100 / (ingredients.length + 1))
      const updatedIngredients = ingredients.map((ing) => ({
        ...ing,
        percentage: newPercentage,
      }))
      updatedIngredients.push({ name: "", percentage: newPercentage })
      setIngredients(updatedIngredients)
    }
  }

  const removeIngredient = (index) => {
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

  const handleNameChange = (index, value) => {
    const newIngredients = [...ingredients]
    newIngredients[index].name = value
    setIngredients(newIngredients)
  }

  const handlePercentageChange = (index, value) => {
    const newValue = Number.parseInt(value) || 0
    if (newValue >= 0 && newValue <= 100) {
      const newIngredients = [...ingredients]
      newIngredients[index].percentage = newValue
      setIngredients(newIngredients)
    }
  }

  const totalPercentage = ingredients.reduce((sum, ing) => sum + ing.percentage, 0)

  const handleGenerate = () => {
    setGenerated(true)
  }

  const handleReset = () => {
    setGenerated(false)
    setIngredients([
      { name: "", percentage: 50 },
      { name: "", percentage: 50 },
    ])
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-center mb-6">创建你的专属饮品</h2>

      {!generated ? (
        <>
          <div className="flex justify-center mb-6">
            <GlassIcon color="#888888" className="h-24 w-24" />
          </div>

          <div className="space-y-4 mb-6">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder="原料名称"
                  value={ingredient.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="flex-grow"
                />
                <div className="flex items-center w-24">
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={ingredient.percentage}
                    onChange={(e) => handlePercentageChange(index, e.target.value)}
                    className="w-16"
                  />
                  <span className="ml-1">%</span>
                </div>
                {ingredients.length > 2 && (
                  <Button variant="ghost" size="icon" onClick={() => removeIngredient(index)} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={addIngredient}
              disabled={ingredients.length >= 4}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" /> 添加原料
            </Button>
            <div className={`text-sm ${totalPercentage === 100 ? "text-green-500" : "text-red-500"}`}>
              总计: {totalPercentage}%
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={totalPercentage !== 100 || ingredients.some((ing) => !ing.name)}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
          >
            生成饮品
          </Button>
        </>
      ) : (
        <>
          <div className="flex justify-center mb-6">
            <GlassIcon color="#888888" className="h-24 w-24" />
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">材料：</h3>
            <ul className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between">
                  <span>{ingredient.name}</span>
                  <span>{ingredient.percentage}%</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">步骤：</h3>
            <p className="text-gray-700">摇匀后即可享用</p>
          </div>

          <Button onClick={handleReset} variant="outline" className="w-full">
            重新调配
          </Button>
        </>
      )}
    </div>
  )
}
