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

    // 添加调试日志
    console.log('API Key:', process.env.OPENROUTER_API_KEY ? '已设置' : '未设置');
    console.log('Site URL:', process.env.SITE_URL);
    console.log('Site Name:', process.env.SITE_NAME);

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API 密钥未配置' },
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