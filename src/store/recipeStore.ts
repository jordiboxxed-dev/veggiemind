import { create } from 'zustand';
import { Recipe } from '@/types';
import { Profile } from '@/contexts/SessionContext';

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
    preparation: "En una olla, sofríe la cebolla, zanahoria y pimiento picados. Añade la patata en cubos, las lentejas, el laurel y el pimentón. Cubre con agua, lleva a ebullición y luego cocina a fuego lento por 35-40 minutos hasta que las lentejas estén tiernas. Sazona al gusto.",
    kaiaTips: ['Añade una hoja de laurel para más sabor.', 'Un chorrito de vinagre al final realza los sabores.'],
    imageUrl: '/placeholder.svg',
    tags: ['high-protein', 'gluten-free', 'soy-free', 'nut-free'],
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
    preparation: "Desmenuza el tofu con un tenedor. En una sartén caliente, saltéalo con la cúrcuma, la sal negra y la levadura nutricional. Añade la leche de soja para darle una textura más cremosa y, al final, incorpora las espinacas hasta que se ablanden. Sirve inmediatamente.",
    kaiaTips: ['Usa sal negra (kala namak) para un sabor a huevo.', 'No cocines el tofu en exceso para que no se seque.'],
    imageUrl: '/placeholder.svg',
    tags: ['low-calorie', 'high-protein', 'gluten-free', 'nut-free'],
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
    preparation: "Cuece la quinoa según las instrucciones del paquete y déjala enfriar. Mientras, pica finamente el pepino, los tomates, el pimiento y el perejil. En un bol grande, mezcla la quinoa fría con las verduras picadas y las aceitunas. Aliña con zumo de limón, aceite de oliva, sal y pimienta.",
    kaiaTips: ['Tuesta la quinoa antes de cocerla para un sabor más intenso.', 'Deja que la ensalada repose 10 minutos antes de servir.'],
    imageUrl: '/placeholder.svg',
    tags: ['low-calorie', 'balanced', 'gluten-free', 'soy-free', 'nut-free'],
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
    preparation: "Sofríe la cebolla, el ajo y el jengibre en una sartén grande. Añade el curry en polvo y cocina por un minuto. Incorpora el tomate triturado, la leche de coco y los garbanzos. Cocina a fuego lento por 15 minutos. Finalmente, añade las espinacas y remueve hasta que se ablanden.",
    kaiaTips: ['Sirve con arroz basmati para una comida completa.', 'Añade un poco de zumo de lima al final para avivar los sabores.'],
    imageUrl: '/placeholder.svg',
    tags: ['low-calorie', 'balanced', 'gluten-free', 'soy-free', 'nut-free'],
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
    preparation: "Para el relleno, calienta las lentejas cocidas con el comino y el chile en polvo. Para el pico de gallo, pica finamente el tomate, la cebolla y el cilantro, y mézclalo con el zumo de lima y sal. Calienta las tortillas y rellénalas con las lentejas y el pico de gallo.",
    kaiaTips: ['Calienta las tortillas en una sartén antes de servir.', 'Añade aguacate en rodajas para más cremosidad y grasas saludables.'],
    imageUrl: '/placeholder.svg',
    tags: ['low-calorie', 'balanced', 'gluten-free', 'soy-free', 'nut-free'],
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
    preparation: "Corta los tomates y la cebolla en cuartos. Ponlos en una bandeja de horno con los dientes de ajo, rocía con aceite de oliva y asa a 200°C por 30 minutos. Transfiere todo a una olla, añade el caldo de verduras y la albahaca. Tritura hasta obtener una crema suave y calienta antes de servir.",
    kaiaTips: ['Asar los tomates intensifica su dulzura.', 'Añade un chorrito de leche de coco para una sopa más cremosa.'],
    imageUrl: '/placeholder.svg',
    tags: ['low-calorie', 'gluten-free', 'soy-free', 'nut-free'],
  },
  {
    id: '7',
    title: 'Pasta al Pesto de Aguacate',
    ingredients: [
      { name: 'Pasta integral', quantity: '200g' },
      { name: 'Aguacate maduro', quantity: '1' },
      { name: 'Albahaca fresca', quantity: '1 taza' },
      { name: 'Piñones', quantity: '1/4 taza' },
      { name: 'Zumo de limón', quantity: '1/2' },
      { name: 'Ajo', quantity: '1 diente' },
      { name: 'Levadura nutricional', quantity: '2 cdas' },
    ],
    nutrition: { calories: 550, protein: 18, carbs: 70, fat: 25 },
    difficulty: 'fácil',
    cookTime: 15,
    preparation: "Cuece la pasta según las instrucciones. Mientras, en una batidora, tritura el aguacate, la albahaca, los piñones, el zumo de limón, el ajo y la levadura nutricional hasta obtener una salsa cremosa. Escurre la pasta (reservando un poco de agua de cocción) y mézclala con el pesto. Añade agua de cocción si es necesario para aligerar.",
    kaiaTips: ['Guarda un poco del agua de cocción de la pasta para aligerar la salsa si es necesario.', 'El zumo de limón evita que el aguacate se oxide.'],
    imageUrl: '/placeholder.svg',
    tags: ['balanced', 'soy-free'],
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
    preparation: "En un bol, machaca los frijoles negros. Añade la avena, la cebolla picada y las especias. Mezcla bien hasta formar una masa manejable. Divide la masa en 4 porciones y forma las hamburguesas. Cocínalas en una sartén con un poco de aceite, 4-5 minutos por cada lado, hasta que estén doradas. Sírvelas en pan con tus toppings favoritos.",
    kaiaTips: ['Seca bien los frijoles para que la hamburguesa no quede blanda.', 'Puedes hornear las hamburguesas en lugar de freírlas para una opción más saludable.'],
    imageUrl: '/placeholder.svg',
    tags: ['high-protein', 'soy-free', 'nut-free'],
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
    preparation: "Monta el bowl colocando una base de espinacas y quinoa. Añade los garbanzos y el boniato asados, y el aguacate en rodajas. Para el aderezo, mezcla el tahini, zumo de limón, sirope de arce y un poco de agua hasta obtener la consistencia deseada. Rocía el aderezo sobre el bowl antes de servir.",
    kaiaTips: ['La clave de un buen Buddha Bowl es la variedad de texturas y colores.', 'Prepara los componentes por adelantado para un montaje rápido.'],
    imageUrl: '/placeholder.svg',
    tags: ['high-protein', 'gluten-free'],
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
    preparation: "Primero, hidrata la soja texturizada en caldo de verduras caliente. Sofríe la cebolla y el pimiento picados en una olla grande. Añade la soja hidratada y las especias, y cocina por 5 minutos. Incorpora el tomate triturado y los frijoles. Cocina a fuego lento durante al menos 30 minutos para que los sabores se integren.",
    kaiaTips: ['El chili sabe aún mejor al día siguiente.', 'Sírvelo con aguacate, cilantro y "crema agria" vegana.'],
    imageUrl: '/placeholder.svg',
    tags: ['high-protein', 'gluten-free', 'nut-free'],
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
    preparation: "Prepara la 'ricotta' triturando el tofu con levadura nutricional, albahaca y sal. Corta las verduras en láminas finas y ásalas ligeramente. Monta la lasaña en una fuente alternando capas de salsa de tomate, láminas de pasta, verduras y 'ricotta' de tofu. Termina con una capa de salsa y hornea a 180°C durante 45 minutos.",
    kaiaTips: ['Prensa bien el tofu para quitar el exceso de agua y obtener una mejor textura de "ricotta".', 'Deja reposar la lasaña 10 minutos antes de cortarla.'],
    imageUrl: '/placeholder.svg',
    tags: ['high-protein', 'nut-free'],
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
    preparation: "Sofríe la cebolla picada. Añade el arroz y tuéstalo por un minuto. Vierte el vino blanco y remueve hasta que se evapore. Comienza a añadir el caldo caliente, cucharón a cucharón, sin dejar de remover, esperando que se absorba antes de añadir más. A mitad de cocción, añade los champiñones y espárragos troceados. Al final, incorpora la levadura nutricional.",
    kaiaTips: ['La clave del risotto es añadir el caldo poco a poco y remover constantemente.', 'Termina con un chorrito de aceite de trufa para un toque gourmet.'],
    imageUrl: '/placeholder.svg',
    tags: ['balanced', 'gluten-free', 'soy-free', 'nut-free'],
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
    preparation: "Remoja los fideos de arroz según las instrucciones. Prepara la salsa mezclando la salsa de soja, sirope de arce, zumo de lima y sriracha. Saltea el tofu en cubos hasta que esté dorado. Añade los fideos escurridos y la salsa a la sartén. Incorpora los brotes de soja y la cebolleta. Sirve con cacahuetes picados por encima.",
    kaiaTips: ['No remojes los fideos de arroz en exceso o se volverán blandos.', 'Prensa el tofu para que quede más crujiente al freírlo.'],
    imageUrl: '/placeholder.svg',
    tags: ['high-protein', 'gluten-free'],
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
    preparation: "Remoja el alga wakame en agua. Calienta las 4 tazas de agua en una olla sin que llegue a hervir. En un bol pequeño, disuelve la pasta de miso con un poco del agua caliente. Vierte la mezcla de miso en la olla. Añade el tofu sedoso en cubos y el wakame escurrido. Calienta suavemente y sirve con cebolleta picada.",
    kaiaTips: ['Nunca hiervas la sopa una vez añadido el miso, ya que mataría sus probióticos.', 'Disuelve la pasta de miso en un poco de caldo caliente antes de añadirla a la olla.'],
    imageUrl: '/placeholder.svg',
    tags: ['low-calorie', 'gluten-free', 'nut-free'],
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
    preparation: "Calienta el falafel según las instrucciones. Calienta ligeramente el pan de pita o las tortillas. Unta una capa generosa de hummus en cada pan. Añade la lechuga, el tomate, el pepino y el falafel. Enrolla el wrap y sírvelo inmediatamente.",
    kaiaTips: ['Calienta el pan de pita para que sea más flexible.', 'Añade un poco de salsa tahini o yogur vegano para más cremosidad.'],
    imageUrl: '/placeholder.svg',
    tags: ['balanced', 'soy-free'],
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
    preparation: "Precalienta el horno a 220°C. Extiende la masa de pizza sobre una bandeja. Cubre con la salsa de tomate, dejando un borde libre. Espolvorea el queso vegano y distribuye las verduras por encima. Hornea durante 15-20 minutos, o hasta que la masa esté dorada y el queso derretido.",
    kaiaTips: ['Precalienta bien el horno con la bandeja dentro para una base más crujiente.', 'Un chorrito de aceite de oliva y orégano seco antes de hornear le da un gran sabor.'],
    imageUrl: '/placeholder.svg',
    tags: ['high-protein', 'soy-free', 'nut-free'],
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
    preparation: "Cuece los gnocchi hasta que floten. Mientras, en una sartén, saltea el ajo picado y unas hojas de salvia. Añade el puré de calabaza, la leche de coco y la nuez moscada. Cocina a fuego lento hasta que la salsa esté caliente y homogénea. Escurre los gnocchi y mézclalos con la salsa.",
    kaiaTips: ['Fríe las hojas de salvia en un poco de aceite hasta que estén crujientes para decorar.', 'Tuesta unas semillas de calabaza para añadir un toque crujiente.'],
    imageUrl: '/placeholder.svg',
    tags: ['balanced', 'soy-free', 'nut-free'],
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
    preparation: "Corta las berenjenas por la mitad y vacía la pulpa. Hornea las cáscaras. Mientras, hidrata la soja texturizada. Sofríe la cebolla, el pimiento y la pulpa de la berenjena picada. Añade la soja, la salsa de tomate y el orégano. Rellena las berenjenas con la mezcla, cubre con queso vegano y gratina en el horno.",
    kaiaTips: ['"Asusta" las berenjenas con sal para quitarles el amargor antes de cocinarlas.', 'Añade pasas y piñones al relleno para un toque agridulce.'],
    imageUrl: '/placeholder.svg',
    tags: ['low-calorie', 'high-protein', 'gluten-free', 'nut-free'],
  },
];

const shuffle = (array: Recipe[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const generateMenuFromRecipes = (recipes: Recipe[]): Record<string, { breakfast: Recipe; lunch: Recipe; dinner: Recipe }> => {
    if (recipes.length === 0) {
        // Fallback to all recipes if filtering results in an empty list
        recipes = mockRecipes;
    }
    
    let paddedRecipes = [...recipes];
    while (paddedRecipes.length < 9) {
        paddedRecipes.push(...recipes);
    }

    const shuffled = shuffle(paddedRecipes);
    return {
        Lunes: { breakfast: shuffled[0], lunch: shuffled[1], dinner: shuffled[2] },
        Martes: { breakfast: shuffled[3], lunch: shuffled[4], dinner: shuffled[5] },
        Miércoles: { breakfast: shuffled[6], lunch: shuffled[7], dinner: shuffled[8] },
        Jueves: { breakfast: shuffled[1], lunch: shuffled[3], dinner: shuffled[5] },
        Viernes: { breakfast: shuffled[2], lunch: shuffled[4], dinner: shuffled[6] },
        Sábado: { breakfast: shuffled[0], lunch: shuffled[7], dinner: shuffled[8] },
        Domingo: { breakfast: shuffled[3], lunch: shuffled[1], dinner: shuffled[4] },
    }
}

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

    set({ weeklyMenu: generateMenuFromRecipes(filteredRecipes) });
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