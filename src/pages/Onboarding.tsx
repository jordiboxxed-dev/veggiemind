import GlassCard from "@/components/GlassCard";
import { KaiaAvatar } from "@/components/KaiaAvatar";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleGoalSelection = () => {
    // En el futuro, aquí guardaríamos la preferencia del usuario.
    navigate("/dashboard");
  };

  const goals = [
    { title: "Perder Peso", description: "Planes optimizados en calorías." },
    { title: "Mantener Peso", description: "Equilibrio y nutrición para tu día a día." },
    { title: "Ganar Músculo", description: "Recetas altas en proteína vegetal." },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full max-w-md mx-auto flex flex-col items-center text-center">
        <KaiaAvatar />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-neon-cyan">
          Cuéntame tu objetivo
        </h1>
        <p className="mt-2 mb-8 text-lg text-foreground/80">
          Personalizaré tu plan para ayudarte a conseguirlo.
        </p>

        <div className="w-full space-y-4">
          {goals.map((goal) => (
            <GlassCard
              key={goal.title}
              className="p-6 w-full text-left hover:border-brand-green/50 transition-all cursor-pointer"
              onClick={handleGoalSelection}
            >
              <h3 className="font-bold text-lg text-foreground">{goal.title}</h3>
              <p className="text-foreground/70">{goal.description}</p>
            </GlassCard>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Onboarding;