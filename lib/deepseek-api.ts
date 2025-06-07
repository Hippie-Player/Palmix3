import { OpenAI } from 'openai';
import { z } from 'zod';

// 定义 API 响应的类型
const OpenRouterResponseSchema = z.object({
  id: z.string(),
  choices: z.array(z.object({
    message: z.object({
      role: z.string(),
      content: z.string()
    }),
    finish_reason: z.string()
  })),
  created: z.number(),
  model: z.string()
});

export type OpenRouterResponse = z.infer<typeof OpenRouterResponseSchema>;

// 初始化 OpenAI 客户端
const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
    'X-Title': process.env.SITE_NAME || 'Palmix',
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
  }
});

// 定义生成饮品配方的函数
export async function generateBeverageRecipe(
  preferences: string,
  availableIngredients: string[] = []
): Promise<OpenRouterResponse> {
  const prompt = `作为一个专业的调酒师，请根据以下信息生成一个饮品配方：
偏好：${preferences}
可用原料：${availableIngredients.join(', ')}

请提供：
1. 饮品名称
2. 所需原料及用量
3. 制作步骤
4. 口感描述
5. 难度等级（简单/中等/困难）
6. 制作时间（分钟）`;

  try {
    console.log('Sending request to OpenRouter API with headers:', {
      'HTTP-Referer': process.env.SITE_URL,
      'X-Title': process.env.SITE_NAME,
      'Authorization': 'Bearer ' + process.env.OPENROUTER_API_KEY?.slice(0, 10) + '...'
    });

    const completion = await client.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324",
      messages: [{
        role: "user",
        content: prompt
      }]
    });

    return OpenRouterResponseSchema.parse(completion);
  } catch (error: any) {
    console.error('Error calling OpenRouter API:', {
      message: error.message,
      status: error.status,
      headers: error.headers,
      code: error.code
    });
    throw new Error(`Failed to generate beverage recipe: ${error.message}`);
  }
}

// 定义解析 AI 响应的函数
export function parseRecipeResponse(response: OpenRouterResponse) {
  const content = response.choices[0].message.content;
  
  // 使用正则表达式解析内容
  const nameMatch = content.match(/饮品名称[：:]\s*(.+)/);
  const ingredientsMatch = content.match(/所需原料[：:]\s*([\s\S]+?)(?=制作步骤|$)/);
  const stepsMatch = content.match(/制作步骤[：:]\s*([\s\S]+?)(?=口感描述|$)/);
  const tasteMatch = content.match(/口感描述[：:]\s*([\s\S]+?)(?=难度等级|$)/);
  const difficultyMatch = content.match(/难度等级[：:]\s*(.+)/);
  const timeMatch = content.match(/制作时间[：:]\s*(\d+)/);

  return {
    name: nameMatch?.[1]?.trim() || '未知饮品',
    ingredients: ingredientsMatch?.[1]?.trim().split('\n').filter(Boolean) || [],
    steps: stepsMatch?.[1]?.trim().split('\n').filter(Boolean) || [],
    taste: tasteMatch?.[1]?.trim() || '未提供',
    difficulty: difficultyMatch?.[1]?.trim() || '中等',
    time: parseInt(timeMatch?.[1] || '5', 10)
  };
} 