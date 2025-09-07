import RecipeCard from "@/components/RecipeCard";
import RecipeDetailSheet from "@/components/RecipeDetailSheet";
import { useRecipeStore } from "@/store/recipeStore";

const Recipes = () => {
  const { recipes } = useRecipeStore();

  return (
    <>
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-neon-cyan">
            Recetario de Kaia
          </h1>
          <p className="text-lg text-foreground/80">
            Explora todas las delicias que puedes preparar.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      <RecipeDetailSheet />
    </>
  );
};

export default Recipes;