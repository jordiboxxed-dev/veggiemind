import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import { KaiaAvatar } from "@/components/KaiaAvatar";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess, showLoading, dismissToast } from "@/utils/toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useSession } from "@/contexts/SessionContext";

const goals = [
  { title: "Perder Peso", description: "Planes optimizados en calorías." },
  { title: "Mantener Peso", description: "Equilibrio y nutrición para tu día a día." },
  { title: "Ganar Músculo", description: "Recetas altas en proteína vegetal." },
];

const allergiesOptions = ["Gluten", "Soja", "Frutos secos"];

const skillLevels = [
    { title: "Principiante", description: "Recetas fáciles y rápidas." },
    { title: "Intermedio", description: "Me siento cómodo en la cocina." },
    { title: "Avanzado", description: "¡Me encantan los retos culinarios!" },
];

const cookingTimes = [
    { title: "Menos de 30min", description: "Comidas rápidas y deliciosas." },
    { title: "30-60 min", description: "Tengo algo de tiempo para elaborar." },
    { title: "Más de 60min", description: "Disfruto cocinando sin prisas." },
];

const TOTAL_STEPS = 5;

const Onboarding = () => {
  const navigate = useNavigate();
  const { refreshProfile } = useSession();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: "",
    allergies: [] as string[],
    dislikedIngredients: "",
    skillLevel: "",
    cookingTime: "",
  });

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

  const nextStep = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    const toastId = showLoading("Guardando tu perfil...");
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      dismissToast(toastId);
      showError("No se pudo identificar al usuario. Por favor, inicia sesión de nuevo.");
      navigate('/login');
      return;
    }

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
      showError("Hubo un error al guardar tu perfil.");
      console.error(error);
    } else {
      showSuccess("¡Perfil guardado! Preparando tu primer menú...");
      await refreshProfile();
      // Small delay to ensure profile is refreshed before navigating
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  };

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full max-w-md mx-auto flex flex-col items-center text-center">
        <KaiaAvatar />
        
        {step === 1 && (
          <>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-neon-cyan">Cuéntame tu objetivo</h1>
            <p className="mt-2 mb-8 text-lg text-foreground/80">Personalizaré tu plan para ayudarte a conseguirlo.</p>
            <div className="w-full space-y-4">
              {goals.map((g) => (
                <GlassCard 
                  key={g.title} 
                  className={cn(
                    "p-6 w-full text-left hover:border-brand-green/50 transition-all cursor-pointer", 
                    formData.goal === g.title && "border-brand-green"
                  )} 
                  onClick={() => handleUpdateData('goal', g.title)}
                >
                  <h3 className="font-bold text-lg text-foreground">{g.title}</h3>
                  <p className="text-foreground/70">{g.description}</p>
                </GlassCard>
              ))}
            </div>
            <div className="mt-8 w-full flex justify-end">
              <Button 
                onClick={nextStep} 
                disabled={!formData.goal}
                className={cn(!formData.goal && "opacity-50 cursor-not-allowed")}
              >
                Siguiente
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
            <>
                <h1 className="mt-6 text-3xl font-bold">¿Alergias o intolerancias?</h1>
                <p className="mt-2 mb-8 text-lg text-foreground/80">Selecciona las que apliquen. Es importante para tu seguridad.</p>
                <div className="w-full space-y-4">
                    {allergiesOptions.map(allergy => (
                        <div key={allergy} className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                            <Checkbox id={allergy} checked={formData.allergies.includes(allergy)} onCheckedChange={() => handleAllergyToggle(allergy)} />
                            <Label htmlFor={allergy} className="text-lg">{allergy}</Label>
                        </div>
                    ))}
                </div>
                <div className="mt-8 w-full flex justify-between">
                  <Button variant="ghost" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
                  </Button>
                  <Button onClick={nextStep}>Siguiente</Button>
                </div>
            </>
        )}

        {step === 3 && (
            <>
                <h1 className="mt-6 text-3xl font-bold">¿Hay algo que no te guste?</h1>
                <p className="mt-2 mb-8 text-lg text-foreground/80">Lista los ingredientes que prefieres evitar, separados por comas.</p>
                <Textarea 
                    placeholder="Ej: champiñones, cilantro, berenjena..."
                    value={formData.dislikedIngredients}
                    onChange={(e) => handleUpdateData('dislikedIngredients', e.target.value)}
                    className="bg-white/5 border-white/10"
                />
                <div className="mt-8 w-full flex justify-between">
                  <Button variant="ghost" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
                  </Button>
                  <Button onClick={nextStep}>Siguiente</Button>
                </div>
            </>
        )}

        {step === 4 && (
            <>
                <h1 className="mt-6 text-3xl font-bold">¿Cuál es tu nivel en la cocina?</h1>
                <p className="mt-2 mb-8 text-lg text-foreground/80">Esto me ayudará a sugerirte recetas que disfrutes preparando.</p>
                <div className="w-full space-y-4">
                    {skillLevels.map((s) => (
                        <GlassCard 
                          key={s.title} 
                          className={cn(
                            "p-6 w-full text-left hover:border-brand-green/50 transition-all cursor-pointer", 
                            formData.skillLevel === s.title && "border-brand-green"
                          )} 
                          onClick={() => handleUpdateData('skillLevel', s.title)}
                        >
                            <h3 className="font-bold text-lg text-foreground">{s.title}</h3>
                            <p className="text-foreground/70">{s.description}</p>
                        </GlassCard>
                    ))}
                </div>
                <div className="mt-8 w-full flex justify-between">
                  <Button variant="ghost" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    disabled={!formData.skillLevel}
                    className={cn(!formData.skillLevel && "opacity-50 cursor-not-allowed")}
                  >
                    Siguiente
                  </Button>
                </div>
            </>
        )}

        {step === 5 && (
            <>
                <h1 className="mt-6 text-3xl font-bold">¿Cuánto tiempo sueles tener?</h1>
                <p className="mt-2 mb-8 text-lg text-foreground/80">Para tus comidas principales como almuerzo o cena.</p>
                <div className="w-full space-y-4">
                    {cookingTimes.map((t) => (
                        <GlassCard 
                          key={t.title} 
                          className={cn(
                            "p-6 w-full text-left hover:border-brand-green/50 transition-all cursor-pointer", 
                            formData.cookingTime === t.title && "border-brand-green"
                          )} 
                          onClick={() => handleUpdateData('cookingTime', t.title)}
                        >
                            <h3 className="font-bold text-lg text-foreground">{t.title}</h3>
                            <p className="text-foreground/70">{t.description}</p>
                        </GlassCard>
                    ))}
                </div>
                <div className="mt-8 w-full flex justify-between">
                  <Button variant="ghost" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!formData.cookingTime}
                    className={cn(
                      "bg-brand-green text-background font-bold shadow-[0_0_20px_theme('colors.brand-green/50%')] hover:bg-brand-green/90",
                      !formData.cookingTime && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    Finalizar <Check className="ml-2 h-4 w-4" />
                  </Button>
                </div>
            </>
        )}

        {step !== 1 && step !== 4 && step !== 5 && (
          <div className="mt-8 w-full">
            <Progress value={progress} className="w-full h-2 bg-white/10 [&>div]:bg-brand-green" />
          </div>
        )}
        
        {(step === 1 || step === 4 || step === 5) && (
          <div className="mt-8 w-full">
            <Progress value={progress} className="w-full h-2 bg-white/10 [&>div]:bg-brand-green" />
          </div>
        )}
      </main>
    </div>
  );
};

export default Onboarding;