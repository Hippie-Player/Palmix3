import type { Recipe } from "@/app/page";

export const cocktailRecipes: Recipe[] = [
  {
    id: "classic-mojito",
    name: "Classic Mojito",
    category: "cocktails",
    description: "A refreshing Cuban cocktail with mint and lime",
    rating: "4.8",
    reviews: "2.1k",
    difficulty: "Easy",
    prepTime: "5 mins",
    serves: "1 serving",
    ingredients: [
      { name: "White Rum", amount: "2", unit: "oz" },
      { name: "Fresh Lime Juice", amount: "1", unit: "oz" },
      { name: "Simple Syrup", amount: "0.75", unit: "oz" },
      { name: "Soda Water", amount: "2", unit: "oz" },
      { name: "Fresh Mint Leaves", amount: "8-10", unit: "leaves" },
    ],
    steps: [
      "Gently muddle mint leaves in the bottom of a glass",
      "Add rum, lime juice, and simple syrup",
      "Fill glass with ice cubes",
      "Top with soda water and stir gently",
      "Garnish with fresh mint sprig",
    ],
    tips: "Don't over-muddle the mint - you want to release oils, not destroy the leaves.",
  },
  {
    id: "margarita",
    name: "Margarita",
    category: "cocktails",
    description: "The perfect balance of tequila, lime, and orange liqueur",
    rating: "4.7",
    reviews: "1.8k",
    difficulty: "Easy",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Tequila", amount: "2", unit: "oz" },
      { name: "Fresh Lime Juice", amount: "1", unit: "oz" },
      { name: "Cointreau", amount: "1", unit: "oz" },
      { name: "Salt", amount: "1", unit: "pinch" },
    ],
    steps: [
      "Rim glass with salt",
      "Add all ingredients to shaker with ice",
      "Shake vigorously for 15 seconds",
      "Strain into prepared glass over ice",
      "Garnish with lime wheel",
    ],
    tips: "Use 100% agave tequila for the best flavor. Cointreau or Grand Marnier work best for orange liqueur.",
  },
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    category: "cocktails",
    description: "A timeless whiskey cocktail with bitters and sugar",
    rating: "4.6",
    reviews: "1.5k",
    difficulty: "Medium",
    prepTime: "4 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Bourbon Whiskey", amount: "2", unit: "oz" },
      { name: "Simple Syrup", amount: "0.25", unit: "oz" },
      { name: "Angostura Bitters", amount: "2-3", unit: "dashes" },
      { name: "Orange Peel", amount: "1", unit: "piece" },
    ],
    steps: [
      "Add simple syrup and bitters to glass",
      "Add whiskey and stir with ice",
      "Strain over large ice cube in rocks glass",
      "Express orange peel oils over drink",
      "Garnish with orange peel",
    ],
    tips: "Use a large ice cube to minimize dilution. Express the orange peel by twisting it over the drink.",
  },
  {
    id: "negroni",
    name: "Negroni",
    category: "cocktails",
    description: "A classic Italian aperitif with gin, Campari, and sweet vermouth",
    rating: "4.7",
    reviews: "1.3k",
    difficulty: "Medium",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Gin", amount: "1", unit: "oz" },
      { name: "Campari", amount: "1", unit: "oz" },
      { name: "Sweet Vermouth", amount: "1", unit: "oz" },
      { name: "Orange Peel", amount: "1", unit: "piece" },
    ],
    steps: [
      "Add gin, Campari, and vermouth to mixing glass with ice",
      "Stir until well chilled",
      "Strain into rocks glass over large ice cube",
      "Garnish with orange peel",
    ],
    tips: "Use equal parts for perfect balance. Stir, don't shake.",
  },
  {
    id: "manhattan",
    name: "Manhattan",
    category: "cocktails",
    description: "A sophisticated blend of whiskey, sweet vermouth, and bitters",
    rating: "4.8",
    reviews: "1.6k",
    difficulty: "Medium",
    prepTime: "4 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Rye Whiskey", amount: "2", unit: "oz" },
      { name: "Sweet Vermouth", amount: "1", unit: "oz" },
      { name: "Angostura Bitters", amount: "2", unit: "dashes" },
      { name: "Maraschino Cherry", amount: "1", unit: "piece" },
    ],
    steps: [
      "Add whiskey, vermouth, and bitters to mixing glass with ice",
      "Stir until well chilled",
      "Strain into chilled coupe glass",
      "Garnish with cherry",
    ],
    tips: "Use rye for a spicier profile, bourbon for a sweeter one.",
  },
  {
    id: "daiquiri",
    name: "Daiquiri",
    category: "cocktails",
    description: "A refreshing Cuban classic with rum, lime, and sugar",
    rating: "4.6",
    reviews: "1.1k",
    difficulty: "Easy",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "White Rum", amount: "2", unit: "oz" },
      { name: "Fresh Lime Juice", amount: "1", unit: "oz" },
      { name: "Simple Syrup", amount: "0.75", unit: "oz" },
    ],
    steps: [
      "Add all ingredients to shaker with ice",
      "Shake vigorously",
      "Strain into chilled coupe glass",
      "Garnish with lime wheel",
    ],
    tips: "Use fresh lime juice for best results.",
  },
  {
    id: "whiskey-sour",
    name: "Whiskey Sour",
    category: "cocktails",
    description: "A tart and smooth blend of whiskey, lemon, and sugar",
    rating: "4.7",
    reviews: "1.4k",
    difficulty: "Easy",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Bourbon Whiskey", amount: "2", unit: "oz" },
      { name: "Fresh Lemon Juice", amount: "1", unit: "oz" },
      { name: "Simple Syrup", amount: "0.75", unit: "oz" },
      { name: "Egg White (optional)", amount: "0.5", unit: "oz" },
    ],
    steps: [
      "Add all ingredients to shaker without ice and shake (dry shake)",
      "Add ice and shake again",
      "Strain into rocks glass over ice",
      "Garnish with cherry and orange slice",
    ],
    tips: "Egg white adds a silky texture but can be omitted.",
  },
  {
    id: "cosmopolitan",
    name: "Cosmopolitan",
    category: "cocktails",
    description: "A stylish pink cocktail with vodka, cranberry, and lime",
    rating: "4.5",
    reviews: "1.0k",
    difficulty: "Easy",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Vodka", amount: "1.5", unit: "oz" },
      { name: "Cointreau", amount: "1", unit: "oz" },
      { name: "Cranberry Juice", amount: "1", unit: "oz" },
      { name: "Fresh Lime Juice", amount: "0.5", unit: "oz" },
    ],
    steps: [
      "Add all ingredients to shaker with ice",
      "Shake well",
      "Strain into chilled martini glass",
      "Garnish with lime wheel",
    ],
    tips: "Use unsweetened cranberry juice for a balanced flavor.",
  },
  {
    id: "mai-tai",
    name: "Mai Tai",
    category: "cocktails",
    description: "A tropical favorite with rum, lime, and orange liqueur",
    rating: "4.6",
    reviews: "1.2k",
    difficulty: "Medium",
    prepTime: "4 mins",
    serves: "1 serving",
    ingredients: [
      { name: "White Rum", amount: "1.5", unit: "oz" },
      { name: "Dark Rum", amount: "0.5", unit: "oz" },
      { name: "Orange Curaçao", amount: "0.5", unit: "oz" },
      { name: "Fresh Lime Juice", amount: "1", unit: "oz" },
      { name: "Orgeat Syrup", amount: "0.5", unit: "oz" },
    ],
    steps: [
      "Add all ingredients except dark rum to shaker with ice",
      "Shake and strain into glass over crushed ice",
      "Float dark rum on top",
      "Garnish with mint and lime",
    ],
    tips: "Orgeat syrup is key for the signature almond flavor.",
  },
]; 