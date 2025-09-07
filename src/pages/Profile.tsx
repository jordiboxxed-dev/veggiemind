import { useState, useEffect } from "react";
import { useSession } from "@/contexts/SessionContext";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import GlassCard from "@/components/GlassCard";
import AnimatedPage from "@/components/AnimatedPage";
import { useRecipeStore } from "@/store/recipeStore";
import { useNavigate } from "react-router-dom";

const goals = ["Perder Peso", "Mantener Peso", "Ganar Músculo"];
const allergiesOptions = ["Gluten", "Soja", "Frutos secos"];
const skillLevels = ["Principiante", "Intermedio", "Avanzado"];
const cookingTimes = ["Menos de 30min", "30-60 min", "Más de 60min"];

const Profile = () => {
  const { profile, user } = useSession();
  const { generateWeeklyMenu } = useRecipeStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    goal: "",
    allergies: [] as string[],
    dislikedIngredients: "",
    skillLevel: "",
    cookingTime: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        goal: profile.goal || "",
        allergies: profile.allergies || [],
        dislikedIngredients: (profile.disliked_ingredients || []).join(", "),
        skillLevel: profile.skill_level || "",
        cookingTime: profile.cooking_time || "",
      });
    }
  }, [profile]);

  const handleUpdateData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAllergyToggle = (allergy: string) => {
    const currentAllergies = formData.allergies;
    if (currentAllergies.includes(allergy)) {
      handleUpdateData('allergies', currentAllergies.filter(a => a !== allergy));
    } else {
      handleUpdateData('allergies', [...currentAllergies, allergy]);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    const toastId = showLoading("Actualizando tu cocina...");

    const profileData = {
      goal: formData.goal,
      allergies: formData.allergies,
      disliked_ingredients: formData.dislikedIngredients.split(',').map(s => s.trim()).filter(Boolean),
      skill_level: formData.skillLevel,
      cooking_time: formData.cookingTime,
    };

    const { error } = await supabase
      .from('user_profiles')
      .update(profileData)
      .eq('id', user.id);
    
    dismissToast(toastId);
    if (error) {
      showError("Hubo un error al guardar tus preferencias.");
    } else {
      showSuccess("¡Tu cocina ha sido actualizada!");
      generateWeeklyMenu();
      navigate('/dashboard');
    }
  };

  return (
    <AnimatedPage>
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-neon-cyan">
            Mi Cocina
          </h1>
          <p className="text-lg text-foreground/80">
            Ajusta tus preferencias para que Kaia cocine para ti.
          </p>
        </div>

        <GlassCard className="p-6">
          <div className="space-y-6">
            {/* Goal */}
            <div>
              <Label className="text-lg font-semibold text-neon-cyan">Tu Objetivo</Label>
              <RadioGroup value={formData.goal} onValueChange={(value) => handleUpdateData('goal', value)} className="mt-2">
                {goals.map(goal => (
                  <div key={goal} className="flex items-center space-x-2">
                    <RadioGroupItem value={goal} id={goal} />
                    <Label htmlFor={goal}>{goal}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Allergies */}
            <div>
              <Label className="text-lg font-semibold text-neon-cyan">Alergias e Intolerancias</Label>
              <div className="mt-2 space-y-2">
                {allergiesOptions.map(allergy => (
                  <div key={allergy} className="flex items-center space-x-3">
                    <Checkbox id={`profile-${allergy}`} checked={formData.allergies.includes(allergy)} onCheckedChange={() => handleAllergyToggle(allergy)} />
                    <Label htmlFor={`profile-${allergy}`}>{allergy}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Disliked Ingredients */}
            <div>
              <Label htmlFor="disliked" className="text-lg font-semibold text-neon-cyan">Ingredientes que no te gustan</Label>
              <p className="text-sm text-foreground/70 mb-2">Separados por comas.</p>
              <Textarea 
                id="disliked"
                placeholder="Ej: champiñones, cilantro..."
                value={formData.dislikedIngredients}
                onChange={(e) => handleUpdateData('dislikedIngredients', e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>

            {/* Skill Level */}
            <div>
              <Label className="text-lg font-semibold text-neon-cyan">Nivel en la Cocina</Label>
              <RadioGroup value={formData.skillLevel} onValueChange={(value) => handleUpdateData('skillLevel', value)} className="mt-2">
                {skillLevels.map(level => (
                  <div key={level} className="flex items-center space-x-2">
                    <RadioGroupItem value={level} id={level} />
                    <Label htmlFor={level}>{level}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Cooking Time */}
            <div>
              <Label className="text-lg font-semibold text-neon-cyan">Tiempo para Cocinar</Label>
              <RadioGroup value={formData.cookingTime} onValueChange={(value) => handleUpdateData('cookingTime', value)} className="mt-2">
                {cookingTimes.map(time => (
                  <div key={time} className="flex items-center space-x-2">
                    <RadioGroupItem value={time} id={time} />
                    <Label htmlFor={time}>{time}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </GlassCard>

        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="bg-brand-green text-background font-bold shadow-[0_0_20px_theme('colors.brand-green/50%')] hover:bg-brand-green/90">
            Guardar Cambios
          </Button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Profile;