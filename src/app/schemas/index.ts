import { z } from 'zod';

export const requestSchema = z.object({
  ingredients: z.string().min(1, 'Ingredients are required'),
  dietaryPref: z.enum(['vegan', 'vegetarian', 'low-carb', 'gluten-free', 'none']),
});

export const recipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()),
  steps: z.array(z.string()),
  nutrition: z.string(),
});
