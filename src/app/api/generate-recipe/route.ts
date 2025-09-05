import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requestSchema, recipeSchema } from '@/app/schemas';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const validatedData = requestSchema.parse(body);
    const { ingredients, dietaryPref } = validatedData;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Create a delicious recipe based on the provided ingredients and dietary preferences.
Return ONLY a valid JSON object with no additional text, markdown, or code fences.

Required format:
{
  "title": "appetizing recipe name",
  "description": "1-2 engaging sentences about the dish",
  "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity", "..."],
  "steps": ["step 1", "step 2", "..."],
  "nutrition": "approximate calories and key macronutrients"
}

Available ingredients: ${ingredients}
Dietary preference: ${dietaryPref === 'none' ? 'no restrictions' : dietaryPref}

Important: Ensure the recipe is realistic and uses primarily the provided ingredients.
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Remove any potential leading/trailing text
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      text = text.substring(jsonStart, jsonEnd + 1);
    }

    let recipeData;
    try {
      recipeData = JSON.parse(text);
    } catch (parseErr) {
      console.error("JSON parse failed. Raw output:", text);
      throw new Error("Model did not return valid JSON");
    }

    const validatedRecipe = recipeSchema.parse(recipeData);

    // ✅ Image generation with Google Imagen 4
    let imageUrl = '/images/place-holder-food-recipe.jpeg';
    
    try {
      // Initialize Google GenAI client for image generation
      const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GEMINI_API_KEY as string
      });

      // Generate image using Imagen 4
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `${validatedRecipe.title} food photo`,
        config: {
          numberOfImages: 1,
          aspectRatio: '16:9', 
          //@ts-expect-error : not in types
          personGeneration: 'dont_allow'
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const generatedImage = response.generatedImages[0];
        if (generatedImage.image?.imageBytes) {
          // Convert base64 to buffer
          const imgBytes = generatedImage.image.imageBytes;
          const buffer = Buffer.from(imgBytes, "base64");

          const base64Image = `data:image/png;base64,${imgBytes}`;
          imageUrl = base64Image;
        }
      }
    } catch (imgErr) {
      console.warn("Google Imagen generation failed:", imgErr);
      // Keep the placeholder URL as fallback
    }

    // ✅ Save recipe to database
    const savedRecipe = await prisma.recipe.create({
      data: {
        title: validatedRecipe.title,
        description: validatedRecipe.description,
        ingredients: validatedRecipe.ingredients,
        steps: validatedRecipe.steps,
        nutrition: validatedRecipe.nutrition,
        imageUrl,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(savedRecipe);

  } catch (error) {
    console.error("Error generating recipe:", error);
    
    // Return more specific error messages
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error },
        { status: 400 }
      );
    }
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate recipe. Please try again.' },
      { status: 500 }
    );
  }
};

// Optional: Add a GET endpoint to test the API
export const GET = async () => {
  return NextResponse.json({ 
    message: 'Recipe generation API is running',
    endpoints: {
      POST: 'Generate a recipe with image',
      required_fields: ['ingredients', 'dietaryPref']
    }
  });
};