import { create } from 'zustand';
import { Recipe } from '@/types';
import { Profile } from '@/contexts/SessionContext';
import { mockRecipes } from '@/data/recipes';
import { generateMenuFromRecipes } from '@/lib/menuGenerator';

type MealType = 'breakfast' | 'lunch' | 'dinner';

interface RecipeState {
  recipes: Recipe[];
  weeklyMenu: Record<string, { breakfast: Recipe; lunch: Recipe; dinner: Recipe }>;
  selectedRecipe: Recipe | null;
  userProfile: Profile | null;
  getRecipeById: (id: string) => Recipe | undefined;
  setSelectedRecipe: (recipe: Recipe | null) => void;
  clearSelectedRecipe: () => void;
  setUserProfile: (profile: Profile | null) => void;
  generateWeeklyMenu: () => void;
  swapMeal: (day: string, mealType: MealType, newRecipe: Recipe) => void;
}

export const useRecipeStore = create<RecipeState>((set, get) => ({
  recipes: mockRecipes,
  weeklyMenu: {},
  selectedRecipe: null,
  userProfile: null,
  getRecipeById: (id) => get().recipes.find((recipe) => recipe.id === id),
  setSelectedRecipe: (recipe) => set({ selectedRecipe: recipe }),
  clearSelectedRecipe: () => set({ selectedRecipe: null }),
  setUserProfile: (profile) => set({ userProfile: profile }),
  generateWeeklyMenu: () => {
    const profile = get().userProfile;
    const allRecipes = get().recipes;
    
    let filteredRecipes = [...allRecipes];

    if (profile) {
        // Skill level
        if (profile.skill_level) {
            const skillMap: Record<string, string[]> = { 'Principiante': ['fácil'], 'Intermedio': ['fácil', 'medio'], 'Avanzado': ['fácil', 'medio', 'avanzado'] };
            const allowed = skillMap[profile.skill_level] || [];
            if (allowed.length > 0) filteredRecipes = filteredRecipes.filter(r => allowed.includes(r.difficulty));
        }

        // Cooking time
        if (profile.cooking_time) {
            const timeMap: Record<string, number> = { 'Menos de 30min': 30, '30-60 min': 60, 'Más de 60min': Infinity };
            const maxTime = timeMap[profile.cooking_time];
            if (maxTime !== Infinity) filteredRecipes = filteredRecipes.filter(r => r.cookTime <= maxTime);
        }

        // Disliked ingredients
        if (profile.disliked_ingredients && profile.disliked_ingredients.length > 0) {
            const disliked = profile.disliked_ingredients.map(i => i.toLowerCase());
            filteredRecipes = filteredRecipes.filter(recipe => !recipe.ingredients.some(ing => disliked.some(d => ing.name.toLowerCase().includes(d))));
        }

        // Allergies
        if (profile.allergies && profile.allergies.length > 0) {
            const allergyMap: Record<string, string[]> = { 'Soja': ['tofu', 'soja', 'miso'], 'Frutos secos': ['nueces', 'almendras', 'piñones', 'cacahuetes', 'tahini'], 'Gluten': ['pasta', 'pan', 'avena', 'trigo', 'gnocchi', 'lasaña', 'pizza'] };
            const ingredientsToAvoid = profile.allergies.flatMap(a => allergyMap[a] || []);
            if (ingredientsToAvoid.length > 0) {
                filteredRecipes = filteredRecipes.filter(recipe => !recipe.ingredients.some(ing => ingredientsToAvoid.some(avoid => ing.name.toLowerCase().includes(avoid))));
            }
        }
    }

    const breakfastRecipes = filteredRecipes.filter(r => r.tags.includes('breakfast'));
    const otherRecipes = filteredRecipes.filter(r => !r.tags.includes('breakfast'));

    set({ weeklyMenu: generateMenuFromRecipes(breakfastRecipes, otherRecipes) });
  },
  swapMeal: (day, mealType, newRecipe) => {
    set((state) => ({
      weeklyMenu: {
        ...state.weeklyMenu,
        [day]: {
          ...state.weeklyMenu[day],
          [mealType]: newRecipe,
        },
      },
    }));
  },
}));