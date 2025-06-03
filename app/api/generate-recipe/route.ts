import { NextResponse } from 'next/server';
import { generateBeverageRecipe, parseRecipeResponse } from '@/lib/deepseek-api';

export async function POST(request: Request) {
  try {
    const { preferences, availableIngredients } = await request.json();

    if (!preferences) {
      return NextResponse.json(
        { error: '请提供饮品偏好' },
        { status: 400 }
      );
    }

    const response = await generateBeverageRecipe(preferences, availableIngredients);
    const recipe = parseRecipeResponse(response);

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error generating recipe:', error);
    return NextResponse.json(
      { error: '生成配方时出错' },
      { status: 500 }
    );
  }
} 