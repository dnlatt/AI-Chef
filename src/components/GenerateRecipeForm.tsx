// components/GenerateRecipeForm.tsx

'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ingredients } from '@/lib/ingredients';
import { GenerateRecipeFormProps } from '@/types';

export function GenerateRecipeForm({ onRecipeGenerated }: GenerateRecipeFormProps) {
  const [inputIngredients, setInputIngredients] = useState('');
  const [dietaryPref, setDietaryPref] = useState('none');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputIngredients(value);
    const lastWord = value.split(',').pop()?.trim().toLowerCase();
    if (lastWord) {
      const filtered = ingredients.filter(i => i.toLowerCase().startsWith(lastWord));
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
    setError(''); // clear error while typing
  };

  const handleSuggestionClick = (suggestion: string) => {
    const parts = inputIngredients.split(',');
    parts.pop();
    parts.push(suggestion);
    setInputIngredients(parts.join(', ').trim() + ', ');
    setSuggestions([]);
  };

  const resetForm = () => {
    setInputIngredients('');
    setDietaryPref('none');
    setSuggestions([]);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // ✅ Basic validation
    const cleaned = inputIngredients
      .split(',')
      .map(i => i.trim())
      .filter(Boolean);

    if (cleaned.length === 0) {
      setError('Please enter at least one ingredient.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: inputIngredients, dietaryPref }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to generate recipe');
      }

      const data = await res.json();
      onRecipeGenerated(data);
      
      // ✅ Reset form after successful generation
      resetForm();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Input field */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter ingredients (e.g., chicken, broccoli, pasta)"
          value={inputIngredients}
          onChange={handleInputChange}
          disabled={loading}
          className="p-7 w-full rounded-xl border-gray-300"
        />
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-200 shadow-lg mt-1 text-xl rounded-md">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-yellow-100 transition-colors duration-150"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Select dropdown */}
      <div>
        <Select 
          onValueChange={setDietaryPref} 
          value={dietaryPref}
          disabled={loading}
        >
          <SelectTrigger className="w-full p-7 rounded-xl border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <SelectValue placeholder="Select dietary preference" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-lg border-gray-200 text-xl font-sans">
            <SelectItem value="none" className="hover:bg-yellow-100">No Preference</SelectItem>
            <SelectItem value="vegan" className="hover:bg-yellow-100">Vegan</SelectItem>
            <SelectItem value="vegetarian" className="hover:bg-yellow-100">Vegetarian</SelectItem>
            <SelectItem value="low-carb" className="hover:bg-yellow-100">Low-Carb</SelectItem>
            <SelectItem value="gluten-free" className="hover:bg-yellow-100">Gluten-Free</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Button */}
      <Button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold 
                   px-10 py-4  transition-transform duration-200 active:scale-95 cursor-pointer p-7"
        disabled={loading || !inputIngredients.trim()}
      >
        {loading ? '⏳ Generating...' : '🪄 Generate Recipe'}
      </Button>

      {/* Error */}
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </form>
  );
}