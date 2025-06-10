import type { Recipe } from "@/app/page";
import { cocktailRecipes } from "./cocktail-data";
import { cocktailRecipes2 } from "./cocktail-data-2";
import { cocktailRecipes3 } from "./cocktail-data-3";
import { cocktailRecipes4 } from "./cocktail-data-4";
import { cocktailRecipes5 } from "./cocktail-data-5";
import { recipeData } from "./recipe-data";

// 定义与recipeData兼容的类型
type RecipeDataType = typeof recipeData.cocktails[0];

// 合并所有鸡尾酒配方
export const allCocktailRecipes: RecipeDataType[] = [
  ...cocktailRecipes,
  ...cocktailRecipes2,
  ...cocktailRecipes3,
  ...cocktailRecipes4,
  ...cocktailRecipes5,
] as RecipeDataType[];

// 更新recipe-data中的鸡尾酒数据
export function getUpdatedRecipeData() {
  const updatedData = { ...recipeData };
  // 只更新cocktails类别，将所有配方集中到此类别
  updatedData.cocktails = allCocktailRecipes;
  return updatedData;
} 