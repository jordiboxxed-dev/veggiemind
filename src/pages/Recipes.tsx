import RecipeCard from "@/components/RecipeCard";
import RecipeDetailSheet from "@/components/RecipeDetailSheet";
import { useRecipeStore } from "@/store/recipeStore";
import AnimatedPage from "@/components/AnimatedPage";
import { motion } from "framer-motion";

const Recipes = () => {
  const { recipes } = useRecipeStore();

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <AnimatedPage>
      <div className="w-full">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-neon-cyan">
            Recetario de Kaia
          </h1>
          <p className="text-lg text-foreground/80">
            Explora todas las delicias que puedes preparar.
          </p>
        </div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </motion.div>
      </div>
      <RecipeDetailSheet />
    </AnimatedPage>
  );
};

export default Recipes;