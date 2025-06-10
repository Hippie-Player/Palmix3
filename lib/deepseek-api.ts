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
  apiKey: process.env.DEEPSEEK_API_KEY,
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