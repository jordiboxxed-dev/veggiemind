import GlassCard from "@/components/GlassCard";
import { KaiaAvatar } from "@/components/KaiaAvatar";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full max-w-md mx-auto flex flex-col items-center text-center">
        <KaiaAvatar />
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-neon-cyan">
          VeggieMind
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          Tu chef personal de nutrición vegana.
        </p>

        <GlassCard className="mt-8 w-full p-6">
          <h2 className="text-xl font-semibold text-foreground">¡Bienvenido!</h2>
          <p className="mt-2 text-foreground/70">
            Descubre recetas deliciosas y planes de comida personalizados que se adaptan a ti.
          </p>
        </GlassCard>

        <Button className="mt-8 w-full bg-brand-green text-background font-bold text-lg py-6 rounded-full shadow-[0_0_20px_theme('colors.brand-green/50%')] hover:bg-brand-green/90 hover:scale-105 transition-all duration-300">
          Comenzar
        </Button>
      </main>
      <div className="absolute bottom-0 w-full">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;