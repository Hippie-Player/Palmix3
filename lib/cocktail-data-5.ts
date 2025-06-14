import type { Recipe } from "@/app/page";

export const cocktailRecipes5: Recipe[] = [
  {
    id: "mudslide",
    name: "Mudslide",
    category: "cocktails",
    description: "A decadent, dessert-like cocktail with coffee and chocolate notes",
    rating: "4.7",
    reviews: "950",
    difficulty: "Easy",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Vodka", amount: "1", unit: "oz" },
      { name: "Coffee Liqueur", amount: "1", unit: "oz" },
      { name: "Irish Cream", amount: "1", unit: "oz" },
      { name: "Heavy Cream", amount: "1", unit: "oz" },
      { name: "Chocolate Syrup", amount: "0.5", unit: "oz" },
    ],
    steps: [
      "Drizzle chocolate syrup inside glass",
      "Add all liquid ingredients to shaker with ice",
      "Shake until well chilled",
      "Strain into prepared glass over fresh ice",
      "Garnish with chocolate shavings",
    ],
    tips: "For a frozen version, blend all ingredients with ice.",
  },
  {
    id: "clover-club",
    name: "Clover Club",
    category: "cocktails",
    description: "A pre-prohibition classic with gin, raspberry, and a frothy texture",
    rating: "4.6",
    reviews: "760",
    difficulty: "Medium",
    prepTime: "4 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Gin", amount: "2", unit: "oz" },
      { name: "Fresh Lemon Juice", amount: "0.75", unit: "oz" },
      { name: "Raspberry Syrup", amount: "0.75", unit: "oz" },
      { name: "Egg White", amount: "0.5", unit: "oz" },
      { name: "Fresh Raspberries", amount: "3", unit: "pieces" },
    ],
    steps: [
      "Add all ingredients to shaker without ice",
      "Dry shake vigorously for 15 seconds",
      "Add ice and shake again until well chilled",
      "Double strain into chilled coupe glass",
      "Garnish with fresh raspberries",
    ],
    tips: "You can substitute raspberry syrup with raspberry jam in a pinch.",
  },
  {
    id: "whiskey-smash",
    name: "Whiskey Smash",
    category: "cocktails",
    description: "A refreshing whiskey cocktail with muddled lemon and mint",
    rating: "4.6",
    reviews: "830",
    difficulty: "Easy",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Bourbon Whiskey", amount: "2", unit: "oz" },
      { name: "Fresh Lemon Wedges", amount: "4", unit: "pieces" },
      { name: "Fresh Mint Leaves", amount: "6-8", unit: "leaves" },
      { name: "Simple Syrup", amount: "0.75", unit: "oz" },
      { name: "Mint Sprig", amount: "1", unit: "piece" },
    ],
    steps: [
      "Muddle lemon wedges, mint leaves, and simple syrup in a shaker",
      "Add bourbon and ice, shake vigorously",
      "Double strain into rocks glass over fresh ice",
      "Garnish with mint sprig",
    ],
    tips: "Gently muddle the mint to release oils without making it bitter.",
  },
  {
    id: "paper-plane",
    name: "Paper Plane",
    category: "cocktails",
    description: "A modern classic with bourbon, Aperol, and amaro",
    rating: "4.8",
    reviews: "790",
    difficulty: "Medium",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Bourbon Whiskey", amount: "0.75", unit: "oz" },
      { name: "Aperol", amount: "0.75", unit: "oz" },
      { name: "Amaro Nonino", amount: "0.75", unit: "oz" },
      { name: "Fresh Lemon Juice", amount: "0.75", unit: "oz" },
    ],
    steps: [
      "Add all ingredients to shaker with ice",
      "Shake until well chilled",
      "Strain into chilled coupe glass",
      "Garnish with small paper plane (optional)",
    ],
    tips: "Equal parts make this easy to remember. The Amaro Nonino is essential, but you can substitute Amaro Montenegro in a pinch.",
  },
  {
    id: "penicillin",
    name: "Penicillin",
    category: "cocktails",
    description: "A modern scotch cocktail with honey, ginger, and a smoky finish",
    rating: "4.9",
    reviews: "850",
    difficulty: "Medium",
    prepTime: "5 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Blended Scotch Whisky", amount: "2", unit: "oz" },
      { name: "Fresh Lemon Juice", amount: "0.75", unit: "oz" },
      { name: "Honey-Ginger Syrup", amount: "0.75", unit: "oz" },
      { name: "Islay Single Malt Scotch", amount: "0.25", unit: "oz" },
      { name: "Candied Ginger", amount: "1", unit: "piece" },
    ],
    steps: [
      "Add blended scotch, lemon juice, and honey-ginger syrup to shaker with ice",
      "Shake until well chilled",
      "Strain into rocks glass over fresh ice",
      "Float Islay scotch on top",
      "Garnish with candied ginger",
    ],
    tips: "For honey-ginger syrup, simmer equal parts honey and water with fresh ginger for 10 minutes.",
  },
  {
    id: "cuba-libre",
    name: "Cuba Libre",
    category: "cocktails",
    description: "A classic rum and cola cocktail with lime",
    rating: "4.5",
    reviews: "980",
    difficulty: "Easy",
    prepTime: "2 mins",
    serves: "1 serving",
    ingredients: [
      { name: "White or Gold Rum", amount: "2", unit: "oz" },
      { name: "Cola", amount: "4", unit: "oz" },
      { name: "Fresh Lime Juice", amount: "0.5", unit: "oz" },
      { name: "Lime Wedge", amount: "1", unit: "piece" },
    ],
    steps: [
      "Fill highball glass with ice",
      "Add rum and lime juice",
      "Top with cola and stir gently",
      "Garnish with lime wedge",
    ],
    tips: "Use Mexican Coca-Cola with real sugar for the best flavor.",
  },
  {
    id: "bee-knees",
    name: "Bee's Knees",
    category: "cocktails",
    description: "A prohibition-era gin cocktail sweetened with honey",
    rating: "4.7",
    reviews: "760",
    difficulty: "Easy",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Gin", amount: "2", unit: "oz" },
      { name: "Fresh Lemon Juice", amount: "0.75", unit: "oz" },
      { name: "Honey Syrup", amount: "0.75", unit: "oz" },
      { name: "Lemon Twist", amount: "1", unit: "piece" },
    ],
    steps: [
      "Add all ingredients to shaker with ice",
      "Shake until well chilled",
      "Strain into chilled coupe glass",
      "Garnish with lemon twist",
    ],
    tips: "For honey syrup, mix equal parts honey and warm water until dissolved.",
  },
  {
    id: "tequila-sunrise",
    name: "Tequila Sunrise",
    category: "cocktails",
    description: "A vibrant, layered cocktail with tequila, orange juice, and grenadine",
    rating: "4.6",
    reviews: "1.1k",
    difficulty: "Easy",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Tequila", amount: "2", unit: "oz" },
      { name: "Orange Juice", amount: "4", unit: "oz" },
      { name: "Grenadine", amount: "0.25", unit: "oz" },
      { name: "Orange Slice", amount: "1", unit: "piece" },
      { name: "Cherry", amount: "1", unit: "piece" },
    ],
    steps: [
      "Fill highball glass with ice",
      "Add tequila and orange juice, stir",
      "Slowly pour grenadine down the inside of the glass to create a layered effect",
      "Garnish with orange slice and cherry",
    ],
    tips: "Don't stir after adding the grenadine to maintain the sunrise effect.",
  },
  {
    id: "planters-punch",
    name: "Planter's Punch",
    category: "cocktails",
    description: "A tropical rum punch with a mix of fruit juices",
    rating: "4.6",
    reviews: "870",
    difficulty: "Medium",
    prepTime: "4 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Dark Rum", amount: "2", unit: "oz" },
      { name: "Orange Juice", amount: "1", unit: "oz" },
      { name: "Pineapple Juice", amount: "1", unit: "oz" },
      { name: "Fresh Lime Juice", amount: "0.5", unit: "oz" },
      { name: "Grenadine", amount: "0.5", unit: "oz" },
      { name: "Angostura Bitters", amount: "2", unit: "dashes" },
      { name: "Pineapple Slice and Cherry", amount: "1", unit: "each" },
    ],
    steps: [
      "Add all ingredients except garnishes to shaker with ice",
      "Shake until well chilled",
      "Strain into highball glass filled with crushed ice",
      "Garnish with pineapple slice and cherry",
    ],
    tips: "There are many variations of this classic punch. Adjust the sweet-sour balance to your preference.",
  },
  {
    id: "hemingway-daiquiri",
    name: "Hemingway Daiquiri",
    category: "cocktails",
    description: "A less sweet daiquiri variation favored by Ernest Hemingway",
    rating: "4.7",
    reviews: "820",
    difficulty: "Medium",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "White Rum", amount: "2", unit: "oz" },
      { name: "Fresh Lime Juice", amount: "0.75", unit: "oz" },
      { name: "Grapefruit Juice", amount: "0.5", unit: "oz" },
      { name: "Maraschino Liqueur", amount: "0.5", unit: "oz" },
      { name: "Lime Wheel", amount: "1", unit: "piece" },
    ],
    steps: [
      "Add all ingredients to shaker with ice",
      "Shake until well chilled",
      "Strain into chilled coupe glass",
      "Garnish with lime wheel",
    ],
    tips: "Also known as the 'Papa Doble,' this daiquiri variation is tart and refreshing.",
  },
]; 