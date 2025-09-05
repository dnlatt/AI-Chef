'use client';

import { CommunityRecipesGridProps, Recipe } from '@/types';
import { RecipeDialog } from '@/components/home/RecipeDialog';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function CommunityRecipesGrid({ recipes, loading, error }: CommunityRecipesGridProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRecipe(null);
  };

  const filteredRecipes = useMemo(() => {
    if (!searchQuery) {
      return recipes;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowerCaseQuery)
    );
  }, [recipes, searchQuery]);

  return (
    <section 
      id="recipes" 
      className="container max-w-6xl mx-auto p-4 md:p-8 min-h-screen"
    >
      <h2 className="text-3xl font-semibold mb-6 text-center">🍴 Community Recipe Collection</h2>
      <Separator className="my-6" />

      {/* Single container for search and results */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 w-full max-w-3xl mx-auto">
        <div className="relative w-full md:w-auto md:flex-grow">
          <Search className="absolute left-2 right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-4 px-10 text-lg  p-7"
          />
          {searchQuery && (
            <X
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
              onClick={() => setSearchQuery('')}
            />
          )}
        </div>
        <p className="text-gray-500 text-sm mt-4 md:mt-0 md:ml-6">Results: {filteredRecipes.length}</p>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading recipes...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => handleCardClick(recipe)}
                className="cursor-pointer group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                  <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover" />
                  <div className="p-4 flex flex-col gap-y-2">
                    <h3 className="text-lg font-semibold">{recipe.title}</h3>
                    <div className="h-px bg-gray-200 w-full my-1" />
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{new Date(recipe.createdAt ?? Date.now()).toLocaleDateString()}</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg col-span-full text-gray-500">No recipes found matching your search.</p>
          )}
        </div>
      )}

      {selectedRecipe && (
        <RecipeDialog
          recipe={selectedRecipe}
          open={dialogOpen}
          onOpenChange={handleDialogClose}
        />
      )}
    </section>
  );
}