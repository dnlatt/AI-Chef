
export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients?: string[];
  steps?: string[];
  nutrition?: string;
  createdAt?: string;
}

export interface RecipeCardProps {
  recipe: Recipe;
}

export interface CommunityRecipesGridProps {
  recipes: Recipe[];
  loading: boolean;
  error: string;
}

export interface GeneratedRecipeSectionProps {
  recipe: Recipe;
}

export interface HeroSectionProps {
  onRecipeGenerated: (recipe: Recipe) => void;
}

export interface RecipeDialogProps {
  recipe: Recipe;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface GenerateRecipeFormProps {
  onRecipeGenerated: (recipe: Recipe) => void;
}