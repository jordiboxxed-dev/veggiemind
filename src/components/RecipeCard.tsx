import { Recipe } from "@/types";
import GlassCard from "./GlassCard";
import { ChefHat, Clock } from "lucide-react";
import { useRecipeStore } from "@/store/recipeStore";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { setSelectedRecipe } = useRecipeStore();

  return (
    <GlassCard 
      className="overflow-hidden cursor-pointer group transition-all hover:border-brand-green/50"
      onClick={() => setSelectedRecipe(recipe)}
    >
      <div className="h-40 bg-white/10 flex items-center justify-center">
        {/* En el futuro, aquí iría la imagen real de la receta */}
        <img src={recipe.imageUrl} alt={recipe.title} className="w-24 h-24 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate text-foreground">{recipe.title}</h3>
        <div className="flex items-center justify-between text-xs text-foreground/70 mt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {recipe.cookTime} min
          </div>
          <div className="flex items-center gap-1 capitalize">
            <ChefHat className="w-3 h-3" /> {recipe.difficulty}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default RecipeCard;