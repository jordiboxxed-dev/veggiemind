import { create } from 'zustand';
import { Recipe } from '@/types';

// Mock Data
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Lentejas Estofadas',
    ingredients: [
      { name: 'Lentejas pardinas', quantity: '1 taza' }, 
      { name: 'Zanahoria', quantity: '2' },
      { name: 'Patata', quantity: '1 grande' },
      { name: 'Cebolla', quantity: '1' },
      { name: 'Pimiento verde', quantity: '1' },
      { name: 'Hoja de laurel', quantity: '1' },
      { name: 'Pimentón dulce', quantity: '1 cdta' },
      { name: 'Aceite de oliva', quantity: '2 cdas' },
    ],
    nutrition: { calories: 450, protein: 25, carbs: 60, fat: 10 },
    difficulty: 'fácil',
    cookTime: 40,
    kaiaTips: ['Añade una hoja de laurel para más sabor.', 'Un chorrito de vinagre al final realza los sabores.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '2',
    title: 'Tofu Scramble Revuelto',
    ingredients: [
      { name: 'Tofu firme', quantity: '200g' }, 
      { name: 'Cúrcuma', quantity: '1 cdta' },
      { name: 'Sal negra (kala namak)', quantity: '1/2 cdta' },
      { name: 'Levadura nutricional', quantity: '1 cda' },
      { name: 'Leche de soja', quantity: '2 cdas' },
      { name: 'Espinacas frescas', quantity: '1 puñado' },
    ],
    nutrition: { calories: 300, protein: 20, carbs: 10, fat: 20 },
    difficulty: 'fácil',
    cookTime: 15,
    kaiaTips: ['Usa sal negra (kala namak) para un sabor a huevo.', 'No cocines el tofu en exceso para que no se seque.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '3',
    title: 'Ensalada de Quinoa Mediterránea',
    ingredients: [
      { name: 'Quinoa', quantity: '1 taza' }, 
      { name: 'Pepino', quantity: '1' },
      { name: 'Tomates cherry', quantity: '1 taza' },
      { name: 'Pimiento rojo', quantity: '1/2' },
      { name: 'Aceitunas Kalamata', quantity: '1/4 taza' },
      { name: 'Perejil fresco', quantity: 'un manojo' },
      { name: 'Zumo de limón', quantity: '1' },
    ],
    nutrition: { calories: 350, protein: 15, carbs: 50, fat: 12 },
    difficulty: 'fácil',
    cookTime: 20,
    kaiaTips: ['Tuesta la quinoa antes de cocerla para un sabor más intenso.', 'Deja que la ensalada repose 10 minutos antes de servir.'],
    imageUrl: '/placeholder.svg',
  },
];

// Helper para barajar el array de recetas
const shuffle = (array: Recipe[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const generateMenu = (): Record<string, { breakfast: Recipe; lunch: Recipe; dinner: Recipe }> => {
    const shuffled = shuffle([...mockRecipes, ...mockRecipes, ...mockRecipes]); // Aseguramos suficientes recetas
    return {
        Lunes: { breakfast: shuffled[0], lunch: shuffled[1], dinner: shuffled[2] },
        Martes: { breakfast: shuffled[3], lunch: shuffled[4], dinner: shuffled[5] },
        Miércoles: { breakfast: shuffled[6], lunch: shuffled[7], dinner: shuffled[8] },
        Jueves: { breakfast: shuffled[0], lunch: shuffled[3], dinner: shuffled[6] },
        Viernes: { breakfast: shuffled[1], lunch: shuffled[4], dinner: shuffled[7] },
        Sábado: { breakfast: shuffled[2], lunch: shuffled[5], dinner: shuffled[8] },
        Domingo: { breakfast: shuffled[0], lunch: shuffled[2], dinner: shuffled[4] },
    }
}

type MealType = 'breakfast' | 'lunch' | 'dinner';

interface RecipeState {
  recipes: Recipe[];
  weeklyMenu: Record<string, { breakfast: Recipe; lunch: Recipe; dinner: Recipe }>;
  selectedRecipe: Recipe | null;
  getRecipeById: (id: string) => Recipe | undefined;
  setSelectedRecipe: (recipe: Recipe | null) => void;
  clearSelectedRecipe: () => void;
  regenerateWeeklyMenu: () => void;
  swapMeal: (day: string, mealType: MealType, newRecipe: Recipe) => void;
}

export const useRecipeStore = create<RecipeState>((set, get) => ({
  recipes: mockRecipes,
  weeklyMenu: generateMenu(),
  selectedRecipe: null,
  getRecipeById: (id) => get().recipes.find((recipe) => recipe.id === id),
  setSelectedRecipe: (recipe) => set({ selectedRecipe: recipe }),
  clearSelectedRecipe: () => set({ selectedRecipe: null }),
  regenerateWeeklyMenu: () => set({ weeklyMenu: generateMenu() }),
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