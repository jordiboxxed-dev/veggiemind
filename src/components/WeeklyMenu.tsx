import { useRecipeStore } from '@/store/recipeStore';
import GlassCard from './GlassCard';
import { Recipe } from '@/types';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const WeeklyMenu = () => {
  const { weeklyMenu, setSelectedRecipe } = useRecipeStore();

  const MealItem = ({ label, recipe }: { label: string; recipe: Recipe }) => (
    <button 
      onClick={() => setSelectedRecipe(recipe)}
      className="text-left w-full hover:text-brand-green transition-colors"
    >
      <p><span className="font-semibold">{label}:</span> {recipe.title}</p>
    </button>
  );

  return (
    <div className="w-full space-y-4">
      {daysOfWeek.map((day) => (
        <GlassCard key={day} className="p-4">
          <h3 className="font-bold text-lg text-brand-green">{day}</h3>
          <div className="mt-2 space-y-2 text-sm text-foreground/80">
            <MealItem label="Desayuno" recipe={weeklyMenu[day].breakfast} />
            <MealItem label="Almuerzo" recipe={weeklyMenu[day].lunch} />
            <MealItem label="Cena" recipe={weeklyMenu[day].dinner} />
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export default WeeklyMenu;