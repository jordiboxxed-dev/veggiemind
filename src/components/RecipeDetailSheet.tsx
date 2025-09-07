import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useRecipeStore } from "@/store/recipeStore";
import { Badge } from "./ui/badge";
import { Flame, BrainCircuit, ChefHat, Clock, BookOpen } from "lucide-react";

const RecipeDetailSheet = () => {
  const { selectedRecipe, clearSelectedRecipe } = useRecipeStore();

  return (
    <Sheet open={!!selectedRecipe} onOpenChange={(isOpen) => !isOpen && clearSelectedRecipe()}>
      <SheetContent className="w-full md:w-[400px] sm:w-[540px] bg-background/80 backdrop-blur-lg border-white/10 overflow-y-auto">
        {selectedRecipe && (
          <>
            <SheetHeader>
              <SheetTitle className="text-2xl text-brand-green">{selectedRecipe.title}</SheetTitle>
              <SheetDescription className="flex items-center gap-4 pt-2 text-foreground/70">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {selectedRecipe.cookTime} min
                </div>
                <div className="flex items-center gap-1">
                  <ChefHat className="w-4 h-4" /> <span className="capitalize">{selectedRecipe.difficulty}</span>
                </div>
              </SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-neon-cyan">Ingredientes</h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/80">
                  {selectedRecipe.ingredients.map((ing) => (
                    <li key={ing.name}>{ing.quantity} {ing.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-neon-cyan flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Preparación
                </h3>
                <p className="text-foreground/80 bg-white/5 p-3 rounded-lg text-sm leading-relaxed">
                  {selectedRecipe.preparation}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-neon-cyan">Nutrición (aprox.)</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <Badge variant="secondary" className="flex items-center gap-2"><Flame className="w-3 h-3 text-orange-400"/> {selectedRecipe.nutrition.calories} kcal</Badge>
                    <Badge variant="secondary">Proteína: {selectedRecipe.nutrition.protein}g</Badge>
                    <Badge variant="secondary">Carbs: {selectedRecipe.nutrition.carbs}g</Badge>
                    <Badge variant="secondary">Grasas: {selectedRecipe.nutrition.fat}g</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-neon-cyan">Kaia Tips</h3>
                <div className="space-y-2 text-foreground/80">
                    {selectedRecipe.kaiaTips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 p-3 bg-white/5 rounded-lg">
                            <BrainCircuit className="w-5 h-5 mt-1 text-neon-purple flex-shrink-0" />
                            <p>{tip}</p>
                        </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default RecipeDetailSheet;