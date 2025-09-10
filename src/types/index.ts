export interface Ingredient {
  name: string;
  quantity: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  nutrition: NutritionInfo;
  difficulty: 'fácil' | 'medio' | 'avanzado';
  cookTime: number; // in minutes
  servings: number; // number of portions
  kaiaTips: string[];
  imageUrl: string;
  tags: string[];
  preparation: string;
}