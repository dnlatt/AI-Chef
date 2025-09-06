// components/RecipeDialog.tsx

'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RecipeDialogProps } from '@/types';

export function RecipeDialog({ recipe, open, onOpenChange }: RecipeDialogProps) {
  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl lg:max-w-6xl max-h-[95vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-lg sm:text-xl font-bold">{recipe.title}</DialogTitle>
          {recipe.description && (
            <DialogDescription className="text-sm sm:text-base">{recipe.description}</DialogDescription>
          )}
        </DialogHeader>
        
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 flex-1 min-h-0 overflow-hidden">
          {/* Image Section */}
          <div className="w-full lg:w-2/5 xl:w-1/2 flex-shrink-0">
            <div className="relative w-full h-48 sm:h-64 lg:h-full min-h-[200px] rounded-lg overflow-hidden">
              <img 
                src={recipe.imageUrl} 
                alt={recipe.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="w-full lg:w-3/5 xl:w-1/2 flex-1 min-h-0 overflow-y-auto">
            <div className="space-y-4 sm:space-y-6 pr-2">
              {recipe.ingredients?.length ? (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">Ingredients</h3>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-gray-700">
                    {recipe.ingredients.map((item, index) => (
                      <li key={index} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {recipe.steps?.length ? (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">Instructions</h3>
                  <ol className="list-decimal list-inside space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                    {recipe.steps.map((step, index) => (
                      <li key={index} className="leading-relaxed pl-1">{step}</li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {recipe.nutrition && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">Nutrition Estimate</h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{recipe.nutrition}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}