import { useRecipeStore } from '@/store/recipeStore';
import GlassCard from './GlassCard';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const WeeklyMenu = () => {
  const { weeklyMenu } = useRecipeStore();

  return (
    <div className="w-full space-y-4">
      {daysOfWeek.map((day) => (
        <GlassCard key={day} className="p-4">
          <h3 className="font-bold text-lg text-brand-green">{day}</h3>
          <div className="mt-2 space-y-2 text-sm text-foreground/80">
            <p><span className="font-semibold">Desayuno:</span> {weeklyMenu[day].breakfast.title}</p>
            <p><span className="font-semibold">Almuerzo:</span> {weeklyMenu[day].lunch.title}</p>
            <p><span className="font-semibold">Cena:</span> {weeklyMenu[day].dinner.title}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export default WeeklyMenu;