import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bot, CalendarDays, UtensilsCrossed, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileHeader from "./MobileHeader";
import MobileNav from "./MobileNav";
import { useSession } from "@/contexts/SessionContext";
import { Button } from "./ui/button";
import { useRecipeStore } from "@/store/recipeStore";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { logout, profile } = useSession();
  const navigate = useNavigate();
  const { setUserProfile, generateWeeklyMenu, weeklyMenu } = useRecipeStore();

  useEffect(() => {
    if (profile) {
      setUserProfile(profile);
      // Generate menu only if it hasn't been generated yet and profile is loaded
      if (Object.keys(weeklyMenu).length === 0) {
        generateWeeklyMenu();
      }
    }
  }, [profile, setUserProfile, generateWeeklyMenu, weeklyMenu]);


  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { href: "/dashboard", label: "Menú Semanal", icon: CalendarDays },
    { href: "/recipes", label: "Recetas", icon: UtensilsCrossed },
  ];

  if (isMobile) {
    return (
      <div className="min-h-screen w-full">
        <MobileHeader />
        <main className="pt-20 pb-24 px-4">{children}</main>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex">
      <aside className="w-64 flex-col border-r border-white/10 p-4 hidden md:flex">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-background" />
            </div>
            <h1 className="text-xl font-bold text-foreground">VeggieMind</h1>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/80 transition-all hover:text-foreground hover:bg-white/5",
                  location.pathname === item.href && "bg-brand-green/20 text-brand-green"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;