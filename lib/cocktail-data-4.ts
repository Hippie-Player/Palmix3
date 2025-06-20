import type { Recipe } from "@/app/page";

export const cocktailRecipes4: Recipe[] = [
  {
    id: "irish-coffee",
    name: "Irish Coffee",
    category: "cocktails",
    description: "A warming blend of whiskey, coffee, and cream",
    rating: "4.6",
    reviews: "950",
    difficulty: "Easy",
    prepTime: "5 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Irish Whiskey", amount: "1.5", unit: "oz" },
      { name: "Hot Coffee", amount: "4", unit: "oz" },
      { name: "Demerara Sugar", amount: "2", unit: "tsp" },
      { name: "Heavy Cream", amount: "1", unit: "oz" },
    ],
    steps: [
      "Pre-warm glass with hot water, then empty",
      "Add whiskey and sugar to glass",
      "Pour in hot coffee and stir until sugar dissolves",
      "Gently float cream on top by pouring over back of a spoon",
    ],
    tips: "Lightly whip the cream so it floats better, but don't make it stiff.",
  },
  {
    id: "godfather",
    name: "Godfather",
    category: "cocktails",
    description: "A simple, strong cocktail with scotch and amaretto",
    rating: "4.5",
    reviews: "780",
    difficulty: "Easy",
    prepTime: "2 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Scotch Whisky", amount: "2", unit: "oz" },
      { name: "Amaretto", amount: "0.5", unit: "oz" },
    ],
    steps: [
      "Add both ingredients to a rocks glass with ice",
      "Stir gently to combine",
    ],
    tips: "Adjust the ratio to your taste preference. More amaretto makes it sweeter.",
  },
  {
    id: "champagne-cocktail",
    name: "Champagne Cocktail",
    category: "cocktails",
    description: "An elegant, simple cocktail with champagne, bitters, and sugar",
    rating: "4.7",
    reviews: "820",
    difficulty: "Easy",
    prepTime: "2 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Champagne", amount: "4", unit: "oz" },
      { name: "Sugar Cube", amount: "1", unit: "piece" },
      { name: "Angostura Bitters", amount: "2", unit: "dashes" },
      { name: "Lemon Twist", amount: "1", unit: "piece" },
    ],
    steps: [
      "Place sugar cube in champagne flute",
      "Dash bitters onto sugar cube",
      "Slowly fill glass with champagne",
      "Garnish with lemon twist",
    ],
    tips: "The sugar cube creates a steady stream of bubbles as it dissolves.",
  },
  {
    id: "gin-fizz",
    name: "Gin Fizz",
    category: "cocktails",
    description: "A refreshing, frothy gin cocktail with lemon and soda",
    rating: "4.6",
    reviews: "890",
    difficulty: "Medium",
    prepTime: "4 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Gin", amount: "2", unit: "oz" },
      { name: "Fresh Lemon Juice", amount: "0.75", unit: "oz" },
      { name: "Simple Syrup", amount: "0.75", unit: "oz" },
      { name: "Egg White", amount: "0.5", unit: "oz" },
      { name: "Soda Water", amount: "1", unit: "oz" },
    ],
    steps: [
      "Add gin, lemon juice, simple syrup, and egg white to shaker without ice",
      "Dry shake vigorously for 15 seconds",
      "Add ice and shake again until well chilled",
      "Strain into highball glass without ice",
      "Top with soda water",
    ],
    tips: "The key to a great Gin Fizz is a strong, long shake to create the right texture.",
  },
  {
    id: "singapore-sling",
    name: "Singapore Sling",
    category: "cocktails",
    description: "A complex, fruity cocktail created at the Raffles Hotel in Singapore",
    rating: "4.6",
    reviews: "820",
    difficulty: "Hard",
    prepTime: "5 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Gin", amount: "1.5", unit: "oz" },
      { name: "Cherry Liqueur", amount: "0.5", unit: "oz" },
      { name: "Cointreau", amount: "0.25", unit: "oz" },
      { name: "DOM Bénédictine", amount: "0.25", unit: "oz" },
      { name: "Grenadine", amount: "0.25", unit: "oz" },
      { name: "Pineapple Juice", amount: "3", unit: "oz" },
      { name: "Fresh Lime Juice", amount: "0.5", unit: "oz" },
      { name: "Angostura Bitters", amount: "1", unit: "dash" },
      { name: "Pineapple Slice and Cherry", amount: "1", unit: "each" },
    ],
    steps: [
      "Add all ingredients except garnishes to shaker with ice",
      "Shake until well chilled",
      "Strain into highball glass filled with ice",
      "Garnish with pineapple slice and cherry",
    ],
    tips: "There are many variations of the Singapore Sling. This is close to the original recipe.",
  },
  {
    id: "pisco-sour",
    name: "Pisco Sour",
    category: "cocktails",
    description: "A South American classic with pisco, lime, and a silky texture",
    rating: "4.7",
    reviews: "840",
    difficulty: "Medium",
    prepTime: "4 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Pisco", amount: "2", unit: "oz" },
      { name: "Fresh Lime Juice", amount: "1", unit: "oz" },
      { name: "Simple Syrup", amount: "0.75", unit: "oz" },
      { name: "Egg White", amount: "0.5", unit: "oz" },
      { name: "Angostura Bitters", amount: "3", unit: "drops" },
    ],
    steps: [
      "Add pisco, lime juice, simple syrup, and egg white to shaker without ice",
      "Dry shake vigorously for 15 seconds",
      "Add ice and shake again until well chilled",
      "Strain into chilled rocks glass",
      "Add a few drops of bitters on top of foam",
    ],
    tips: "Peruvian and Chilean piscos have different characteristics, but both work well.",
  },
  {
    id: "gibson",
    name: "Gibson",
    category: "cocktails",
    description: "A classic martini variation garnished with a cocktail onion",
    rating: "4.6",
    reviews: "720",
    difficulty: "Medium",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Gin", amount: "2.5", unit: "oz" },
      { name: "Dry Vermouth", amount: "0.5", unit: "oz" },
      { name: "Cocktail Onion", amount: "1", unit: "piece" },
    ],
    steps: [
      "Add gin and vermouth to mixing glass with ice",
      "Stir until very cold",
      "Strain into chilled martini glass",
      "Garnish with cocktail onion",
    ],
    tips: "The cocktail onion garnish is what distinguishes a Gibson from a Martini.",
  },
  {
    id: "vesper",
    name: "Vesper",
    category: "cocktails",
    description: "A strong, elegant martini variation made famous by James Bond",
    rating: "4.8",
    reviews: "940",
    difficulty: "Medium",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Gin", amount: "3", unit: "oz" },
      { name: "Vodka", amount: "1", unit: "oz" },
      { name: "Lillet Blanc", amount: "0.5", unit: "oz" },
      { name: "Lemon Peel", amount: "1", unit: "piece" },
    ],
    steps: [
      "Add all ingredients to mixing glass with ice",
      "Stir until very cold",
      "Strain into chilled martini glass",
      "Garnish with lemon peel",
    ],
    tips: "James Bond famously ordered this 'shaken, not stirred', but stirring actually makes a better cocktail.",
  },
  {
    id: "ramos-gin-fizz",
    name: "Ramos Gin Fizz",
    category: "cocktails",
    description: "A legendary, creamy New Orleans cocktail that takes dedication to make",
    rating: "4.9",
    reviews: "760",
    difficulty: "Hard",
    prepTime: "10 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Gin", amount: "2", unit: "oz" },
      { name: "Fresh Lemon Juice", amount: "0.5", unit: "oz" },
      { name: "Fresh Lime Juice", amount: "0.5", unit: "oz" },
      { name: "Simple Syrup", amount: "0.75", unit: "oz" },
      { name: "Heavy Cream", amount: "1", unit: "oz" },
      { name: "Egg White", amount: "0.5", unit: "oz" },
      { name: "Orange Flower Water", amount: "3", unit: "drops" },
      { name: "Vanilla Extract", amount: "1", unit: "drop" },
      { name: "Soda Water", amount: "1", unit: "oz" },
    ],
    steps: [
      "Add all ingredients except soda water to shaker without ice",
      "Dry shake vigorously for 2 minutes (traditionally even longer)",
      "Add ice and shake again until well chilled",
      "Strain into highball glass without ice",
      "Let rest for 1 minute, then slowly top with soda water",
    ],
    tips: "The key is the long shake - traditionally bartenders would pass the shaker around to share the effort.",
  },
  {
    id: "last-word",
    name: "Last Word",
    category: "cocktails",
    description: "A perfectly balanced prohibition-era cocktail with gin, chartreuse, and maraschino",
    rating: "4.8",
    reviews: "780",
    difficulty: "Medium",
    prepTime: "3 mins",
    serves: "1 serving",
    ingredients: [
      { name: "Gin", amount: "0.75", unit: "oz" },
      { name: "Green Chartreuse", amount: "0.75", unit: "oz" },
      { name: "Maraschino Liqueur", amount: "0.75", unit: "oz" },
      { name: "Fresh Lime Juice", amount: "0.75", unit: "oz" },
      { name: "Cherry", amount: "1", unit: "piece" },
    ],
    steps: [
      "Add all ingredients to shaker with ice",
      "Shake until well chilled",
      "Strain into chilled coupe glass",
      "Garnish with cherry",
    ],
    tips: "Equal parts make this easy to remember. The complex flavors of Green Chartreuse are essential.",
  },
]; 