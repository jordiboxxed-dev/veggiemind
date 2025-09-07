import { Recipe } from "@/types";
import GlassCard from "./GlassCard";
import { ChefHat, Clock } from "lucide-react";
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
    <motion.div variants={cardVariants}>
      <GlassCard 
        className="overflow-hidden cursor-pointer group transition-all hover:border-brand-green/50 h-full"
        onClick={() => setSelectedRecipe(recipe)}
      >
        <div className="h-40 bg-white/10 flex items-center justify-center">
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
    </motion.div>
  );
};

export default RecipeCard;