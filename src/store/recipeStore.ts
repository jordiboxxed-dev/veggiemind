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
  {
    id: '4',
    title: 'Curry de Garbanzos y Espinacas',
    ingredients: [
      { name: 'Garbanzos cocidos', quantity: '1 lata' },
      { name: 'Espinacas frescas', quantity: '2 tazas' },
      { name: 'Leche de coco', quantity: '1 lata' },
      { name: 'Cebolla', quantity: '1' },
      { name: 'Ajo', quantity: '2 dientes' },
      { name: 'Jengibre fresco rallado', quantity: '1 cda' },
      { name: 'Curry en polvo', quantity: '2 cdtas' },
      { name: 'Tomate triturado', quantity: '1/2 taza' },
    ],
    nutrition: { calories: 400, protein: 15, carbs: 50, fat: 18 },
    difficulty: 'fácil',
    cookTime: 25,
    kaiaTips: ['Sirve con arroz basmati para una comida completa.', 'Añade un poco de zumo de lima al final para avivar los sabores.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '5',
    title: 'Tacos de Lentejas con Pico de Gallo',
    ingredients: [
      { name: 'Lentejas cocidas', quantity: '1 taza' },
      { name: 'Comino en polvo', quantity: '1 cdta' },
      { name: 'Chile en polvo', quantity: '1/2 cdta' },
      { name: 'Tortillas de maíz', quantity: '8' },
      { name: 'Tomate', quantity: '2' },
      { name: 'Cebolla morada', quantity: '1/4' },
      { name: 'Cilantro fresco', quantity: 'un manojo' },
      { name: 'Zumo de lima', quantity: '1' },
    ],
    nutrition: { calories: 380, protein: 18, carbs: 65, fat: 5 },
    difficulty: 'fácil',
    cookTime: 20,
    kaiaTips: ['Calienta las tortillas en una sartén antes de servir.', 'Añade aguacate en rodajas para más cremosidad y grasas saludables.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '6',
    title: 'Sopa de Tomate y Albahaca Asados',
    ingredients: [
      { name: 'Tomates maduros', quantity: '1 kg' },
      { name: 'Albahaca fresca', quantity: '1 taza' },
      { name: 'Caldo de verduras', quantity: '2 tazas' },
      { name: 'Cebolla', quantity: '1' },
      { name: 'Ajo', quantity: '3 dientes' },
      { name: 'Aceite de oliva', quantity: '2 cdas' },
    ],
    nutrition: { calories: 250, protein: 8, carbs: 30, fat: 12 },
    difficulty: 'medio',
    cookTime: 50,
    kaiaTips: ['Asar los tomates intensifica su dulzura.', 'Añade un chorrito de leche de coco para una sopa más cremosa.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '7',
    title: 'Pasta al Pesto de Aguacate',
    ingredients: [
      { name: 'Pasta integral', quantity: '200g' },
      { name: 'Aguacate maduro', quantity: '1' },
      { name: 'Albahaca fresca', quantity: '1 taza' },
      { name: 'Piñones o nueces', quantity: '1/4 taza' },
      { name: 'Zumo de limón', quantity: '1/2' },
      { name: 'Ajo', quantity: '1 diente' },
      { name: 'Levadura nutricional', quantity: '2 cdas' },
    ],
    nutrition: { calories: 550, protein: 18, carbs: 70, fat: 25 },
    difficulty: 'fácil',
    cookTime: 15,
    kaiaTips: ['Guarda un poco del agua de cocción de la pasta para aligerar la salsa si es necesario.', 'El zumo de limón evita que el aguacate se oxide.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '8',
    title: 'Hamburguesa de Frijoles Negros',
    ingredients: [
      { name: 'Frijoles negros cocidos', quantity: '1 lata' },
      { name: 'Avena en hojuelas', quantity: '1/2 taza' },
      { name: 'Cebolla picada', quantity: '1/2' },
      { name: 'Comino', quantity: '1 cdta' },
      { name: 'Pimentón ahumado', quantity: '1 cdta' },
      { name: 'Pan de hamburguesa', quantity: '4' },
    ],
    nutrition: { calories: 420, protein: 20, carbs: 75, fat: 8 },
    difficulty: 'medio',
    cookTime: 30,
    kaiaTips: ['Seca bien los frijoles para que la hamburguesa no quede blanda.', 'Puedes hornear las hamburguesas en lugar de freírlas para una opción más saludable.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '9',
    title: 'Buddha Bowl con Aderezo de Tahini',
    ingredients: [
      { name: 'Quinoa cocida', quantity: '1 taza' },
      { name: 'Garbanzos asados', quantity: '1 taza' },
      { name: 'Boniato en cubos asado', quantity: '1 taza' },
      { name: 'Espinacas frescas', quantity: '2 tazas' },
      { name: 'Aguacate', quantity: '1/2' },
      { name: 'Tahini', quantity: '2 cdas' },
      { name: 'Zumo de limón', quantity: '1 cda' },
      { name: 'Sirope de arce', quantity: '1 cdta' },
    ],
    nutrition: { calories: 600, protein: 22, carbs: 80, fat: 25 },
    difficulty: 'fácil',
    cookTime: 35,
    kaiaTips: ['La clave de un buen Buddha Bowl es la variedad de texturas y colores.', 'Prepara los componentes por adelantado para un montaje rápido.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '10',
    title: 'Chili Vegano',
    ingredients: [
      { name: 'Frijoles rojos cocidos', quantity: '1 lata' },
      { name: 'Frijoles negros cocidos', quantity: '1 lata' },
      { name: 'Soja texturizada fina', quantity: '1/2 taza' },
      { name: 'Tomate triturado', quantity: '1 lata' },
      { name: 'Pimiento rojo', quantity: '1' },
      { name: 'Cebolla', quantity: '1' },
      { name: 'Chile en polvo', quantity: '2 cdas' },
      { name: 'Comino', quantity: '1 cda' },
    ],
    nutrition: { calories: 450, protein: 30, carbs: 70, fat: 5 },
    difficulty: 'fácil',
    cookTime: 45,
    kaiaTips: ['El chili sabe aún mejor al día siguiente.', 'Sírvelo con aguacate, cilantro y "crema agria" vegana.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '11',
    title: 'Lasaña de Verduras con "Ricotta" de Tofu',
    ingredients: [
      { name: 'Láminas de lasaña', quantity: '9' },
      { name: 'Calabacín', quantity: '2' },
      { name: 'Berenjena', quantity: '1' },
      { name: 'Salsa de tomate', quantity: '3 tazas' },
      { name: 'Tofu firme', quantity: '400g' },
      { name: 'Levadura nutricional', quantity: '1/4 taza' },
      { name: 'Albahaca fresca', quantity: '1/2 taza' },
    ],
    nutrition: { calories: 500, protein: 25, carbs: 65, fat: 18 },
    difficulty: 'avanzado',
    cookTime: 75,
    kaiaTips: ['Prensa bien el tofu para quitar el exceso de agua y obtener una mejor textura de "ricotta".', 'Deja reposar la lasaña 10 minutos antes de cortarla.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '12',
    title: 'Risotto de Champiñones y Espárragos',
    ingredients: [
      { name: 'Arroz Arborio', quantity: '1 taza' },
      { name: 'Champiñones', quantity: '250g' },
      { name: 'Espárragos trigueros', quantity: '1 manojo' },
      { name: 'Caldo de verduras caliente', quantity: '4 tazas' },
      { name: 'Vino blanco seco', quantity: '1/2 taza' },
      { name: 'Cebolla', quantity: '1/2' },
      { name: 'Levadura nutricional', quantity: '3 cdas' },
    ],
    nutrition: { calories: 480, protein: 15, carbs: 85, fat: 8 },
    difficulty: 'avanzado',
    cookTime: 40,
    kaiaTips: ['La clave del risotto es añadir el caldo poco a poco y remover constantemente.', 'Termina con un chorrito de aceite de trufa para un toque gourmet.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '13',
    title: 'Pad Thai Vegano con Tofu',
    ingredients: [
      { name: 'Fideos de arroz', quantity: '200g' },
      { name: 'Tofu extra firme', quantity: '200g' },
      { name: 'Brotes de soja', quantity: '1 taza' },
      { name: 'Cebolleta', quantity: '3' },
      { name: 'Cacahuetes tostados', quantity: '1/4 taza' },
      { name: 'Salsa de soja', quantity: '3 cdas' },
      { name: 'Sirope de arce', quantity: '2 cdas' },
      { name: 'Zumo de lima', quantity: '2 cdas' },
      { name: 'Salsa Sriracha', quantity: '1 cdta' },
    ],
    nutrition: { calories: 550, protein: 22, carbs: 70, fat: 20 },
    difficulty: 'medio',
    cookTime: 30,
    kaiaTips: ['No remojes los fideos de arroz en exceso o se volverán blandos.', 'Prensa el tofu para que quede más crujiente al freírlo.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '14',
    title: 'Sopa Miso con Tofu y Algas',
    ingredients: [
      { name: 'Pasta de miso blanco', quantity: '3 cdas' },
      { name: 'Agua', quantity: '4 tazas' },
      { name: 'Tofu sedoso', quantity: '150g' },
      { name: 'Alga wakame deshidratada', quantity: '1 cda' },
      { name: 'Cebolleta', quantity: '2' },
    ],
    nutrition: { calories: 150, protein: 10, carbs: 15, fat: 5 },
    difficulty: 'fácil',
    cookTime: 10,
    kaiaTips: ['Nunca hiervas la sopa una vez añadido el miso, ya que mataría sus probióticos.', 'Disuelve la pasta de miso en un poco de caldo caliente antes de añadirla a la olla.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '15',
    title: 'Wraps de Falafel con Hummus',
    ingredients: [
      { name: 'Falafel (casero o comprado)', quantity: '8 unidades' },
      { name: 'Pan de pita o tortillas grandes', quantity: '4' },
      { name: 'Hummus', quantity: '1/2 taza' },
      { name: 'Lechuga', quantity: '1 taza' },
      { name: 'Tomate en rodajas', quantity: '1' },
      { name: 'Pepino en rodajas', quantity: '1/2' },
    ],
    nutrition: { calories: 450, protein: 15, carbs: 60, fat: 18 },
    difficulty: 'fácil',
    cookTime: 15,
    kaiaTips: ['Calienta el pan de pita para que sea más flexible.', 'Añade un poco de salsa tahini o yogur vegano para más cremosidad.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '16',
    title: 'Pizza Vegana con Verduras',
    ingredients: [
      { name: 'Masa de pizza', quantity: '1' },
      { name: 'Salsa de tomate', quantity: '1/2 taza' },
      { name: 'Queso vegano rallado', quantity: '1 taza' },
      { name: 'Champiñones', quantity: '1/2 taza' },
      { name: 'Pimiento verde', quantity: '1/2' },
      { name: 'Cebolla morada', quantity: '1/4' },
      { name: 'Aceitunas negras', quantity: '1/4 taza' },
    ],
    nutrition: { calories: 600, protein: 20, carbs: 80, fat: 22 },
    difficulty: 'medio',
    cookTime: 25,
    kaiaTips: ['Precalienta bien el horno con la bandeja dentro para una base más crujiente.', 'Un chorrito de aceite de oliva y orégano seco antes de hornear le da un gran sabor.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '17',
    title: 'Gnocchi con Salsa de Calabaza',
    ingredients: [
      { name: 'Gnocchi de patata', quantity: '500g' },
      { name: 'Puré de calabaza', quantity: '1 taza' },
      { name: 'Leche de coco', quantity: '1/2 taza' },
      { name: 'Salvia fresca', quantity: 'un manojo' },
      { name: 'Nuez moscada', quantity: '1/4 cdta' },
      { name: 'Ajo', quantity: '1 diente' },
    ],
    nutrition: { calories: 480, protein: 10, carbs: 90, fat: 10 },
    difficulty: 'fácil',
    cookTime: 20,
    kaiaTips: ['Fríe las hojas de salvia en un poco de aceite hasta que estén crujientes para decorar.', 'Tuesta unas semillas de calabaza para añadir un toque crujiente.'],
    imageUrl: '/placeholder.svg',
  },
  {
    id: '18',
    title: 'Berenjenas Rellenas de Soja Texturizada',
    ingredients: [
      { name: 'Berenjenas', quantity: '2 grandes' },
      { name: 'Soja texturizada fina', quantity: '1 taza' },
      { name: 'Salsa de tomate', quantity: '1 taza' },
      { name: 'Cebolla', quantity: '1' },
      { name: 'Pimiento rojo', quantity: '1/2' },
      { name: 'Orégano seco', quantity: '1 cdta' },
      { name: 'Queso vegano para gratinar', quantity: '1/2 taza' },
    ],
    nutrition: { calories: 400, protein: 25, carbs: 45, fat: 15 },
    difficulty: 'medio',
    cookTime: 60,
    kaiaTips: ['"Asusta" las berenjenas con sal para quitarles el amargor antes de cocinarlas.', 'Añade pasas y piñones al relleno para un toque agridulce.'],
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