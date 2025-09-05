'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Recipe } from '@/types';
import { CommunityRecipesGrid } from '@/components/home/CommunityRecipesGrid';
import { GeneratedRecipeSection } from '@/components/home/GeneratedRecipeSection';

export default function Home() {
  const [newRecipe, setNewRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/recipes');
      if (!res.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await res.json();
      setRecipes(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeGenerated = (recipe: Recipe) => {
    setNewRecipe(recipe);
    fetchRecipes();
  };
  
  useEffect(() => {
    // Initial fetch of recipes when the component mounts
    fetchRecipes();
  }, []);

  useEffect(() => {
    // If a new recipe is generated, scroll to the new section
    if (newRecipe) {
      const section = document.getElementById('generated-recipe-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [newRecipe]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <main>
        <HeroSection onRecipeGenerated={handleRecipeGenerated} />
        {newRecipe && <GeneratedRecipeSection recipe={newRecipe} />}
        <CommunityRecipesGrid recipes={recipes} loading={loading} error={error} />
      </main>
      <Footer />
    </div>
  );
}