import { create } from 'zustand';
import { Recipe } from '@/types';

// Mock Data
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Lentejas Estofadas',
    ingredients: [{ name: 'Lentejas', quantity: '1 taza' }, { name: 'Zanahoria', quantity: '2' }],
    nutrition: { calories: 450, protein: 25, carbs: 60, fat: 10 },
    difficulty: 'fácil',
    cookTime: 40,
    kaiaTips: ['Añade una hoja de laurel para más sabor.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '2',
    title: 'Tofu Scramble',
    ingredients: [{ name: 'Tofu firme', quantity: '200g' }, { name: 'Cúrcuma', quantity: '1 cdta' }],
    nutrition: { calories: 300, protein: 20, carbs: 10, fat: 20 },
    difficulty: 'fácil',
    cookTime: 15,
    kaiaTips: ['Usa sal negra (kala namak) para un sabor a huevo.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '3',
    title: 'Ensalada de Quinoa',
    ingredients: [{ name: 'Quinoa', quantity: '1 taza' }, { name: 'Pepino', quantity: '1' }],
    nutrition: { calories: 350, protein: 15, carbs: 50, fat: 12 },
    difficulty: 'fácil',
    cookTime: 20,
    kaiaTips: ['Tuesta la quinoa antes de cocerla para un sabor más intenso.'],
    imageUrl: '/placeholder.svg',
  },
];

interface RecipeState {
  recipes: Recipe[];
  weeklyMenu: Record<string, { breakfast: Recipe; lunch: Recipe; dinner: Recipe }>;
  getRecipeById: (id: string) => Recipe | undefined;
}

export const useRecipeStore = create<RecipeState>((set, get) => ({
  recipes: mockRecipes,
  weeklyMenu: {
    Lunes: { breakfast: mockRecipes[1], lunch: mockRecipes[2], dinner: mockRecipes[0] },
    Martes: { breakfast: mockRecipes[1], lunch: mockRecipes[0], dinner: mockRecipes[2] },
    Miércoles: { breakfast: mockRecipes[2], lunch: mockRecipes[1], dinner: mockRecipes[0] },
    Jueves: { breakfast: mockRecipes[0], lunch: mockRecipes[2], dinner: mockRecipes[1] },
    Viernes: { breakfast: mockRecipes[1], lunch: mockRecipes[0], dinner: mockRecipes[2] },
    Sábado: { breakfast: mockRecipes[2], lunch: mockRecipes[1], dinner: mockRecipes[0] },
    Domingo: { breakfast: mockRecipes[0], lunch: mockRecipes[2], dinner: mockRecipes[1] },
  },
  getRecipeById: (id) => get().recipes.find((recipe) => recipe.id === id),
}));