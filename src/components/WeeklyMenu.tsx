import { useRecipeStore } from '@/store/recipeStore';
import GlassCard from './GlassCard';
import { Recipe } from '@/types';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';
import MealSwapDialog from './MealSwapDialog';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
type MealType = 'breakfast' | 'lunch' | 'dinner';

const WeeklyMenu = () => {
  const { weeklyMenu, setSelectedRecipe, swapMeal } = useRecipeStore();
  const [swapState, setSwapState] = useState<{day: string; mealType: MealType} | null>(null);

  const handleSwapSelect = (newRecipe: Recipe) => {
    if (swapState) {
      swapMeal(swapState.day, swapState.mealType, newRecipe);
      setSwapState(null);
    }
  };

  const MealItem = ({ label, recipe, day, mealType }: { label: string; recipe: Recipe, day: string, mealType: MealType }) => (
    <div className="flex items-center justify-between group">
        <button 
          onClick={() => setSelectedRecipe(recipe)}
          className="text-left w-full hover:text-brand-green transition-colors"
        >
          <p><span className="font-semibold">{label}:</span> {recipe.title}</p>
        </button>
        <button 
            onClick={() => setSwapState({ day, mealType })}
            className="p-1 rounded-md opacity-0 group-hover:opacity-70 hover:opacity-100 hover:bg-white/10 transition-all"
            aria-label={`Cambiar ${label}`}
        >
            <RefreshCw className="w-3 h-3 text-neon-cyan" />
        </button>
    </div>
  );

  return (
    <>
      <div className="w-full space-y-4">
        {daysOfWeek.map((day) => (
          <GlassCard key={day} className="p-4">
            <h3 className="font-bold text-lg text-brand-green">{day}</h3>
            <div className="mt-2 space-y-2 text-sm text-foreground/80">
              <MealItem label="Desayuno" recipe={weeklyMenu[day].breakfast} day={day} mealType="breakfast" />
              <MealItem label="Almuerzo" recipe={weeklyMenu[day].lunch} day={day} mealType="lunch" />
              <MealItem label="Cena" recipe={weeklyMenu[day].dinner} day={day} mealType="dinner" />
            </div>
          </GlassCard>
        ))}
      </div>
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