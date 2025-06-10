import { OpenAI } from 'openai';
import { z } from 'zod';

// Define API response types
interface RecipeResponse {
  name: string;
  ingredients: string[];
  steps: string[];
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time: number;
}

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY,
});

// Define function to generate beverage recipe
export async function generateRecipe(
  preferences: string,
  availableIngredients: string[]
): Promise<RecipeResponse> {
  const prompt = `As a professional bartender, please generate a beverage recipe based on the following information:
  Preferences: ${preferences}
  Available ingredients: ${availableIngredients.join(', ')}
  
  Please provide:
  1. Beverage name
  2. Required ingredients and quantities
  3. Preparation steps
  4. Taste description
  5. Difficulty level (Easy/Medium/Hard)
  6. Preparation time (in minutes)`;

  try {
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a professional bartender with extensive experience in creating unique and delicious beverages."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    // Parse AI response
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the response into structured data
    const lines = content.split('\n');
    const recipe: RecipeResponse = {
      name: lines[0].replace(/^1\.\s*/, ''),
      ingredients: lines[1].split(',').map(i => i.trim()),
      steps: lines[2].split('.').map(s => s.trim()).filter(Boolean),
      description: lines[3],
      difficulty: lines[4].includes('Easy') ? 'Easy' : lines[4].includes('Hard') ? 'Hard' : 'Medium',
      time: parseInt(lines[5]) || 5
    };

    return recipe;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error;
  }
}

// 导出generateBeverageRecipe函数，在route.ts中使用
export async function generateBeverageRecipe(
  preferences: string,
  availableIngredients: string[] = []
): Promise<any> {
  try {
    // 使用默认的gpt-3.5-turbo模型
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是一位专业调酒师，擅长创造独特美味的饮品。"
        },
        {
          role: "user",
          content: `请根据以下信息生成一个饮品配方:
          偏好: ${preferences}
          可用原料: ${availableIngredients.join(', ') || '任意常见原料'}
          
          请提供以下信息:
          1. 饮品名称
          2. 所需原料和份量
          3. 制作步骤
          4. 口感描述
          5. 难度级别 (简单/中等/困难)
          6. 制作时间 (分钟)`
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("AI未返回响应");
    }

    // 将文本响应解析为结构化数据
    const recipeData = parseRecipeText(content);
    return recipeData;
  } catch (error) {
    console.error('生成配方时出错:', error);
    throw error;
  }
}

// 解析AI返回的文本为结构化数据
function parseRecipeText(text: string): any {
  const lines = text.split('\n').filter(line => line.trim());
  
  // 尝试提取饮品名称（通常是第一行）
  const name = lines[0]?.replace(/^[0-9]\.\s*|饮品名称[：:]\s*/i, '').trim() || '创意饮品';
  
  // 提取原料（通常在"原料"或"所需原料"之后）
  let ingredients: string[] = [];
  let steps: string[] = [];
  let description = '';
  let difficulty = '中等';
  let prepTime = 5;
  
  // 查找关键部分
  let currentSection = '';
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (/原料|配料|所需原料|ingredients/i.test(trimmedLine)) {
      currentSection = 'ingredients';
      continue;
    } else if (/步骤|制作步骤|做法|preparation|steps/i.test(trimmedLine)) {
      currentSection = 'steps';
      continue;
    } else if (/口感|描述|taste|description/i.test(trimmedLine)) {
      currentSection = 'description';
      continue;
    } else if (/难度|difficulty/i.test(trimmedLine)) {
      const difficultyMatch = trimmedLine.match(/(简单|容易|easy|中等|medium|困难|hard)/i);
      if (difficultyMatch) {
        const difficultyText = difficultyMatch[1].toLowerCase();
        if (/简单|容易|easy/.test(difficultyText)) difficulty = '简单';
        else if (/困难|hard/.test(difficultyText)) difficulty = '困难';
        else difficulty = '中等';
      }
      currentSection = '';
      continue;
    } else if (/时间|time/i.test(trimmedLine)) {
      const timeMatch = trimmedLine.match(/(\d+)/);
      if (timeMatch) {
        prepTime = parseInt(timeMatch[1]);
      }
      currentSection = '';
      continue;
    }
    
    // 根据当前部分添加内容
    if (currentSection === 'ingredients' && !trimmedLine.match(/^\d+\./)) {
      ingredients.push(trimmedLine);
    } else if (currentSection === 'steps' && trimmedLine) {
      steps.push(trimmedLine.replace(/^\d+\.?\s*/, ''));
    } else if (currentSection === 'description' && trimmedLine) {
      description += trimmedLine + ' ';
    }
  }
  
  // 如果未能正确解析，提供默认值
  if (ingredients.length === 0) {
    // 尝试通过行号解析
    ingredients = lines.slice(1, 5).map(line => line.replace(/^\d+\.?\s*/, ''));
  }
  
  if (steps.length === 0) {
    steps = lines.slice(5, 10).map(line => line.replace(/^\d+\.?\s*/, ''));
  }
  
  return {
    name,
    ingredients,
    steps,
    description: description.trim(),
    difficulty,
    prepTime
  };
}

// 定义解析 AI 响应的函数
export function parseRecipeResponse(response: RecipeResponse) {
  const content = response.description;
  
  // 使用正则表达式解析内容
  const nameMatch = content.match(/Beverage name[：:]\s*(.+)/);
  const ingredientsMatch = content.match(/Required ingredients and quantities[：:]\s*([\s\S]+?)(?=Preparation steps|$)/);
  const stepsMatch = content.match(/Preparation steps[：:]\s*([\s\S]+?)(?=Taste description|$)/);
  const tasteMatch = content.match(/Taste description[：:]\s*([\s\S]+?)(?=Difficulty level|$)/);
  const difficultyMatch = content.match(/Difficulty level[：:]\s*(.+)/);
  const timeMatch = content.match(/Preparation time[：:]\s*(\d+)/);

  return {
    name: nameMatch?.[1]?.trim() || 'Unknown Beverage',
    ingredients: ingredientsMatch?.[1]?.trim().split('\n').filter(Boolean) || [],
    steps: stepsMatch?.[1]?.trim().split('\n').filter(Boolean) || [],
    taste: tasteMatch?.[1]?.trim() || 'Not provided',
    difficulty: difficultyMatch?.[1]?.trim() || 'Medium',
    time: parseInt(timeMatch?.[1] || '5', 10)
  };
} 