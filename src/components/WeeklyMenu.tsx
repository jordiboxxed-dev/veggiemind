import { useRecipeStore } from '@/store/recipeStore';
import GlassCard from './GlassCard';
import { Recipe } from '@/types';
import { RefreshCw, Coffee, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import MealSwapDialog from './MealSwapDialog';
import { motion } from 'framer-motion';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
type MealType = 'breakfast' | 'lunch' | 'dinner';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const WeeklyMenu = () => {
  const { weeklyMenu, setSelectedRecipe, swapMeal } = useRecipeStore();
  const [swapState, setSwapState] = useState<{day: string; mealType: MealType} | null>(null);

  const handleSwapSelect = (newRecipe: Recipe) => {
    if (swapState) {
      swapMeal(swapState.day, swapState.mealType, newRecipe);
      setSwapState(null);
    }
  };

  const mealIcons = {
    breakfast: <Coffee className="w-5 h-5 text-neon-purple" />,
    lunch: <Sun className="w-5 h-5 text-neon-cyan" />,
    dinner: <Moon className="w-5 h-5 text-indigo-400" />,
  };

  const MealItem = ({ label, recipe, day, mealType }: { label: string; recipe: Recipe, day: string, mealType: MealType }) => (
    <div className="flex items-center justify-between group py-2">
      <div className="flex items-center gap-4">
        {mealIcons[mealType]}
        <button 
          onClick={() => setSelectedRecipe(recipe)}
          className="text-left hover:text-brand-green transition-colors"
        >
          <p className="font-semibold text-foreground">{recipe.title}</p>
          <p className="text-xs text-foreground/60">{label}</p>
        </button>
      </div>
      <button 
          onClick={() => setSwapState({ day, mealType })}
          className="p-2 rounded-lg opacity-0 group-hover:opacity-70 hover:opacity-100 hover:bg-white/10 transition-all"
          aria-label={`Cambiar ${label}`}
      >
          <RefreshCw className="w-4 h-4 text-neon-cyan" />
      </button>
    </div>
  );

  return (
    <>
      <motion.div 
        className="w-full space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {daysOfWeek.map((day) => (
          <motion.div key={day} variants={itemVariants}>
            <GlassCard className="p-4">
              <h3 className="font-bold text-lg text-brand-green mb-2">{day}</h3>
              <div className="divide-y divide-white/10">
                <MealItem label="Desayuno" recipe={weeklyMenu[day].breakfast} day={day} mealType="breakfast" />
                <MealItem label="Almuerzo" recipe={weeklyMenu[day].lunch} day={day} mealType="lunch" />
                <MealItem label="Cena" recipe={weeklyMenu[day].dinner} day={day} mealType="dinner" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
      <MealSwapDialog 
        isOpen={!!swapState}
        onOpenChange={() => setSwapState(null)}
        onSelectRecipe={handleSwapSelect}
        currentRecipeId={swapState ? weeklyMenu[swapState.day][swapState.mealType].id : undefined}
      />
    </>
  );
};

export default WeeklyMenu;