import WeeklyMenu from '@/components/WeeklyMenu';
import RecipeDetailSheet from '@/components/RecipeDetailSheet';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useRecipeStore } from '@/store/recipeStore';
import AnimatedPage from '@/components/AnimatedPage';

const Dashboard = () => {
  const { regenerateWeeklyMenu } = useRecipeStore();

  return (
    <AnimatedPage>
      <div className="flex flex-col items-start w-full max-w-2xl mx-auto">
        <div className="w-full flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-neon-cyan">
              Tu Menú Semanal
            </h1>
            <p className="text-lg text-foreground/80">
              Planificado por Kaia para ti.
            </p>
          </div>
          <Button onClick={regenerateWeeklyMenu}>
            <Sparkles className="mr-2 h-4 w-4" />
            Generar Nuevo Menú
          </Button>
        </div>
        <WeeklyMenu />
      </div>
      <RecipeDetailSheet />
    </AnimatedPage>
  );
};

export default Dashboard;