// components/GeneratedRecipeSection.tsx

'use client';

import { GeneratedRecipeSectionProps } from '@/types';
import { RecipeCard } from '@/components/RecipeCard';
import Link from 'next/link';

export function GeneratedRecipeSection({ recipe }: GeneratedRecipeSectionProps) {
  return (
    <section id="generated-recipe-section" className="min-h-screen flex items-center justify-center py-16">
      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        <h2 className="text-3xl font-semibold mb-4 text-center">✨ Your AI-Powered Recipe</h2>
        <hr className="my-6"  />
        
        <RecipeCard
          recipe={{
            ...recipe,
            ingredients: recipe.ingredients ?? [],
            steps: recipe.steps ?? [],
          }}
        />

        <div className="flex justify-center py-10">
          <Link 
            href="#home" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-lg transition-transform duration-200 active:scale-95 cursor-pointer">
            🪄 Generate Another Recipe
          </Link>
        </div>
      </div>
    </section>
  );
}