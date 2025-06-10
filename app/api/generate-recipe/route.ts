import { NextResponse } from 'next/server';
import { generateBeverageRecipe } from '@/lib/deepseek-api';

export async function POST(request: Request) {
  try {
    const { preferences, availableIngredients } = await request.json();

    if (!preferences) {
      return NextResponse.json(
        { error: '请提供饮品偏好' },
        { status: 400 }
      );
    }

    // 检查是否有任何API密钥可用
    const hasApiKey = process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY || process.env.OPENROUTER_API_KEY;
    
    if (!hasApiKey) {
      console.error('没有配置API密钥 - 需要OPENAI_API_KEY, DEEPSEEK_API_KEY或OPENROUTER_API_KEY之一');
      return NextResponse.json(
        { error: 'API密钥未配置，无法生成配方' },
        { status: 500 }
      );
    }

    const response = await generateBeverageRecipe(preferences, availableIngredients);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error generating recipe:', error);
    return NextResponse.json(
      { 
        error: '生成配方时出错',
        details: error.message || '未知错误'
      },
      { status: 500 }
    );
  }
} 