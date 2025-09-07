import WeeklyMenu from '@/components/WeeklyMenu';
import { MadeWithDyad } from '@/components/made-with-dyad';

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 font-sans">
      <main className="w-full max-w-md mx-auto flex flex-col items-center text-center">
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-neon-cyan">
          Tu Menú Semanal
        </h1>
        <p className="mt-2 mb-8 text-lg text-foreground/80">
          Planificado por Kaia para ti.
        </p>
        <WeeklyMenu />
      </main>
      <div className="mt-auto pt-4 w-full">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Dashboard;