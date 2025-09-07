import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRecipeStore } from "@/store/recipeStore";
import { Recipe } from "@/types";

interface MealSwapDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  currentRecipeId?: string;
}

const MealSwapDialog = ({ isOpen, onOpenChange, onSelectRecipe, currentRecipeId }: MealSwapDialogProps) => {
  const { recipes } = useRecipeStore();

  const availableRecipes = recipes.filter(r => r.id !== currentRecipeId);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background/80 backdrop-blur-lg border-white/10">
        <DialogHeader>
          <DialogTitle className="text-brand-green">Elige un reemplazo</DialogTitle>
          <DialogDescription>
            Selecciona una nueva receta para tu plan.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-2">
            {availableRecipes.map(recipe => (
                <button 
                    key={recipe.id}
                    onClick={() => onSelectRecipe(recipe)}
                    className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                    <p className="font-semibold text-foreground">{recipe.title}</p>
                    <p className="text-xs text-foreground/60">{recipe.cookTime} min - {recipe.difficulty}</p>
                </button>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MealSwapDialog;