import { Recipe } from "@/types";
import GlassCard from "./GlassCard";
import { ChefHat, Clock, Users } from "lucide-react";
import { useRecipeStore } from "@/store/recipeStore";
import { motion } from "framer-motion";

interface RecipeCardProps {
  recipe: Recipe;
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { setSelectedRecipe } = useRecipeStore();

  return (
    <motion.div variants={cardVariants} className="h-full">
      <GlassCard 
        className="cursor-pointer group transition-all hover:border-brand-green/50 h-full p-4 flex flex-col justify-between"
        onClick={() => setSelectedRecipe(recipe)}
      >
        <h3 className="font-bold text-lg text-foreground group-hover:text-brand-green transition-colors">{recipe.title}</h3>
        <div className="flex items-center justify-between text-xs text-foreground/70 mt-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {recipe.cookTime} min
          </div>
          <div className="flex items-center gap-1 capitalize">
            <ChefHat className="w-3 h-3" /> {recipe.difficulty}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" /> {recipe.servings} {recipe.servings > 1 ? 'porciones' : 'porción'}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default RecipeCard;