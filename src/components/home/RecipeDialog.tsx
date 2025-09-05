// components/RecipeDialog.tsx

'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RecipeDialogProps } from '@/types';

export function RecipeDialog({ recipe, open, onOpenChange }: RecipeDialogProps) {
  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-6xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{recipe.title}</DialogTitle>
          {recipe.description && (
            <DialogDescription className="text-base">{recipe.description}</DialogDescription>
          )}
        </DialogHeader>
        
        <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
          {/* Image Section */}
          <div className="w-full lg:w-2/5 xl:w-1/2">
            <div className="relative w-full h-64 lg:h-full min-h-[300px] overflow-hidden rounded-lg">
              <img 
                src={recipe.imageUrl} 
                alt={recipe.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="w-full lg:w-3/5 xl:w-1/2 space-y-6 overflow-y-auto pr-2">
            {recipe.ingredients?.length ? (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Ingredients</h3>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {recipe.steps?.length ? (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="leading-relaxed">{step}</li>
                  ))}
                </ol>
              </div>
            ) : null}

            {recipe.nutrition && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Nutrition Estimate</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{recipe.nutrition}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}