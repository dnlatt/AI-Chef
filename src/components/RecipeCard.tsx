// components/RecipeCard.tsx

'use client';

import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RecipeCardProps } from '@/types';

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="relative w-full h-52 md:w-1/2 md:h-auto">
        <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover rounded-2xl" />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl font-bold">{recipe.title}</CardTitle>
            <CardDescription>{recipe.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {recipe.ingredients?.length ? (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {recipe.steps?.length ? (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            ) : null}

            {recipe.nutrition && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Nutrition Estimate</h3>
                <p className="text-sm text-gray-600">{recipe.nutrition}</p>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </div>
  );
}
