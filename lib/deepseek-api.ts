import { z } from 'zod';

// 定义 API 响应的类型
const DeepSeekResponseSchema = z.object({
  id: z.string(),
  choices: z.array(z.object({
    message: z.object({
      role: z.string(),
      content: z.string(),
      reasoning_content: z.string().optional(),
      tool_calls: z.array(z.object({
        id: z.string(),
        type: z.string(),
        function: z.object({
          name: z.string(),
          arguments: z.string()
        })
      })).optional()
    }),
    finish_reason: z.string()
  })),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number()
  }),
  created: z.number(),
  model: z.string(),
  object: z.string()
});

export type DeepSeekResponse = z.infer<typeof DeepSeekResponseSchema>;

// 定义生成饮品配方的函数
export async function generateBeverageRecipe(
  preferences: string,
  availableIngredients: string[] = []
): Promise<DeepSeekResponse> {
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

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "Qwen/QwQ-32B",
      messages: [{
        role: "user",
        content: prompt
      }],
      stream: false,
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      frequency_penalty: 0.5,
      n: 1,
      response_format: {
        type: "text"
      }
    })
  };

  try {
    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', options);
    const data = await response.json();
    return DeepSeekResponseSchema.parse(data);
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw new Error('Failed to generate beverage recipe');
  }
}

// 定义解析 AI 响应的函数
export function parseRecipeResponse(response: DeepSeekResponse) {
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